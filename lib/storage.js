import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function resolveDataDir() {
  if (process.env.WHATSAUTO_DATA_DIR) {
    const customDir = process.env.WHATSAUTO_DATA_DIR;
    if (!fs.existsSync(customDir)) fs.mkdirSync(customDir, { recursive: true });
    return customDir;
  }

  // 1. Check local workspace data directory first
  const localDir = path.join(__dirname, '..', 'data');
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const testFile = path.join(localDir, '.write-test');
    fs.writeFileSync(testFile, 'ok');
    fs.unlinkSync(testFile);
    return localDir;
  } catch (e) {
    // 2. Fallback to user AppData for packaged or restricted environments
    const appDataDir = process.env.APPDATA
      ? path.join(process.env.APPDATA, 'WhatsAuto', 'data')
      : path.join(process.cwd(), 'data');
    if (!fs.existsSync(appDataDir)) {
      fs.mkdirSync(appDataDir, { recursive: true });
    }
    return appDataDir;
  }
}

const DATA_DIR = resolveDataDir();

const DEFAULT_SETTINGS = {
  openwaBaseUrl: 'http://localhost:2785',
  openwaApiKey: 'default-secret-key-change-me',
  sessionId: 'default',
  aiProvider: 'antigravity', // 'antigravity' | 'gemini' | 'openai' | 'disabled'
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: 'gemini-2.0-flash',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: 'gpt-4o-mini',
  aiSystemPrompt: `You are a helpful, professional, and friendly WhatsApp AI Assistant customized for the user.
Provide clear, courteous, and concise responses suited for WhatsApp chats.
If a user asks about services, pricing, or wants to connect, answer helpfully and suggest typing /quote or /lead to speak with our team.
Keep formatting clean using WhatsApp markdown (*bold*, _italic_, bullet points).`,
  aiKnowledgeBase: `Company / Owner Name: Custom Automation Services
Operating Hours: Mon - Fri (9:00 AM - 6:00 PM)
Services:
1. Custom WhatsApp Automation & Chatbots
2. Workflow Integrations (CRM, Sheets, Webhooks)
3. Broadcast Marketing & Customer Notifications
4. 24/7 AI Smart Support Assistant
Contact Support: support@example.com`,
  aiEnableFallback: true,
  autoCallReject: true,
  autoCallMessage: "*Automated Notice*: Hello! I am currently unable to take voice/video calls on WhatsApp. Please leave a text message here, and I will reply promptly.",
  outOfOfficeEnabled: false,
  outOfOfficeMessage: "*Out of Office*: Thanks for reaching out! We are currently outside business hours (9am - 6pm). We will respond first thing in the morning.",
  antiBanDelayMinMs: 4000,
  antiBanDelayMaxMs: 9000,
  adminAlertNumber: '', // WhatsApp number e.g. 1234567890@c.us for lead notifications
};

const DEFAULT_PROFILE = {
  adminName: 'Alex Morgan',
  businessName: 'WhatsAuto Automation Suite',
  role: 'Head of Automation & Founder',
  businessNiche: 'WhatsApp Automation, CRM & AI Chatbots',
  contactPhone: '+1 (555) 234-5678',
  supportEmail: 'support@whatsauto.local',
  websiteUrl: 'https://whatsauto.local',
  operatingHours: 'Monday – Saturday (9:00 AM – 7:00 PM)',
  personaTone: 'Professional, friendly, helpful, and high-converting',
  customSignature: 'Best regards, Alex Morgan | WhatsAuto Team',
  aboutBusiness: 'We provide 24/7 smart WhatsApp automation, AI-driven customer support, automated CRM lead capture flows, and broadcast campaigns.',
  welcomeMessageTemplate: 'Welcome to {{business_name}}! I am the automated assistant for {{admin_name}}. How can I help your business today?',
};

