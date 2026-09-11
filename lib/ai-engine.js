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
    const businessName = profile.businessName || 'WhatsApp Automation Suite';
    const role = profile.role || 'Business Owner & Automation Specialist';
    const niche = profile.businessNiche || 'WhatsApp Automation & Customer Messaging';
    const tone = profile.personaTone || 'Professional, friendly, helpful, and high-converting';
    const hours = profile.operatingHours || 'Monday – Saturday (9:00 AM – 7:00 PM)';
    const phone = profile.contactPhone || '';
    const email = profile.supportEmail || '';
    const website = profile.websiteUrl || '';
    const signature = profile.customSignature || `Best regards, ${adminName} | ${businessName}`;
    const about = profile.aboutBusiness || '';
    const customPrompt = settings.aiSystemPrompt || 'You are a helpful WhatsApp AI Assistant.';
    const knowledgeBase = settings.aiKnowledgeBase || '';

    return `You are the official WhatsApp AI Business Assistant representing "${businessName}".
Admin & Owner: ${adminName} (${role})
Industry & Niche: ${niche}
Operating Hours: ${hours}
Support Contact: ${email || phone || 'Available on request'}
${website ? `Official Website: ${website}` : ''}

PERSONA & TONE OF VOICE:
- Tone: ${tone}
- Represent ${businessName} and ${adminName} with authority, warmth, and precision.
- Be proactive in assisting customers with questions about services, quotes, and support.
- When closing or providing guidance, sign off with: "${signature}"

ABOUT THE BUSINESS & OFFERINGS:
${about}

CUSTOM SYSTEM INSTRUCTIONS:
${customPrompt}

KNOWLEDGE BASE & REFERENCE CONTEXT:
${knowledgeBase}

WHATSAPP FORMATTING GUIDELINES:
1. Format for WhatsApp: use *bold* for emphasis, _italic_ for subtle notes, and clean bullet points.
2. Keep responses brief, friendly, and actionable (under 140 words unless detail is requested).
3. If a user wants a quote or to leave details, guide them to type /quote or /lead.
4. If you don't know the answer, politely offer to connect them with ${adminName} via /human.`;
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
      // Fallback
      return {
        success: false,
        error: err.message,
        reply: `🤖 *Assistant*: Hello! I received your message. Type */services* to view what we offer, */quote* for an estimate, or */human* to connect directly with our team.`,
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
      return {
        success: false,
        error: err.message,
        reply: `🤖 *AI Assistant*: I'm currently unable to process your request. You can type */help* to see quick options or */human* to speak with someone.`,
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
      return {
        success: false,
        error: err.message,
        reply: `🤖 *AI Assistant*: I'm currently experiencing a connection hiccup. Type */help* to view menu options or */human* to speak to a team member.`,
      };
    }
  }

  async generateResponse(userMessage, chatId) {
    const settings = storage.getSettings();
    const provider = settings.aiProvider || 'antigravity';

    if (provider === 'disabled') {
      return {
        success: false,
        reply: `🤖 *Assistant*: I didn't recognize that command. Type */help* or */menu* to view what I can do!`,
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
