import React, { useState } from 'react';
import { BookOpen, CheckCircle, Download, QrCode, Bot, Monitor, GitBranch, Send, Copy, Check } from 'lucide-react';

export default function HelpView() {
  const [activeSection, setActiveSection] = useState('prerequisites');
  const [copiedSection, setCopiedSection] = useState('');

  const handleCopyCode = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(''), 2000);
  };

  const sections = [
    { id: 'prerequisites', label: '1. Prerequisites', icon: CheckCircle },
    { id: 'installation', label: '2. Quick Installation', icon: Download },
    { id: 'connecting', label: '3. WhatsApp QR Pairing', icon: QrCode },
    { id: 'ai-setup', label: '4. AI Brain Setup', icon: Bot },
    { id: 'tray-app', label: '5. Background Tray & Boot', icon: Monitor },
    { id: 'crm-flows', label: '6. Multi-Step CRM Flows', icon: GitBranch },
    { id: 'broadcasts', label: '7. Safe Broadcasts', icon: Send },
  ];

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
          <BookOpen className="w-3.5 h-3.5 text-sky-500" />
          <span>Documentation & Guide</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
          Installation & Usage Manual
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal">
          Complete step-by-step instructions for running, connecting, and automating WhatsAuto.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Sidebar Navigation */}
        <aside className="lg:col-span-4 sticky top-24 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-2">
            Documentation Index
          </span>
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
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                  isActive
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Documentation Content */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          {/* 1. Prerequisites */}
          <section id="prerequisites" className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>1. System Prerequisites</span>
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-normal">
              Before setting up WhatsAuto, verify that your computer meets the following requirements:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1">Node.js 18+</div>
                <div className="text-xs text-zinc-500">LTS version recommended from nodejs.org</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1">Git CLI</div>
                <div className="text-xs text-zinc-500">For cloning repository updates</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1">WhatsApp App</div>
                <div className="text-xs text-zinc-500">On your personal or business smartphone</div>
              </div>
            </div>
          </section>

          {/* 2. Quick Installation */}
          <section id="installation" className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
              <Download className="w-5 h-5 text-sky-500" />
              <span>2. Quick Installation</span>
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-normal">
              Run the following commands in your terminal (PowerShell, Command Prompt, or Bash):
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 mb-1.5">
                  <span>Step A: Clone & Enter Directory</span>
                  <button
                    onClick={() => handleCopyCode('cmd1', 'git clone https://github.com/py-kalki/whatsapp-automation.git\ncd whatsapp-automation')}
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200"
                  >
                    {copiedSection === 'cmd1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === 'cmd1' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-zinc-950 text-zinc-200 text-xs font-mono overflow-x-auto border border-zinc-800">
git clone https://github.com/py-kalki/whatsapp-automation.git
cd whatsapp-automation</pre>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 mb-1.5">
                  <span>Step B: Install Dependencies & Copy Config</span>
                  <button
                    onClick={() => handleCopyCode('cmd2', 'npm install\ncp .env.example .env\nnpm start')}
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200"
                  >
                    {copiedSection === 'cmd2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === 'cmd2' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-zinc-950 text-zinc-200 text-xs font-mono overflow-x-auto border border-zinc-800">
npm install
cp .env.example .env
npm start</pre>
              </div>
            </div>
          </section>

          {/* 3. WhatsApp Pairing */}
          <section id="connecting" className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
              <QrCode className="w-5 h-5 text-emerald-500" />
              <span>3. WhatsApp Pairing & Session Persistence</span>
            </h2>
            <ol className="list-decimal list-inside space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              <li>Open <strong>http://localhost:3000</strong> in your web browser.</li>
              <li>Under the <strong>WhatsApp Session Connection</strong> card, click <strong>"Start Session"</strong>.</li>
              <li>On your phone, open WhatsApp &rarr; <strong>Settings</strong> &rarr; <strong>Linked Devices</strong> &rarr; <strong>Link a Device</strong>.</li>
              <li>Scan the generated QR code. Status will turn 🟢 <strong>CONNECTED</strong>.</li>
            </ol>
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300">
              <strong>Session Persistence:</strong> Auth keys are saved locally in <code>data/auth_info_baileys/</code>. You do NOT have to scan every time you restart your laptop!
            </div>
          </section>

          {/* 4. AI Setup */}
          <section id="ai-setup" className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
              <Bot className="w-5 h-5 text-purple-500" />
              <span>4. AI Brain Configuration</span>
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-normal">
              WhatsAuto offers flexible intelligence options:
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">Antigravity Inbuilt AI (Zero API Keys)</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Uses the local Antigravity CLI (<code>agy</code>) to analyze your business persona, tone, and knowledge base FAQs locally.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">Google Gemini 2.0 / OpenAI GPT-4o</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Add <code>GEMINI_API_KEY=...</code> or <code>OPENAI_API_KEY=...</code> in your <code>.env</code> file for ultra-fast cloud model inferences.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Desktop Tray App */}
          <section id="tray-app" className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm scroll-mt-24">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
              <Monitor className="w-5 h-5 text-amber-500" />
              <span>5. Background System Tray App & Auto-Boot</span>
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-normal">
              Run WhatsAuto 24/7 in the Windows notification tray:
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <p>• <strong>1-Click Launch:</strong> Double click <code>Launch-WhatsAuto.bat</code>.</p>
              <p>• <strong>Command:</strong> Run <code>npm run tray</code>.</p>
              <p>• <strong>Auto-Start on Boot:</strong> Right-click the WhatsAuto tray icon &rarr; Check <em>"Start on Laptop Boot"</em>.</p>
              <p>• <strong>Compile .exe:</strong> Run <code>npm run dist</code> to produce <code>dist/win-unpacked/WhatsAuto.exe</code>.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
