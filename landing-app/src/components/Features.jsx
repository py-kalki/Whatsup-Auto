import React from 'react';
import { Bot, Monitor, Users, ShieldCheck, PhoneOff, Terminal, Sparkles, CheckCircle, Download, ExternalLink } from 'lucide-react';

export default function Features() {
  const repoReleaseUrl = "https://github.com/py-kalki/whatsapp-automation/releases";

  const featureList = [
    {
      icon: Monitor,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10 border-purple-500/20',
      badge: 'Windows Background',
      title: 'Desktop System Tray .exe',
      desc: 'Runs quietly in your Windows notification tray with a single-instance lock. Auto-starts on laptop boot so your business stays online 24/7 without keeping terminal windows open.'
    },
    {
      icon: Bot,
      color: 'text-sky-500',
      bg: 'bg-sky-500/10 border-sky-500/20',
      badge: 'Local-First AI',
      title: '3-Tier Hybrid AI Brain',
      desc: 'Matches deterministic keyword rules & slash commands first (/menu, /services), then seamlessly hands off unstructured customer inquiries to Antigravity Local AI, Gemini 2.0, or GPT-4o.'
    },
    {
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      badge: 'CRM Pipeline',
      title: 'Multi-Step Lead Qualification',
      desc: 'Conversational questionnaire state machine (/lead) collects customer names, requirements, and contact preferences, syncing directly to JSON & CSV with instant admin WhatsApp alerts.'
    },
    {
      icon: ShieldCheck,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10 border-amber-500/20',
      badge: 'Anti-Ban Safety',
      title: 'Safe Jitter Broadcasts',
      desc: 'Dispatches targeted announcements with randomized humanized typing delays (4,000ms – 9,000ms) and automatic /stop opt-out compliance to safeguard your WhatsApp account.'
    },
    {
      icon: PhoneOff,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10 border-rose-500/20',
      badge: 'Call Management',
      title: 'Auto-Call Triage & Auto-Reply',
      desc: 'Intercepts voice and video calls that bots cannot answer, politely rejects them, and immediately dispatches an automated courteous WhatsApp reply to keep the customer engaged.'
    },
    {
      icon: Terminal,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      badge: 'Testing Sandbox',
      title: 'In-Browser Simulator',
      desc: 'Test your rules, conversational steps, and AI responses in an interactive phone mockup with live latency diagnostics, engine badges, and full JSON payload inspection.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Engineered for high performance, zero lock-in & privacy
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal">
            Everything your business needs to automate customer interactions without relying on costly third-party cloud subscriptions.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.bg} ${item.color} shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Bottom Download Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-800 text-white border border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Ready to get started?</span>
            <h3 className="text-2xl font-extrabold text-white mt-1">Download WhatsAuto for Windows (.exe)</h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
              1-Click installation from GitHub Releases. Pair your phone and let your PC automate customer conversations 24/7.
            </p>
          </div>

          <a
            href={repoReleaseUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-sm shadow-lg transition-all hover:scale-105 shrink-0"
          >
            <Download className="w-4 h-4 text-zinc-950" />
            <span>Download on GitHub Releases</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-950 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
}
