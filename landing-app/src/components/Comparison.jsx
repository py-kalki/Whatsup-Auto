import React from 'react';
import { ArrowDown } from 'lucide-react';
import SectionFrame from './SectionFrame';

export default function Comparison() {
  const comparisonTiles = [
    {
      name: 'Twilio API',
      logo: 'https://cdn.simpleicons.org/twilio/F22F46',
      stat: '100%',
      statLabel: 'Free API vs Twilio',
      desc: 'Zero per-message fees. Your PC connects directly via local Baileys socket.'
    },
    {
      name: 'Zapier / Make',
      logo: 'https://cdn.simpleicons.org/zapier/FF4A00',
      stat: '80%',
      statLabel: 'Less Chaos vs Zapier',
      desc: 'All rules, AI triggers, and lead state machines live together in one .exe.'
    },
    {
      name: 'Manual Replies',
      logo: 'https://cdn.simpleicons.org/whatsapp/25D366',
      stat: '10×',
      statLabel: 'Quicker Lead Capture',
      desc: 'Sub-millisecond keyword replies and multi-step funnels active 24/7 in tray.'
    },
    {
      name: 'Wati / ManyChat',
      logo: 'https://cdn.simpleicons.org/meta/0081FB',
      stat: '3×',
      statLabel: 'Better ROI vs ManyChat',
      desc: 'No $50–$300/mo paywalls or per-contact tiers. Unlimited usage forever.'
    }
  ];

  const tableRows = [
    { feature: 'Monthly Platform Fee', whatsAuto: '$0 (Free Forever)', saas: '$50 – $300+ / mo' },
    { feature: 'Per-Message Markups', whatsAuto: '$0 (Direct Socket)', saas: '$0.01 – $0.05 / msg' },
    { feature: 'Data Privacy & Storage', whatsAuto: '100% Local on your disk', saas: 'Stored on 3rd-party servers' },
    { feature: 'Inbuilt AI Assistant', whatsAuto: 'Antigravity Local AI (Zero Keys)', saas: 'Expensive Add-on Subscription' },
    { feature: 'Silent Background Tray', whatsAuto: 'Yes (.exe with Auto-Boot)', saas: 'Browser tab only' },
    { feature: 'Multi-Step Lead CRM Funnel', whatsAuto: 'Included & Unlimited', saas: 'Enterprise Tier Only' },
    { feature: 'Anti-Ban Safe Jitter Delays', whatsAuto: 'Configurable 4–9s Delays', saas: 'Fixed / None' }
  ];

  return (
    <SectionFrame className="py-12 sm:py-20" id="comparison">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-4">
          <span className="text-[10px]">✦</span> Replaced By WhatsAuto
        </span>

        <h2 className="font-extrabold text-gray-950 dark:text-white leading-[1.1] max-w-2xl mx-auto text-3xl sm:text-4xl lg:text-[42px] tracking-tight">
          We make it easy for businesses to automate without chaos.
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
          Say goodbye to overpriced cloud subscriptions and rate-limited API tiers.
        </p>
      </div>

      {/* 4-Column Dashed Border Hover Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden mb-16">
        {comparisonTiles.map((tile, idx) => (
          <div
            key={idx}
            className={`group relative flex flex-col items-center justify-center gap-2 px-4 py-8 sm:py-10 text-center overflow-hidden cursor-default transition-all duration-300 ${
              idx < 3 ? 'border-b sm:border-b-0 border-r border-dashed border-gray-200 dark:border-zinc-800' : ''
            }`}
          >
            {/* Default Visible State */}
            <div className="flex flex-col items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-16 group-hover:opacity-0">
              <img
                src={tile.logo}
                alt={tile.name}
                className="h-8 w-8 object-contain filter dark:brightness-110"
              />
              <div>
                <p className="text-[12px] font-bold text-gray-800 dark:text-gray-200">{tile.name}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">replaced by WhatsAuto</p>
              </div>
            </div>

            {/* Hover Reveal State */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 translate-y-12 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 px-3 bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-1">
                <ArrowDown className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-extrabold text-gray-950 dark:text-white text-3xl leading-none">
                  {tile.stat}
                </span>
              </div>
              <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 leading-snug">
                {tile.statLabel}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">
                {tile.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Value Comparison Matrix Table */}
      <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_2px_14px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/50">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Feature &amp; Cost Breakdown</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-950/80">
                <th className="p-4 sm:p-5 font-bold text-gray-900 dark:text-white">Capability</th>
                <th className="p-4 sm:p-5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30">
                  WhatsAuto (Self-Hosted .exe)
                </th>
                <th className="p-4 sm:p-5 font-bold text-gray-500 dark:text-gray-400">
                  Cloud SaaS Competitors
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {tableRows.map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-gray-900 dark:text-gray-100">
                    {r.feature}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/10">
                    {r.whatsAuto}
                  </td>
                  <td className="p-4 sm:p-5 text-gray-500 dark:text-gray-400">
                    {r.saas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionFrame>
  );
}
