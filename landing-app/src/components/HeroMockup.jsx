import React, { useState } from 'react';
import { Lock, Radio, MessageSquare, Users, Zap, Bot, GitBranch, Send, Image as ImageIcon, Monitor } from 'lucide-react';

export default function HeroMockup() {
  const [imageError, setImageError] = useState(false);
  const [activeMockTab, setActiveMockTab] = useState('rules');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-20">
      {/* Desktop App Container */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden transition-all">
        {/* Mockup Window Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 select-none">
          {/* Window Traffic Lights & App Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-xs"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-xs"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
            </div>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>WhatsAuto Desktop v2.0 • Windows Tray Daemon</span>
            </div>
          </div>

          {/* URL Search / Address Bar */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 font-mono max-w-xs sm:max-w-sm w-full mx-2 shadow-xs">
            <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="truncate">http://localhost:3000 • WhatsAuto Hub</span>
          </div>

          {/* Live Status Badge */}
          <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>CONNECTED</span>
          </div>
        </div>

        {/* Hero Mockup Content / Image Area */}
        <div className="relative min-h-[480px] bg-zinc-50/50 dark:bg-zinc-950 flex flex-col justify-center">
          {/* Custom Screenshot Image Tag */}
          {!imageError && (
            <img
              src="/dashboard-preview.png"
              alt="WhatsAuto Dashboard Interface"
              className="w-full h-auto object-cover block"
              onError={() => setImageError(true)}
            />
          )}

          {/* Interactive Mockup Fallback when screenshot is not yet placed */}
          {imageError && (
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              {/* Top Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <span>Engine Status</span>
                    <Radio className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-zinc-900 dark:text-white">Active</div>
                  <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Baileys v7 Socket (Local)</div>
                </div>

                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <span>Messages Handled</span>
                    <MessageSquare className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="text-2xl font-black text-zinc-900 dark:text-white">1,482</div>
                  <div className="text-[11px] text-zinc-500">24/7 Silent Automation</div>
                </div>

                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <span>Leads Captured</span>
                    <Users className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-2xl font-black text-zinc-900 dark:text-white">128</div>
                  <div className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">Auto-Synced to CSV</div>
                </div>

                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <span>AI Response Speed</span>
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-zinc-900 dark:text-white">0.3s</div>
                  <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Antigravity Local AI</div>
                </div>
              </div>

              {/* Main Dashboard Layout Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Sidebar Navigation */}
                <div className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col gap-1">
                  <button 
                    onClick={() => setActiveMockTab('rules')}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      activeMockTab === 'rules'
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Rule Engine</span>
                  </button>

                  <button 
                    onClick={() => setActiveMockTab('flows')}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      activeMockTab === 'flows'
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <GitBranch className="w-4 h-4 text-purple-500" />
                    <span>Flow Builder</span>
                  </button>

                  <button 
                    onClick={() => setActiveMockTab('ai')}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      activeMockTab === 'ai'
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <Bot className="w-4 h-4 text-sky-500" />
                    <span>AI Brain (Local)</span>
                  </button>

                  <button 
                    onClick={() => setActiveMockTab('campaigns')}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      activeMockTab === 'campaigns'
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <Send className="w-4 h-4 text-emerald-500" />
                    <span>Broadcasts</span>
                  </button>

                  {/* System Tray Badge in sidebar */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 px-2 flex flex-col gap-1 text-[11px] text-zinc-500">
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
                      <Monitor className="w-3.5 h-3.5 text-purple-500" />
                      <span>Windows Tray Active</span>
                    </div>
                    <span>Auto-Start on Boot: Enabled</span>
                  </div>
                </div>

                {/* Main Body Preview */}
                <div className="md:col-span-3 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Conversational Lead Qualifier</h4>
                      <p className="text-xs text-zinc-500">Multi-step questionnaire with instant admin WhatsApp alerts</p>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      Trigger: /lead
                    </span>
                  </div>

                  {/* Flow Diagram Mock */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Step 1</span>
                      <span className="text-xs font-semibold text-zinc-900 dark:text-white">Inbound /lead</span>
                      <p className="text-[11px] text-zinc-500">Ask user for Full Name</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Step 2</span>
                      <span className="text-xs font-semibold text-zinc-900 dark:text-white">Service Selection</span>
                      <p className="text-[11px] text-zinc-500">1. AI Bot, 2. Broadcasts</p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Step 3 (Completed)</span>
                      <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Save Lead & Alert</span>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Syncs to leads.json & CSV</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative Image Replacement Callout */}
              <div className="self-center inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-300 text-xs shadow-md border border-zinc-800">
                <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>Place your dashboard screenshot at <code>public/dashboard-preview.png</code> anytime!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
