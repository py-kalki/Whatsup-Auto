import { execFile } from 'child_process';
import { promisify } from 'util';
import { storage } from './storage.js';

const execFileAsync = promisify(execFile);

class AIEngine {
  constructor() {
    // In-memory conversation history: chatId -> Array<{ role: 'user'|'model'|'assistant', text: string, time: number }>
    this.chatHistories = new Map();
    this.MAX_HISTORY = 10;
  }

  getHistory(chatId) {
    if (!this.chatHistories.has(chatId)) {
      this.chatHistories.set(chatId, []);
    }
    return this.chatHistories.get(chatId);
  }

  addHistoryMessage(chatId, role, text) {
    const history = this.getHistory(chatId);
    history.push({ role, text, time: Date.now() });
    if (history.length > this.MAX_HISTORY * 2) {
      this.chatHistories.set(chatId, history.slice(-this.MAX_HISTORY * 2));
    }
  }

  clearHistory(chatId) {
    this.chatHistories.delete(chatId);
  }

  buildSystemInstruction(settings) {
    const profile = storage.getProfile();
    const adminName = profile.adminName || 'Admin';
    const businessName = profile.businessName || 'Our Business';
    const role = profile.role || 'Representative';
    const niche = profile.businessNiche || 'Professional Services';
    const tone = profile.personaTone || 'Professional, courteous, and highly knowledgeable';
    const hours = profile.operatingHours || 'Standard Business Hours';
    const phone = profile.contactPhone || '';
    const email = profile.supportEmail || '';
    const website = profile.websiteUrl || '';
    const signature = profile.customSignature || `Best regards, ${adminName} | ${businessName}`;
    const about = profile.aboutBusiness || '';
    
    // Check if customPrompt or knowledgeBase has old hardcoded default text or if it is personalized
    let customPrompt = (settings.aiSystemPrompt || '').trim();
    if (!customPrompt) {
      customPrompt = `You are a helpful, professional, and courteous WhatsApp AI Assistant customized for ${businessName}.`;
    }

    let knowledgeBase = (settings.aiKnowledgeBase || '').trim();
    // Filter out old legacy default text if it conflicts with custom profile
    if (knowledgeBase.includes('Custom Automation Services') && businessName !== 'Custom Automation Services') {
      knowledgeBase = '';
    }

    // If no custom knowledge base, auto-build context from active business profile
    if (!knowledgeBase) {
      const kbLines = [
        `Business Name: ${businessName}`,
        `Owner / Admin: ${adminName} (${role})`,
        `Industry / Niche: ${niche}`,
        `Operating Hours: ${hours}`,
      ];
      if (about) kbLines.push(`About & Offerings: ${about}`);
      if (phone) kbLines.push(`Phone / WhatsApp: ${phone}`);
      if (email) kbLines.push(`Support Email: ${email}`);
      if (website) kbLines.push(`Official Website: ${website}`);
      knowledgeBase = kbLines.join('\n');
    }

    return `You are the official WhatsApp AI Business Assistant representing "${businessName}".
Admin & Owner: ${adminName} (${role})
Industry & Niche: ${niche}
Operating Hours: ${hours}
${email ? `Support Email: ${email}` : ''}
${phone ? `Business Phone: ${phone}` : ''}
${website ? `Official Website: ${website}` : ''}

PERSONA & TONE OF VOICE:
- Tone: ${tone}
- Embody the persona of ${businessName} and ${adminName} at all times.
- Be proactive, warm, and helpful with customer questions about products, services, quotes, and support.
- When concluding formal replies or full answers, sign off with: "${signature}"

ABOUT THE BUSINESS & OFFERINGS:
${about || `${businessName} provides high-quality services in the ${niche} industry.`}

CUSTOM SYSTEM GUIDELINES:
${customPrompt}

KNOWLEDGE BASE & REFERENCE CONTEXT:
${knowledgeBase}

WHATSAPP CONVERSATIONAL RULES:
1. Format specifically for WhatsApp: use *bold* for emphasis, _italic_ for subtle notes, and clean bullet points.
2. Keep responses natural, conversational, concise, and helpful (under 140 words unless comprehensive detail is requested).
3. If a customer inquires about getting a quote or consultation, guide them to type /quote or /lead.
4. If you don't know a specific detail, politely offer to connect them with ${adminName} via /human.`;
  }