const DEFAULT_RULES = [
  {
    id: 'rule-help',
    name: 'Help & Main Menu',
    triggerType: 'exact_or_command', // 'exact' | 'contains' | 'regex' | 'command' | 'exact_or_command'
    keywords: ['/help', '/menu', 'menu', 'help', 'hi', 'hello', 'start'],
    responseType: 'text', // 'text' | 'flow' | 'action'
    replyText: `*Welcome to WhatsApp Automation Suite!*

Here is what I can do for you:
- */services* - View our available services
- */pricing* - Check pricing & packages
- */quote* - Get a quick custom estimate
- */lead* - Book a consultation / leave details
- */faq* - Frequently Asked Questions
- */human* - Request human agent callback
- */status* - Check gateway connection health

Type any command or simply chat with our *AI Assistant*!`,
    reactionEmoji: '',
    priority: 10,
    enabled: true,
  },
  {
    id: 'rule-services',
    name: 'Services Information',
    triggerType: 'contains',
    keywords: ['service', 'services', '/services', 'what do you do', 'features'],
    responseType: 'text',
    replyText: `*Our Core Services:*

1. *Intelligent WhatsApp Chatbots* (AI + Rule-based hybrid)
2. *Automated Broadcasts & Scheduled Campaigns* (Rate-limited, zero ban risk)
3. *Interactive Lead Capture & CRM Sync*
4. *Instant Order & Reminder Notifications*
5. *Auto-Call Handling & Smart Triage*

Ready to get started? Type */quote* or */lead* to connect!`,
    reactionEmoji: '',
    priority: 8,
    enabled: true,
  },
  {
    id: 'rule-pricing',
    name: 'Pricing & Plans',
    triggerType: 'contains',
    keywords: ['price', 'pricing', 'cost', '/pricing', 'package', 'rates'],
    responseType: 'text',
    replyText: `*Packages & Pricing:*

*Starter Tier*:
- Automated Instant Responders & Menu flows
- Keyword & Regex triggers
- Contact Tagging & CRM logging

*Pro / AI Tier*:
- Everything in Starter
- Google Gemini / OpenAI 24/7 Contextual AI
- Multi-step Lead Qualification Workflows
- Scheduled Broadcasts with Anti-Ban Jitter

Type */lead* to customize a plan tailored to your volume!`,
    reactionEmoji: '',
    priority: 8,
    enabled: true,
  },
  {
    id: 'rule-lead-flow',
    name: 'Lead Capture Flow Trigger',
    triggerType: 'exact_or_command',
    keywords: ['/lead', '/quote', 'quote', 'book', 'consultation', 'inquiry'],
    responseType: 'flow',
    flowId: 'flow-lead-capture',
    replyText: '',
    reactionEmoji: '',
    priority: 9,
    enabled: true,
  },
  {
    id: 'rule-human',
    name: 'Human Support Handover',
    triggerType: 'exact_or_command',
    keywords: ['/human', '/agent', 'human', 'talk to human', 'agent', 'support'],
    responseType: 'text',
    replyText: `*Human Agent Requested!*
Your request has been flagged for human review. One of our team members will take over this chat shortly.

_You can continue typing your specific question in the meantime._`,
    reactionEmoji: '',
    priority: 9,
    enabled: true,
  },
  {
    id: 'rule-stop',
    name: 'Opt-Out & Unsubscribe',
    triggerType: 'exact_or_command',
    keywords: ['/stop', 'stop', 'unsubscribe', 'cancel broadcast'],
    responseType: 'action',
    actionType: 'opt_out',
    replyText: `*You have been unsubscribed from promotional broadcasts.* You will still receive direct messages when you chat with us. Type /start anytime to resubscribe.`,
    reactionEmoji: '',
    priority: 10,
    enabled: true,
  },
];

const DEFAULT_FLOWS = [
  {
    id: 'flow-lead-capture',
    name: 'Lead Qualification & Consultation Flow',
    description: 'Collects customer name, service interest, and preferred contact details.',
    steps: [
      {
        id: 'step_name',
        prompt: `*Step 1 of 3*: Welcome! Let's get you set up. What is your *Full Name*?`,
        field: 'name',
      },
      {
        id: 'step_service',
        prompt: `*Step 2 of 3*: Nice to meet you, *{{name}}*! Which service or automation are you interested in?\n\n1. WhatsApp AI Chatbot\n2. Broadcast Marketing & Campaigns\n3. Custom Integration\n4. Other / General Inquiry`,
        field: 'service_interest',
      },
      {
        id: 'step_contact',
        prompt: `*Step 3 of 3*: Great choice! Please provide your *Email Address* or *Best Time for a Quick Call*.`,
        field: 'contact_info',
      },
    ],
    completionMessage: `*Thank You, {{name}}!*\n\nWe have recorded your details:\n- *Service*: {{service_interest}}\n- *Contact*: {{contact_info}}\n\nOur team will review your inquiry and reach out shortly! Have a great day!`,
    alertAdmin: true,
  },
];

const DEFAULT_CONTACTS = [];

class Storage {
  constructor() {
    this.files = {
      settings: path.join(DATA_DIR, 'settings.json'),
      profile: path.join(DATA_DIR, 'profile.json'),
      rules: path.join(DATA_DIR, 'rules.json'),
      flows: path.join(DATA_DIR, 'flows.json'),
      contacts: path.join(DATA_DIR, 'contacts.json'),
      campaigns: path.join(DATA_DIR, 'campaigns.json'),
      leads: path.join(DATA_DIR, 'leads.json'),
      logs: path.join(DATA_DIR, 'logs.json'),
      optOuts: path.join(DATA_DIR, 'opt-outs.json'),
    };
    this.init();
  }

  getDataDir() {
    return DATA_DIR;
  }

  init() {
    if (!fs.existsSync(this.files.settings)) this.writeJson(this.files.settings, DEFAULT_SETTINGS);
    if (!fs.existsSync(this.files.profile)) this.writeJson(this.files.profile, DEFAULT_PROFILE);
    if (!fs.existsSync(this.files.rules)) this.writeJson(this.files.rules, DEFAULT_RULES);
    if (!fs.existsSync(this.files.flows)) this.writeJson(this.files.flows, DEFAULT_FLOWS);
    if (!fs.existsSync(this.files.contacts)) this.writeJson(this.files.contacts, DEFAULT_CONTACTS);
    if (!fs.existsSync(this.files.campaigns)) this.writeJson(this.files.campaigns, []);
    if (!fs.existsSync(this.files.leads)) this.writeJson(this.files.leads, []);
    if (!fs.existsSync(this.files.logs)) this.writeJson(this.files.logs, []);
    if (!fs.existsSync(this.files.optOuts)) this.writeJson(this.files.optOuts, []);
  }

