import React, { useState } from 'react';
import { QrCode, ArrowRight, Check } from 'lucide-react';
import SectionFrame from './SectionFrame';

export default function HowItWorks() {
  const [step1Scanned, setStep1Scanned] = useState(false);
  const [step2Rule, setStep2Rule] = useState('/lead');

  return (
    <SectionFrame className="py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-4">
          <span className="text-[10px]">✦</span> How It Works
        </span>

        <h2 className="font-extrabold text-gray-950 dark:text-white leading-[1.1] mb-3 text-3xl sm:text-4xl lg:text-[42px] tracking-tight">
          With WhatsAuto, WhatsApp automation is effortless
        </h2>

        <p className="text-[16px] text-gray-500 dark:text-gray-400 max-w-[500px] leading-relaxed">
          Stop paying monthly per-message fees. Download the .exe and automate everything in 3 steps.
        </p>

        <a
          href="https://github.com/py-kalki/Whatsup-Auto/releases/tag/v.0.1.1"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-[#212121] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white text-[14px] font-medium px-6 py-2.5 rounded-2xl transition-all duration-150 shadow-sm"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 01: Pair WhatsApp */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-6 sm:p-7 flex flex-col min-h-[420px]">
          <div className="mb-5">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-900 dark:text-white tracking-widest shadow-xs">
              01
            </span>
          </div>

          <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2 leading-snug">
            Pair your WhatsApp
          </h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
            Open the .exe, scan the QR code once with your phone. Credentials save to disk and auto-reconnect forever.
          </p>

          {/* Interactive QR Demo Widget */}
          <div className="mt-6 flex-1 flex flex-col justify-end">
            <div
              onClick={() => setStep1Scanned(!step1Scanned)}
              className="relative bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 p-4 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden transition-all hover:border-gray-300 dark:hover:border-zinc-700"
              title="Click to simulate QR scan"
            >
              {step1Scanned ? (
                <div className="flex flex-col items-center justify-center py-4 gap-2 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <p className="text-[13px] font-bold text-gray-900 dark:text-white">Device Connected!</p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">+91 98840 • Baileys Socket</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Scan QR Code</p>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Click to Pair →</span>
                  </div>

                  <div className="w-24 h-24 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 flex items-center justify-center shadow-xs">
                    <QrCode className="w-16 h-16 text-gray-800 dark:text-zinc-200" />
                  </div>

                  <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 text-center">
                    Multi-Device Multi-Session Ready
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Card 02: Set AI & Rules */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-6 sm:p-7 flex flex-col min-h-[420px]">
          <div className="mb-5">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-900 dark:text-white tracking-widest shadow-xs">
              02
            </span>
          </div>

          <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2 leading-snug">
            Configure AI & Rules
          </h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
            Add slash commands (/services, /lead) and local AI prompts with custom persona and FAQs.
          </p>

          {/* Interactive Rule Engine Widget */}
          <div className="mt-6 flex-1 flex flex-col justify-end">
            <div className="bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Trigger Rule</p>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">3-Tier Hybrid AI</span>
              </div>

              {/* Selector Pills */}
              <div className="grid grid-cols-3 gap-1.5 bg-gray-200/60 dark:bg-zinc-800 p-1 rounded-xl">
                {['/lead', '/menu', 'AI Bot'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setStep2Rule(r)}
                    className={`py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                      step2Rule === r
                        ? 'bg-white dark:bg-zinc-900 text-gray-900 dark:text-white shadow-xs'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Rule Details Preview */}
              <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 text-xs text-gray-600 dark:text-gray-300">
                {step2Rule === '/lead' && (
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-900 dark:text-white">Conversational Funnel</span>
                    <span className="text-[11px] text-gray-400">Step 1: Name → Step 2: Budget → Step 3: Admin Alert</span>
                  </div>
                )}
                {step2Rule === '/menu' && (
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-900 dark:text-white">Instant Keyword Menu</span>
                    <span className="text-[11px] text-gray-400">Replies with services & packages (&lt; 20ms latency)</span>
                  </div>
                )}
                {step2Rule === 'AI Bot' && (
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-900 dark:text-white">Antigravity Local AI</span>
                    <span className="text-[11px] text-gray-400">Zero API fees, uses system CLI & local business persona</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card 03: Runs 24/7 in System Tray */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-6 sm:p-7 flex flex-col min-h-[420px]">
          <div className="mb-5">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-900 dark:text-white tracking-widest shadow-xs">
              03
            </span>
          </div>

          <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2 leading-snug">
            Runs 24/7 in System Tray
          </h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
            Minimizes silently to your Windows taskbar. Auto-boots on PC startup and handles inbound leads continuously.
          </p>

          {/* Interactive Lead Stream Widget */}
          <div className="mt-6 flex-1 flex flex-col justify-end">
            <div className="bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Leads Pipeline</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Live Daemon</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-gray-900 dark:text-white">142 Leads</span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">+100% Local</span>
              </div>

              <div className="h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900 dark:bg-white rounded-full" style={{ width: '82%' }}></div>
              </div>

              {/* Mini Recent Activity */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 rounded-xl px-2.5 py-1.5 border border-gray-100 dark:border-zinc-800 text-[11px]">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-[9px] font-bold">
                    ✓
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 truncate">Priya S. qualified (/lead)</span>
                  <span className="text-[9px] text-gray-400 ml-auto shrink-0">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
