"use client";

import { useEffect, useRef } from "react";
import { HeartHandshake, Languages, MapPin, ShieldCheck } from "lucide-react";
import { Reveal } from "./ui/Reveal";

const COMMUNITY_STATS = [
  {
    icon: MapPin,
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-100",
    title: "11 LGAs Co-Designed",
    desc: "Every ward profiled with local CHEW teams",
  },
  {
    icon: Languages,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-100",
    title: "Hausa & English",
    desc: "Prompts written in conversational dialects",
  },
  {
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-100",
    title: "Zero-Stigma Workflows",
    desc: "Neutral messaging hides treatment status",
  },
];

export function CommunityBand() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      img.style.transform = "scale(1.08)";
      return;
    }
    const onScroll = () => {
      const el = img.parentElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height))
      );
      img.style.transform = `scale(1.15) translateY(${((progress - 0.5) * 7).toFixed(2)}%)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-white py-20 lg:py-24"
      aria-label="Community health workers"
    >
      <div className="absolute inset-0 bg-dots mask-fade-y opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[480px] h-[380px] bg-amber-100/50 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[360px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative max-w-[460px] sm:max-w-[480px] mx-auto lg:mx-0">
              <div className="absolute -inset-5 bg-gradient-to-tr from-blue-100/70 via-sky-50/60 to-amber-100/60 blur-2xl rounded-[56px] pointer-events-none" />
              <div className="absolute -top-6 -left-4 w-20 h-20 rounded-full border-2 border-dashed border-blue-200 animate-spin-slow pointer-events-none" />

              <div className="relative bg-white p-2.5 sm:p-3 rounded-[40px] border border-slate-200/80 shadow-float">
                <div className="relative overflow-hidden rounded-[32px] bg-slate-100 h-[400px] sm:h-[440px]">
                  <img
                    ref={imgRef}
                    src="/hero-image.jpg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://i.pinimg.com/736x/89/d9/5f/89d95fdc82936e4eceb748c4f444177f.jpg";
                    }}
                    alt="Gombe State Community Health Extension Worker supporting HIV continuum of care"
                    className="w-full h-full object-cover object-top will-change-transform"
                    style={{ transition: "transform 120ms linear" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div className="px-4 py-2.5 rounded-2xl bg-white/90 border border-white/60 backdrop-blur-xl shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-800">
                        Field Operations
                      </p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">
                        Community Health Extension Workers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 sm:-right-8 top-10 animate-drift">
                <div className="px-4 py-3 rounded-2xl bg-white/90 border border-slate-200 backdrop-blur-xl shadow-float flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">
                      Co-Designed Daily
                    </p>
                    <p className="text-[9px] font-semibold text-slate-500">
                      With field CHEWs & caregivers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2 space-y-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-[0.16em]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Community First · Zero Stigma
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.12] text-slate-950">
                Built with Gombe&apos;s community health workers,{" "}
                <span className="text-blue-700">for Gombe.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Every journey, reminder, and clinic hand-off is co-designed with the CHEWs
                and caregivers who know the terrain, the dialects, and the people. No
                assumptions—just lived experience, translated into software.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {COMMUNITY_STATS.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.title}
                      className="group p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                    >
                      <div
                        className={`p-2.5 rounded-xl border w-fit ${stat.bg} transition-transform group-hover:scale-110`}
                      >
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <p className="text-sm font-bold text-slate-900 mt-3">{stat.title}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {stat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
