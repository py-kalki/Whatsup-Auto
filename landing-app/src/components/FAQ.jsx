import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How do I install and start using WhatsAuto?',
      a: 'Simply download the latest WhatsAuto.exe from GitHub Releases and double-click to run. A green icon will appear in your Windows System Tray. Right-click it to open the dashboard, scan your WhatsApp QR code once, and you are ready to automate!'
    },
    {
      q: 'Do I have to scan the QR code every time my laptop restarts?',
      a: 'No! Your multi-device authentication credentials persist securely on your hard drive in data/auth_info_baileys/. When restarting your computer or launching WhatsAuto, it automatically reconnects in the background without requiring a re-scan.'
    },
    {
      q: 'How does the Antigravity Inbuilt AI work without API keys?',
      a: 'WhatsAuto interfaces directly with the local Antigravity CLI (agy) on your system. It formats contextual prompts from your business profile, persona tone, and knowledge base FAQs to craft natural responses with zero API costs.'
    },
    {
      q: 'How does the Windows System Tray background app work?',
      a: 'WhatsAuto.exe runs silently in your Windows notification tray. You can right-click the tray icon to toggle "Start on Laptop Boot" so it starts automatically whenever your laptop powers on, keeping your customer auto-replies active 24/7.'
    },
    {
      q: 'How do you ensure my WhatsApp account is safe from bans?',
      a: 'WhatsAuto implements humanized jitter delays (randomized 4,000ms – 9,000ms between dispatches), audience tag filtering, and automatic /stop opt-out compliance to prevent automated spam flags.'
    },
    {
      q: 'Can I customize the conversational CRM lead questions?',
      a: 'Yes! You can edit any step in the Flow Builder tab or data/flows.json, define custom questions, validation checks, and automatic admin WhatsApp alerts sent directly to your phone.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center justify-between gap-4"
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-zinc-900 dark:text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
