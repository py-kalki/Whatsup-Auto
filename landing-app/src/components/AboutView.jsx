import React from 'react';
import { Mail, Heart, Cpu, Lock, ArrowRight } from 'lucide-react';
import { GithubIcon } from './icons';
import SectionFrame from './SectionFrame';

export default function AboutView({ onNavigate }) {
  return (
    <div className="pt-20 pb-16">
      <SectionFrame>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-4">
            <span className="text-[10px]">✦</span> About WhatsAuto
          </span>

          <h1 className="font-extrabold text-gray-950 dark:text-white leading-[1.1] mb-4 text-3xl sm:text-5xl tracking-tight">
            Empowering businesses with self-hosted, private automation
          </h1>

          <p className="text-[16px] text-gray-500 dark:text-gray-400 leading-relaxed">
            Built to free businesses, developers, and creators from exorbitant SaaS subscriptions ($50–$300/mo) and closed proprietary clouds.
          </p>
        </div>

        {/* Creator Spotlight Card: Vedansh Danot */}
        <div className="p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Avatar Box */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-3xl bg-[#212121] dark:bg-white text-white dark:text-black font-extrabold text-4xl flex items-center justify-center shadow-lg mb-4">
                VD
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400">
                Founder &amp; Lead Architect
              </span>
            </div>

            {/* Details */}
            <div className="md:col-span-8 flex flex-col gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  Vedansh Danot
                </h2>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Creator of WhatsAuto &amp; Open-Source AI Automation Advocate
                </p>
              </div>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                <strong>Vedansh Danot</strong> designed and architected WhatsAuto to solve a critical problem in business communications: high monthly cloud fees, per-message markups, and customer data exposure on third-party SaaS servers.
              </p>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                By uniting the high-performance Baileys multi-device WebSocket socket with local Antigravity AI, Vedansh built an end-to-end automation suite that lives 100% locally on your computer with background tray auto-run, CRM lead capture, and safe broadcast campaigns.
              </p>

              {/* Direct Creator Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="mailto:pykalki@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium text-xs text-white bg-[#212121] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-sm transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>pykalki@gmail.com</span>
                </a>

                <a
                  href="https://github.com/py-kalki"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium text-xs text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-medium text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 sm:p-7 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Zero Data Leaks</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Your WhatsApp authentication tokens, contact lists, and conversation transcripts remain strictly stored in local JSON files on your hard drive.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Zero-Key Local AI</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Powered natively by the local Antigravity CLI without requiring expensive third-party credit top-ups or external cloud API subscriptions.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Open Source Forever</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
              Released under the permissive MIT License. Free to inspect, adapt, deploy to a private VPS, or contribute back to the community.
            </p>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
