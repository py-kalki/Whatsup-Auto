import cron from 'node-cron';
import { storage } from './storage.js';
import { openwa } from './openwa-client.js';

class CampaignEngine {
  constructor() {
    this.cronJobs = new Map();
    this.activeCampaigns = new Map();
  }

  init() {
    // Restore scheduled campaigns on startup
    const campaigns = storage.getCampaigns();
    for (const campaign of campaigns) {
      if (campaign.scheduleType === 'cron' && campaign.cronExpression && campaign.status === 'scheduled') {
        this.scheduleCronCampaign(campaign);
      }
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getRandomDelay(minMs, maxMs) {
    return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  }

  scheduleCronCampaign(campaign) {
    if (this.cronJobs.has(campaign.id)) {
      this.cronJobs.get(campaign.id).stop();
      this.cronJobs.delete(campaign.id);
    }

    if (!cron.validate(campaign.cronExpression)) {
      console.error(`Invalid cron expression for campaign ${campaign.id}: ${campaign.cronExpression}`);
      return false;
    }

    const task = cron.schedule(campaign.cronExpression, async () => {
      console.log(`[Cron Trigger] Executing scheduled campaign: ${campaign.name} (${campaign.id})`);
      await this.runCampaign(campaign.id);
    });

    this.cronJobs.set(campaign.id, task);
    return true;
  }

  async runCampaign(campaignId, onProgress = null) {
    const campaigns = storage.getCampaigns();
    const campaignIndex = campaigns.findIndex((c) => c.id === campaignId);
    if (campaignIndex === -1) return { success: false, error: 'Campaign not found' };

    const campaign = campaigns[campaignIndex];
    const settings = storage.getSettings();
    const allContacts = storage.getContacts();

    // Filter recipients
    let recipients = [];
    if (campaign.targetType === 'all') {
      recipients = allContacts;
    } else if (campaign.targetType === 'tags' && Array.isArray(campaign.targetTags)) {
      recipients = allContacts.filter((c) => c.tags && c.tags.some((t) => campaign.targetTags.includes(t)));
    } else if (campaign.targetType === 'specific' && Array.isArray(campaign.targetContactIds)) {
      recipients = allContacts.filter((c) => campaign.targetContactIds.includes(c.id));
    } else if (campaign.customRecipients && Array.isArray(campaign.customRecipients)) {
      recipients = campaign.customRecipients;
    }

    campaign.status = 'running';
    campaign.startedAt = new Date().toISOString();
    campaign.stats = {
      total: recipients.length,
      sent: 0,
      failed: 0,
      skipped: 0,
    };
    storage.saveCampaigns(campaigns);

    storage.addLog({
      event: 'campaign_started',
      campaignId: campaign.id,
      campaignName: campaign.name,
      totalRecipients: recipients.length,
    });

    const minDelay = settings.antiBanDelayMinMs || 4000;
    const maxDelay = settings.antiBanDelayMaxMs || 9000;

    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      const chatId = recipient.chatId || (recipient.phone ? `${recipient.phone.replace(/\D/g, '')}@c.us` : null);

      if (!chatId) {
        campaign.stats.skipped += 1;
        continue;
      }

      // Check opt-out
      if (storage.isOptedOut(chatId)) {
        campaign.stats.skipped += 1;
        storage.addLog({
          event: 'broadcast_skipped_opt_out',
          campaignId: campaign.id,
          chatId,
        });
        continue;
      }

      // Personalize message
      let message = campaign.messageTemplate || '';
      const profile = storage.getProfile();
      message = message.replace(/{{name}}/g, recipient.name || 'Friend');
      message = message.replace(/{{phone}}/g, recipient.phone || '');
      if (recipient.notes) message = message.replace(/{{notes}}/g, recipient.notes);
      message = message.replace(/{{admin_name}}/g, profile.adminName || 'Admin');
      message = message.replace(/{{business_name}}/g, profile.businessName || 'Our Business');
      message = message.replace(/{{role}}/g, profile.role || 'Representative');
      message = message.replace(/{{business_niche}}|{{niche}}/g, profile.businessNiche || 'Services');
      message = message.replace(/{{support_email}}|{{email}}/g, profile.supportEmail || '');
      message = message.replace(/{{contact_phone}}/g, profile.contactPhone || '');
      message = message.replace(/{{website_url}}|{{website}}/g, profile.websiteUrl || '');
      message = message.replace(/{{operating_hours}}|{{hours}}/g, profile.operatingHours || '');
      message = message.replace(/{{custom_signature}}|{{signature}}/g, profile.customSignature || `Best regards, ${profile.adminName || 'Admin'} | ${profile.businessName || 'Our Business'}`);
      message = message.replace(/{{about_business}}|{{about}}/g, profile.aboutBusiness || '');

      // Send message via OpenWA
      const sendRes = await openwa.sendText(chatId, message);

      if (sendRes.success) {
        campaign.stats.sent += 1;
        storage.addLog({
          event: 'broadcast_sent',
          campaignId: campaign.id,
          recipient: recipient.name || chatId,
          chatId,
        });
      } else {
        campaign.stats.failed += 1;
        storage.addLog({
          event: 'broadcast_failed',
          campaignId: campaign.id,
          recipient: recipient.name || chatId,
          chatId,
          error: sendRes.error,
        });
      }

      if (onProgress) {
        onProgress(campaign.stats);
      }

      // Safe jitter delay before sending next message
      if (i < recipients.length - 1) {
        const delay = this.getRandomDelay(minDelay, maxDelay);
        await this.sleep(delay);
      }
    }

    campaign.status = 'completed';
    campaign.completedAt = new Date().toISOString();
    storage.saveCampaigns(campaigns);

    storage.addLog({
      event: 'campaign_completed',
      campaignId: campaign.id,
      campaignName: campaign.name,
      stats: campaign.stats,
    });

    return { success: true, stats: campaign.stats };
  }
}

export const campaignEngine = new CampaignEngine();
