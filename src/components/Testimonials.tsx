"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const goTo = (index: number) =>
    setActiveIndex((index + TESTIMONIALS.length) % TESTIMONIALS.length);

  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      id="voices"
      className="relative py-20 lg:py-28 bg-[#050D1A] text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[560px] h-[440px] bg-blue-600/20 blur-[130px] rounded-full animate-aurora-a" />
        <div className="absolute bottom-0 right-1/4 w-[520px] h-[400px] bg-amber-500/12 blur-[130px] rounded-full animate-aurora-c" />
        <div className="absolute inset-0 bg-grid-dark mask-fade-y" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Grassroots Voices"
          title="Trusted by the People on the Ground"
          description="CHEWs, caregivers, and programme officers across Gombe State shaping—and living—the continuum pilot."
        />

        <Reveal>
          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative rounded-[32px] bg-blue-950/50 border border-blue-800/60 backdrop-blur-xl shadow-deep p-8 sm:p-12 overflow-hidden">
              <div className="absolute -top-24 -right-16 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
              <Quote className="absolute -top-2 -left-2 w-28 h-28 text-blue-800/80 rotate-180" />
              <div className="relative">
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote
                  key={activeIndex}
                  className="animate-fade-slide font-display text-lg sm:text-2xl font-semibold text-white leading-relaxed sm:leading-relaxed"
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div
                  key={`author-${activeIndex}`}
                  className="mt-8 flex items-center gap-4 animate-fade-slide"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-800 to-blue-950 text-white flex items-center justify-center font-display font-bold text-sm shadow-glow-blue border border-blue-700/60">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-blue-300/80">
                      {testimonial.role} · {testimonial.lga}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-2xl bg-blue-900/60 border border-blue-800 text-blue-200 hover:text-amber-300 hover:border-amber-400/50 shadow-sm flex items-center justify-center transition-all active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-[400ms] ${
                      i === activeIndex
                        ? "w-8 bg-amber-400"
                        : "w-2 bg-blue-800 hover:bg-blue-700"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-2xl bg-blue-900/60 border border-blue-800 text-blue-200 hover:text-amber-300 hover:border-amber-400/50 shadow-sm flex items-center justify-center transition-all active:scale-90"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
