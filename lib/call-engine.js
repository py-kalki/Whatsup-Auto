import { storage } from './storage.js';
import { openwa } from './openwa-client.js';

class CallEngine {
  async handleIncomingCall(callData) {
    const settings = storage.getSettings();
    if (!settings.autoCallReject) {
      return { handled: false, reason: 'Auto-call rejection is disabled.' };
    }

    const { callId, from, isVideo, isGroup } = callData;
    if (!from || isGroup) {
      return { handled: false, reason: 'Skipping group or missing caller ID' };
    }

    // 1. Reject the call via OpenWA API
    if (callId) {
      await openwa.rejectCall(callId);
    }

    // 2. Send polite automatic text reply
    let replyText = settings.autoCallMessage || "📞 *Automated Notice*: I cannot answer calls right now. Please text me here!";
    const sendResult = await openwa.sendText(from, replyText);

    storage.addLog({
      event: 'call_auto_rejected',
      caller: from,
      isVideo: !!isVideo,
      callId,
      autoReplySent: sendResult.success,
    });

    return {
      handled: true,
      rejected: true,
      autoReplySent: sendResult.success,
    };
  }
}

export const callEngine = new CallEngine();
