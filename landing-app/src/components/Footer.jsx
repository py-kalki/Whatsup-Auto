import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon } from './icons';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-200/80 dark:border-zinc-800/80">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black text-sm flex items-center justify-center shadow-xs">
                W
              </div>
              <span className="font-extrabold text-base text-zinc-900 dark:text-white tracking-tight">
                WhatsAuto
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed font-normal">
              The open-source, privacy-first WhatsApp business automation, local AI agent, and conversational CRM platform.
            </p>

            <div className="text-xs text-zinc-500 font-medium pt-1">
              Created & maintained by{' '}
              <span className="font-bold text-zinc-900 dark:text-zinc-200">Vedansh Danot</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Navigation
            </div>
            <button onClick={() => onNavigate('home')} className="text-xs hover:text-zinc-900 dark:hover:text-white text-left transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => onNavigate('features')} className="text-xs hover:text-zinc-900 dark:hover:text-white text-left transition-colors cursor-pointer">
              Features
            </button>
            <button onClick={() => onNavigate('about')} className="text-xs hover:text-zinc-900 dark:hover:text-white text-left transition-colors cursor-pointer">
              About & Creator
            </button>
            <button onClick={() => onNavigate('help')} className="text-xs hover:text-zinc-900 dark:hover:text-white text-left transition-colors cursor-pointer">
              Help & Docs
            </button>
            <button onClick={() => onNavigate('contact')} className="text-xs hover:text-zinc-900 dark:hover:text-white text-left transition-colors cursor-pointer">
              Contact
            </button>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Product
            </div>
            <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="text-xs hover:text-zinc-900 dark:hover:text-white transition-colors">
              Web Dashboard
            </a>
            <button onClick={() => onNavigate('help')} className="text-xs hover:text-zinc-900 dark:hover:text-white text-left transition-colors cursor-pointer">
              Installation
            </button>
            <button onClick={() => onNavigate('help')} className="text-xs hover:text-zinc-900 dark:hover:text-white text-left transition-colors cursor-pointer">
              AI Brain Setup
            </button>
            <button onClick={() => onNavigate('help')} className="text-xs hover:text-zinc-900 dark:hover:text-white text-left transition-colors cursor-pointer">
              Desktop Tray .exe
            </button>
          </div>

          {/* Creator & Community */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Community & Contact
            </div>
            <a
              href="mailto:pykalki@gmail.com"
              className="text-xs hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>pykalki@gmail.com</span>
            </a>
            <a
              href="https://github.com/py-kalki/whatsapp-automation"
              target="_blank"
              rel="noreferrer"
              className="text-xs hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub Repository</span>
            </a>
            <div className="text-[11px] text-zinc-400 mt-2">
              Distributed under the <strong>MIT License</strong>.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © 2026 WhatsAuto. Open source and self-hosted forever.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>by <strong className="text-zinc-700 dark:text-zinc-300">Vedansh Danot</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
