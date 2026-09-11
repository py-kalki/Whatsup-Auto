# 🚀 WhatsApp Automation Suite (Custom Edition)

A high-performance, personalized **WhatsApp Automation & AI Bot Platform** seamlessly integrated with the [OpenWA Gateway](https://github.com/rmyndharis/OpenWA).

---

## ✨ Key Features

1. **⚡ Hybrid Intelligence Engine**:
   - **Deterministic Rules & Menus**: Handle exact commands (`/menu`, `/services`, `/quote`, `/help`, `/human`), regex patterns, and keyword queries instantly.
   - **Contextual AI Assistant**: Built-in integration with **Google Gemini 2.0 Flash / Pro** and **OpenAI GPT-4o** with customizable personas, domain knowledge base, and 10-message conversational memory.
   - **Auto-Reactions**: React to customer messages with custom emojis (👍, 🚀, ❤️).

2. **📝 Multi-Step Conversational Lead Flows**:
   - Interactive questionnaire state machine (e.g. Name ➔ Service Choice ➔ Contact Details ➔ Confirmation).
   - Automated lead storage with CSV export.
   - Instant WhatsApp notification alerts sent to the admin number when a new lead is captured.

3. **📢 Safe Broadcast & Drip Campaign Engine**:
   - Audience segmentation using tags (`VIP`, `Lead`, `Client`, `Tech`).
   - Anti-Ban protection: randomized human-like jitter delays (4–9s) between outgoing messages.
   - Dynamic message templates with placeholders (`{{name}}`, `{{phone}}`, `{{notes}}`).
   - Opt-out protection: automatically honors `/stop` and `unsubscribe` commands.

4. **📞 Auto-Call Management**:
   - Automatically intercepts WhatsApp voice/video calls.
   - Rejects the call and immediately replies with a courteous custom WhatsApp text message.

5. **💬 Interactive Simulator & Test Workbench**:
   - In-browser virtual WhatsApp chat client to test and debug rules, AI responses, and flows in real-time with zero WhatsApp ban risk.

6. **📊 Modern Single Page Web Dashboard**:
   - Live metrics, QR code linking widget, rule management, AI prompt tuning, lead table, and real-time WebSocket log stream.

---

## 🛠️ Quick Start Guide

### 1. Start the System
You can launch both the **OpenWA Gateway** and the **WhatsApp Automation Suite** using one click:

- Double-click `scripts/start-all.bat`
- Or manually:
  ```bash
  # Terminal 1: Start OpenWA Gateway
  cd C:\Users\pykal\OpenWA
  npm run start:dev

  # Terminal 2: Start Automation Hub
  cd C:\Users\pykal\whatsapp-automation
  npm start
  ```

### 2. Access the Dashboard
Open your browser at:
👉 **[http://localhost:3000](http://localhost:3000)**

### 3. Connect Your WhatsApp
1. On the **Overview & Gateway** tab, click **Start Session**.
2. Scan the generated QR code using WhatsApp on your phone (**Linked Devices** ➔ **Link a Device**).
3. Click **Auto-Register Webhook with OpenWA** to link incoming messages.

### 4. Test Everything in the Simulator
Switch to the **Interactive Simulator** tab and type `/menu`, `/services`, or `/lead` to test your automated flows right away!

---

## 📁 Project Structure

```
whatsapp-automation/
├── server.js               # Express + WebSocket core automation server
├── lib/
│   ├── openwa-client.js    # OpenWA REST & Webhook client adapter
│   ├── rule-engine.js      # Hybrid rule matching & command router
│   ├── ai-engine.js        # Gemini / OpenAI contextual assistant
│   ├── flow-engine.js      # Multi-step conversational lead capture
│   ├── campaign-engine.js  # Safe broadcaster with anti-ban delay
│   ├── call-engine.js      # Auto-call rejector & responder
│   └── storage.js          # Persistent JSON database
├── public/                 # Web Dashboard SPA (HTML, CSS, JS)
├── scripts/                # Batch launchers (start-all, start-openwa, start-automation)
└── data/                   # JSON storage files (rules, leads, contacts, settings)
```
