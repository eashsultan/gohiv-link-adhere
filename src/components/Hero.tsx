"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Globe2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useUI } from "./providers";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { Reveal } from "./ui/Reveal";
import { TiltCard } from "./ui/TiltCard";
import { Magnetic } from "./ui/Magnetic";

const PIPELINE_STEPS = [
  { id: 1, tag: "01 Risk", label: "Anonymous Test" },
  { id: 2, tag: "02 Link", label: "< 48h PHC Link" },
  { id: 3, tag: "03 Adhere", label: "Daily SMS / USSD" },
];

const HERO_STATS = [
  { value: 11, suffix: "", label: "Gombe LGAs Covered" },
  { value: 5000, suffix: "+", label: "Pilot Cohort Users" },
  { value: 48, prefix: "<", suffix: "h", label: "Linkage to Care" },
  { value: 95, suffix: "%", label: "Viral Suppression Target" },
];

export function Hero() {
  const { lang, openDemo } = useUI();
  const [activePipelineStep, setActivePipelineStep] = useState(1);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePipelineStep((prev) => (prev % PIPELINE_STEPS.length) + 1);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const spotlight = spotlightRef.current;
    if (!hero || !spotlight) return;
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      spotlight.style.transform = `translate(${e.clientX - rect.left - 250}px, ${
        e.clientY - rect.top - 250
      }px)`;
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/60 to-slate-50 text-slate-900"
      onMouseLeave={() => {
        if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
      }}
      onMouseEnter={() => {
        if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-blue-200/50 blur-[120px] animate-aurora-a" />
        <div className="absolute top-1/4 -right-40 w-[520px] h-[520px] rounded-full bg-amber-100/70 blur-[120px] animate-aurora-b" />
        <div className="absolute -bottom-56 left-1/4 w-[560px] h-[560px] rounded-full bg-sky-100/80 blur-[130px] animate-aurora-c" />
        <div className="absolute inset-0 bg-dots mask-fade-y" />
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-sky-300/20 blur-[90px] transition-opacity duration-500"
          style={{ transform: "translate(-200px, -200px)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-12 items-center">
          <div className="space-y-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950 text-white text-[11px] sm:text-xs font-bold shadow-sm">
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                  </span>
                  Gombe State Health Continuum Pilot · 2027
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-600 bg-white/80 border border-slate-200 px-3 py-1.5 rounded-full backdrop-blur">
                  <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                  Offline-First · USSD Agnostic
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight leading-[1.06] text-slate-950">
                {lang === "en" ? (
                  <>
                    Bridging the{" "}
                    <span className="text-gradient-animated">HIV Care Continuum</span> in
                    Gombe State.
                  </>
                ) : (
                  <>
                    Hada Hanyoyin{" "}
                    <span className="text-gradient-animated">Kula da Kanjamau</span> a
                    Jihar Gombe.
                  </>
                )}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {lang === "en"
                  ? "An offline-first, privacy-centric platform connecting at-risk individuals to testing, care, and daily adherence support—no smartphone or internet required."
                  : "Tsari na zamani mai aiki ba tare da intanet ko wayar zamani ba, yana hada masu bukata da gwaji, magani, da bibiyar shan kwayoyin yau da kullum a asirce."}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Magnetic>
                  <a
                    href="#features"
                    className="btn-shine inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold text-base text-white bg-blue-950 hover:bg-blue-900 shadow-glow-blue transition-all duration-200 active:scale-[0.97]"
                  >
                    <span>{lang === "en" ? "View Core Features" : "Duba Muhimman Ayyuka"}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => openDemo()}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base text-slate-700 bg-white hover:text-blue-900 border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97]"
                  >
                    <HeartHandshake className="w-5 h-5 text-blue-700" />
                    <span>{lang === "en" ? "Partner With Us" : "Yi Hadin Gwiwa da Mu"}</span>
                  </button>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl p-3 sm:p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2.5 px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  <span>Care Continuum Pipeline</span>
                  <span className="text-blue-700 font-mono">
                    Step {activePipelineStep} / 3
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {PIPELINE_STEPS.map((step, i) => {
                    const isActive = activePipelineStep === step.id;
                    const isDone = activePipelineStep > step.id;
                    return (
                      <Fragment key={step.id}>
                        <button
                          type="button"
                          onClick={() => setActivePipelineStep(step.id)}
                          className={`group flex-1 flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-2 rounded-xl border transition-all duration-300 ${
                            isActive
                              ? "bg-blue-950 border-blue-900 shadow-glow-blue"
                              : isDone
                              ? "bg-blue-50 border-blue-100"
                              : "bg-transparent border-transparent hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 font-display font-bold text-[10px] transition-colors duration-300 ${
                              isActive
                                ? "bg-amber-400 text-slate-950"
                                : isDone
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}
                          >
                            {isDone ? <Check className="w-3.5 h-3.5" /> : step.id}
                          </span>
                          <span className="text-left min-w-0">
                            <span
                              className={`block text-[9px] uppercase font-bold tracking-wider transition-colors ${
                                isActive ? "text-blue-300" : "text-slate-400"
                              }`}
                            >
                              {step.tag}
                            </span>
                            <span
                              className={`block text-[11px] sm:text-xs font-bold truncate transition-colors ${
                                isActive ? "text-white" : "text-slate-700"
                              }`}
                            >
                              {step.label}
                            </span>
                          </span>
                        </button>
                        {i < PIPELINE_STEPS.length - 1 && (
                          <div className="shrink-0 w-3 sm:w-5 h-[2px] rounded-full bg-slate-200 relative overflow-hidden">
                            {isDone && (
                              <span className="absolute inset-0 bg-blue-600 animate-progress-fill" style={{ animationDuration: "4.2s" }} />
                            )}
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="pt-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-2.5">
                  Engineered in direct alignment with Gombe State health frameworks
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { icon: ShieldCheck, label: "GOMSACA", color: "text-blue-600" },
                    { icon: CheckCircle2, label: "SASCP", color: "text-emerald-600" },
                    { icon: HeartHandshake, label: "SFH Nigeria", color: "text-amber-600" },
                  ].map(({ icon: Icon, label, color }) => (
                    <span
                      key={label}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-sm flex items-center gap-1.5 hover:border-blue-300 hover:text-blue-900 hover:shadow-md transition-all cursor-default"
                    >
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <TiltCard max={4}>
              <div className="relative mx-auto max-w-[400px] sm:max-w-[440px] lg:max-w-[480px]">
                <div className="absolute -inset-6 bg-gradient-to-tr from-blue-200/60 via-sky-100/50 to-amber-100/60 blur-2xl rounded-[60px] pointer-events-none" />
                <div className="absolute inset-0 -rotate-2 rounded-[44px] border-2 border-dashed border-blue-200/80 pointer-events-none" />
                <div className="absolute -top-7 -right-5 w-24 h-24 rounded-full border-2 border-dashed border-amber-300/70 animate-spin-slow pointer-events-none" />

                <div className="group relative bg-white p-2.5 sm:p-3 rounded-[42px] shadow-float border border-slate-200/70">
                  <div className="relative overflow-hidden rounded-[34px] bg-slate-100">
                    <img
                      src="/hero-image.jpg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://i.pinimg.com/736x/89/d9/5f/89d95fdc82936e4eceb748c4f444177f.jpg";
                      }}
                      alt="Community health worker supporting a patient in Gombe State"
                      className="w-full h-[460px] sm:h-[520px] lg:h-[560px] object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div className="px-4 py-2.5 rounded-2xl bg-white/90 border border-white/60 backdrop-blur-xl shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-800">
                          CHEW-Supported Care
                        </p>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">
                          Community Health Extension Workers
                        </p>
                      </div>
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-950 text-white text-[11px] font-bold shadow-glow-blue">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        Gombe
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="animate-drift absolute -left-4 sm:-left-12 top-24 z-20"
                  style={{ "--drift-x": "6px", "--drift-y": "-10px" } as React.CSSProperties}
                >
                  <div className="px-4 py-3 rounded-2xl bg-white/90 border border-slate-200 backdrop-blur-xl shadow-float flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">
                        100% Anonymous
                      </p>
                      <p className="text-[9px] font-semibold text-slate-500">
                        No name · No stigma
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="animate-drift absolute -right-3 sm:-right-10 bottom-32 z-20"
                  style={{
                    "--drift-x": "-8px",
                    "--drift-y": "10px",
                    "--drift-rotate": "1deg",
                    animationDelay: "1.4s",
                  } as React.CSSProperties}
                >
                  <div className="px-4 py-3 rounded-2xl bg-white/90 border border-slate-200 backdrop-blur-xl shadow-float flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">
                        48-Hour Linkage
                      </p>
                      <p className="text-[9px] font-semibold text-slate-500">
                        Test to first clinic visit
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="animate-drift absolute -right-2 sm:-right-8 top-12 z-20"
                  style={{
                    "--drift-x": "-5px",
                    "--drift-y": "-8px",
                    animationDelay: "2.6s",
                  } as React.CSSProperties}
                >
                  <div className="px-3.5 py-2.5 rounded-2xl bg-blue-950 border border-blue-900 backdrop-blur-xl shadow-glow-blue flex items-center gap-2.5">
                    <span className="font-display text-lg font-bold text-amber-400">
                      95%
                    </span>
                    <span className="text-[10px] font-bold text-blue-100 leading-tight">
                      Viral Suppression
                      <br />
                      Target
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="mt-14 lg:mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center lg:text-left ${
                  i > 0 ? "lg:border-l lg:border-slate-200 lg:pl-10" : ""
                }`}
              >
                <p className="font-display text-3xl sm:text-4xl font-bold text-slate-950">
                  {stat.prefix}
                  <AnimatedCounter value={stat.value} />
                  <span className="text-blue-700">{stat.suffix}</span>
                </p>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 mt-1.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative flex justify-center pb-6">
        <a
          href="#features"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-700 transition-colors group"
          aria-label="Scroll to features"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
