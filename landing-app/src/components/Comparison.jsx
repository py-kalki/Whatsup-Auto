import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function Comparison() {
  const rows = [
    { feature: 'Monthly Platform Fee', whatsAuto: '$0 (Free Forever)', saas: '$50 – $300+ / mo', highlight: true },
    { feature: 'Per-Message Markups', whatsAuto: '$0 (Direct Device)', saas: '$0.01 – $0.05 / msg', highlight: true },
    { feature: 'Data Privacy & Storage', whatsAuto: '100% Local on your disk', saas: 'Stored on 3rd-party servers', highlight: true },
    { feature: 'Inbuilt AI Assistant', whatsAuto: 'Antigravity Local CLI (Zero Keys)', saas: 'Expensive Add-on Subscription', highlight: true },
    { feature: 'Background Tray Executable', whatsAuto: 'Yes (.exe with Auto-Boot)', saas: 'Browser tab only', highlight: false },
    { feature: 'Multi-Turn Lead CRM & CSV', whatsAuto: 'Included & Unlimited', saas: 'Gated on Enterprise tier', highlight: false },
    { feature: 'Anti-Ban Safe Jitter Delays', whatsAuto: 'Configurable 4–9s randomized', saas: 'Fixed / None', highlight: false },
  ];

  return (
    <section className="py-20 bg-zinc-50/60 dark:bg-zinc-900/40 border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span>Value Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Why choose WhatsAuto over SaaS?
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 font-normal">
            Take back ownership of your business data, privacy, and budget.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                  <th className="p-4 sm:p-5 font-bold text-zinc-900 dark:text-white">Feature</th>
                  <th className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                    WhatsAuto (Open Source)
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-zinc-500 dark:text-zinc-400">
                    Cloud SaaS Providers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {rows.map((r, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-zinc-900 dark:text-zinc-100">
                      {r.feature}
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/10">
                      {r.whatsAuto}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-500 dark:text-zinc-400">
                      {r.saas}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
