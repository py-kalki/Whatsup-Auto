import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandMarquee from './components/BrandMarquee';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import SimulatorDemo from './components/SimulatorDemo';
import Comparison from './components/Comparison';
import WallOfLove from './components/WallOfLove';
import FAQ from './components/FAQ';
import AboutView from './components/AboutView';
import HelpView from './components/HelpView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';

// Component to scroll to top whenever the URL route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomeView({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <BrandMarquee />
      <HowItWorks />
      <Features />
      <SimulatorDemo />
      <Comparison />
      <WallOfLove />
      <FAQ />
    </>
  );
}

function FeaturesPage() {
  return (
    <div className="pt-16 pb-12">
      <Features />
      <SimulatorDemo />
      <Comparison />
      <FAQ />
    </div>
  );
}

function MainLayout({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    const targetPath = path.startsWith('/') ? path : `/${path === 'home' ? '' : path}`;
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 flex flex-col selection:bg-gray-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200 onboard-grid">
      {/* Navigation Bar */}
      <Navbar
        currentPath={location.pathname}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main View Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeView onNavigate={handleNavigate} />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutView onNavigate={handleNavigate} />} />
          <Route path="/help" element={<HelpView />} />
          <Route path="/docs" element={<HelpView />} />
          <Route path="/contact" element={<ContactView />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  // Default to light mode to match Onboard.lat's signature crisp #F4F4F4 aesthetic, with dark mode toggleable
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode with document root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />
    </BrowserRouter>
  );
}
