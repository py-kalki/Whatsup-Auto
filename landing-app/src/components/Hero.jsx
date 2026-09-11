import React, { useState } from 'react';
import { ArrowRight, Download, BookOpen, Copy, Check, Terminal, Shield, Zap, Monitor, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';

export default function Hero({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const [showCli, setShowCli] = useState(false);
  const repoReleaseUrl = "https://github.com/py-kalki/whatsapp-automation/releases";
  const installCmd = "git clone https://github.com/py-kalki/whatsapp-automation.git && npm install && npm start";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-14 pb-12 sm:pt-20 sm:pb-16 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Release Pill Badge linking to GitHub Releases */}
        <a 
          href={repoReleaseUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-xs hover:border-emerald-500/50 cursor-pointer transition-all mb-8 backdrop-blur-md group"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">WhatsAuto v2.0 Released</span>
          <span className="text-emerald-400 dark:text-emerald-600">•</span>
          <span className="text-xs text-emerald-700 dark:text-emerald-300/90 group-hover:text-emerald-900 dark:group-hover:text-white transition-colors">
            Download Windows .exe (64-bit)
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          Automate WhatsApp on your PC.{' '}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
            100% Free & Self-Hosted.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Download the standalone Windows <span className="font-semibold text-zinc-900 dark:text-zinc-200">.exe</span>, pair your WhatsApp in seconds, and let your AI agent handle 24/7 customer replies, CRM lead capture, and safe broadcasts silently in your system tray.
        </p>

        {/* Primary CTA Group: Download Windows .exe from GitHub Releases */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={repoReleaseUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <div className="text-left">
              <div className="text-xs font-medium text-emerald-100 uppercase tracking-wider leading-none">Download for Windows</div>
              <div className="text-sm sm:text-base font-extrabold leading-tight">Get WhatsAuto .exe (GitHub)</div>
            </div>
            <span className="text-xs bg-emerald-700/60 px-2 py-0.5 rounded-md font-mono text-emerald-100 ml-1">v2.0</span>
          </a>

          <button
            onClick={() => onNavigate('help')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>Setup & User Manual</span>
          </button>

          <a
            href="https://github.com/py-kalki/whatsapp-automation"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-semibold text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 transition-all"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Source Code</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* 3-Step Simple User Journey */}
        <div className="mt-12 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 max-w-3xl mx-auto text-left shadow-xs">
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>How It Works in 3 Quick Steps:</span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Zero Coding Required</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">Download & Launch</div>
                <div className="text-[11px] text-zinc-500 leading-snug mt-0.5">Get the <code className="text-zinc-800 dark:text-zinc-200 font-semibold">.exe</code> from GitHub Releases and open it.</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">Scan WhatsApp QR</div>
                <div className="text-[11px] text-zinc-500 leading-snug mt-0.5">Link once from your phone; auto-reconnects forever!</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">Runs in Tray 24/7</div>
                <div className="text-[11px] text-zinc-500 leading-snug mt-0.5">Minimizes to taskbar & boots on startup automatically.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Developer CLI Section */}
        <div className="mt-6 max-w-2xl mx-auto">
          <button
            onClick={() => setShowCli(!showCli)}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer? Run from Source Code (Node.js CLI)</span>
            {showCli ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showCli && (
            <div className="mt-3 p-3.5 rounded-xl bg-zinc-950 dark:bg-zinc-900/90 border border-zinc-800 text-left shadow-lg flex items-center justify-between gap-3 overflow-hidden animate-in fade-in duration-200">
              <div className="flex items-center gap-2 overflow-x-auto font-mono text-xs text-zinc-300">
                <span className="text-zinc-500 select-none">$</span>
                <span>git clone https://github.com/py-kalki/whatsapp-automation.git && npm start</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors shrink-0"
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
          )}
        </div>

        {/* Feature Badges Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5 font-medium">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>100% Privacy • Messages Stay on Disk</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Zero-Cost Inbuilt Antigravity AI</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Monitor className="w-4 h-4 text-purple-500" />
            <span>Silent Windows Tray Daemon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
