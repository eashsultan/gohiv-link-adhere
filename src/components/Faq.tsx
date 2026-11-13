"use client";

import React, { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { useUI } from "./providers";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openDemo } = useUI();

  return (
    <section className="relative py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-light pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Stakeholder Questions"
          title="Frequently Asked Questions"
          description="Everything health partners, funders, and programme officers ask before joining the Gombe pilot."
        />

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.question} delay={i * 60}>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-blue-200 shadow-deep"
                      : "bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900">
                      {item.question}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-blue-900 text-amber-400 rotate-180"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-[400ms] ease-out-expo"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-blue-950 to-blue-900 text-white border border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <MessageSquare className="w-6 h-6 text-amber-400 shrink-0" />
              <p className="text-sm text-blue-100">
                Still have questions? Request a confidential technical walkthrough.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openDemo()}
              className="btn-shine shrink-0 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 font-bold text-sm transition-all shadow-glow-amber active:scale-95"
            >
              Book a Walkthrough
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
