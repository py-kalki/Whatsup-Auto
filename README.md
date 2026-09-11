<div align="center">

  <img src="public/logo-whatsup.png" alt="WhatsAuto Logo" width="128" height="128" style="border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />

  # WhatsAuto

  ### **The Open-Source WhatsApp Business Automation, AI Agent & Lead CRM Platform**

  *Self-hosted • Privacy-First • Zero Cloud Subscriptions • Runs Locally in Background Tray*

  <p align="center">
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18%2B-22c55e?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
    <a href="https://github.com/WhiskeySockets/Baileys"><img src="https://img.shields.io/badge/Engine-Baileys%20v7-3b82f6?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Baileys Engine" /></a>
    <a href="#"><img src="https://img.shields.io/badge/AI-Antigravity%20%7C%20Gemini%202.0%20%7C%20GPT--4o-8b5cf6?style=for-the-badge&logo=openai&logoColor=white" alt="AI Engines" /></a>
    <a href="https://www.electronjs.org/"><img src="https://img.shields.io/badge/Desktop-Electron%20Tray-475569?style=for-the-badge&logo=electron&logoColor=white" alt="Electron" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge" alt="License" /></a>
    <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-Welcome-10b981?style=for-the-badge" alt="PRs Welcome" /></a>
  </p>

  <p align="center">
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-architecture--data-flow">Architecture</a> •
    <a href="#-desktop-system-tray-exe">Desktop App (.exe)</a> •
    <a href="#-ai-brain-configuration">AI Setup</a> •
    <a href="#-rest-api-reference">REST API</a> •
    <a href="#-faq--troubleshooting">Troubleshooting</a>
  </p>

</div>

---

## 🌟 Why WhatsAuto?

Most WhatsApp business automation tools lock you into expensive monthly SaaS subscriptions ($50–$300/mo), charge per message, and route all your private customer conversations through external cloud servers.

**WhatsAuto** changes that. It is a **100% self-hosted, open-source automation suite** that turns any standard or business WhatsApp account into a high-performance 24/7 customer service representative, sales qualification funnel, and broadcast campaign dispatcher.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              WhatsAuto Advantage                            │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ 💸 Zero Monthly Subscriptions  │ Completely free and open-source forever.    │
│ 🔒 100% Data Privacy          │ Your messages & auth keys never leave disk. │
│ 🧠 Native Antigravity AI CLI  │ 0 API key AI assistant using local CLI.     │
│ 🖥️ Windows Background Tray     │ Auto-starts on laptop boot & runs silently. │
│ 🛡️ Anti-Ban Humanized Delays  │ Safe 4–9s randomized broadcast jitter.     │
│ 🔄 Multi-Turn Lead Capture    │ Interactive conversational forms with CSV.  │
│ 📞 Auto-Call Triage & Reply   │ Rejects calls and sends polite auto-reply.  │
└───────────────────────────────┴─────────────────────────────────────────────┘
```

---

## ✨ Key Features

- **⚡ Dual Gateway Architecture**:
  - **Native Baileys Socket (Default)**: In-process multi-device WebSockets. Zero third-party bridge required.
  - **OpenWA Gateway Adapter**: Optional REST API bridge for distributed microservice deployments.
- **🧠 3-Tier Hybrid AI Brain**:
  - **Tier 1 (Instant Keywords)**: Ultra-fast regex and slash-command matchers (`/menu`, `/services`, `/quote`, `/hours`).
  - **Tier 2 (Flow State Machine)**: Multi-step interactive questionnaires (`/lead`) collecting structured data.
  - **Tier 3 (Contextual AI Agent)**: Automatic fallback to **Antigravity Inbuilt AI**, **Google Gemini 2.0 Flash**, or **OpenAI GPT-4o** using your custom business persona and FAQs.
- **🖥️ Background System Tray App (`WhatsAuto.exe`)**:
  - Minimizes to the Windows notification tray.
  - 1-Click "Start on Laptop Boot" auto-start registration.
  - Single-instance lock with quick tray menu controls.
- **📊 Modern Web Dashboard**:
  - Clean, high-density Cal.com-inspired UI built with [Lucide Icons](https://lucide.dev).
  - Real-time live log streams, message counters, connection health badges, and QR pairing status.
- **🎯 Safe Broadcast Engine**:
  - Segment contacts by tags (`VIP`, `Lead`, `Client`, `Newsletter`).
  - Humanized jitter delays (4–9s) to prevent automated rate-limit flags.
  - Automatic `/stop` or `unsubscribe` opt-out blacklist handling.
- **📱 Built-In Interactive Simulator**:
  - In-browser virtual phone simulator to test inbound keywords, inspect AI latency, and trace execution paths in real-time.
- **💾 Auto-Session Persistence**:
  - Pair once via WhatsApp Web QR code; credentials stay securely cached on disk in `data/auth_info_baileys/` and reconnect automatically on boot.

---

## 🏗 Architecture & Data Flow

```
                                 ┌─────────────────────────┐
                                 │    WhatsApp Network     │
                                 └───────────┬─────────────┘
                                             │
                                  (Encrypted Multi-Device WS)
                                             │
                                             ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               WhatsAuto Core Hub (Local)                               │
