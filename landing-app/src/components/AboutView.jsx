import React from 'react';
import { Mail, Heart, Cpu, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { GithubIcon } from './icons';

export default function AboutView({ onNavigate }) {
  return (
    <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>About WhatsAuto</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight">
          Empowering businesses with{' '}
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            self-hosted, privacy-first automation
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
          Built to free developers, creators, and business teams from exorbitant SaaS fees ($50–$300/mo) and closed proprietary platforms.
        </p>
      </div>

      {/* Creator Spotlight Card: Vedansh Danot */}
      <div className="p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Avatar Box */}
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 text-white dark:text-zinc-900 font-black text-4xl flex items-center justify-center shadow-lg mb-4">
              VD
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
              Founder & Lead Architect
            </span>
          </div>

          {/* Details */}
          <div className="md:col-span-8 flex flex-col gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white">
                Vedansh Danot
              </h2>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mt-0.5">
                Creator of WhatsAuto & Open-Source AI Automation Advocate
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              <strong>Vedansh Danot</strong> designed and architected WhatsAuto to solve a critical issue in the business communications market: high monthly cloud fees, per-message markups, and customer data exposure on third-party SaaS servers.
            </p>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              By uniting the high-performance Baileys multi-device WebSocket socket with local Antigravity AI, Vedansh built an end-to-end automation suite that lives 100% locally on your computer with background tray auto-run, CRM lead capture, and safe broadcast campaigns.
            </p>

            {/* Direct Creator Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="mailto:pykalki@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>pykalki@gmail.com</span>
              </a>

              <a
                href="https://github.com/py-kalki"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </a>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Zero Data Leaks</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Your WhatsApp authentication tokens, contact lists, and conversation transcripts remain strictly stored in local JSON files on your hard drive.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Zero-Key Local AI</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Powered natively by the local Antigravity CLI without requiring expensive third-party credit top-ups or external cloud API subscriptions.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Open Source Forever</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Released under the permissive MIT License. Free to inspect, adapt, deploy to a private VPS, or contribute back to the community.
          </p>
        </div>
      </div>
    </div>
  );
}
