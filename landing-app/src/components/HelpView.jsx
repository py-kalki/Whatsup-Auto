import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  QrCode, 
  Monitor, 
  Bot, 
  GitBranch, 
  Send, 
  HelpCircle, 
  Code, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export default function HelpView() {
  const [activeSection, setActiveSection] = useState('download-exe');
  const [copiedSection, setCopiedSection] = useState('');
  const repoReleaseUrl = "https://github.com/py-kalki/Whatsup-Auto/releases/tag/v.0.1.1";

  const handleCopyCode = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(''), 2000);
  };

  const sections = [
    { id: 'download-exe', label: '1. Download & Launch (.exe)', icon: Download, badge: 'Start Here' },
    { id: 'qr-pairing', label: '2. WhatsApp QR Pairing', icon: QrCode, badge: '1-Time' },
    { id: 'tray-boot', label: '3. Background Tray & Auto-Boot', icon: Monitor, badge: '24/7' },
    { id: 'ai-brain', label: '4. AI Brain Setup (Zero-Key)', icon: Bot, badge: 'Local AI' },
    { id: 'rules-crm', label: '5. Keyword Rules & Lead Funnel', icon: GitBranch, badge: 'Automation' },
    { id: 'broadcasts', label: '6. Safe Broadcasts & Anti-Ban', icon: Send, badge: 'Marketing' },
    { id: 'troubleshooting', label: '7. Troubleshooting & FAQs', icon: HelpCircle, badge: 'Help' },
    { id: 'developer-guide', label: '8. Developer Source Guide', icon: Code, badge: 'CLI' },
  ];

  return (
    <div className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>User & Setup Manual</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
          How to Setup & Run WhatsAuto
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
          Zero complex terminal commands required. Download the Windows executable from GitHub Releases and start automating in under 2 minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Sidebar Navigation */}
        <aside className="lg:col-span-4 sticky top-24 p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[11px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Setup Guide Index
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
              v2.0
            </span>
          </div>

          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'}`} />
                  <span className="truncate">{s.label}</span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ml-1.5 ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                }`}>
                  {s.badge}
                </span>
              </button>
            );
          })}

          {/* Quick Direct Release Link */}
          <div className="pt-3 mt-2 border-t border-zinc-100 dark:border-zinc-800/80 px-1">
            <a
              href={repoReleaseUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-white text-xs font-bold shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Go to GitHub Releases</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </aside>

        {/* Documentation Content */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* 1. Download & Launch (.exe) */}
          <section id="download-exe" className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <span>1. Download & Launch (.exe)</span>
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Recommended
              </span>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              WhatsAuto is compiled into a standalone Windows desktop executable. You do not need to install Node.js, Python, or Git to run it.
            </p>

            {/* Direct Release CTA Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">WhatsAuto Windows Executable</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Download the latest <code className="font-bold text-emerald-700 dark:text-emerald-300">WhatsAuto.exe</code> from official GitHub releases.</div>
                </div>
              </div>
              <a
                href={repoReleaseUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all shrink-0"
              >
                <span>Download from GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Instructions */}
            <div className="space-y-3.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-zinc-900 dark:text-white">Download the binary:</strong> Visit the <a href={repoReleaseUrl} target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">GitHub Releases page</a> and download <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">WhatsAuto.exe</code>.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-zinc-900 dark:text-white">Double-click to launch:</strong> Open the downloaded file. WhatsAuto starts its background engine and places a green icon in your Windows Taskbar System Tray (bottom right).
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-zinc-900 dark:text-white">Open the dashboard:</strong> Right-click the green tray icon &rarr; click <em>"Open Dashboard"</em>, or visit <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">http://localhost:3000</code> in your browser.
                </div>
              </div>
            </div>

            {/* Windows SmartScreen Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Windows SmartScreen Note:</strong> Because WhatsAuto is an open-source community release without an expensive paid corporate certificate, Windows may show a prompt saying <em>"Windows protected your PC"</em>. Simply click <strong>"More info"</strong> &rarr; <strong>"Run anyway"</strong>.
              </div>
            </div>
          </section>

          {/* 2. WhatsApp QR Pairing */}
          <section id="qr-pairing" className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24 flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <span>2. 1-Click WhatsApp QR Pairing</span>
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Connect any personal or WhatsApp Business number in seconds using official multi-device WebSockets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
                <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[11px] flex items-center justify-center font-bold">1</span>
                  <span>Click "Start Session"</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  In your Web Dashboard at <code>http://localhost:3000</code>, click the green <strong>"Start Session"</strong> button. A live QR code will appear instantly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
                <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-[11px] flex items-center justify-center font-bold">2</span>
                  <span>Scan with WhatsApp</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  On your phone, open <strong>WhatsApp &rarr; Settings &rarr; Linked Devices &rarr; Link a Device</strong> and point your camera at the QR code.
                </p>
              </div>
            </div>

            {/* Session Persistence Callout */}
            <div className="p-4.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                <strong className="font-bold">Permanent Session Persistence:</strong> Your authentication keys are saved encrypted on your hard drive in <code className="font-mono bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded">data/auth_info_baileys/</code>. When your laptop restarts, WhatsAuto <strong>automatically reconnects in the background</strong> without ever requiring a re-scan!
              </div>
            </div>
          </section>

          {/* 3. Background System Tray & Auto-Boot */}
          <section id="tray-boot" className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24 flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 flex items-center justify-center">
                <Monitor className="w-5 h-5" />
              </div>
              <span>3. 24/7 Silent Tray Daemon & Laptop Auto-Boot</span>
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Keep your WhatsApp business automation running 24/7 without keeping browser tabs or command prompt windows open.
            </p>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs font-bold text-zinc-900 dark:text-white mb-3 uppercase tracking-wider">
                System Tray Context Menu Controls:
              </div>
              <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span><strong>Server Status: Online</strong> — Real-time server and socket indicator.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                  <span><strong>Open Dashboard</strong> — Launches the web UI at <code>http://localhost:3000</code> in your default browser.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span><strong>Start on Laptop Boot (Auto-Start)</strong> — Check this box to ensure WhatsAuto launches automatically when your PC turns on.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span><strong>Restart Server</strong> — Restarts the local server process with 1 click.</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
              <span>Alternative: Run <code>scripts/register-startup.bat</code> to toggle Windows startup registry.</span>
              <span className="font-semibold text-zinc-900 dark:text-white">Windows 10 / 11 Compatible</span>
            </div>
          </section>

          {/* 4. AI Brain Setup */}
          <section id="ai-brain" className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <span>4. AI Brain &amp; Antigravity CLI Setup</span>
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                WhatsAuto is powered by a multi-tier conversational engine. It uses your local <strong>Antigravity CLI (<code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">agy</code>)</strong> for zero-cost, private AI responses, with seamless fallbacks to Google Gemini, OpenAI, and deterministic keyword rules.
              </p>
            </div>

            {/* Inbuilt AI: Antigravity CLI Installation Guide */}
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-950 dark:text-amber-200">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Tier 1: Antigravity Inbuilt AI (100% Free • Local • Zero API Keys)</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                  Default Engine
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                WhatsAuto calls <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">agy --print</code> in the background to answer questions using your custom company persona and knowledge base without sending data to third-party clouds or incurring API bills.
              </p>

              {/* Steps to Install Antigravity CLI */}
              <div className="mt-1 space-y-3">
                <div className="text-xs font-bold text-zinc-900 dark:text-white">
                  ⚙️ How to Check &amp; Install the Antigravity CLI (<code className="font-mono text-amber-600 dark:text-amber-400">agy</code>):
                </div>

                {/* Step A: Check */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <span>1. Verify if <code className="font-mono text-amber-600 dark:text-amber-400">agy</code> is already on your system</span>
                    <button
                      onClick={() => handleCopyCode('agy-check', 'agy --version')}
                      className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200"
                    >
                      {copiedSection === 'agy-check' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSection === 'agy-check' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-zinc-900 text-zinc-200 text-xs font-mono overflow-x-auto">agy --version</pre>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    If this prints a version number (e.g., <code className="font-mono">antigravity v1.x</code>), your system is ready!
                  </p>
                </div>

                {/* Step B: Install */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <span>2. If not installed: Install Antigravity globally via npm or Antigravity IDE</span>
                    <button
                      onClick={() => handleCopyCode('agy-install', 'npm install -g @google/antigravity')}
                      className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200"
                    >
                      {copiedSection === 'agy-install' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSection === 'agy-install' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-zinc-900 text-zinc-200 text-xs font-mono overflow-x-auto">npm install -g @google/antigravity</pre>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Alternatively, installing the <strong>Antigravity IDE</strong> automatically sets up and adds the <code className="font-mono">agy</code> command to your system environment PATH.
                  </p>
                </div>
              </div>
            </div>

            {/* Alternative Cloud & Fallback AI options */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Alternative AI Models (If you prefer not to use local CLI):
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-zinc-900 dark:text-white">
                    <Bot className="w-4 h-4 text-sky-500" />
                    <span>Google Gemini 2.0 Flash</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Get a free API key from <strong>Google AI Studio</strong> (ai.google.dev) and paste it in Dashboard &rarr; Settings &rarr; AI Brain, or in <code className="font-mono">.env</code> as <code className="font-mono">GEMINI_API_KEY</code>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-zinc-900 dark:text-white">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span>OpenAI GPT-4o / GPT-4o-mini</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Paste your OpenAI API key in settings or as <code className="font-mono">OPENAI_API_KEY</code> to enable high-speed cloud generation with GPT-4o intelligence.
                  </p>
                </div>
              </div>

              {/* Persona & Knowledge Base Customization Card */}
              <div className="p-4.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-900 dark:text-white font-bold">Customizing Your AI Persona:</strong> In the <strong>AI Brain</strong> tab of your dashboard (<code>http://localhost:3000</code>), you can customize your Business Name, Owner Signature, Industry Niche, Tone of Voice, and Knowledge Base FAQs. The engine dynamically prompts the AI with your exact guidelines!
                </div>
              </div>
            </div>
          </section>

          {/* 5. Rules & CRM Lead Funnel */}
          <section id="rules-crm" className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24 flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center">
                <GitBranch className="w-5 h-5" />
              </div>
              <span>5. Keyword Rules & Lead Funnel (/lead)</span>
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Set deterministic responses for exact queries and capture structured customer leads automatically.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-2">⚡ Keyword Matcher</div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Set instant replies for keywords like <code>/menu</code>, <code>/services</code>, <code>/pricing</code>, or <code>/hours</code> with sub-20ms latency.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-2">📋 Conversational Lead Flow</div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  When a customer types <code>/lead</code>, the bot triggers an interactive multi-step questionnaire collecting their Name, Service, and Phone.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 text-xs text-sky-900 dark:text-sky-300 leading-relaxed">
              <strong>Admin Alerting:</strong> Completed leads are instantly saved to <code className="font-mono">data/leads.json</code> and exported to CSV. You can also configure an instant WhatsApp notification sent directly to your personal phone!
            </div>
          </section>

          {/* 6. Safe Broadcasts */}
          <section id="broadcasts" className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24 flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <span>6. Safe Broadcast Campaigns & Anti-Ban Jitter</span>
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Dispatch bulk announcements to segmented contact lists safely without triggering spam detection flags.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900 dark:text-white">Humanized Jitter Delays (4s – 9s):</strong> Broadcast messages are throttled with randomized natural delays between dispatches to mimic realistic human typing behavior.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900 dark:text-white">Automatic Opt-Out Compliance:</strong> When a recipient replies <code>/stop</code> or <code>unsubscribe</code>, WhatsAuto automatically blacklists them from future marketing dispatches.
                </div>
              </div>
            </div>
          </section>

          {/* 7. Troubleshooting & FAQs */}
          <section id="troubleshooting" className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24 flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span>7. Troubleshooting & FAQs</span>
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1.5">
                  Q: Windows SmartScreen blocked the executable on first open?
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Click <strong>"More info"</strong> and then click <strong>"Run anyway"</strong>. WhatsAuto is completely open source and safe.
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1.5">
                  Q: The QR code is stuck or won't generate?
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Make sure port 3000 is free on your PC. In the system tray menu, click <strong>"Restart Server"</strong> and refresh the dashboard.
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1.5">
                  Q: Does this work with WhatsApp Business or Personal accounts?
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Yes! Both WhatsApp Business and standard personal WhatsApp numbers are 100% supported.
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1.5">
                  Q: How do I completely exit or stop the automation?
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Right-click the WhatsAuto icon in the Windows taskbar system tray &rarr; click <strong>"Exit WhatsAuto"</strong>.
                </div>
              </div>
            </div>
          </section>

          {/* 8. Developer Source Guide */}
          <section id="developer-guide" className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24 flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 text-white flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <span>8. Developer Guide (Build from Source)</span>
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              For developers who want to inspect the source code, contribute to the open-source project, or compile custom binaries:
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 mb-1.5">
                  <span>1. Clone & Install Dependencies</span>
                  <button
                    onClick={() => handleCopyCode('dev1', 'git clone https://github.com/py-kalki/Whatsup-Auto.git\ncd Whatsup-Auto\nnpm install')}
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200"
                  >
                    {copiedSection === 'dev1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === 'dev1' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-zinc-950 text-zinc-200 text-xs font-mono overflow-x-auto border border-zinc-800">
git clone https://github.com/py-kalki/Whatsup-Auto.git
cd Whatsup-Auto
npm install</pre>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 mb-1.5">
                  <span>2. Run in Development Mode</span>
                  <button
                    onClick={() => handleCopyCode('dev2', 'npm run dev')}
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200"
                  >
                    {copiedSection === 'dev2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === 'dev2' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-zinc-950 text-zinc-200 text-xs font-mono overflow-x-auto border border-zinc-800">
npm run dev</pre>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 mb-1.5">
                  <span>3. Compile Custom Windows Standalone Binary</span>
                  <button
                    onClick={() => handleCopyCode('dev3', 'npm run dist')}
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200"
                  >
                    {copiedSection === 'dev3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === 'dev3' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-zinc-950 text-zinc-200 text-xs font-mono overflow-x-auto border border-zinc-800">
npm run dist</pre>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
