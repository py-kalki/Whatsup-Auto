import { storage } from './storage.js';

export class OpenWAClient {
  constructor() {
    this.sessionStatus = 'UNKNOWN'; // 'CONNECTED' | 'SCAN_QR_CODE' | 'DISCONNECTED' | 'ERROR'
    this.lastQr = null;
  }

  getConfig() {
    const settings = storage.getSettings();
    return {
      baseUrl: (settings.openwaBaseUrl || 'http://localhost:2785').replace(/\/+$/, ''),
      apiKey: settings.openwaApiKey || 'default-secret-key-change-me',
      sessionId: settings.sessionId || 'default',
    };
  }

  async request(endpoint, options = {}) {
    const { baseUrl, apiKey } = this.getConfig();
    const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
      ...(options.headers || {}),
    };

    const fetchOptions = {
      method: options.method || 'GET',
      headers,
      signal: AbortSignal.timeout(options.timeout || 15000),
    };

    if (options.body && options.method !== 'GET') {
      fetchOptions.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
    }

    try {
      const res = await fetch(url, fetchOptions);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          error: data.message || `HTTP ${res.status} ${res.statusText}`,
          data,
        };
      }
      return { success: true, status: res.status, data };
    } catch (err) {
      return {
        success: false,
        error: err.name === 'TimeoutError' ? 'Request timed out' : err.message,
        connectionRefused: err.message.includes('fetch failed') || err.message.includes('ECONNREFUSED'),
      };
    }
  }

  async checkHealth() {
    const res = await this.request('/api/health');
    return res;
  }

  async listSessions() {
    return this.request('/api/sessions');
  }

  async getSessionStatus() {
    const { sessionId } = this.getConfig();
    const res = await this.request(`/api/sessions/${encodeURIComponent(sessionId)}`);
    if (res.success && res.data) {
      this.sessionStatus = res.data.status || 'UNKNOWN';
      this.lastQr = res.data.qrCode || res.data.qr || null;
    }
    return res;
  }

  async startSession() {
    const { sessionId } = this.getConfig();
    return this.request(`/api/sessions/${encodeURIComponent(sessionId)}/start`, { method: 'POST' });
  }

  async stopSession() {
    const { sessionId } = this.getConfig();
    return this.request(`/api/sessions/${encodeURIComponent(sessionId)}/stop`, { method: 'POST' });
  }

  async getQrCode() {
    const { sessionId } = this.getConfig();
    const res = await this.request(`/api/sessions/${encodeURIComponent(sessionId)}/qr`);
    if (res.success && res.data?.qr) {
      this.lastQr = res.data.qr;
    }
    return res;
  }

  async sendText(chatId, text) {
    const { sessionId } = this.getConfig();
    // Normalize chatId format
    const formattedChatId = chatId.includes('@') ? chatId : `${chatId.replace(/\D/g, '')}@c.us`;
    
    return this.request(`/api/sessions/${encodeURIComponent(sessionId)}/messages/send-text`, {
      method: 'POST',
      body: {
        chatId: formattedChatId,
        text,
      },
    });
  }

  async reactMessage(chatId, messageId, reaction) {
    const { sessionId } = this.getConfig();
    const formattedChatId = chatId.includes('@') ? chatId : `${chatId.replace(/\D/g, '')}@c.us`;
    return this.request(`/api/sessions/${encodeURIComponent(sessionId)}/messages/react`, {
      method: 'POST',
      body: {
        chatId: formattedChatId,
        messageId,
        reaction,
      },
    });
  }

  async rejectCall(callId) {
    const { sessionId } = this.getConfig();
    return this.request(`/api/sessions/${encodeURIComponent(sessionId)}/calls/${encodeURIComponent(callId)}/reject`, {
      method: 'POST',
    });
  }

  async registerWebhook(webhookUrl) {
    const { sessionId } = this.getConfig();
    // Check existing webhooks
    const existing = await this.request(`/api/sessions/${encodeURIComponent(sessionId)}/webhooks`);
    if (existing.success && Array.isArray(existing.data)) {
      const found = existing.data.find((w) => w.url === webhookUrl);
      if (found) return { success: true, message: 'Webhook already registered', webhook: found };
    }

    return this.request(`/api/sessions/${encodeURIComponent(sessionId)}/webhooks`, {
      method: 'POST',
      body: {
        url: webhookUrl,
        events: ['message.received', 'call.received', 'session.status', 'session.qr'],
        enabled: true,
      },
    });
  }
}

export const openwa = new OpenWAClient();
