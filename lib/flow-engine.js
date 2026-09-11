import { storage } from './storage.js';

class FlowEngine {
  constructor() {
    // Active sessions: chatId -> { flowId, currentStep: number, data: Record<string, string>, startedAt: number }
    this.activeSessions = new Map();
  }

  isUserInFlow(chatId) {
    return this.activeSessions.has(chatId);
  }

  getActiveFlow(chatId) {
    return this.activeSessions.get(chatId);
  }

  cancelFlow(chatId) {
    if (this.activeSessions.has(chatId)) {
      this.activeSessions.delete(chatId);
      return true;
    }
    return false;
  }

  startFlow(flowId, chatId, initialData = {}) {
    const flows = storage.getFlows();
    const flow = flows.find((f) => f.id === flowId);
    if (!flow || !flow.steps || flow.steps.length === 0) {
      return { success: false, error: 'Flow not found or has no steps' };
    }

    const session = {
      flowId,
      currentStep: 0,
      data: { ...initialData },
      startedAt: Date.now(),
    };

    this.activeSessions.set(chatId, session);

    const firstStep = flow.steps[0];
    let prompt = firstStep.prompt;
    // Replace any existing variables
    for (const [key, val] of Object.entries(session.data)) {
      prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), val);
    }

    return {
      success: true,
      prompt,
      isComplete: false,
    };
  }

  handleUserInput(chatId, input) {
    const session = this.activeSessions.get(chatId);
    if (!session) return null;

    const trimmed = input.trim();

    // Check for exit / cancel commands
    if (['/cancel', 'cancel', '/exit', 'exit', '/quit'].includes(trimmed.toLowerCase())) {
      this.activeSessions.delete(chatId);
      return {
        success: true,
        isCancelled: true,
        reply: '❌ *Flow cancelled.* You can start again anytime by typing */quote* or */help*.',
      };
    }

    const flows = storage.getFlows();
    const flow = flows.find((f) => f.id === session.flowId);
    if (!flow) {
      this.activeSessions.delete(chatId);
      return { success: false, error: 'Flow configuration missing' };
    }

    const currentStepDef = flow.steps[session.currentStep];
    if (currentStepDef && currentStepDef.field) {
      session.data[currentStepDef.field] = trimmed;
    }

    // Move to next step
    session.currentStep += 1;

    if (session.currentStep < flow.steps.length) {
      // Prompt next step
      const nextStepDef = flow.steps[session.currentStep];
      let prompt = nextStepDef.prompt;
      for (const [key, val] of Object.entries(session.data)) {
        prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), val);
      }
      return {
        success: true,
        isComplete: false,
        prompt,
      };
    } else {
      // Flow completed!
      this.activeSessions.delete(chatId);

      // Save lead
      const leadRecord = {
        flowId: flow.id,
        flowName: flow.name,
        chatId,
        data: session.data,
      };
      const savedLead = storage.addLead(leadRecord);

      let completionMessage = flow.completionMessage || '🎉 Thank you! Your response has been recorded.';
      for (const [key, val] of Object.entries(session.data)) {
        completionMessage = completionMessage.replace(new RegExp(`{{${key}}}`, 'g'), val);
      }

      return {
        success: true,
        isComplete: true,
        reply: completionMessage,
        lead: savedLead,
        alertAdmin: flow.alertAdmin,
      };
    }
  }
}

export const flowEngine = new FlowEngine();
