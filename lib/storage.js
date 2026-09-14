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
  aiSystemPrompt: `You are the official WhatsApp AI Business Assistant for our business.
Provide clear, courteous, and concise responses suited for WhatsApp chats.
Answer inquiries knowledgeably according to the business profile and offerings.
If a user wants a quote or to leave details, guide them to type /quote or /lead.
Keep formatting clean using WhatsApp markdown (*bold*, _italic_, bullet points).`,
  aiKnowledgeBase: '',
  aiEnableFallback: true,
  autoCallReject: true,
  autoCallMessage: "📞 *Automated Notice*: Hello! I am currently unable to take voice/video calls on WhatsApp. Please leave a text message here, and I'll reply promptly! 🙏",
  outOfOfficeEnabled: false,
  outOfOfficeMessage: "🌙 *Out of Office*: Thanks for reaching out! We are currently outside business hours. We will respond first thing in the morning!",
  antiBanDelayMinMs: 4000,
  antiBanDelayMaxMs: 9000,
  adminAlertNumber: '', // WhatsApp number e.g. 1234567890@c.us for lead notifications
};

const DEFAULT_PROFILE = {
  adminName: 'Business Owner',
  businessName: 'My Business',
  role: 'Founder & Owner',
  businessNiche: 'Professional Services',
  contactPhone: '',
  supportEmail: '',
  websiteUrl: '',
  operatingHours: 'Monday – Saturday (9:00 AM – 7:00 PM)',
  personaTone: 'Professional, friendly, helpful, and high-converting',
  customSignature: 'Best regards, Our Team',
  aboutBusiness: 'We provide top-quality services and dedicated customer support.',
  welcomeMessageTemplate: 'Welcome to {{business_name}}! I am the automated assistant for {{admin_name}}. How can I help you today?',
};

const DEFAULT_RULES = [
  {
    id: 'rule-help',
    name: 'Help & Main Menu',
    triggerType: 'exact_or_command', // 'exact' | 'contains' | 'regex' | 'command' | 'exact_or_command'
    keywords: ['/help', '/menu', 'menu', 'help'],
    responseType: 'text', // 'text' | 'flow' | 'action'
    replyText: `*Welcome to {{business_name}}!*

How can we assist you today?
- */quote* or */lead* - Request a custom quote / consultation
- */human* - Request human callback from {{admin_name}}
- */help* - Display this menu

💬 _Feel free to type your question directly—our AI assistant is here to help 24/7!_

{{signature}}`,
    reactionEmoji: '',
    priority: 10,
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
    keywords: ['/human', '/agent', 'talk to human', 'agent', 'human support'],
    responseType: 'text',
    replyText: `*Human Representative Requested!*
Your request has been forwarded to {{admin_name}} and our team. One of us will take over this chat shortly.

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
        prompt: `*Step 1 of 3*: Welcome to *{{business_name}}*! Let's get you set up. What is your *Full Name*?`,
        field: 'name',
      },
      {
        id: 'step_service',
        prompt: `*Step 2 of 3*: Nice to meet you, *{{name}}*! What specific service, product, or inquiry can we help you with today?`,
        field: 'service_interest',
      },
      {
        id: 'step_contact',
        prompt: `*Step 3 of 3*: Great! Please provide your *Email Address* or *Phone Number* (and preferred contact time) so {{admin_name}} can follow up with you.`,
        field: 'contact_info',
      },
    ],
    completionMessage: `*Thank You, {{name}}!*\n\nWe have recorded your details for *{{business_name}}*:\n- *Inquiry*: {{service_interest}}\n- *Contact Info*: {{contact_info}}\n\n{{admin_name}} and our team will review your inquiry and reach out shortly!\n\n{{signature}}`,
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
