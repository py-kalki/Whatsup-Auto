import React, { useState } from 'react';
import { ArrowRight, Play, BookOpen, Copy, Check, Terminal, Sparkles, Shield, Zap } from 'lucide-react';

export default function Hero({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const installCmd = "git clone https://github.com/py-kalki/whatsapp-automation.git && npm install && npm start";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Release Pill Badge */}
        <div 
          onClick={() => onNavigate('about')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer transition-all mb-8 backdrop-blur-md group"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">WhatsAuto v2.0 Released</span>
          <span className="text-zinc-400 dark:text-zinc-500">•</span>
          <span className="text-xs text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
            100% Local AI & Background Tray
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          The Open-Source{' '}
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            WhatsApp AI Agent
          </span>{' '}
          & Automation Suite
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Automate 24/7 customer support, capture high-intent CRM leads, and dispatch safe broadcasts with anti-ban jitter directly from your machine. Zero cloud vendor lock-in.
        </p>

        {/* CTA Group */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-cal transition-all hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Web Hub</span>
          </a>

          <button
            onClick={() => onNavigate('help')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-zinc-500" />
            <span>Documentation</span>
          </button>
        </div>

        {/* Quick Install Terminal Box */}
        <div className="mt-10 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-950 dark:bg-zinc-900/90 border border-zinc-800 text-left shadow-lg max-w-full overflow-hidden">
          <Terminal className="w-4 h-4 text-sky-400 shrink-0" />
          <div className="font-mono text-xs sm:text-sm text-zinc-300 truncate">
            <span className="text-zinc-500 select-none">$ </span>
            <span>git clone https://github.com/py-kalki/whatsapp-automation.git && npm start</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors shrink-0"
            title="Copy command"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Feature Badges Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>100% Privacy & Local Storage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Antigravity Zero-Key AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Windows Tray .exe Auto-Boot</span>
          </div>
        </div>
      </div>
    </section>
  );
}
