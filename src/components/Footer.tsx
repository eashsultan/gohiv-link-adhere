"use client";

import React, { useState } from "react";
import {
  Activity,
  Check,
  Copy,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";
import { useUI } from "./providers";

export function Footer() {
  const { showToast, openDemo } = useUI();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard?.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
    showToast("Copied to Clipboard", text, "info");
  };

  return (
    <footer id="contact" className="relative bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-light pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-14">
        <Reveal>
          <div className="relative p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-[#071226] via-blue-950 to-indigo-950 text-white shadow-deep border border-blue-900 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-600/20 blur-[110px] rounded-full animate-aurora-b" />
              <div className="absolute -bottom-32 right-10 w-96 h-96 bg-amber-500/15 blur-[110px] rounded-full animate-aurora-c" />
              <div className="absolute inset-0 bg-grid-dark opacity-40" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300 bg-blue-900/70 px-3.5 py-1.5 rounded-full border border-blue-700/70">
                  Stakeholder Collaboration
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  Ready to close the gap in HIV care?
                </h3>
                <p className="text-blue-200/90 text-base sm:text-lg max-w-2xl leading-relaxed">
                  Join GOMSACA, SASCP, SFH, and Alpha Spark to initiate the GoHIV Link &amp;
                  Adhere pilot. Request a confidential stakeholder briefing or live
                  technical walkthrough.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <div className="group flex items-center gap-2.5 bg-blue-900/60 border border-blue-700/70 rounded-2xl px-4 py-2.5 hover:border-amber-400/50 transition-colors">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <a
                      href="mailto:alphaspark.ng@gmail.com"
                      className="font-medium text-white hover:text-amber-300 transition-colors text-sm"
                    >
                      alphaspark.ng@gmail.com
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy("alphaspark.ng@gmail.com", "email")}
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Copy email"
                    >
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="group flex items-center gap-2.5 bg-blue-900/60 border border-blue-700/70 rounded-2xl px-4 py-2.5 hover:border-emerald-400/50 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a
                      href="tel:09075444148"
                      className="font-mono font-medium text-white hover:text-emerald-300 transition-colors text-sm"
                    >
                      09075444148
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy("09075444148", "phone")}
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Copy phone number"
                    >
                      {copiedPhone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Magnetic className="w-full" strength={0.25} maxOffset={6}>
                  <button
                    type="button"
                    onClick={() => openDemo()}
                    className="btn-shine w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-glow-amber transition-all text-center active:scale-[0.97]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get in Touch</span>
                  </button>
                </Magnetic>
                <a
                  href="tel:09075444148"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-blue-200 hover:text-white bg-blue-900/50 hover:bg-blue-900 border border-blue-700/60 transition-all text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 09075444148</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-950 text-white flex items-center justify-center shadow-glow-blue">
                <HeartPulse className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-display text-xl font-bold text-slate-950">
                Go<span className="text-blue-600">HIV</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              An offline-first health-tech initiative dedicated to ending lost-to-follow-up
              across the HIV care continuum in Gombe State, Nigeria.
            </p>
            <div className="text-xs text-slate-500 font-medium">
              Developed by <span className="font-bold text-blue-900">Alpha Spark</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <p className="font-bold text-slate-900 uppercase tracking-[0.14em] mb-3">
              Navigation
            </p>
            {[
              { href: "#features", label: "Core Modules" },
              { href: "#how-it-works", label: "Offline & USSD Architecture" },
              { href: "#pilot-program", label: "2027 Pilot Program" },
              { href: "#voices", label: "Grassroots Voices" },
              { href: "#contact", label: "Stakeholder Contact" },
            ].map((link) => (
              <p key={link.href}>
                <a
                  href={link.href}
                  className="text-slate-500 hover:text-blue-800 hover:translate-x-1 inline-block transition-all"
                >
                  {link.label}
                </a>
              </p>
            ))}
          </div>

          <div className="space-y-2.5 text-xs">
            <p className="font-bold text-slate-900 uppercase tracking-[0.14em] mb-3">
              Institutional Alignment
            </p>
            <p className="text-slate-500 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              GOMSACA · Gombe State
            </p>
            <p className="text-slate-500 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              SASCP · State AIDS &amp; STIs Programme
            </p>
            <p className="text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              Society for Family Health (SFH)
            </p>
            <p className="text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              Nigeria Data Protection Regulation
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <p className="font-bold text-slate-900 uppercase tracking-[0.14em] mb-3">
              Alpha Spark Secretariat
            </p>
            <p className="text-slate-500 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <a href="mailto:alphaspark.ng@gmail.com" className="hover:text-blue-800 transition-colors">
                alphaspark.ng@gmail.com
              </a>
            </p>
            <p className="text-slate-500 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <a href="tel:09075444148" className="hover:text-blue-800 transition-colors">
                09075444148
              </a>
            </p>
            <p className="text-slate-500 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              Gombe State, Nigeria
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GoHIV Link &amp; Adhere. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            NDPR Compliant · Zero identifiable HIV data stored on public cloud
          </p>
        </div>
      </div>
    </footer>
  );
}
