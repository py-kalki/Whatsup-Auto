import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import SectionFrame from './SectionFrame';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What is WhatsAuto and how does it work?',
      a: 'WhatsAuto is a standalone desktop automation daemon built for Windows. It connects directly to WhatsApp multi-device WebSockets (via Baileys) without requiring costly cloud API subscriptions. It runs quietly in your system tray to auto-reply, qualify CRM leads, and dispatch broadcasts 24/7.'
    },
    {
      q: 'Do I have to re-scan the QR code every time my laptop restarts?',
      a: 'No! Your multi-device authentication credentials persist securely on your hard drive in data/auth_info_baileys/. When restarting your computer or launching WhatsAuto, it automatically reconnects in the background without requiring a re-scan.'
    },
    {
      q: 'How does the Antigravity local AI work without API keys?',
      a: 'WhatsAuto interfaces directly with the local Antigravity CLI (agy) on your system. It formats contextual prompts from your business profile, persona tone, and knowledge base FAQs to craft natural responses with zero API fees.'
    },
    {
      q: 'How do you ensure my WhatsApp account is safe from bans?',
      a: 'WhatsAuto implements humanized jitter delays (randomized 4,000ms – 9,000ms between dispatches), audience tag filtering, and automatic /stop opt-out compliance to prevent automated spam flags.'
    },
    {
      q: 'Can I customize the conversational CRM lead questions?',
      a: 'Yes! You can edit any step in the Flow Builder tab or data/flows.json, define custom questions, validation checks, and automatic admin WhatsApp alerts sent directly to your phone.'
    },
    {
      q: 'Can I integrate WhatsAuto with my existing webhooks or CRM?',
      a: 'Yes! WhatsAuto includes built-in REST API endpoints (e.g. POST /api/send-message, POST /api/broadcast) allowing you to trigger automated messages from Zapier, Make, Notion, or your custom backend.'
    }
  ];

  return (
    <SectionFrame className="py-14 sm:py-20" id="faq">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-4">
          <span className="text-[10px]">✦</span> FAQ
        </span>

        <h2 className="font-extrabold text-gray-950 dark:text-white leading-[1.1] mb-6 text-3xl sm:text-4xl lg:text-[42px] tracking-tight">
          Frequently asked questions
        </h2>

        <a
          href="https://github.com/py-kalki/Whatsup-Auto/releases/tag/v.0.1.1"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#212121] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white text-[14px] font-medium px-6 py-2.5 rounded-2xl transition-all duration-150 shadow-sm"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Accordion Container matching Onboard.lat */}
      <div className="max-w-[760px] mx-auto flex flex-col divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-[0_2px_14px_rgba(0,0,0,0.04)]">
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="transition-colors">
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between px-6 sm:px-8 py-5 text-left hover:bg-gray-50/80 dark:hover:bg-zinc-800/50 transition-colors duration-150 group cursor-pointer"
              >
                <span className="text-[15px] font-semibold pr-6 text-gray-900 dark:text-white transition-colors">
                  {f.q}
                </span>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isOpen
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-zinc-700'
                  }`}
                >
                  {isOpen ? <Minus className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 sm:px-8 pb-5 text-[14px] text-gray-500 dark:text-gray-400 leading-[1.75] font-normal animate-in fade-in duration-200">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionFrame>
  );
}
