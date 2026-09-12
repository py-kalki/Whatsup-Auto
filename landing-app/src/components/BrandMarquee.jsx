import React from 'react';
import SectionFrame from './SectionFrame';

export default function BrandMarquee() {
  const brands = [
    { name: 'WhatsApp', logo: 'https://cdn.simpleicons.org/whatsapp/25D366' },
    { name: 'Twilio', logo: 'https://cdn.simpleicons.org/twilio/F22F46' },
    { name: 'Zapier', logo: 'https://cdn.simpleicons.org/zapier/FF4A00' },
    { name: 'Make', logo: 'https://cdn.simpleicons.org/make/6D00CC' },
    { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai/000000' },
    { name: 'Google Sheets', logo: 'https://cdn.simpleicons.org/googlesheets/34A853' },
    { name: 'Notion', logo: 'https://svgl.app/library/notion.svg' },
    { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/635BFF' },
    { name: 'Razorpay', logo: 'https://cdn.simpleicons.org/razorpay/0C61FE' },
    { name: 'Telegram', logo: 'https://cdn.simpleicons.org/telegram/26A5E4' },
    { name: 'Anthropic', logo: 'https://cdn.simpleicons.org/anthropic/191919' },
    { name: 'ManyChat', logo: 'https://cdn.simpleicons.org/meta/0081FB' }
  ];

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...brands, ...brands];

  return (
    <SectionFrame className="py-6 overflow-hidden">
      <div className="flex flex-col items-center">
        {/* Title with organic curved underline */}
        <p className="text-[15px] font-semibold text-gray-500 dark:text-gray-400 text-center mb-8 relative select-none">
          Replace all of these with{' '}
          <span className="relative inline-block text-gray-900 dark:text-white font-bold">
            WhatsAuto
            <svg
              className="absolute -bottom-1.5 left-0 w-[105%] h-[6px] text-emerald-500"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2.5 8C25.5 3.5 60 2 97.5 8.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </p>

        {/* Scrolling Marquee Container with side fade masks */}
        <div className="w-full relative overflow-hidden flex py-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max items-center gap-3 sm:gap-4 pr-3 sm:pr-4 animate-scrolling-marquee">
            {marqueeItems.map((brand, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xs rounded-2xl w-[130px] h-[54px] px-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md shrink-0 cursor-default"
                title={brand.name}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-6 w-6 object-contain filter dark:brightness-110"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
