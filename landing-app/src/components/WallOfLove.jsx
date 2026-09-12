import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionFrame from './SectionFrame';

export default function WallOfLove() {
  const testimonials = [
    {
      quote: "Bro I was literally answering WhatsApp customer questions manually until 2 AM 😭 Switched to WhatsAuto and now our leads get instant answers and CRM sync while I sleep.",
      author: "Arjun M.",
      role: "E-Commerce Founder",
      location: "Bangalore",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "The fact that it runs locally on my Windows PC without any $200/mo cloud API fees is crazy. The 4-9s anti-ban jitter delays have kept our account 100% safe.",
      author: "Sneha R.",
      role: "Marketing Lead",
      location: "Hyderabad",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "Our leads thought we hired a dedicated 24/7 customer support team. It is literally just WhatsAuto.exe running silently in our taskbar tray!",
      author: "Karan T.",
      role: "Agency Director",
      location: "Pune",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "The /lead state machine qualified 18 high-ticket clients for our consulting firm in the first week. Direct CSV sync and instant admin alerts made it seamless.",
      author: "Divya S.",
      role: "Product Strategist",
      location: "Mumbai",
      avatar: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "Zero API keys needed for the Antigravity local AI. Paired our phone once via QR code and it reconnects automatically on laptop boot.",
      author: "Rahul P.",
      role: "Full Stack Developer",
      location: "Chennai",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "Replaced Twilio, Zapier webhooks, and manual spreadsheets in one shot. Best open-source tool we integrated this year.",
      author: "Sahil V.",
      role: "SaaS Builder",
      location: "Ahmedabad",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <SectionFrame className="py-14 sm:py-20" id="testimonials">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-4">
          <span className="text-[10px]">✦</span> Wall of Love
        </span>

        <h2 className="font-extrabold text-gray-950 dark:text-white leading-[1.1] mb-3 text-3xl sm:text-4xl lg:text-[42px] tracking-tight">
          See why businesses love WhatsAuto
        </h2>

        <p className="text-[16px] text-gray-500 dark:text-gray-400 max-w-[460px] mx-auto leading-relaxed">
          Join thousands of creators and businesses who automated customer communications without monthly bills.
        </p>

        <a
          href="https://github.com/py-kalki/Whatsup-Auto/releases/tag/v.0.1.1"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-[#212121] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white text-[14px] font-medium px-6 py-2.5 rounded-2xl transition-all duration-150 shadow-sm"
        >
          Download Free Windows .exe
        </a>
      </div>

      {/* Testimonial Geometric Card Viewport */}
      <div className="relative max-w-xl mx-auto flex flex-col items-center">
        {/* Polygon Cut-Corner Testimonial Card */}
        <div 
          className="w-full min-h-[340px] p-8 sm:p-10 bg-white dark:bg-zinc-900 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-300 relative cut-corner-card"
        >
          {/* Top Decorative Cut Ribbon Line */}
          <span className="absolute block origin-top-right rotate-45 bg-gray-200 dark:bg-zinc-700 right-[-2px] top-[40px] w-[70px] h-[2px]"></span>

          <div>
            {/* Avatar & Author Info */}
            <div className="flex items-center gap-3.5 mb-6">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-13 h-13 rounded-2xl object-cover border border-gray-200 dark:border-zinc-700 shadow-xs"
              />
              <div>
                <div className="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">
                  {current.author}
                </div>
                <div className="text-[12px] text-gray-500 dark:text-gray-400">
                  {current.role} • {current.location}
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <p className="text-base sm:text-lg font-medium leading-relaxed text-gray-800 dark:text-zinc-200">
              "{current.quote}"
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-mono">
              Verified User ({currentIndex + 1} of {testimonials.length})
            </span>
          </div>
        </div>

        {/* Previous & Next Control Buttons */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handlePrev}
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-200 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-gray-900 dark:hover:border-white transition-all duration-150 shadow-xs cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-200 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-gray-900 dark:hover:border-white transition-all duration-150 shadow-xs cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </SectionFrame>
  );
}
