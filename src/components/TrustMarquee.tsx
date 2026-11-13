import React from "react";
import { TRUST_MARQUEE_ITEMS } from "@/lib/data";

export function TrustMarquee() {
  const items = [...TRUST_MARQUEE_ITEMS, ...TRUST_MARQUEE_ITEMS];
  return (
    <section
      aria-label="Institutional alignments"
      className="relative border-y border-slate-200 bg-white py-7 overflow-hidden marquee-paused"
    >
      <div className="mask-fade-x">
        <div className="flex w-max animate-marquee gap-4 px-2">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
