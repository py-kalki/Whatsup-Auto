import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Zap, Send, Settings } from 'lucide-react';

export default function HeroMockup() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notificationVisible] = useState(true);
  const [progress, setProgress] = useState(74);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 98 ? 65 : prev + 4));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[500px] rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white dark:bg-zinc-900 flex flex-col select-none">
      {/* Browser Window Title Bar */}
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
        </div>

        <div className="flex-1 max-w-[280px] sm:max-w-[340px] bg-gray-100 dark:bg-zinc-800 rounded-lg border border-gray-200/60 dark:border-zinc-700/60 px-3 py-1 flex items-center gap-2 mx-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></div>
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-mono font-medium truncate">
            whatsauto.local:3000/dashboard
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
          <span>TRAY ACTIVE</span>
        </div>
      </div>

      {/* Main Inner Layout: Sidebar + Dashboard Content */}
      <div className="flex flex-1 overflow-hidden bg-[#F8F9FA] dark:bg-zinc-950">
        {/* Left Mini Sidebar */}
        <div className="w-[46px] bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col items-center pt-3 pb-3 gap-3 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            W
          </div>

          <div className="flex flex-col gap-1.5 mt-1 w-full px-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              title="Dashboard"
              className={`h-7 w-full rounded-lg flex items-center justify-center transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('crm')}
              title="Leads CRM"
              className={`h-7 w-full rounded-lg flex items-center justify-center transition-colors ${
                activeTab === 'crm'
                  ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              title="Rule Engine"
              className={`h-7 w-full rounded-lg flex items-center justify-center transition-colors ${
                activeTab === 'rules'
                  ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('broadcast')}
              title="Broadcasts"
              className={`h-7 w-full rounded-lg flex items-center justify-center transition-colors ${
                activeTab === 'broadcast'
                  ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              title="Settings"
              className={`h-7 w-full rounded-lg flex items-center justify-center transition-colors ${
                activeTab === 'settings'
                  ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Main Body View */}
        <div className="flex-1 flex flex-col p-3.5 sm:p-4 gap-3 overflow-hidden">
          {/* Top Bar inside View */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-bold text-gray-900 dark:text-white">WhatsAuto Suite</p>
              <p className="text-[10px] text-gray-400">Connected: +91 98840 • Baileys Local Socket</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pm-live"></span>
                0 Cloud Fees
              </span>
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-[9px] font-bold text-gray-700 dark:text-gray-200">
                VD
              </div>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-2.5 shadow-xs">
              <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Messages</p>
              <p className="text-[16px] font-black text-gray-900 dark:text-white leading-none">2,480</p>
              <p className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">99.8% Sent</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-2.5 shadow-xs">
              <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Leads</p>
              <p className="text-[16px] font-black text-gray-900 dark:text-white leading-none">142</p>
              <p className="text-[9px] text-purple-600 dark:text-purple-400 mt-1 font-medium">+18 today</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-2.5 shadow-xs">
              <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider mb-1">AI Latency</p>
              <p className="text-[16px] font-black text-gray-900 dark:text-white leading-none">0.2s</p>
              <p className="text-[9px] text-sky-600 dark:text-sky-400 mt-1 font-medium">Antigravity AI</p>
            </div>
          </div>

          {/* Active Campaigns / Leads Tracker Box */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-xs flex-1 flex flex-col">
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-gray-100 dark:border-zinc-800">
              <p className="text-[11px] font-bold text-gray-900 dark:text-white">Active Lead Funnels</p>
              <span className="text-[9px] font-medium text-gray-400 border border-gray-200 dark:border-zinc-700 px-2 py-0.5 rounded-full">
                4 Active
              </span>
            </div>

            <div className="divide-y divide-gray-50 dark:divide-zinc-800/80 flex-1 overflow-y-auto">
              {/* Row 1 */}
              <div className="flex items-center gap-2.5 px-3.5 py-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[8px] font-bold text-emerald-800 dark:text-emerald-300 shrink-0">
                  AM
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 truncate leading-none">
                      Arjun Mehta
                    </p>
                    <span className="text-[8px] font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-md shrink-0">
                      Step 3/3 Done
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 shrink-0">Enterprise AI</span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-2.5 px-3.5 py-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-[8px] font-bold text-purple-800 dark:text-purple-300 shrink-0">
                  PS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 truncate leading-none">
                      Priya Sharma
                    </p>
                    <span className="text-[8px] font-medium text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded-md shrink-0">
                      /services
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 shrink-0">Consulting</span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-2.5 px-3.5 py-2">
                <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[8px] font-bold text-sky-800 dark:text-sky-300 shrink-0">
                  RC
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 truncate leading-none">
                      Ravi & Co.
                    </p>
                    <span className="text-[8px] font-medium text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 px-1.5 py-0.5 rounded-md shrink-0">
                      Broadcasting
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-600 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 shrink-0">450 / 500</span>
              </div>
            </div>

            {/* Bottom Real-time Stream */}
            <div className="border-t border-gray-100 dark:border-zinc-800 px-3.5 py-2 bg-gray-50/50 dark:bg-zinc-900/50 flex-shrink-0">
              <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Live Engine Feed</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                <span className="truncate">Auto-replied to <strong>+91 94420...</strong> (/lead flow started)</span>
                <span className="text-[8px] text-gray-400 ml-auto shrink-0">2s ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Live Notification Toast Badge */}
      {notificationVisible && (
        <div className="absolute bottom-3 right-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl px-3 py-2 flex items-start gap-2.5 max-w-[210px] border border-gray-700 dark:border-gray-300 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0 animate-pulse"></div>
          <div>
            <p className="text-[11px] font-bold leading-tight">Lead Captured ✓</p>
            <p className="text-[9px] text-gray-300 dark:text-gray-600 leading-snug">Synced to CSV & Admin Alerted</p>
          </div>
        </div>
      )}
    </div>
  );
}
