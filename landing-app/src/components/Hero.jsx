import React from 'react';
import { Star, Download, ArrowRight } from 'lucide-react';
import HeroMockup from './HeroMockup';
import SectionFrame from './SectionFrame';

export default function Hero({ onNavigate }) {
  const repoReleaseUrl = "https://github.com/py-kalki/Whatsup-Auto/releases/tag/v.0.1.1";

  return (
    <SectionFrame className="pt-24 sm:pt-28 pb-10" containerClassName="flex flex-col">
      {/* Outer Card with subtle border and elevation */}
      <div className="flex-1 flex flex-col rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-[0_2px_24px_rgba(0,0,0,0.06)] overflow-hidden bg-white dark:bg-zinc-900/90">
        
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 border-b border-gray-100 dark:border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-300">
              WhatsAuto Desktop v2.0
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[12px] text-gray-400 dark:text-gray-500 font-medium">
            <span><strong className="text-gray-800 dark:text-gray-200 font-semibold">1,200+</strong> businesses</span>
            <span className="w-px h-3 bg-gray-200 dark:bg-zinc-700 inline-block"></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Free Forever</span>
          </div>
        </div>

        {/* 2-Column Split: Left Copy & CTA, Right Dashboard Mockup */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[50%_50%]">
          {/* Left Column */}
          <div className="flex flex-col justify-center px-6 sm:px-10 py-10 sm:py-14 lg:border-r border-gray-100 dark:border-zinc-800">
            <h1 className="font-extrabold text-gray-950 dark:text-white leading-[1.08] text-3xl sm:text-5xl lg:text-[52px] tracking-tight">
              The 24/7 WhatsApp AI engine for<br className="hidden sm:inline" /> businesses & creators.
            </h1>

            <p className="mt-5 text-[15.5px] leading-relaxed text-gray-500 dark:text-gray-400 max-w-[440px] font-normal">
              Everything after someone messages you — instant AI auto-replies, multi-step lead capture, CRM qualification, and safe broadcasts — running quietly on your PC.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-[440px]">
              {/* Google / Windows 1-Click Download */}
              <a
                href={repoReleaseUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 bg-[#212121] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white w-full py-3 rounded-2xl text-[14px] font-medium transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:scale-[1.01] active:scale-[0.99] group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Windows .exe (v2.0)</span>
              </a>

              {/* Documentation / Quickstart Button */}
              <button
                onClick={() => onNavigate('help')}
                className="flex items-center justify-center gap-1.5 bg-[#F7F7F7] hover:bg-[#F0F0F0] dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#555555] dark:text-zinc-200 w-full sm:w-auto px-5 py-3 rounded-2xl text-[14px] font-medium border border-gray-200/80 dark:border-zinc-700 transition-all duration-150 shrink-0 cursor-pointer"
              >
                <span>Docs</span>
                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-zinc-400" />
              </button>
            </div>

            {/* Star Rating Social Proof */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gray-900 text-gray-900 dark:fill-white dark:text-white" />
                ))}
              </div>
              <p className="text-[13px] text-gray-400 dark:text-gray-500">
                <strong className="text-gray-800 dark:text-gray-200 font-semibold">4.9 / 5</strong> — loved by 1,200+ businesses & developers
              </p>
            </div>
          </div>

          {/* Right Column (Hero Mockup) */}
          <div className="p-4 sm:p-6 bg-gray-50/50 dark:bg-zinc-950/50 flex flex-col justify-center">
            <HeroMockup />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
