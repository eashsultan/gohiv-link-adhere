"use client";

import React from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}

export function SectionHeading({ eyebrow, title, description, dark }: SectionHeadingProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16 space-y-4">
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full border ${
            dark
              ? "bg-blue-900/50 border-blue-700/60 text-amber-300"
              : "bg-sky-50 border-sky-200 text-blue-800"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-amber-400" : "bg-blue-600"}`} />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.12] ${
            dark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={180}>
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            dark ? "text-blue-100/80" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      </Reveal>
    </div>
  );
}
