import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} from '@whiskeysockets/baileys';
import QRCode from 'qrcode';
import pino from 'pino';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { storage } from './storage.js';
import { ruleEngine } from './rule-engine.js';
import { callEngine } from './call-engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUTH_DIR = path.join(storage.getDataDir(), 'auth_info_baileys');

export class NativeWhatsAppEngine {
  constructor() {
    this.sock = null;
    this.status = 'DISCONNECTED'; // 'DISCONNECTED' | 'INITIALIZING' | 'SCAN_QR_CODE' | 'CONNECTED' | 'ERROR'
    this.qrCodeDataUrl = null;
    this.rawQr = null;
    this.onBroadcast = null;
    this.isStarting = false;
  }

  setBroadcaster(fn) {
    this.onBroadcast = fn;
  }

  emitUpdate(type, data) {
    if (this.onBroadcast) {
      this.onBroadcast(type, data);
    }
  }

  getStatus() {
    return {
      status: this.status,
      qrCode: this.qrCodeDataUrl,
      rawQr: this.rawQr,
      connected: this.status === 'CONNECTED',
    };
  }

  clearAuthFiles() {
    try {
      if (fs.existsSync(AUTH_DIR)) {
        const files = fs.readdirSync(AUTH_DIR);
        for (const file of files) {
          try {
            fs.rmSync(path.join(AUTH_DIR, file), { recursive: true, force: true });
          } catch (e) {}
        }
        console.log('[WhatsApp Engine] Cleared auth credentials files');
      } else {
        fs.mkdirSync(AUTH_DIR, { recursive: true });
      }
    } catch (e) {
      console.error('[WhatsApp Engine] Error clearing auth directory:', e.message);
    }
  }

  async start(forceReset = false) {
    if (this.isStarting) {
      return { success: true, message: 'Session initialization already in progress...', status: this.status };
    }

    if (this.status === 'CONNECTED' && !forceReset) {
      return { success: true, message: 'Session already connected', status: this.status };
    }

    this.isStarting = true;

    if (forceReset) {
      console.log('[WhatsApp Engine] Force reset requested. Cleaning old auth keys...');
      if (this.sock) {
        try {
          this.sock.end(new Error('Force reset'));
        } catch (e) {}
        this.sock = null;
      }
      this.clearAuthFiles();
    }

    this.status = 'INITIALIZING';
    this.qrCodeDataUrl = null;
    this.rawQr = null;
    this.emitUpdate('session_update', this.getStatus());

    try {
      if (!fs.existsSync(AUTH_DIR)) {
        fs.mkdirSync(AUTH_DIR, { recursive: true });
      }

      const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
      const { version } = await fetchLatestBaileysVersion().catch(() => ({ version: [2, 3000, 1015901307] }));

      console.log(`[WhatsApp Engine] Initializing Baileys socket (version ${version.join('.')})...`);

      const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
        browser: ['WhatsAuto', 'Chrome', '1.0.0'],
        syncFullHistory: false,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        generateHighQualityLinkPreview: true,
      });

      this.sock = sock;

      // Save credentials whenever updated safely
      sock.ev.on('creds.update', async () => {
        try {
          if (!fs.existsSync(AUTH_DIR)) {
            fs.mkdirSync(AUTH_DIR, { recursive: true });
          }
          await saveCreds();
        } catch (err) {
          console.error('[WhatsApp Engine] Warning saving credentials:', err.message);
        }
      });

      // Connection Updates (QR Code & Status)
      sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          this.rawQr = qr;
          this.status = 'SCAN_QR_CODE';
          try {
            this.qrCodeDataUrl = await QRCode.toDataURL(qr, { margin: 1, scale: 8 });
          } catch (e) {
            console.error('Error generating QR data URL:', e);
          }

