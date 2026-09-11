import React, { useState } from 'react';
import { Download, Sun, Moon, Menu, X, Bot, Sparkles, BookOpen, Mail, User } from 'lucide-react';
import { GithubIcon } from './icons';

export default function Navbar({ currentPath = '/', onNavigate, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const repoReleaseUrl = "https://github.com/py-kalki/whatsapp-automation/releases";

  const navItems = [
    { path: '/', label: 'Home', icon: Sparkles },
    { path: '/features', label: 'Features', icon: Bot },
    { path: '/about', label: 'About', icon: User },
    { path: '/help', label: 'Help & Docs', icon: BookOpen },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 glass-nav transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm transition-transform group-hover:scale-105">
            W
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-white">
              WhatsAuto
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Desktop .exe
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/70 dark:bg-zinc-900/70 p-1 rounded-full border border-zinc-200/80 dark:border-zinc-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path === '/help' && currentPath === '/docs');
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="https://github.com/py-kalki/whatsapp-automation"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          {/* Primary CTA: Download .exe */}
          <a
            href={repoReleaseUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .exe</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-4 flex flex-col gap-1 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
                currentPath === item.path
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <a
              href={repoReleaseUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Windows .exe</span>
            </a>
            <a
              href="https://github.com/py-kalki/whatsapp-automation"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>View GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
