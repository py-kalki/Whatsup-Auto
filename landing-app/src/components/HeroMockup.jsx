import React, { useState, useEffect } from 'react';
import { Maximize2, X, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroMockup() {
  const [showModal, setShowModal] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showModal]);

  return (
    <>
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white dark:bg-zinc-900 flex flex-col group">
        {/* Window Chrome / Title Bar */}
        <div className="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          </div>

          {/* URL / Status Bar */}
          <div className="flex-1 max-w-[260px] sm:max-w-[320px] bg-gray-100 dark:bg-zinc-800/80 rounded-lg border border-gray-200/60 dark:border-zinc-700/60 px-3 py-1 flex items-center gap-2 mx-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></div>
            <span className="text-[11px] text-gray-600 dark:text-gray-300 font-mono font-medium truncate">
              whatsauto.local:3000/dashboard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
              TRAY ACTIVE
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Expand full dashboard preview"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dashboard Image Viewport */}
        <div
          onClick={() => setShowModal(true)}
          className="relative bg-gray-50 dark:bg-zinc-950 overflow-hidden cursor-zoom-in"
        >
          <img
            src="/dashboard.png"
            alt="WhatsAuto Desktop Dashboard UI"
            className="w-full h-auto object-cover object-top block transition-transform duration-500 group-hover:scale-[1.015]"
            loading="eager"
          />

          {/* Subtle bottom gradient shadow overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>

          {/* Floating Live Badges */}
          <div className="absolute bottom-3 left-3 hidden sm:flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200/80 dark:border-zinc-700/80 shadow-lg text-[11px] font-semibold text-gray-800 dark:text-gray-200 animate-in fade-in duration-300 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Baileys Socket Connected</span>
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-gray-900/90 dark:bg-white/95 text-white dark:text-gray-950 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg text-[11px] font-bold border border-gray-700/50 dark:border-gray-200 transition-transform duration-200 hover:scale-105">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-500" />
            <span>0 Cloud Fees</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Detailed Inspection */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-6xl w-full bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-700 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 font-mono">
                  WhatsAuto Desktop v2.0 • Live Dashboard
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Image View */}
            <div className="overflow-auto p-2 sm:p-4 bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
              <img
                src="/dashboard.png"
                alt="WhatsAuto Desktop Dashboard UI Full Preview"
                className="w-full h-auto rounded-xl shadow-md border border-gray-200 dark:border-zinc-800"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
