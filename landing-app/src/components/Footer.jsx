import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon } from './icons';

export default function Footer({ onNavigate }) {
  const repoReleaseUrl = "https://github.com/py-kalki/Whatsup-Auto/releases/tag/v.0.1.1";
  const repoUrl = "https://github.com/py-kalki/Whatsup-Auto";

  return (
    <footer className="px-3 sm:px-4 py-12 bg-[#F4F4F4] dark:bg-zinc-950 transition-colors">
      <div className="relative max-w-[1100px] mx-auto">
        {/* Corner Geometric Stamp SVGs matching Onboard.lat */}
        <svg xmlns="http://www.w3.org/2000/svg" width="95" height="80" viewBox="0 0 95 80" fill="none" className="absolute -top-6 -left-7 w-[90px] h-[75px] z-10 opacity-70 pointer-events-none" aria-hidden="true">
          <path d="M1 45L70.282 5L88.282 36.1769L19 76.1769L1 45Z" fill="currentColor" className="text-gray-300 dark:text-zinc-800" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="95" height="80" viewBox="0 0 95 80" fill="none" className="absolute -top-6 -right-7 w-[90px] h-[75px] z-10 opacity-70 rotate-90 pointer-events-none" aria-hidden="true">
          <path d="M1 45L70.282 5L88.282 36.1769L19 76.1769L1 45Z" fill="currentColor" className="text-gray-300 dark:text-zinc-800" />
        </svg>

        {/* Main Inner Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.05)] px-8 sm:px-12 py-12 sm:py-14 relative z-20">
          
          {/* Top Brand & Support Action */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
            <div>
              <div 
                onClick={() => onNavigate('/')}
                className="flex items-center gap-2.5 cursor-pointer mb-2"
              >
                <img 
                  src="/logo-whatsup.png" 
                  alt="WhatsAuto Logo" 
                  className="w-9 h-9 rounded-xl object-contain shadow-xs" 
                />
                <span className="font-extrabold text-xl text-gray-900 dark:text-white tracking-tight">
                  WhatsAuto
                </span>
              </div>
              <p className="text-[14.5px] text-gray-500 dark:text-gray-400 font-medium max-w-[280px] leading-relaxed">
                The 24/7 WhatsApp AI engine for businesses &amp; creators.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:pykalki@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all shadow-xs"
                title="Email pykalki@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all shadow-xs"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Clean 3-Column Structured Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 pb-10 border-b border-gray-100 dark:border-zinc-800">
            {/* Product */}
            <div>
              <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest mb-3.5">
                Product
              </p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <button onClick={() => onNavigate('/')} className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
                    Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('/features')} className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
                    Features
                  </button>
                </li>
                <li>
                  <a href={repoReleaseUrl} target="_blank" rel="noreferrer" className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Download .exe (v0.1.1)
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources / Docs */}
            <div>
              <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest mb-3.5">
                Documentation
              </p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <button onClick={() => onNavigate('/help')} className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
                    Setup Guide
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('/help')} className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
                    Anti-Ban &amp; Rules
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('/help')} className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
                    Local AI Configuration
                  </button>
                </li>
              </ul>
            </div>

            {/* Creator & Links */}
            <div>
              <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest mb-3.5">
                About &amp; Contact
              </p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <button onClick={() => onNavigate('/about')} className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
                    About Creator
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('/contact')} className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
                    Contact &amp; Support
                  </button>
                </li>
                <li>
                  <a href={repoUrl} target="_blank" rel="noreferrer" className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 text-[13.5px] text-gray-500 dark:text-gray-400 font-medium">
            <p>© 2026 WhatsAuto. MIT Open Source License.</p>
            <p className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              <span>in India by <strong>Vedansh Danot</strong></span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
