import { storage } from './storage.js';
import { flowEngine } from './flow-engine.js';
import { aiEngine } from './ai-engine.js';

class RuleEngine {
  matchRule(rule, messageText) {
    if (!rule.enabled) return false;
    const text = messageText.trim().toLowerCase();

    switch (rule.triggerType) {
      case 'exact_or_command':
      case 'command':
        return rule.keywords.some((k) => {
          const kw = k.trim().toLowerCase();
          return text === kw || text.startsWith(`${kw} `) || text.startsWith(`${kw}\n`);
        });

      case 'exact':
        return rule.keywords.some((k) => text === k.trim().toLowerCase());

      case 'contains':
        return rule.keywords.some((k) => text.includes(k.trim().toLowerCase()));

      case 'starts_with':
        return rule.keywords.some((k) => text.startsWith(k.trim().toLowerCase()));

      case 'regex':
        return rule.keywords.some((k) => {
          try {
            const re = new RegExp(k, 'i');
            return re.test(messageText);
          } catch {
            return false;
          }
        });

      default:
        return false;
    }
  }

  async processIncomingMessage({ chatId, text, senderName, messageId }) {
    const rawText = (text || '').trim();
    if (!rawText) return null;

    const settings = storage.getSettings();

    // 1. Check if user is currently inside an active multi-step flow
    if (flowEngine.isUserInFlow(chatId)) {
      const flowResult = flowEngine.handleUserInput(chatId, rawText);
      if (flowResult) {
        let reply = flowResult.prompt || flowResult.reply;
        let alertDetails = null;

        if (flowResult.isComplete && flowResult.alertAdmin && settings.adminAlertNumber) {
          alertDetails = {
            target: settings.adminAlertNumber,
            text: `[New Lead Captured]\n*Contact*: ${chatId}\n*Details*:\n${JSON.stringify(flowResult.lead.data, null, 2)}`,
          };
        }

        return {
          type: 'flow',
          replyText: reply,
          flowCompleted: flowResult.isComplete,
          alertAdmin: alertDetails,
          matchedRule: { name: 'Active Flow Step' },
        };
      }
    }

    // 2. Evaluate configured rules (ordered by priority descending)
    const rules = storage.getRules().sort((a, b) => (b.priority || 0) - (a.priority || 0));

    for (const rule of rules) {
      if (this.matchRule(rule, rawText)) {
        // Handle rule response
        if (rule.responseType === 'flow') {
          const started = flowEngine.startFlow(rule.flowId, chatId, {
            name: senderName || 'Friend',
            phone: chatId.split('@')[0],
          });
          if (started.success) {
            return {
              type: 'flow_start',
              replyText: started.prompt,
              reactionEmoji: rule.reactionEmoji,
              matchedRule: rule,
            };
          }
        }

        if (rule.responseType === 'action' && rule.actionType === 'opt_out') {
          storage.addOptOut(chatId);
          return {
            type: 'action',
            replyText: rule.replyText,
            reactionEmoji: rule.reactionEmoji,
            matchedRule: rule,
          };
        }

        // Standard text response with dynamic persona interpolation
        let reply = rule.replyText;
        const profile = storage.getProfile();
        reply = reply.replace(/{{name}}/g, senderName || 'Friend');
        reply = reply.replace(/{{chatId}}/g, chatId);
        reply = reply.replace(/{{admin_name}}/g, profile.adminName || 'Admin');
        reply = reply.replace(/{{business_name}}/g, profile.businessName || 'Our Business');
        reply = reply.replace(/{{role}}/g, profile.role || 'Representative');
        reply = reply.replace(/{{business_niche}}|{{niche}}/g, profile.businessNiche || 'Services');
        reply = reply.replace(/{{support_email}}|{{email}}/g, profile.supportEmail || '');
        reply = reply.replace(/{{contact_phone}}|{{phone}}/g, profile.contactPhone || '');
        reply = reply.replace(/{{website_url}}|{{website}}/g, profile.websiteUrl || '');
        reply = reply.replace(/{{operating_hours}}|{{hours}}/g, profile.operatingHours || '');
        reply = reply.replace(/{{custom_signature}}|{{signature}}/g, profile.customSignature || `Best regards, ${profile.adminName || 'Admin'} | ${profile.businessName || 'Our Business'}`);
        reply = reply.replace(/{{about_business}}|{{about}}/g, profile.aboutBusiness || '');
        reply = reply.replace(/{{persona_tone}}|{{tone}}/g, profile.personaTone || 'Professional');

        return {
          type: 'rule',
          replyText: reply,
          reactionEmoji: rule.reactionEmoji,
          matchedRule: rule,
        };
      }
    }

    // 3. Check Out of Office responder if enabled
    if (settings.outOfOfficeEnabled && settings.outOfOfficeMessage) {
      return {
        type: 'out_of_office',
        replyText: settings.outOfOfficeMessage,
        reactionEmoji: null,
        matchedRule: { name: 'Out of Office' },
      };
    }

    // 4. Hybrid Fallback: Route to AI Engine
    if (settings.aiEnableFallback && settings.aiProvider !== 'disabled') {
      const aiResult = await aiEngine.generateResponse(rawText, chatId);
      return {
        type: 'ai',
        replyText: aiResult.reply,
        reactionEmoji: null,
        aiSuccess: aiResult.success,
        modelUsed: aiResult.modelUsed,
        matchedRule: { name: `AI Assistant (${aiResult.modelUsed || settings.aiProvider})` },
      };
    }

    // 5. Default fallback
    const profile = storage.getProfile();
    return {
      type: 'default_fallback',
      replyText: `Hello! Thank you for messaging *${profile.businessName || 'our team'}*. Type */help* or */menu* to view our options, or */lead* to connect directly with ${profile.adminName || 'us'}!`,
      reactionEmoji: null,
      matchedRule: { name: 'Default Fallback' },
    };
  }
}

export const ruleEngine = new RuleEngine();