          console.log('[WhatsApp Engine] ✅ New QR Code generated successfully! Ready to scan.');
          storage.addLog({ event: 'qr_code_generated', status: 'SCAN_QR_CODE' });
          this.emitUpdate('session_update', this.getStatus());
        }

        if (connection === 'close') {
          const statusCode = lastDisconnect?.error?.output?.statusCode;
          const isLoggedOut = statusCode === DisconnectReason.loggedOut || statusCode === 401 || statusCode === 403;
          const shouldReconnect = statusCode !== DisconnectReason.loggedOut && statusCode !== 401 && statusCode !== 403;

          console.log(`[WhatsApp Engine] Connection closed (statusCode: ${statusCode}). Reconnect: ${shouldReconnect}`);

          if (isLoggedOut) {
            console.log('[WhatsApp Engine] Session logged out or expired. Purging stale keys so next start generates a fresh QR...');
            this.clearAuthFiles();
          }

          this.status = 'DISCONNECTED';
          this.qrCodeDataUrl = null;
          this.rawQr = null;
          this.emitUpdate('session_update', this.getStatus());
          storage.addLog({ event: 'session_closed', statusCode, shouldReconnect });

          if (shouldReconnect) {
            console.log('[WhatsApp Engine] Reconnecting in 4 seconds...');
            setTimeout(() => this.start(), 4000);
          }
        } else if (connection === 'open') {
          console.log('[WhatsApp Engine] ✅ WhatsApp Connection successfully established!');
          this.status = 'CONNECTED';
          this.qrCodeDataUrl = null;
          this.rawQr = null;
          this.emitUpdate('session_update', this.getStatus());
          storage.addLog({ event: 'session_connected', status: 'CONNECTED' });
        }
      });

      // Handle Incoming Messages
      sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
          try {
            if (msg.key.fromMe) continue;

            const chatId = msg.key.remoteJid;
            if (!chatId || chatId.includes('status@broadcast')) continue;

            const text =
              msg.message?.conversation ||
              msg.message?.extendedTextMessage?.text ||
              msg.message?.imageMessage?.caption ||
              msg.message?.videoMessage?.caption ||
              '';

            if (!text.trim()) continue;

            const senderName = msg.pushName || 'Friend';
            const messageId = msg.key.id;

            console.log(`[WhatsApp Inbound] From ${chatId} (${senderName}): ${text}`);
            storage.addLog({ event: 'incoming_message', chatId, senderName, text });
            this.emitUpdate('incoming_message', { chatId, senderName, text, timestamp: new Date().toISOString() });

            // Process through Rule Engine
            const processResult = await ruleEngine.processIncomingMessage({
              chatId,
              text,
              senderName,
              messageId,
            });

            if (processResult && processResult.replyText) {
              const sentMsg = await this.sendText(chatId, processResult.replyText);

              if (processResult.reactionEmoji && msg.key) {
                await sock.sendMessage(chatId, {
                  react: {
                    text: processResult.reactionEmoji,
                    key: msg.key,
                  },
                }).catch(() => {});
              }

              if (processResult.alertAdmin) {
                await this.sendText(processResult.alertAdmin.target, processResult.alertAdmin.text).catch(() => {});
              }

              storage.addLog({
                event: 'automation_replied',
                chatId,
                type: processResult.type,
                matchedRule: processResult.matchedRule?.name,
                replyText: processResult.replyText,
                deliverySuccess: sentMsg.success,
              });

              this.emitUpdate('automation_reply', {
                chatId,
                type: processResult.type,
                matchedRule: processResult.matchedRule?.name,
                replyText: processResult.replyText,
                success: sentMsg.success,
              });
            }
          } catch (msgErr) {
            console.error('Error handling incoming message:', msgErr);
          }
        }
      });

      // Handle Incoming Calls
      sock.ev.on('call', async (calls) => {
        for (const call of calls) {
          if (call.status === 'offer') {
            console.log(`[WhatsApp Call] Incoming call from ${call.from}`);
            const settings = storage.getSettings();

            if (settings.autoCallReject) {
              await sock.rejectCall(call.id, call.from).catch(() => {});
              const reply = settings.autoCallMessage || "📞 *Automated Notice*: I cannot take calls right now. Please text me here!";
              await this.sendText(call.from, reply);

              storage.addLog({
                event: 'call_auto_rejected',
                caller: call.from,
                isVideo: !!call.isVideo,
                callId: call.id,
              });

              this.emitUpdate('call_rejected', { caller: call.from, isVideo: call.isVideo });
            }
          }
        }
      });

      this.isStarting = false;
      return { success: true, message: 'WhatsApp engine initialized. Generating QR Code...', status: this.status };
    } catch (err) {
      this.isStarting = false;
      console.error('[WhatsApp Engine Error]:', err);
      this.status = 'ERROR';
      this.emitUpdate('session_update', this.getStatus());
      return { success: false, error: err.message };
    }
  }

  async stop() {
    try {
      if (this.sock) {
        this.sock.end(new Error('Manual session stop'));
        this.sock = null;
      }
      this.status = 'DISCONNECTED';
      this.qrCodeDataUrl = null;
      this.rawQr = null;
      this.emitUpdate('session_update', this.getStatus());
      return { success: true, message: 'Session stopped' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async logout() {
    try {
      await this.stop();
      this.clearAuthFiles();
      return { success: true, message: 'Logged out and credentials cleared' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  async sendText(chatId, text) {
    if (!this.sock || this.status !== 'CONNECTED') {
      return { success: false, error: 'WhatsApp is not connected. Please scan QR Code first.' };
    }

    const formattedJid = chatId.includes('@') ? chatId : `${chatId.replace(/\D/g, '')}@s.whatsapp.net`;

    try {
      const res = await this.sock.sendMessage(formattedJid, { text });
      return { success: true, messageId: res.key.id, data: res };
    } catch (err) {
      console.error(`Error sending message to ${formattedJid}:`, err);
      return { success: false, error: err.message };
    }
  }
}

export const nativeWhatsApp = new NativeWhatsAppEngine();
