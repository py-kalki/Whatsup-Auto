import React from 'react';

export default function SectionFrame({ children, className = '', containerClassName = '', id = '' }) {
  return (
    <section id={id} className={`relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden ${className}`}>
      <div className={`relative max-w-[1100px] w-full mx-auto ${containerClassName}`}>
        {/* Framing border guide lines */}
        <div className="absolute top-[-21px] bottom-[-21px] left-[-21px] border-l border-gray-300/40 dark:border-zinc-800/80 pointer-events-none z-10" />
        <div className="absolute top-[-21px] bottom-[-21px] right-[-21px] border-r border-gray-300/40 dark:border-zinc-800/80 pointer-events-none z-10" />
        <div className="absolute top-[-21px] left-0 right-0 border-t border-gray-300/40 dark:border-zinc-800/80 pointer-events-none z-10" />
        <div className="absolute bottom-[-21px] left-0 right-0 border-t border-gray-300/40 dark:border-zinc-800/80 pointer-events-none z-10" />

        {/* Crosshair corner markers */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute top-[-28px] left-[-28px] z-20 pointer-events-none" aria-hidden="true">
          <line x1="7" y1="0" x2="7" y2="14" stroke="#BBBBBB" strokeWidth="1.5" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="#BBBBBB" strokeWidth="1.5" />
        </svg>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute top-[-28px] right-[-28px] z-20 pointer-events-none" aria-hidden="true">
          <line x1="7" y1="0" x2="7" y2="14" stroke="#BBBBBB" strokeWidth="1.5" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="#BBBBBB" strokeWidth="1.5" />
        </svg>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute bottom-[-28px] left-[-28px] z-20 pointer-events-none" aria-hidden="true">
          <line x1="7" y1="0" x2="7" y2="14" stroke="#BBBBBB" strokeWidth="1.5" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="#BBBBBB" strokeWidth="1.5" />
        </svg>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute bottom-[-28px] right-[-28px] z-20 pointer-events-none" aria-hidden="true">
          <line x1="7" y1="0" x2="7" y2="14" stroke="#BBBBBB" strokeWidth="1.5" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="#BBBBBB" strokeWidth="1.5" />
        </svg>

        {children}
      </div>
    </section>
  );
}
