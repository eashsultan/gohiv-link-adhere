import React from "react";
import {
  Check,
  Lock,
  RefreshCw,
  ShieldCheck,
  Signal,
  Users,
  Volume2,
  WifiOff,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

function ImagePanel({
  src,
  alt,
  chip,
  caption,
  note,
  dark = false,
  chipIcon: ChipIcon,
}: {
  src: string;
  alt: string;
  chip: string;
  caption: string;
  note: string;
  dark?: boolean;
  chipIcon: React.ElementType;
}) {
  return (
    <div className="relative">
      <div
        className={`absolute inset-0 translate-x-4 translate-y-4 rounded-[36px] pointer-events-none ${
          dark
            ? "bg-gradient-to-br from-amber-400/30 via-sky-500/20 to-transparent"
            : "bg-gradient-to-br from-blue-400/25 via-emerald-300/25 to-transparent"
        }`}
      />
      <div
        className={`group relative overflow-hidden rounded-[36px] shadow-deep ${
          dark ? "border border-white/10 bg-slate-950" : "border border-slate-200 bg-white p-2.5"
        }`}
      >
        <div className="relative overflow-hidden rounded-[26px] min-h-[380px] sm:min-h-[440px]">
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent pointer-events-none" />
          <span
            className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur border ${
              dark
                ? "bg-slate-950/70 border-amber-400/40 text-amber-300"
                : "bg-slate-950/70 border-white/25 text-white"
            }`}
          >
            <ChipIcon className="w-3.5 h-3.5" />
            {chip}
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <p className="font-display text-xl font-bold text-white leading-snug">
              {caption}
            </p>
            <p className="text-xs sm:text-[13px] text-blue-100/85 font-medium mt-2 leading-relaxed">
              {note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyGoHiv() {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-light pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <SectionHeading
          eyebrow="Engineered For Nigeria's Grassroots"
          title="Why GoHIV Link & Adhere?"
          description="Designed from the ground up to overcome the exact bottlenecks hindering HIV care in Gombe State: connectivity blackspots, stigma, and language barriers."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-100 text-blue-900 text-xs font-bold">
                <WifiOff className="w-4 h-4 text-blue-700" />
                Zero Connectivity Dependency
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Offline-First &amp; USSD Ready
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-lg text-slate-600 leading-relaxed">
                Engineered for low-connectivity environments. Core features work seamlessly
                via USSD and SMS on basic feature phones.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="space-y-4">
                <div className="group p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md hover:border-sky-200 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-sky-100 text-blue-700 shrink-0 transition-transform group-hover:scale-110">
                    <Signal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">GSM Protocol Agnostic</h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Works over 2G GSM cellular bands with zero internet data or airtime
                      required from the patient.
                    </p>
                  </div>
                </div>
                <div className="group p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md hover:border-amber-200 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0 transition-transform group-hover:scale-110">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Local Encrypted Cache
                    </h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Clinic terminals queue records locally during rural power cuts and
                      auto-sync to state servers upon reconnection.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-6">
            <ImagePanel
              src="/care-ribbon-hand.jpg"
              alt="A hand holding a red awareness ribbon as a symbol of HIV solidarity"
              chip="Zero Data · Zero Airtime"
              chipIcon={Signal}
              caption="Care that never drops the connection"
              note="Even when the grid fails, USSD and SMS keep every client tied to their clinic and regimen."
              dark
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal delay={120} className="lg:col-span-6 order-2 lg:order-1">
            <ImagePanel
              src="/care-ribbon.jpg"
              alt="Red ribbon symbolizing HIV awareness and confidentiality"
              chip="Zero Status Storage"
              chipIcon={Lock}
              caption="Privacy is the treatment's foundation"
              note="Servers never hold names or test outcomes — clients stay pseudonymous from first screening to viral suppression."
            />
          </Reveal>
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold">
                <Lock className="w-4 h-4 text-emerald-700" />
                Absolute Confidentiality &amp; Dignity
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Privacy by Design
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-lg text-slate-600 leading-relaxed">
                NDPR compliant. We never store identifiable HIV statuses. Enrolment uses
                phone numbers and secure pins, ensuring absolute confidentiality.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="space-y-4">
                {[
                  {
                    title: "Zero-Stigma SMS Masking",
                    desc: "Reminder messages are packaged as generic, neutral wellness prompts so onlookers cannot infer HIV treatment status.",
                  },
                  {
                    title: "Secure Client PIN Auth",
                    desc: "Only the user can unlock schedule check-ins or link clinic appointments by typing their private 4-digit PIN into their phone.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5 group">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold">
                <Volume2 className="w-4 h-4 text-amber-700" />
                Inclusivity &amp; Low-Literacy Support
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Localized for Gombe
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-lg text-slate-600 leading-relaxed">
                Full Hausa and English language support, designed for low-literacy
                accessibility with high-contrast UI and voice-note readiness.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="space-y-4">
                <div className="group p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0 transition-transform group-hover:scale-110">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      IVR Voice-Note Readiness
                    </h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Automated voice calls in pure conversational Hausa ensure non-literate
                      community members receive their daily reminders seamlessly.
                    </p>
                  </div>
                </div>
                <div className="group p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5 hover:shadow-md hover:border-emerald-200 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 transition-transform group-hover:scale-110">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Community Cultural Context
                    </h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Developed alongside local healthcare workers in Gombe, respecting local
                      norms, market days, and prayer schedules.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-6">
            <ImagePanel
              src="/care-stethoscope.jpg"
              alt="Healthcare worker holding a stethoscope shaped like a heart"
              chip="Hausa & English"
              chipIcon={ShieldCheck}
              caption="Care that speaks the community's language"
              note="Voice notes, SMS, and USSD menus rendered in conversational Hausa for every household in Gombe."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
