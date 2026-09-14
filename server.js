import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { storage } from './lib/storage.js';
import { openwa } from './lib/openwa-client.js';
import { nativeWhatsApp } from './lib/native-wa-engine.js';
import { ruleEngine } from './lib/rule-engine.js';
import { aiEngine } from './lib/ai-engine.js';
import { flowEngine } from './lib/flow-engine.js';
import { campaignEngine } from './lib/campaign-engine.js';
import { callEngine } from './lib/call-engine.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/landing', express.static(path.join(__dirname, 'landing')));

// Redirect help and docs to live documentation site
app.get(['/help', '/docs', '/landing/help.html'], (req, res) => {
  res.redirect(302, 'https://whatsauto.vedanshh.dev/help');
});

// ── Real-time WebSocket Broadcast ──────────────────────────────────────────
function broadcastWs(type, data) {
  const payload = JSON.stringify({ type, data, timestamp: new Date().toISOString() });
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}

// Connect native engine to WebSocket broadcaster
nativeWhatsApp.setBroadcaster(broadcastWs);

wss.on('connection', (ws) => {
  ws.send(
    JSON.stringify({
      type: 'connected',
      message: 'Connected to WhatsApp Automation Hub',
      sessionStatus: nativeWhatsApp.getStatus(),
    })
  );
});

// ── Webhook: Incoming OpenWA Events ───────────────────────────────────────
app.post('/webhook/openwa', async (req, res) => {
  res.status(200).json({ received: true });

  const event = req.body;
  const eventType = event.event || event.type;
  const data = event.data || event.payload || event;

  storage.addLog({
    event: 'webhook_received',
    eventType,
    summary: typeof data === 'object' ? JSON.stringify(data).substring(0, 120) : String(data),
  });
  broadcastWs('webhook_event', { eventType, data });

  try {
    // 1. Handle Incoming WhatsApp Message
    if (eventType === 'message.received' || eventType === 'message.create' || eventType === 'message') {
      const message = data.message || data;
      if (message.fromMe) return;

      const chatId = message.from || message.chatId || message.sender;
      const text = message.body || message.text || (typeof message.content === 'string' ? message.content : '');
      const senderName = message._data?.notifyName || message.pushName || message.senderName || 'Friend';
      const messageId = message.id?._serialized || message.id || message.messageId;

      if (!chatId || !text) return;

      storage.addLog({
        event: 'incoming_message',
        chatId,
        senderName,
        text,
      });
      broadcastWs('incoming_message', { chatId, senderName, text, timestamp: new Date().toISOString() });

      const result = await ruleEngine.processIncomingMessage({
        chatId,
        text,
        senderName,
        messageId,
      });

      if (result && result.replyText) {
        let sendResult = await openwa.sendText(chatId, result.replyText);
        if (!sendResult.success && nativeWhatsApp.status === 'CONNECTED') {
          sendResult = await nativeWhatsApp.sendText(chatId, result.replyText);
        }

        if (result.alertAdmin) {
          await openwa.sendText(result.alertAdmin.target, result.alertAdmin.text).catch(() => {});
        }

        storage.addLog({
          event: 'automation_replied',
          chatId,
          type: result.type,
          matchedRule: result.matchedRule?.name,
          replyText: result.replyText,
          deliverySuccess: sendResult.success,
        });

        broadcastWs('automation_reply', {
          chatId,
          type: result.type,
          matchedRule: result.matchedRule?.name,
          replyText: result.replyText,
          success: sendResult.success,
        });
      }
    }

    // 2. Handle Calls
    if (eventType === 'call.received' || eventType === 'call') {
      const callData = {
        callId: data.id || data.callId,
        from: data.from || data.caller,
        isVideo: data.isVideo,
        isGroup: data.isGroup,
      };
      await callEngine.handleIncomingCall(callData);
      broadcastWs('call_rejected', callData);
    }
  } catch (err) {
    console.error('Error handling webhook:', err);
    storage.addLog({ event: 'webhook_error', error: err.message });
  }
});

// ── REST API Endpoints ────────────────────────────────────────────────────

