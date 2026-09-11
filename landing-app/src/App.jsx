import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroMockup from './components/HeroMockup';
import Features from './components/Features';
import SimulatorDemo from './components/SimulatorDemo';
import Comparison from './components/Comparison';
import FAQ from './components/FAQ';
import AboutView from './components/AboutView';
import HelpView from './components/HelpView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(true);

  // Sync dark mode with document root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 transition-colors duration-200">
      {/* Background Grid Accent */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-80 -z-10" />

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <HeroMockup />
            <Features />
            <SimulatorDemo />
            <Comparison />
            <FAQ />
          </>
        )}

        {activeTab === 'features' && (
          <div className="pt-10">
            <Features />
            <SimulatorDemo />
            <Comparison />
          </div>
        )}

        {activeTab === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {activeTab === 'help' && (
          <HelpView />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