  /**
   * Antigravity CLI Inbuilt AI Engine
   * Executes the local `agy --print` model non-interactively with zero external API keys or Ollama needed.
   */
  async generateAntigravityResponse(userMessage, chatId, settings) {
    const systemInstruction = this.buildSystemInstruction(settings);
    const history = this.getHistory(chatId);

    // Build multi-turn context
    let historyContext = '';
    if (history.length > 0) {
      historyContext = history
        .map((item) => `${item.role === 'user' ? 'Customer' : 'Assistant'}: ${item.text}`)
        .join('\n');
    }

    const prompt = `System Instructions:
${systemInstruction}

${historyContext ? `Previous Conversation History:\n${historyContext}\n` : ''}
Customer Message:
"${userMessage}"

Generate a direct WhatsApp response from the Assistant.
Formatting rules:
- Use WhatsApp markdown (*bold*, _italic_, bullet points).
- Keep it concise, helpful, and natural (under 140 words).
- Do not prefix the reply with "Assistant:" or "Bot:". Start directly with the response message.`;

    try {
      const { stdout } = await execFileAsync('agy', ['--print', prompt, '--disable-slash-commands'], {
        timeout: 28000,
        maxBuffer: 1024 * 1024,
      });

      const replyText = stdout ? stdout.trim() : '';

      if (!replyText) {
        throw new Error('Empty response from Antigravity AI Engine');
      }

      // Record in history
      this.addHistoryMessage(chatId, 'user', userMessage);
      this.addHistoryMessage(chatId, 'assistant', replyText);

      return {
        success: true,
        reply: replyText,
        modelUsed: 'Antigravity Inbuilt AI (agy)',
      };
    } catch (err) {
      console.error('Antigravity Inbuilt AI Error:', err.message);
      const profile = storage.getProfile();
      const bName = profile.businessName || 'our team';
      const aName = profile.adminName || 'a team representative';
      // Fallback
      return {
        success: false,
        error: err.message,
        reply: `🤖 *${profile.businessName || 'Assistant'}*: Hello! I received your message for ${bName}. You can type */help* to view options, */quote* or */lead* to leave your inquiry, or */human* to speak directly with ${aName}.`,
      };
    }
  }

  async generateGeminiResponse(userMessage, chatId, settings) {
    const apiKey = settings.geminiApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: 'Gemini API key is not configured in Settings.',
        reply: `🤖 *AI Assistant Note*: I received your message, but the Gemini API Key is not configured yet. You can switch to *Antigravity Inbuilt AI* (Zero API Key needed) in your dashboard under *AI Brain* settings!`,
      };
    }

    const model = settings.geminiModel || 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const systemInstruction = this.buildSystemInstruction(settings);
    const history = this.getHistory(chatId);

    // Build Gemini contents array
    const contents = [];
    
    // Add previous history
    for (const item of history) {
      contents.push({
        role: item.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: item.text }],
      });
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    const payload = {
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!replyText) {
        throw new Error('Empty response from Gemini');
      }

      // Record in history
      this.addHistoryMessage(chatId, 'user', userMessage);
      this.addHistoryMessage(chatId, 'model', replyText);

      return {
        success: true,
        reply: replyText.trim(),
        modelUsed: model,
      };
    } catch (err) {
      console.error('Gemini API Error:', err);
      const profile = storage.getProfile();
      return {
        success: false,
        error: err.message,
        reply: `🤖 *${profile.businessName || 'Assistant'}*: I'm currently unable to process your request. You can type */help* to see quick options, */quote* to leave a request, or */human* to speak with ${profile.adminName || 'our team'}.`,
      };
    }
  }

  async generateOpenAIResponse(userMessage, chatId, settings) {
    const apiKey = settings.openaiApiKey || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: 'OpenAI API key is not configured in Settings.',
        reply: `🤖 *AI Assistant Note*: OpenAI API Key is not configured yet. You can switch to *Antigravity Inbuilt AI* (Zero API Key needed) in your dashboard under *AI Brain* settings!`,
      };
    }

    const model = settings.openaiModel || 'gpt-4o-mini';
    const url = 'https://api.openai.com/v1/chat/completions';

    const systemInstruction = this.buildSystemInstruction(settings);
    const history = this.getHistory(chatId);

    const messages = [
      { role: 'system', content: systemInstruction },
    ];

    for (const item of history) {
      messages.push({
        role: item.role === 'model' ? 'assistant' : item.role,
        content: item.text,
      });
    }

    messages.push({ role: 'user', content: userMessage });

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 800,
        }),
        signal: AbortSignal.timeout(20000),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const replyText = data.choices?.[0]?.message?.content;

      if (!replyText) {
        throw new Error('Empty response from OpenAI');
      }

      // Record in history
      this.addHistoryMessage(chatId, 'user', userMessage);
      this.addHistoryMessage(chatId, 'assistant', replyText);

      return {
        success: true,
        reply: replyText.trim(),
        modelUsed: model,
      };
    } catch (err) {
      console.error('OpenAI API Error:', err);
      const profile = storage.getProfile();
      return {
        success: false,
        error: err.message,
        reply: `🤖 *${profile.businessName || 'Assistant'}*: I'm currently experiencing a connection hiccup. Type */help* to view menu options or */human* to speak to ${profile.adminName || 'a team member'}.`,
      };
    }
  }

  async generateResponse(userMessage, chatId) {
    const settings = storage.getSettings();
    const provider = settings.aiProvider || 'antigravity';

    if (provider === 'disabled') {
      const profile = storage.getProfile();
      return {
        success: false,
        reply: `🤖 *${profile.businessName || 'Assistant'}*: Thank you for reaching out! Type */help* or */menu* to view what I can do!`,
      };
    }

    if (provider === 'openai') {
      return this.generateOpenAIResponse(userMessage, chatId, settings);
    }

    if (provider === 'gemini') {
      return this.generateGeminiResponse(userMessage, chatId, settings);
    }

    // Default to Antigravity CLI Inbuilt AI (Zero API / Zero Ollama)
    return this.generateAntigravityResponse(userMessage, chatId, settings);
  }
}

export const aiEngine = new AIEngine();