// Status & Health (100% Real Database Calculations)
app.get('/api/status', async (req, res) => {
  const settings = storage.getSettings();
  const rules = storage.getRules();
  const leads = storage.getLeads();
  const campaigns = storage.getCampaigns();
  const contacts = storage.getContacts();
  const logs = storage.getLogs(500);

  const nativeStatus = nativeWhatsApp.getStatus();
  const openwaHealth = await openwa.checkHealth();
  const openwaStatus = await openwa.getSessionStatus();

  const activeStatus = nativeStatus.connected
    ? 'CONNECTED'
    : nativeStatus.status === 'SCAN_QR_CODE'
    ? 'SCAN_QR_CODE'
    : openwaStatus.data?.status || nativeStatus.status;

  const qrCode = nativeStatus.qrCode || openwaStatus.data?.qrCode || openwa.lastQr || null;

  // Real WhatsApp message events from database
  const messageEvents = logs.filter(
    (l) =>
      l.event === 'incoming_message' ||
      l.event === 'automation_replied' ||
      l.event === 'direct_send' ||
      l.event === 'simulator_test' ||
      l.event?.includes('message') ||
      l.event?.includes('reply')
  );

  const totalMessages = messageEvents.length;
  const failedEvents = logs.filter((l) => l.event?.includes('error') || l.event?.includes('failed')).length;
  const deliveryRate = totalMessages > 0 ? Math.max(0, Math.round(((totalMessages - failedEvents) / totalMessages) * 100)) : 100;

  // Real monthly message traffic from log timestamps
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthCounts = {};
  months.forEach((m) => (monthCounts[m] = 0));

  messageEvents.forEach((l) => {
    if (l.timestamp) {
      const d = new Date(l.timestamp);
      if (!isNaN(d.getTime())) {
        const mName = months[d.getMonth()];
        monthCounts[mName] = (monthCounts[mName] || 0) + 1;
      }
    }
  });

  // Real recent dispatches list from logs (up to 250 events)
  const recentDispatches = logs
    .filter((l) => l.chatId || l.text || l.replyText || l.senderName || l.event?.includes('message') || l.event?.includes('reply'))
    .slice(0, 250)
    .map((l) => {
      const isFailed = l.event?.includes('error') || l.deliverySuccess === false || l.success === false;
      const contact = l.senderName || (l.chatId ? l.chatId.replace(/@.+/, '') : 'WhatsApp User');
      const messageContent = l.replyText || l.text || l.summary || l.event || '';
      return {
        id: l.id || `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        contactName: contact,
        chatId: l.chatId || 'Direct / Broadcast',
        message: messageContent,
        rule: l.matchedRule || l.type || (l.event === 'direct_send' ? 'Direct Send' : l.event === 'simulator_test' ? 'Simulator Test' : 'Auto Response'),
        status: isFailed ? 'Failed' : 'Delivered',
        timestamp: l.timestamp || new Date().toISOString(),
        eventType: l.event || 'message',
        direction: l.event === 'incoming_message' ? 'Incoming' : 'Outbound',
      };
    });

  res.json({
    serverOnline: true,
    engineType: nativeStatus.connected ? 'Native WhatsApp (Baileys)' : openwaHealth.success ? 'OpenWA Gateway' : 'Ready (Zero-Config)',
    session: {
      status: activeStatus,
      qrCode,
      nativeConnected: nativeStatus.connected,
      openwaConnected: openwaHealth.success,
    },
    counts: {
      totalMessages,
      rules: rules.length,
      activeRules: rules.filter((r) => r.enabled).length,
      leads: leads.length,
      campaigns: campaigns.length,
      contacts: contacts.length,
      deliveryRate,
      monthCounts,
    },
    recentDispatches,
    profile: storage.getProfile(),
    ai: {
      provider: settings.aiProvider || 'antigravity',
      antigravityConfigured: true,
      geminiConfigured: !!(settings.geminiApiKey || process.env.GEMINI_API_KEY),
      openaiConfigured: !!(settings.openaiApiKey || process.env.OPENAI_API_KEY),
    },
  });
});

// Start Session (Pure JS Native Baileys Engine + OpenWA)
app.post('/api/session/start', async (req, res) => {
  const forceReset = req.body?.forceReset === true;
  console.log(`[API] Starting WhatsApp session (forceReset: ${forceReset})...`);
  storage.addLog({ event: 'session_start_requested', forceReset });

  // Initialize Native Engine
  const nativeRes = await nativeWhatsApp.start(forceReset);

  // If OpenWA is also running, start there too
  openwa.startSession().catch(() => {});

  res.json({
    success: true,
    message: 'WhatsApp Session initialization started! Generating QR Code...',
    session: nativeWhatsApp.getStatus(),
    native: nativeRes,
  });
});

// Stop Session
app.post('/api/session/stop', async (req, res) => {
  console.log('[API] Stopping WhatsApp session...');
  const stopNative = await nativeWhatsApp.stop();
  await openwa.stopSession().catch(() => {});
  res.json({ success: true, message: 'Session stopped', stopNative });
});

// Force Reset Session
app.post('/api/session/reset', async (req, res) => {
  console.log('[API] Resetting WhatsApp session and clearing auth files...');
  await nativeWhatsApp.logout();
  const nativeRes = await nativeWhatsApp.start(true);
  res.json({ success: true, message: 'Session reset. Generating fresh QR Code...', native: nativeRes });
});

// Get QR Code
app.get('/api/session/qr', async (req, res) => {
  const nativeStatus = nativeWhatsApp.getStatus();
  if (nativeStatus.qrCode) {
    return res.json({ success: true, qr: nativeStatus.qrCode, status: nativeStatus.status });
  }

  // If currently disconnected, kick off start in background
  if (nativeWhatsApp.status === 'DISCONNECTED') {
    nativeWhatsApp.start(true).catch(() => {});
  }

  const openwaQr = await openwa.getQrCode();
  if (openwaQr.success && openwaQr.data?.qr) {
    return res.json(openwaQr);
  }

  res.json({
    success: !!nativeStatus.qrCode,
    qr: nativeStatus.qrCode,
    status: nativeStatus.status,
    message: nativeStatus.status === 'INITIALIZING' ? 'Generating QR Code...' : 'Click Start Session to generate QR',
  });
});

// Auto-Register Webhook
app.post('/api/session/setup-webhook', async (req, res) => {
  const webhookUrl = req.body.webhookUrl || `http://localhost:${PORT}/webhook/openwa`;
  const registerRes = await openwa.registerWebhook(webhookUrl);
  res.json(registerRes);
});

// Direct Send message
app.post('/api/send-direct', async (req, res) => {
  const { chatId, text } = req.body;
  if (!chatId || !text) return res.status(400).json({ error: 'Missing chatId or text' });

  let sendResult = { success: false };

  if (nativeWhatsApp.status === 'CONNECTED') {
    sendResult = await nativeWhatsApp.sendText(chatId, text);
  } else {
    sendResult = await openwa.sendText(chatId, text);
  }

  storage.addLog({
    event: 'direct_send',
    chatId,
    text,
    success: sendResult.success,
    error: sendResult.error,
  });
  res.json(sendResult);
});

// Rules CRUD
app.get('/api/rules', (req, res) => {
  res.json(storage.getRules());
});

app.post('/api/rules', (req, res) => {
  const rules = storage.getRules();
  const newRule = {
    id: `rule-${Date.now()}`,
    name: req.body.name || 'New Custom Rule',
    triggerType: req.body.triggerType || 'exact_or_command',
    keywords: Array.isArray(req.body.keywords)
      ? req.body.keywords
      : (req.body.keywords || '').split(',').map((k) => k.trim()).filter(Boolean),
    responseType: req.body.responseType || 'text',
    replyText: req.body.replyText || '',
    reactionEmoji: req.body.reactionEmoji || '',
    priority: Number(req.body.priority) || 5,
    enabled: req.body.enabled !== false,
  };
  rules.push(newRule);
  storage.saveRules(rules);
  res.json({ success: true, rule: newRule });
});

app.put('/api/rules/:id', (req, res) => {
  const rules = storage.getRules();
  const index = rules.findIndex((r) => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Rule not found' });

  rules[index] = {
    ...rules[index],
    ...req.body,
    keywords: Array.isArray(req.body.keywords)
      ? req.body.keywords
      : (req.body.keywords || '').split(',').map((k) => k.trim()).filter(Boolean),
  };
  storage.saveRules(rules);
  res.json({ success: true, rule: rules[index] });
});

app.delete('/api/rules/:id', (req, res) => {
  let rules = storage.getRules();
  rules = rules.filter((r) => r.id !== req.params.id);
  storage.saveRules(rules);
  res.json({ success: true });
});

// Flows
app.get('/api/flows', (req, res) => {
  res.json(storage.getFlows());
});

// Leads
app.get('/api/leads', (req, res) => {
  res.json(storage.getLeads());
});

app.delete('/api/leads/:id', (req, res) => {
  let leads = storage.getLeads();
  leads = leads.filter((l) => l.id !== req.params.id);
  storage.saveLeads(leads);
  res.json({ success: true });
});

app.get('/api/leads/export', (req, res) => {
  const leads = storage.getLeads();
  let csv = 'ID,Date,ChatId,FlowName,CollectedData\n';
  leads.forEach((l) => {
    const dataClean = JSON.stringify(l.data || {}).replace(/"/g, '""');
    csv += `"${l.id}","${l.createdAt}","${l.chatId}","${l.flowName || ''}","${dataClean}"\n`;
  });
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="whatsapp-leads.csv"');
  res.send(csv);
});

// Contacts
app.get('/api/contacts', (req, res) => {
  res.json(storage.getContacts());
});

app.post('/api/contacts', (req, res) => {
  const contacts = storage.getContacts();
  const phone = (req.body.phone || '').replace(/\D/g, '');
  const newContact = {
    id: `contact-${Date.now()}`,
    name: req.body.name || 'New Contact',
    phone,
    chatId: phone ? `${phone}@s.whatsapp.net` : '',
    tags: Array.isArray(req.body.tags)
      ? req.body.tags
      : (req.body.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
    notes: req.body.notes || '',
    createdAt: new Date().toISOString(),
  };
  contacts.push(newContact);
  storage.saveContacts(contacts);
  res.json({ success: true, contact: newContact });
});

app.delete('/api/contacts/:id', (req, res) => {
  let contacts = storage.getContacts();
  contacts = contacts.filter((c) => c.id !== req.params.id);
  storage.saveContacts(contacts);
  res.json({ success: true });
});

// Campaigns
app.get('/api/campaigns', (req, res) => {
  res.json(storage.getCampaigns());
});

app.post('/api/campaigns', (req, res) => {
  const campaigns = storage.getCampaigns();
  const newCampaign = {
    id: `campaign-${Date.now()}`,
    name: req.body.name || 'Broadcast Campaign',
    messageTemplate: req.body.messageTemplate || '',
    targetType: req.body.targetType || 'all',
    targetTags: req.body.targetTags || [],
    targetContactIds: req.body.targetContactIds || [],
    scheduleType: req.body.scheduleType || 'manual',
    cronExpression: req.body.cronExpression || '',
    status: req.body.scheduleType === 'cron' ? 'scheduled' : 'draft',
    createdAt: new Date().toISOString(),
    stats: { total: 0, sent: 0, failed: 0, skipped: 0 },
  };
  campaigns.unshift(newCampaign);
  storage.saveCampaigns(campaigns);
  res.json({ success: true, campaign: newCampaign });
});

app.post('/api/campaigns/:id/run', async (req, res) => {
  res.json({ success: true, message: 'Campaign execution started in background' });
  campaignEngine.runCampaign(req.params.id, (stats) => {
    broadcastWs('campaign_progress', { campaignId: req.params.id, stats });
  });
});

app.delete('/api/campaigns/:id', (req, res) => {
  let campaigns = storage.getCampaigns();
  campaigns = campaigns.filter((c) => c.id !== req.params.id);
  storage.saveCampaigns(campaigns);
  res.json({ success: true });
});

// Admin Profile & Business Persona
app.get('/api/profile', (req, res) => {
  res.json(storage.getProfile());
});

app.put('/api/profile', (req, res) => {
  const updated = storage.saveProfile(req.body);

  // Auto-clean/sync AI settings if they still have legacy default text
  const settings = storage.getSettings();
  let needSettingsSave = false;
  const updatedSettings = { ...settings };

  if (
    !settings.aiKnowledgeBase ||
    (settings.aiKnowledgeBase.includes('Custom Automation Services') && updated.businessName !== 'Custom Automation Services')
  ) {
    const kbLines = [
      `Business Name: ${updated.businessName || 'Our Business'}`,
      `Owner / Admin: ${updated.adminName || 'Admin'} (${updated.role || 'Representative'})`,
      `Industry / Niche: ${updated.businessNiche || 'Professional Services'}`,
      `Operating Hours: ${updated.operatingHours || 'Standard Business Hours'}`,
    ];
    if (updated.aboutBusiness) kbLines.push(`About & Offerings: ${updated.aboutBusiness}`);
    if (updated.contactPhone) kbLines.push(`Phone / WhatsApp: ${updated.contactPhone}`);
    if (updated.supportEmail) kbLines.push(`Support Email: ${updated.supportEmail}`);
    if (updated.websiteUrl) kbLines.push(`Official Website: ${updated.websiteUrl}`);
    updatedSettings.aiKnowledgeBase = kbLines.join('\n');
    needSettingsSave = true;
  }

  if (needSettingsSave) {
    storage.saveSettings(updatedSettings);
  }

  res.json({ success: true, profile: updated, settingsSynced: needSettingsSave });
});

// Explicit endpoint to sync AI settings with Profile on demand
app.post('/api/profile/sync-ai', (req, res) => {
  const profile = storage.getProfile();

  const kbLines = [
    `Business Name: ${profile.businessName || 'Our Business'}`,
    `Owner / Admin: ${profile.adminName || 'Admin'} (${profile.role || 'Representative'})`,
    `Industry / Niche: ${profile.businessNiche || 'Professional Services'}`,
    `Operating Hours: ${profile.operatingHours || 'Standard Business Hours'}`,
  ];
  if (profile.aboutBusiness) kbLines.push(`About & Offerings: ${profile.aboutBusiness}`);
  if (profile.contactPhone) kbLines.push(`Phone / WhatsApp: ${profile.contactPhone}`);
  if (profile.supportEmail) kbLines.push(`Support Email: ${profile.supportEmail}`);
  if (profile.websiteUrl) kbLines.push(`Official Website: ${profile.websiteUrl}`);

  const updatedSettings = storage.saveSettings({
    aiSystemPrompt: `You are the official WhatsApp AI Business Assistant representing "${profile.businessName || 'Our Business'}".\nAdmin & Owner: ${profile.adminName || 'Admin'} (${profile.role || 'Owner'}).\nTone of voice: ${profile.personaTone || 'Professional and helpful'}.\nProvide clear, courteous, and concise responses suited for WhatsApp chats.\nIf a user wants a quote or to leave details, guide them to type /quote or /lead.\nWhen concluding formal answers, sign off with: "${profile.customSignature || `Best regards, ${profile.adminName}`}".`,
    aiKnowledgeBase: kbLines.join('\n'),
  });

  res.json({ success: true, settings: updatedSettings });
});

// Settings
app.get('/api/settings', (req, res) => {
  res.json(storage.getSettings());
});

app.put('/api/settings', (req, res) => {
  const updated = storage.saveSettings(req.body);
  res.json({ success: true, settings: updated });
});

// Logs
app.get('/api/logs', (req, res) => {
  res.json(storage.getLogs(150));
});

// Interactive Simulator
app.post('/api/test-simulate', async (req, res) => {
  const { text, senderName, chatId } = req.body;
  const mockChatId = chatId || 'test-user-simulator@s.whatsapp.net';
  const mockSenderName = senderName || 'Simulator Tester';

  const startTime = Date.now();
  const processResult = await ruleEngine.processIncomingMessage({
    chatId: mockChatId,
    text: text || '',
    senderName: mockSenderName,
    messageId: `sim-${Date.now()}`,
  });

  const durationMs = Date.now() - startTime;

  storage.addLog({
    event: 'simulator_test',
    chatId: mockChatId,
    senderName: mockSenderName,
    text: text || '',
    replyText: processResult?.replyText || '',
    matchedRule: processResult?.matchedRule?.name || processResult?.type || 'AI Assistant',
    type: processResult?.type || 'direct',
  });

  res.json({
    success: true,
    input: { text, senderName: mockSenderName, chatId: mockChatId },
    durationMs,
    result: processResult,
  });
});

// Start Campaign Engine Cron Background Tasks
campaignEngine.init();

// Auto-connect WhatsApp session on startup if saved credentials exist
const authCredsPath = path.join(__dirname, 'data', 'auth_info_baileys', 'creds.json');
if (fs.existsSync(authCredsPath)) {
  console.log('[WhatsApp Engine] Saved session credentials found. Auto-reconnecting...');
  nativeWhatsApp.start(false).catch((err) => {
    console.error('[WhatsApp Engine] Auto-connect error on startup:', err.message);
  });
}

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`[WHATSAPP AUTOMATION SUITE] Running on http://localhost:${PORT}`);
  console.log(`[DASHBOARD] Web Dashboard:    http://localhost:${PORT}`);
  console.log(`[WEBHOOK]   Webhook Endpoint:  http://localhost:${PORT}/webhook/openwa`);
  console.log(`=======================================================`);
});
