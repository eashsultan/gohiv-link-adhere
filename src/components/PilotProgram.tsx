"use client";

import React, { useState } from "react";
import {
  Activity,
  Baby,
  CheckCircle2,
  ChevronRight,
  Clock,
  HeartPulse,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { GOMBE_LGAS_DATA, GOMBE_LGA_KEYS } from "@/lib/data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { TiltCard } from "./ui/TiltCard";
import { useUI } from "./providers";

const KPI_CARDS = [
  {
    num: "01",
    icon: HeartPulse,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50 border-amber-100",
    tag: "Primary KPI",
    title: "Testing Uptake",
    desc: "Targeting +45% increase in anonymous community screening uptake via USSD & peer referral vouchers.",
    stat: 5000,
    statPrefix: "",
    statSuffix: "+",
    statLabel: "Enrolled Pilot Cohort",
    statColor: "text-amber-600",
  },
  {
    num: "02",
    icon: Clock,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-100",
    tag: "Retention Target",
    title: "Linkage Rates",
    desc: "Accelerating verified linkage to ART clinics within 48 hours of positive reactive results.",
    stat: 90,
    statPrefix: "> ",
    statSuffix: "%",
    statLabel: "48-Hour Facility Linkage",
    statColor: "text-emerald-600",
  },
  {
    num: "03",
    icon: TrendingUp,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50 border-sky-100",
    tag: "UNAIDS Goal",
    title: "Viral Suppression",
    desc: "Sustaining daily medication adherence to achieve the 95-95-95 viral suppression milestone.",
    stat: 95,
    statPrefix: "",
    statSuffix: "%",
    statLabel: "6-Month Undetectable Load",
    statColor: "text-sky-600",
  },
  {
    num: "04",
    icon: Baby,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50 border-orange-100",
    tag: "Paediatric Focus",
    title: "Caregiver Retention",
    desc: "Preventing lost-to-follow-up among infants and children through simplified proxy guardian logging.",
    stat: 98,
    statPrefix: "",
    statSuffix: "%",
    statLabel: "Paediatric Cohort Retention",
    statColor: "text-orange-600",
  },
];

export function PilotProgram() {
  const { showToast, openDemo } = useUI();
  const [activeLgaKey, setActiveLgaKey] = useState("Gombe");
  const [pilotUserScale, setPilotUserScale] = useState(5000);
  const currentLga = GOMBE_LGAS_DATA[activeLgaKey] || GOMBE_LGAS_DATA["Gombe"];
  const linkagePct = parseFloat(currentLga.linkageTarget);

  const handleLgaSelect = (lga: string) => {
    setActiveLgaKey(lga);
    showToast("LGA Selected", `${lga} LGA profile loaded with clinical sites`, "info");
  };

  return (
    <section
      id="pilot-program"
      className="relative py-20 lg:py-28 bg-slate-50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-light pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[560px] h-[380px] bg-blue-100/60 blur-[130px] rounded-full animate-aurora-b" />
        <div className="absolute bottom-0 right-1/4 w-[520px] h-[380px] bg-amber-100/50 blur-[130px] rounded-full animate-aurora-c" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          eyebrow="Strategic Implementation Target: 2027"
          title="Join the 2027 Pilot Initiative"
          description="We are currently preparing for a 5,000-user pilot in collaboration with local health facilities. Designed for seamless integration with GOMSACA, SASCP, and SFH frameworks."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {KPI_CARDS.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <Reveal key={kpi.num} delay={i * 90}>
                <TiltCard max={5} className="h-full">
                  <div className="group relative p-6 rounded-[28px] bg-white border border-slate-200 shadow-sm hover:shadow-deep hover:border-blue-200 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-50 blur-2xl rounded-full group-hover:bg-amber-50 transition-colors duration-500" />
                    <div className="relative space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-display font-bold text-xs text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                          {kpi.num}
                        </div>
                        <div
                          className={`p-2.5 rounded-xl border ${kpi.iconBg} transition-transform group-hover:scale-110`}
                        >
                          <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
                        </div>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 font-semibold">
                        {kpi.tag}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 font-display">
                        {kpi.title}
                      </h3>
                      <p className="text-[13px] text-slate-600 leading-relaxed">{kpi.desc}</p>
                    </div>
                    <div className="relative mt-6 pt-4 border-t border-slate-100">
                      <span className={`text-3xl font-display font-bold ${kpi.statColor}`}>
                        {kpi.statPrefix}
                        <AnimatedCounter value={kpi.stat} />
                        {kpi.statSuffix}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {kpi.statLabel}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="p-6 sm:p-10 rounded-[32px] bg-white border border-slate-200 shadow-deep space-y-8 relative overflow-hidden">
            <div className="absolute -top-24 right-10 w-72 h-72 bg-amber-50 blur-3xl rounded-full pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Interactive Projection Model
                </span>
                <h3 className="font-display text-2xl sm:text-[28px] font-bold text-slate-900 mt-2">
                  Pilot Scale &amp; State Impact Calculator
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-semibold">
                  Target User Cohort
                </span>
                <span
                  key={pilotUserScale}
                  className="inline-block font-display text-3xl sm:text-4xl font-bold text-blue-900 animate-ticker-pop"
                >
                  {pilotUserScale.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="relative">
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={pilotUserScale}
                onChange={(e) => setPilotUserScale(Number(e.target.value))}
                aria-label="Pilot user scale"
                className="slider-glow w-full"
                style={
                  {
                    "--fill": `${((pilotUserScale - 1000) / 9000) * 100}%`,
                  } as React.CSSProperties
                }
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 mt-3 font-mono">
                <span>1,000 · Ward Level</span>
                <span className="hidden sm:inline">5,000 · Pilot Target</span>
                <span>10,000 · Full State</span>
              </div>
            </div>

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Projected Linkages",
                  value: `+${Math.floor(pilotUserScale * 0.91).toLocaleString()}`,
                  sub: "Patients",
                  note: "Linked to care in 48h",
                  noteColor: "text-emerald-600",
                },
                {
                  label: "Daily Adherence SMS",
                  value: `${(pilotUserScale * 30).toLocaleString()}`,
                  sub: "/ month",
                  note: "Zero-airtime prompts",
                  noteColor: "text-amber-600",
                },
                {
                  label: "Paediatric Retention",
                  value: Math.floor(pilotUserScale * 0.18).toLocaleString(),
                  sub: "Children",
                  note: "Under Caregiver Mode",
                  noteColor: "text-sky-600",
                },
                {
                  label: "Viral Load Target",
                  value: "95.4%",
                  sub: "Suppression",
                  note: "UNAIDS 95-95-95 aligned",
                  noteColor: "text-emerald-600",
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-white transition-all"
                >
                  <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                    {metric.label}
                  </p>
                  <p
                    key={`${metric.label}-${pilotUserScale}`}
                    className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-1.5 animate-ticker-pop"
                  >
                    {metric.value}
                    <span className="text-xs text-slate-400 ml-1">{metric.sub}</span>
                  </p>
                  <p className={`text-[10px] ${metric.noteColor} mt-1`}>{metric.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="p-6 sm:p-10 rounded-[32px] bg-white border border-slate-200 shadow-deep">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-display flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  Pilot LGA Deployment Footprint
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  Click an LGA to view primary healthcare center (PHC) readiness &amp;
                  demographic profile
                </p>
              </div>
              <span className="text-[11px] font-semibold px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 w-fit flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                All 11 Local Government Areas
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {GOMBE_LGA_KEYS.map((lga, i) => {
                const isActive = activeLgaKey === lga;
                return (
                  <button
                    key={lga}
                    type="button"
                    onClick={() => handleLgaSelect(lga)}
                    className={`group relative px-3.5 py-3 rounded-2xl text-xs sm:text-[13px] font-semibold transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "bg-blue-950 text-white font-bold shadow-glow-blue scale-[1.03]"
                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-900 hover:bg-white hover:shadow-sm"
                    }`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <span className="block truncate">{lga}</span>
                    <span
                      className={`block text-[9px] font-mono mt-0.5 ${
                        isActive ? "text-blue-300" : "text-slate-400"
                      }`}
                    >
                      {GOMBE_LGAS_DATA[lga].targetUsers} users
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              key={activeLgaKey}
              className="mt-7 p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-sky-50/60 border border-slate-200 flex flex-col lg:flex-row justify-between gap-7 animate-fade-slide"
            >
              <div className="space-y-4 flex-1 min-w-0">
                <div>
                  <span className="text-amber-600 font-bold uppercase tracking-[0.16em] text-[10px]">
                    Active Clinical Pilot Profile
                  </span>
                  <h5 className="font-display text-2xl font-bold text-slate-900 mt-1">
                    {currentLga.name}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Terrain: {currentLga.terrain} · Targeted Cohort:{" "}
                    {currentLga.targetUsers.toLocaleString()} Participants
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.16em] mb-2">
                    Designated ART Facilities &amp; PHCs
                  </p>
                  <ul className="space-y-1.5">
                    {currentLga.facilities.map((fac, idx) => (
                      <li
                        key={fac}
                        className="flex items-center gap-2 text-xs text-slate-700 animate-fade-slide"
                        style={{ animationDelay: `${idx * 70}ms` }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-1">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    <span>48h Linkage Target</span>
                    <span className="text-amber-600">{currentLga.linkageTarget}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      style={{
                        width: `${linkagePct}%`,
                        transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 shrink-0 lg:w-56">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">
                      PHC Facilities
                    </span>
                    <span className="text-lg font-display font-bold text-slate-900">
                      {currentLga.phcCount} Health Posts
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">
                      Field CHEWs
                    </span>
                    <span className="text-lg font-display font-bold text-slate-900">
                      {currentLga.chewWorkers} Workers
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openDemo(activeLgaKey)}
                  className="btn-shine w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-glow-amber active:scale-[0.97]"
                >
                  <span className="truncate">Express Interest · {activeLgaKey}</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