  readJson(filepath, fallback = []) {
    try {
      if (!fs.existsSync(filepath)) return fallback;
      const raw = fs.readFileSync(filepath, 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      console.error(`Error reading ${filepath}:`, e);
      return fallback;
    }
  }

  writeJson(filepath, data) {
    try {
      const tempPath = `${filepath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
      fs.renameSync(tempPath, filepath);
      return true;
    } catch (e) {
      console.error(`Error writing ${filepath}:`, e);
      return false;
    }
  }

  // Profile & Business Persona
  getProfile() {
    return { ...DEFAULT_PROFILE, ...this.readJson(this.files.profile, DEFAULT_PROFILE) };
  }
  saveProfile(newProfile) {
    const merged = { ...this.getProfile(), ...newProfile };
    this.writeJson(this.files.profile, merged);
    return merged;
  }

  // Settings
  getSettings() {
    return { ...DEFAULT_SETTINGS, ...this.readJson(this.files.settings, DEFAULT_SETTINGS) };
  }
  saveSettings(newSettings) {
    const merged = { ...this.getSettings(), ...newSettings };
    this.writeJson(this.files.settings, merged);
    return merged;
  }

  // Rules
  getRules() {
    return this.readJson(this.files.rules, DEFAULT_RULES);
  }
  saveRules(rules) {
    this.writeJson(this.files.rules, rules);
    return rules;
  }

  // Flows
  getFlows() {
    return this.readJson(this.files.flows, DEFAULT_FLOWS);
  }
  saveFlows(flows) {
    this.writeJson(this.files.flows, flows);
    return flows;
  }

  // Contacts
  getContacts() {
    return this.readJson(this.files.contacts, DEFAULT_CONTACTS);
  }
  saveContacts(contacts) {
    this.writeJson(this.files.contacts, contacts);
    return contacts;
  }
  addContact(contact) {
    const contacts = this.getContacts();
    const newContact = {
      id: `contact-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...contact,
    };
    contacts.push(newContact);
    this.saveContacts(contacts);
    return newContact;
  }
  deleteContact(id) {
    const contacts = this.getContacts().filter((c) => c.id !== id);
    this.saveContacts(contacts);
    return true;
  }

  // Campaigns
  getCampaigns() {
    return this.readJson(this.files.campaigns, []);
  }
  saveCampaigns(campaigns) {
    this.writeJson(this.files.campaigns, campaigns);
    return campaigns;
  }
  addCampaign(campaign) {
    const campaigns = this.getCampaigns();
    const newCamp = {
      id: `camp-${Date.now()}`,
      status: 'scheduled',
      stats: { sent: 0, failed: 0, total: 0 },
      createdAt: new Date().toISOString(),
      ...campaign,
    };
    campaigns.push(newCamp);
    this.saveCampaigns(campaigns);
    return newCamp;
  }
  updateCampaign(id, updateData) {
    const campaigns = this.getCampaigns();
    const idx = campaigns.findIndex((c) => c.id === id);
    if (idx !== -1) {
      campaigns[idx] = { ...campaigns[idx], ...updateData };
      this.saveCampaigns(campaigns);
      return campaigns[idx];
    }
    return null;
  }
  deleteCampaign(id) {
    const campaigns = this.getCampaigns().filter((c) => c.id !== id);
    this.saveCampaigns(campaigns);
    return true;
  }

  // Captured Leads
  getLeads() {
    return this.readJson(this.files.leads, []);
  }
  addLead(lead) {
    const leads = this.getLeads();
    const newLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...lead,
    };
    leads.unshift(newLead);
    this.writeJson(this.files.leads, leads);
    return newLead;
  }
  deleteLead(id) {
    const leads = this.getLeads().filter((l) => l.id !== id);
    this.writeJson(this.files.leads, leads);
    return true;
  }

  // Logs & Auditing
  getLogs(limit = 100) {
    const logs = this.readJson(this.files.logs, []);
    return logs.slice(-limit);
  }
  addLog(entry) {
    const logs = this.readJson(this.files.logs, []);
    const newEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      ...entry,
    };
    logs.push(newEntry);
    if (logs.length > 500) logs.shift();
    this.writeJson(this.files.logs, logs);
    return newEntry;
  }

  // Opt-Outs
  getOptOuts() {
    return this.readJson(this.files.optOuts, []);
  }
  addOptOut(chatId) {
    const optOuts = this.getOptOuts();
    if (!optOuts.includes(chatId)) {
      optOuts.push(chatId);
      this.writeJson(this.files.optOuts, optOuts);
    }
    return optOuts;
  }
  isOptedOut(chatId) {
    const optOuts = this.getOptOuts();
    return optOuts.includes(chatId);
  }
}

export const storage = new Storage();
