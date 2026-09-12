import React from 'react';
import { 
  Monitor, Bot, Users, ShieldCheck, PhoneOff, 
  FileText, Bell, Lock
} from 'lucide-react';
import SectionFrame from './SectionFrame';

export default function Features() {
  // 8 Bento Features with Conic Spin on hover & pushpin badge
  const bentoItems = [
    {
      title: 'Desktop Tray Daemon',
      desc: 'Runs silently in your Windows notification tray with single-instance lock.',
      icon: Monitor,
      pinColor: 'from-[#6EE7B7] via-[#10B981] to-[#047857]'
    },
    {
      title: 'Anti-Ban Jitter Delays',
      desc: 'Randomized 4,000ms–9,000ms human typing delays & /stop opt-out compliance.',
      icon: ShieldCheck,
      pinColor: 'from-[#FCA5A5] via-[#DC2626] to-[#7F1D1D]'
    },
    {
      title: 'Zero-Key Local AI',
      desc: 'Powered natively by Antigravity CLI with zero API keys or external cloud fees.',
      icon: Bot,
      pinColor: 'from-[#93C5FD] via-[#3B82F6] to-[#1D4ED8]'
    },
    {
      title: 'Call Triage Auto-Reply',
      desc: 'Politely rejects voice/video calls and immediately sends a courteous message.',
      icon: PhoneOff,
      pinColor: 'from-[#FDE047] via-[#EAB308] to-[#A16207]'
    },
    {
      title: 'Document & Media Hub',
      desc: 'Auto-dispatch product catalogs, PDFs, and images based on user commands.',
      icon: FileText,
      pinColor: 'from-[#C4B5FD] via-[#8B5CF6] to-[#5B21B6]'
    },
    {
      title: 'Lead CRM & CSV Sync',
      desc: 'Auto-qualifies inbound customers and syncs contact data to local CSV files.',
      icon: Users,
      pinColor: 'from-[#F9A8D4] via-[#EC4899] to-[#9D174D]'
    },
    {
      title: 'Admin Alert Webhooks',
      desc: 'Instant WhatsApp notifications sent to your personal phone on high-value leads.',
      icon: Bell,
      pinColor: 'from-[#6EE7B7] via-[#10B981] to-[#047857]'
    },
    {
      title: 'Persistent QR Lock',
      desc: 'Multi-device Baileys tokens persist safely on disk. Never re-scan on reboot.',
      icon: Lock,
      pinColor: 'from-[#93C5FD] via-[#3B82F6] to-[#1D4ED8]'
    }
  ];

  return (
    <SectionFrame className="py-12 sm:py-20" id="features">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-4">
          <span className="text-[10px]">✦</span> Why WhatsAuto
        </span>

        <h2 className="font-extrabold text-gray-950 dark:text-white leading-[1.1] mb-3 text-3xl sm:text-4xl lg:text-[42px] tracking-tight">
          Everything you need.<br className="hidden sm:block" /> Nothing you don't.
        </h2>

        <p className="text-[16px] text-gray-500 dark:text-gray-400 max-w-[480px] leading-relaxed">
          Engineered for privacy, zero monthly subscriptions, and reliable local execution.
        </p>
      </div>

      {/* 2x2 Deep-Dive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
        {/* Deep Dive Card 1: 100% Local Data */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-7 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
          <div>
            <p className="text-[28px] font-bold text-gray-900 dark:text-white leading-none tracking-tight">100%</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 mb-3 font-semibold uppercase tracking-wider">Local &amp; Private</p>
            <h3 className="text-[16px] font-bold text-gray-900 dark:text-white mb-1.5">Zero Data Leaks</h3>
            <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Your authentication tokens, conversation transcripts, and customer CRM contacts stay strictly on your computer.
            </p>
          </div>

          <div className="mt-5 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Local Storage</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                Encrypted on Disk
              </span>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                <span>data/auth_info_baileys/ (Multi-device keys)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                <span>data/leads.json &amp; leads.csv (Direct CRM exports)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                <span>data/rules.json (Custom keyword triggers)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Card 2: Live Activity Feed */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-7 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
          <div>
            <p className="text-[28px] font-bold text-gray-900 dark:text-white leading-none tracking-tight">0</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 mb-3 font-semibold uppercase tracking-wider">Missed Leads</p>
            <h3 className="text-[16px] font-bold text-gray-900 dark:text-white mb-1.5">24/7 Silent Auto-Replies</h3>
            <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Handles incoming questions instantly, qualifies buyer intent, and sends WhatsApp alerts to your phone.
            </p>
          </div>

          <div className="mt-5 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Activity Feed</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pm-live"></span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Live</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5 bg-white dark:bg-zinc-900 rounded-xl px-3 py-2 border border-gray-100 dark:border-zinc-800 text-[11px]">
                <div className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-[9px] font-bold">AI</div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">Replied to pricing inquiry</span>
                  <span className="text-[9px] text-gray-400">Antigravity Local • 0.2s</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-600">✓ Sent</span>
              </div>

              <div className="flex items-center gap-2.5 bg-white dark:bg-zinc-900 rounded-xl px-3 py-2 border border-gray-100 dark:border-zinc-800 text-[11px]">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[9px] font-bold">CRM</div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">Captured new lead: Rohan K.</span>
                  <span className="text-[9px] text-gray-400">Budget: $2,500</span>
                </div>
                <span className="text-[9px] font-bold text-purple-600">✓ Alerted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Card 3: Contextual WhatsApp Chat */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-7 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
          <div>
            <p className="text-[28px] font-bold text-gray-900 dark:text-white leading-none tracking-tight">1</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 mb-3 font-semibold uppercase tracking-wider">Place for All Inquiries</p>
            <h3 className="text-[16px] font-bold text-gray-900 dark:text-white mb-1.5">Intelligent Conversational Agent</h3>
            <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Deterministic rule matching first for speed, with seamless AI fallback for open-ended questions.
            </p>
          </div>

          <div className="mt-5 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Simulated Chat</p>
              <span className="text-[10px] text-gray-400 font-medium">WhatsApp Web / Phone</span>
            </div>

            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-2xl rounded-tl-xs bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 text-[12px] max-w-[85%]">
                Can I integrate this with my existing webhooks?
              </div>
            </div>

            <div className="flex justify-end">
              <div className="px-3 py-2 rounded-2xl rounded-tr-xs bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[12px] max-w-[85%]">
                Yes! WhatsAuto includes REST API endpoints to trigger dispatches from Zapier or any backend. 🚀
              </div>
            </div>

            {/* Typing indicator */}
            <div className="flex items-center gap-1 px-3 py-1 bg-white dark:bg-zinc-900 rounded-full w-max border border-gray-100 dark:border-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-chat-dot-1"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-chat-dot-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-chat-dot-3"></span>
            </div>
          </div>
        </div>

        {/* Deep Dive Card 4: Safe Broadcasts & Rate Limiting */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-7 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
          <div>
            <p className="text-[28px] font-bold text-gray-900 dark:text-white leading-none tracking-tight">99.4%</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 mb-3 font-semibold uppercase tracking-wider">Delivery Rate</p>
            <h3 className="text-[16px] font-bold text-gray-900 dark:text-white mb-1.5">Anti-Ban Broadcast Engine</h3>
            <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Randomized delays, humanized typing simulation, and /stop opt-out compliance protect your account.
            </p>
          </div>

          <div className="mt-5 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Campaign: VIP Launch</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Active Jitter: 5.2s
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Progress: 450 / 500 contacts</span>
              <span className="font-bold text-gray-900 dark:text-white">90%</span>
            </div>

            <div className="h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-gray-900 dark:bg-white rounded-full" style={{ width: '90%' }}></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-1">
              <span>Opt-outs respected: 0 complaints</span>
              <span className="text-emerald-600 font-semibold">0 Bans ✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* "...and so much more!" Bento Grid Header */}
      <div className="mt-16 mb-10 text-center">
        <h2 className="font-extrabold text-gray-950 dark:text-white text-3xl sm:text-4xl tracking-tight">
          ...and so much more!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Everything you need to run high-volume WhatsApp automation effortlessly.
        </p>
      </div>

      {/* 8 Bento Square Cards with Spinning Conic Gradient Borders on Hover & 3D Pins */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {bentoItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="relative">
              {/* 3D Glass Pin Badge at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-6 h-6 flex items-center justify-center pointer-events-none">
                <div className="absolute -bottom-1.5 -right-1 w-3 h-4 bg-black/20 rounded-full blur-[2px] rotate-45"></div>
                <div className="absolute w-4 h-4 rounded-full bg-[#111827] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
                <div className={`absolute w-5 h-5 rounded-full bg-gradient-to-br ${item.pinColor} shadow-[0_2px_4px_rgba(0,0,0,0.5)] flex items-start justify-start p-0.5`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 blur-[0.5px] ml-0.5 mt-0.5"></div>
                </div>
              </div>

              {/* Bento Card with Spinning Conic Gradient Border */}
              <div className="group relative rounded-[20px] p-[1.5px] transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 aspect-square cursor-default overflow-hidden">
                {/* Conic Gradient Spinner */}
                <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10B981_0%,transparent_40%,transparent_60%,#10B981_100%)] opacity-80"></div>

                {/* Inner Card Container */}
                <div className="relative flex h-full w-full flex-col bg-white dark:bg-zinc-900 rounded-[19px] z-10">
                  <div className="relative flex flex-col items-center justify-center h-full overflow-hidden p-4 sm:p-5 z-10">
                    
                    {/* Default State: Icon + Title */}
                    <div className="flex flex-col items-center gap-2.5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-6 group-hover:opacity-0 will-change-transform text-center">
                      <div className="w-11 h-11 rounded-2xl bg-[#F9F9F9] dark:bg-zinc-800 border border-gray-200/60 dark:border-zinc-700 flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5 text-gray-800 dark:text-zinc-200" />
                      </div>
                      <span className="text-[12.5px] font-bold text-gray-800 dark:text-zinc-200 leading-tight">
                        {item.title}
                      </span>
                    </div>

                    {/* Hover State: Expanded Details */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 translate-y-8 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-0 group-hover:opacity-100 will-change-transform text-center">
                      <div className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center shadow-md">
                        <Icon className="w-4 h-4 text-white dark:text-black" />
                      </div>
                      <p className="text-[12px] font-bold text-gray-900 dark:text-white leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[10.5px] text-gray-500 dark:text-gray-400 leading-snug">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Ambient glow underneath */}
                <div className="absolute inset-0 rounded-[20px] bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-500 blur-xl -z-10"></div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionFrame>
  );
}
