"use client";

import React, { useState } from "react";
import { Baby, CheckCircle2, Clock, HeartPulse } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { TiltCard } from "./ui/TiltCard";

type ModuleTab = "testing" | "adherence" | "caregiver";

const MODULE_TABS: { id: ModuleTab; label: string; icon: React.ElementType }[] = [
  { id: "testing", label: "Testing & Linkage", icon: HeartPulse },
  { id: "adherence", label: "Adherence & Support", icon: Clock },
  { id: "caregiver", label: "Caregiver Mode", icon: Baby },
];

function ModuleChecklist({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
      {items.map((item) => (
        <div
          key={item}
          className="group p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3 hover:border-slate-300 hover:shadow-md transition-all duration-300"
        >
          <CheckCircle2
            className={`w-5 h-5 shrink-0 ${accent} transition-transform group-hover:scale-110`}
          />
          <span className="text-xs font-semibold text-slate-700 leading-snug">{item}</span>
        </div>
      ))}
    </div>
  );
}

function ModuleImageCard({
  src,
  alt,
  badge,
  caption,
  note,
}: {
  src: string;
  alt: string;
  badge: string;
  caption: string;
  note: string;
}) {
  return (
    <TiltCard max={4} className="lg:col-span-5 h-full">
      <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 shadow-deep bg-slate-950 h-[340px] sm:h-[380px] lg:h-full lg:min-h-[400px]">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/10 pointer-events-none" />
        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-900 border border-white/50">
          {badge}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="font-display text-lg font-bold text-white leading-snug">
            {caption}
          </p>
          <p className="text-xs text-blue-100/80 font-medium mt-1.5 leading-relaxed">
            {note}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}

export function Modules() {
  const [activeTab, setActiveTab] = useState<ModuleTab>("testing");
  const activeIndex = MODULE_TABS.findIndex((t) => t.id === activeTab);

  return (
    <section id="features" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-light pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Full-Spectrum Healthcare Modules"
          title="Three Pillars for Zero Lost-to-Follow-Up"
          description="Engineered specifically for low-connectivity environments in northern Nigeria—ensuring every patient stays connected from testing to viral suppression."
        />

        <Reveal>
          <div className="relative grid grid-cols-3 gap-1 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 max-w-2xl mx-auto mb-10">
            <div
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-slate-950 shadow-deep transition-all duration-300 ease-out-expo"
              style={{
                left: `calc(${activeIndex * 33.333}% + 6px)`,
                width: `calc(33.333% - 12px)`,
              }}
            />
            {MODULE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 px-2 sm:px-4 py-3 rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-1.5 sm:gap-2 ${
                    isActive ? "text-amber-400" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">
                    {tab.id === "testing" ? "Testing" : tab.id === "adherence" ? "Adhere" : "Caregiver"}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="p-6 sm:p-10 lg:p-12 rounded-[32px] bg-slate-50 border border-slate-200 shadow-deep">
            {activeTab === "testing" && (
              <div
                key="testing"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-slide"
              >
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                    Module 01 · Testing &amp; Linkage
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                    Anonymous Risk Assessments &amp; 48-Hour Linkage
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Anonymous risk assessments and offline facility locators to seamlessly
                    link positive cases to care. Eliminates social fear through
                    zero-identity self-screening.
                  </p>
                  <ModuleChecklist
                    items={[
                      "Confidential self-risk evaluation via USSD",
                      "Offline mapping of 11 Gombe LGAs ART clinics",
                    ]}
                    accent="text-blue-600"
                  />
                </div>
                <ModuleImageCard
                  src="/care-lab.jpg"
                  alt="Lab technician holding a blood sample tube for an HIV test"
                  badge="Free Rapid Testing"
                  caption="Priority testing vouchers at any Gombe PHC"
                  note="Anonymous clients walk in with a code — never a name — and receive same-day counseling."
                />
              </div>
            )}

            {activeTab === "adherence" && (
              <div
                key="adherence"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-slide"
              >
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                    Module 02 · Adherence &amp; Support
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                    Automated Multi-Channel Medication Reminders
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Automated SMS, USSD, and WhatsApp medication reminders for daily ARVs
                    and long-acting PrEP. Patients verify pill intake with a single digit
                    reply at zero cost.
                  </p>
                  <ModuleChecklist
                    items={[
                      "Discreet dosing prompts in Hausa & English",
                      "Predictive 7-day clinic stockout alerts",
                    ]}
                    accent="text-amber-600"
                  />
                </div>
                <ModuleImageCard
                  src="/care-studies.jpg"
                  alt="Health worker medication kit and stethoscope on a desk"
                  badge="Daily Dose Tracking"
                  caption="One-digit replies confirm every dose"
                  note="Neutral wellness prompts keep regimens on track without ever revealing HIV status."
                />
              </div>
            )}

            {activeTab === "caregiver" && (
              <div
                key="caregiver"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-slide"
              >
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Module 03 · Caregiver Mode
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                    Paediatric Dosing &amp; Multi-Child Management
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Simplified tools allowing caregivers to manage paediatric adherence and
                    log daily schedules for multiple children. Designed with direct alert
                    escalation to Community Health Workers (CHEWs).
                  </p>
                  <ModuleChecklist
                    items={[
                      "Multi-child dose scheduling & proxy check-in",
                      "Weight-adjusted paediatric dosage warnings",
                    ]}
                    accent="text-emerald-600"
                  />
                </div>
                <ModuleImageCard
                  src="/care-nurse.jpg"
                  alt="Nurse reviewing a patient care schedule"
                  badge="Paediatric Care"
                  caption="Guardians manage every child's regimen"
                  note="Weight-adjusted dosing alerts escalate to CHEWs when a dose is missed."
                />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
