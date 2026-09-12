import React, { useState, useEffect } from 'react';
import { Download, Sun, Moon, Menu, X } from 'lucide-react';
import { GithubIcon } from './icons';

export default function Navbar({ currentPath = '/', onNavigate, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const repoReleaseUrl = "https://github.com/py-kalki/Whatsup-Auto/releases/tag/v.0.1.1";
  const repoUrl = "https://github.com/py-kalki/Whatsup-Auto";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/features', label: 'Features' },
    { path: '/about', label: 'About' },
    { path: '/help', label: 'Documentation' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-3 transition-all duration-300">
      <div 
        className={`w-full max-w-[1024px] h-14 px-4 sm:px-6 flex items-center justify-between transition-all duration-300 rounded-2xl border ${
          scrolled
            ? 'bg-white/90 dark:bg-zinc-950/90 border-gray-200 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] glass-nav'
            : 'bg-white/70 dark:bg-zinc-950/70 border-gray-200/70 dark:border-zinc-800/70 glass-nav'
        }`}
      >
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <img 
            src="/logo-whatsup.png" 
            alt="WhatsAuto Logo" 
            className="w-9 h-9 rounded-xl object-contain transition-transform group-hover:scale-105 shadow-xs" 
          />
          <span className="font-bold text-[17px] tracking-tight text-gray-900 dark:text-white">
            WhatsAuto
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path === '/help' && currentPath === '/docs');
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-[13.5px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-gray-900 dark:text-white font-semibold bg-gray-100 dark:bg-zinc-800'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>

          <a
            href={repoReleaseUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-white bg-[#212121] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 px-4 py-1.5 rounded-xl transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .exe</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl rounded-2xl p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-left cursor-pointer ${
                currentPath === item.path
                  ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-semibold'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 mt-2 border-t border-gray-100 dark:border-zinc-800 flex flex-col gap-2">
            <a
              href={repoReleaseUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#212121] dark:bg-white dark:text-black shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Windows .exe</span>
            </a>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-700"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