│                                                                                        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                      Native WhatsApp Engine (@baileys socket)                  │   │
│   └───────────────────────────────────────┬────────────────────────────────────────┘   │
│                                           │                                            │
│                                           ▼                                            │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                                Rule & Flow Engine                              │   │
│   │  1. Check Active Multi-Step Conversation Flow (User currently filling form?)  │   │
│   │  2. Match Exact Keywords & Slash Commands (/menu, /services, /lead, regex)     │   │
│   │  3. Check Out-of-Office / Auto-Responder Schedule                             │   │
│   └───────────────────────────────────────┬────────────────────────────────────────┘   │
│                                           │                                            │
│                              (If no deterministic match)                                │
│                                           │                                            │
│                                           ▼                                            │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                                Hybrid AI Brain                                 │   │
│   │  * Antigravity CLI Inbuilt AI (100% Local / Zero API Key)                      │   │
│   │  * Google Gemini 2.0 Flash / Pro (Cloud API)                                   │   │
│   │  * OpenAI GPT-4o / GPT-4o-mini (Cloud API)                                     │   │
│   │  + Injected Context: Business Profile, Persona Tone, Product Catalog & FAQs    │   │
│   └───────────────────────────────────────┬────────────────────────────────────────┘   │
│                                           │                                            │
└───────────────────────────────────────────┼────────────────────────────────────────────┘
                                            │
                                 (Real-Time WS & REST API)
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                    User Interfaces                                     │
│                                                                                        │
│         🌐 Web Dashboard (Port 3000)        🖥️ Windows Background Tray (.exe)          │
│         - Live Rule & Flow Editor           - Silent background daemon                 │
│         - CRM Lead Pipeline & CSV Export    - Auto-start on boot integration           │
│         - Broadcast Dispatcher & Logs       - 1-Click tray browser access              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (Version **18.0.0** or higher)
- [Git](https://git-scm.com/)

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/whatsapp-automation.git
cd whatsapp-automation
npm install
```

### 3. Environment Configuration

Copy the example environment file:

```bash
# Windows (cmd/PowerShell)
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Edit `.env` to configure your server port and optional cloud AI keys:
```env
PORT=3000

# Optional: Cloud AI Providers (Leave blank to use Inbuilt Antigravity Local AI)
GEMINI_API_KEY=
OPENAI_API_KEY=
```

### 4. Run the Web Hub

```bash
# Start standard server
npm start

# Or start in hot-reload development mode
npm run dev
```

Open your browser at: **`http://localhost:3000`**

---

## 🖥️ Desktop System Tray (.exe)

WhatsAuto includes an Electron desktop wrapper that runs silently in the Windows System Tray, allowing your laptop to automate WhatsApp messages continuously in the background.

```
┌──────────────────────────────────────────────┐
│  WhatsAuto Suite                             │
├──────────────────────────────────────────────┤
│  🟢 Server Status: Online (Port 3000)        │
│  🌐 Open Dashboard                           │
│  🧪 Open Simulator                           │
├──────────────────────────────────────────────┤
│  ✔️  Start on Laptop Boot (Auto-Start)        │
│  🔄 Restart Automation Server                │
│  🚪 Exit WhatsAuto                           │
└──────────────────────────────────────────────┘
```

### Launching the Desktop Tray:
- **1-Click**: Double-click [`Launch-WhatsAuto.bat`](Launch-WhatsAuto.bat) in the project directory.
- **Command Line**: Run `npm run tray`.

### Auto-Start on Laptop Boot:
- **Option 1**: Right-click the WhatsAuto tray icon &rarr; click **"Start on Laptop Boot (Auto-Start)"**.
- **Option 2**: Run [`scripts/register-startup.bat`](scripts/register-startup.bat).
- To disable auto-start, run [`scripts/unregister-startup.bat`](scripts/unregister-startup.bat).

### Compiling Standalone `.exe`:
To build a standalone Windows binary:
```bash
npm run dist
```
The compiled executable will be output to: `dist/win-unpacked/WhatsAuto.exe`.

---

## 📱 Connecting WhatsApp

1. Open the dashboard at `http://localhost:3000`.
2. Under **WhatsApp Session Connection**, click **Start Session**.
3. A QR code will display instantly on the screen.
4. On your mobile device, open WhatsApp &rarr; **Settings** &rarr; **Linked Devices** &rarr; **Link a Device**.
5. Scan the QR code.
6. The status will immediately transition to 🟢 **CONNECTED**.

> **Session Persistence**: Authentication tokens are safely stored in `data/auth_info_baileys/`. When restarting your PC or server, WhatsAuto **automatically reconnects in the background** without requiring you to scan again.

---

## 🧠 AI Brain Configuration

WhatsAuto features a customizable hybrid intelligence engine:

### 1. Antigravity Inbuilt AI (100% Local / Zero API Key)
- **Engine**: Local Antigravity CLI (`agy`).
- **Features**: Zero API cost, privacy-first, zero cloud dependencies.
- **Operation**: Inherits your Admin Profile, persona tone, and knowledge base FAQs to craft contextual replies.

### 2. Google Gemini 2.0 Cloud API
1. Get an API key from [Google AI Studio](https://aistudio.google.com).
2. Add `GEMINI_API_KEY=AIzaSy...` to your `.env` or paste it in the **AI Brain** dashboard tab.
3. Select models: `gemini-2.0-flash` (recommended for ultra-low latency) or `gemini-1.5-pro`.

### 3. OpenAI ChatGPT Cloud API
1. Obtain an API key from [OpenAI Platform](https://platform.openai.com).
2. Set `OPENAI_API_KEY=sk-...` in your `.env` or configure via the UI.
3. Select models: `gpt-4o-mini` or `gpt-4o`.

### Customizing Tone & Knowledge Base:
Under the **AI Brain** tab, you can customize:
- **Persona Tone**: Professional, Friendly & Warm, Technical & Direct, or Casual.
- **Business Profile**: Company name, primary services, support contact.
- **Knowledge Base FAQs**: Pair question patterns with verified business facts.

---

## 📋 Lead CRM & Multi-Step Flows

Create conversational questionnaires that guide prospective clients through a multi-step qualification process:

```
[Inbound: "/lead"]
       │
       ▼
[Step 1/3] "Welcome to our business! What is your full name?"
       │ (User replies: Jane Doe)
       ▼
[Step 2/3] "Great to meet you, Jane! Which service are you interested in? (1. Web / 2. AI / 3. Marketing)"
       │ (User replies: 2)
       ▼
[Step 3/3] "Please share your email address or preferred callback time."
       │ (User replies: jane@example.com)
       ▼
[Completed] "Thank you, Jane Doe! Our team will contact you shortly."
       │
       ├─► Saved to data/leads.json
       ├─► Real-time Admin WhatsApp Alert dispatched to your phone
       └─► 1-Click CSV Export available in Dashboard
```

---

## 📢 Broadcast Campaigns & Anti-Ban Safety

WhatsAuto is engineered with strict safeguards to protect your WhatsApp account from automated spam flags:

- **Audience Tag Segmentation**: Send targeted announcements only to specific contact tags (`VIP`, `Lead`, `Client`).
- **Humanized Jitter Delays**: Randomized pauses (default: 4,000ms – 9,000ms) between outgoing messages to replicate natural typing.
- **Dynamic Template Tags**: Personalize broadcasts with `{{name}}`, `{{phone}}`, and `{{notes}}`.
- **Automatic Opt-Out Compliance**: If a recipient replies `/stop` or `unsubscribe`, WhatsAuto immediately flags them in `data/opt-outs.json` and skips them in future dispatches.

---

## 📞 Auto-Call Triage & Rejection

Automated bots cannot answer incoming WhatsApp voice/video calls. When an incoming call is detected:

1. WhatsAuto intercepts and politely rejects the call.
2. An instant text message is dispatched back to the caller:
   > *"Hello! I am currently unable to take voice calls. Please send your inquiry here via text, and I will get back to you promptly."*

---

## 🧪 Interactive Simulator

WhatsAuto includes an in-browser WhatsApp phone mockup:

- Test custom slash commands (`/menu`, `/services`, `/lead`, `/quote`).
- Verify regex pattern matchers.
- View **Live Execution Diagnostics**: Engine type, matched rule name, match latency (ms), and raw payload JSON.

---

## 🔌 REST API Reference

All automation endpoints are fully accessible via standard HTTP REST:

| Method | Endpoint | Description | Sample Payload |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/status` | System health, session status, & message KPIs | — |
| `POST` | `/api/session/start` | Starts WhatsApp socket connection | `{ "forceReset": false }` |
| `POST` | `/api/session/stop` | Terminates active WhatsApp socket | — |
| `GET` | `/api/session/qr` | Returns latest QR code data URL | — |
| `POST` | `/api/send-direct` | Sends direct WhatsApp message | `{ "chatId": "1234567890@c.us", "text": "Hello!" }` |
| `GET` | `/api/rules` | Retrieves all automation rules | — |
| `POST` | `/api/rules` | Creates a new keyword rule | `{ "trigger": "/help", "response": "How can I assist?" }` |
| `PUT` | `/api/rules/:id` | Updates an existing rule | `{ "trigger": "/help", "response": "Updated text" }` |
| `DELETE` | `/api/rules/:id` | Deletes a rule by ID | — |
| `GET` | `/api/leads` | Lists all captured CRM leads | — |
| `GET` | `/api/leads/export` | Downloads leads as CSV spreadsheet | — |
| `GET` | `/api/campaigns` | Lists all broadcast campaigns | — |
| `POST` | `/api/campaigns` | Creates a new broadcast campaign | `{ "title": "Spring Promo", "template": "Hi {{name}}!" }` |
| `POST` | `/api/campaigns/:id/run`| Dispatches a broadcast campaign | — |
| `GET` | `/api/contacts` | Lists all address book contacts | — |
| `POST` | `/api/contacts` | Adds a new contact | `{ "name": "Jane", "phone": "1234567890", "tags": ["VIP"] }` |
| `GET` | `/api/profile` | Fetches business & admin persona | — |
| `PUT` | `/api/profile` | Updates business & admin persona | `{ "name": "My Business", "tone": "friendly" }` |
| `GET` | `/api/settings` | Gets system & anti-ban settings | — |
| `PUT` | `/api/settings` | Updates anti-ban & engine settings | `{ "antiBan": { "minDelayMs": 3000 } }` |
| `POST` | `/api/test-simulate` | Simulates inbound message in test sandbox | `{ "message": "/menu", "from": "test-user" }` |
| `POST` | `/webhook/openwa` | Webhook receiver for OpenWA gateway events | `{ "event": "onMessage", "data": { ... } }` |

---

## 📁 Project Directory Structure

```
whatsapp-automation/
├── desktop-tray.cjs          # Electron Windows background system tray runner
├── server.js                 # Express + WebSocket core automation server
├── package.json              # Project scripts, metadata & dependencies
├── Launch-WhatsAuto.bat      # 1-Click root launcher for background tray app
├── test-automation.js        # Automated unit and integration test suite
├── lib/
│   ├── native-wa-engine.js   # Baileys native multi-device WebSocket client
│   ├── openwa-client.js      # OpenWA REST gateway adapter
│   ├── rule-engine.js        # Deterministic keyword & regex matcher
│   ├── ai-engine.js          # Antigravity CLI / Gemini / OpenAI hybrid brain
│   ├── flow-engine.js        # Multi-step conversational lead capture state machine
│   ├── campaign-engine.js    # Safe broadcast dispatcher with anti-ban delay
│   ├── call-engine.js        # Auto-call triage & courteous rejection handler
│   └── storage.js            # Atomic local JSON database layer
├── public/                   # Web Dashboard Single-Page App (SPA)
│   ├── index.html            # Main dashboard HTML (Lucide vector icons)
│   ├── style.css             # Minimalist Cal.com design system
│   ├── app.js                # Frontend controller & WebSocket client
│   └── logo-whatsup.png      # Brand logo & system tray icon asset
├── scripts/                  # Helper utilities and startup automations
│   ├── create-desktop-shortcut.bat  # Creates Desktop icon
│   ├── register-startup.bat         # Configures auto-start on Windows boot
│   ├── unregister-startup.bat       # Removes auto-start from boot
│   ├── start-silent.vbs             # Silent VBS background runner
│   └── start-all.bat                # Starts OpenWA + Automation suite
└── data/                     # Local persistent storage files
    ├── auth_info_baileys/    # WhatsApp multi-device authentication credentials
    ├── rules.json            # Keyword automation rules
    ├── flows.json            # Multi-step conversational flows
    ├── leads.json            # Captured CRM leads
    ├── contacts.json         # Contacts and segmented audience tags
    ├── campaigns.json        # Broadcast campaigns
    ├── opt-outs.json         # Blacklisted opt-out numbers
    ├── profile.json          # Business identity & AI persona
    └── settings.json         # Anti-ban, gateway & AI settings
```

---

## 🧪 Testing

WhatsAuto includes an automated test runner that verifies rule matching, flow state transitions, and simulator execution:

```bash
node test-automation.js
```

---

## ❓ FAQ & Troubleshooting

<details>
<summary><strong>Q: Do I need to scan the QR code every time my laptop restarts?</strong></summary>
<br>
<strong>No.</strong> Your authentication keys are saved in <code>data/auth_info_baileys/</code>. Once linked, WhatsAuto will automatically reconnect in the background on server boot.
</details>

<details>
<summary><strong>Q: How do I prevent my WhatsApp account from being banned?</strong></summary>
<br>
1. Always keep the <strong>Anti-Ban Jitter Delay</strong> enabled (minimum 4–5 seconds between messages).<br>
2. Send broadcast messages only to opt-in contacts who recognize your number.<br>
3. Honor opt-out requests (WhatsAuto automatically handles <code>/stop</code>).<br>
4. Warm up new phone numbers with low initial volume.
</details>

<details>
<summary><strong>Q: How does the Antigravity Inbuilt AI work without an API key?</strong></summary>
<br>
WhatsAuto natively interfaces with the local Antigravity CLI (<code>agy</code>) installed on your system. It formats prompts using your business profile, persona tone, and knowledge base FAQs to produce rich responses without consuming external cloud API credits.
</details>

<details>
<summary><strong>Q: What happens if Port 3000 is already in use?</strong></summary>
<br>
You can change the port by setting <code>PORT=8080</code> in your <code>.env</code> file or launching with <code>PORT=8080 npm start</code>.
</details>

<details>
<summary><strong>Q: Can I run this on Linux or a VPS?</strong></summary>
<br>
<strong>Yes!</strong> Run <code>npm start</code> or use a process manager like PM2 (<code>pm2 start server.js --name whatsauto</code>) for 24/7 cloud server hosting.
</details>

---

## 🤝 Contributing

We welcome contributions of all kinds! Whether fixing a bug, adding new features, or improving documentation:

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/cool-feature`).
3. Commit your changes (`git commit -m "Add cool feature"`).
4. Push to the branch (`git push origin feature/cool-feature`).
5. Open a Pull Request.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

---

## 📜 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for full details.

---

<div align="center">
  <sub>Built with ❤️ for privacy-first, open-source business automation.</sub>
</div>
