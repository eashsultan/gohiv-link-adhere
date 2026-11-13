"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  HeartPulse,
  Lock,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { GOMBE_LGA_KEYS } from "@/lib/data";
import { useUI } from "./providers";

const ORG_OPTIONS = [
  { value: "GOMSACA", label: "GOMSACA" },
  { value: "SASCP", label: "SASCP" },
  { value: "SFH", label: "Society for Family Health (SFH)" },
  { value: "Primary Healthcare Board", label: "GPHCDA / PHC Clinic" },
  { value: "Implementing Partner", label: "NGO / Implementing Partner" },
  { value: "Other Stakeholder", label: "Other Health Partner" },
];

export function DemoModal() {
  const { demoOpen, demoPresetLga, closeDemo, showToast } = useUI();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    org: "GOMSACA",
    email: "",
    phone: "",
    lga: "Gombe",
    notes: "",
  });

  useEffect(() => {
    if (demoOpen) {
      setFormData((prev) => ({ ...prev, lga: demoPresetLga }));
      setFormSubmitted(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [demoOpen, demoPresetLga]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDemo();
    };
    if (demoOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [demoOpen, closeDemo]);

  if (!demoOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast(
      "Request Submitted",
      `Partnership expression received for ${formData.org}`,
      "success"
    );
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm outline-none transition-all bg-white";
  const labelClass =
    "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-slide"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={closeDemo}
    >
      <div
        className="relative bg-white rounded-[28px] max-w-3xl w-full shadow-deep border border-slate-200 max-h-[92vh] overflow-y-auto animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeDemo}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {formSubmitted ? (
          <div className="py-14 px-8 text-center space-y-5">
            <svg viewBox="0 0 52 52" className="w-24 h-24 mx-auto">
              <circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="160"
                strokeDashoffset="160"
                style={{ animation: "draw-stroke 0.7s ease forwards" }}
              />
              <path
                d="M15 27l7.5 7.5L37 20"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset="40"
                style={{ animation: "draw-stroke 0.45s ease 0.55s forwards" }}
              />
            </svg>
            <h3 className="font-display text-2xl font-bold text-slate-900">
              Partnership Request Received!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Nagode! The Alpha Spark team will contact you shortly regarding the{" "}
              <strong className="text-slate-900">{formData.org}</strong> briefing and pilot
              sandbox in <strong className="text-slate-900">{formData.lga} LGA</strong>.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={closeDemo}
                className="btn-shine px-8 py-3 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="relative lg:col-span-2 bg-gradient-to-b from-[#071226] to-blue-950 text-white p-8 space-y-6 overflow-hidden rounded-t-[28px] lg:rounded-tr-none lg:rounded-l-[28px]">
              <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
              <div className="absolute -top-16 -left-16 w-56 h-56 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
              <div className="relative space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.18em]">
                    Pilot Onboarding
                  </span>
                  <h3 id="modal-title" className="font-display text-2xl font-bold mt-2 leading-snug">
                    Request Stakeholder Demo &amp; Pilot Briefing
                  </h3>
                  <p className="text-blue-200/80 text-xs leading-relaxed mt-3">
                    Schedule a personalized walkthrough of the USSD engine, offline sync,
                    and caregiver module for your organization.
                  </p>
                </div>

                <ul className="space-y-3.5 text-xs">
                  {[
                    { icon: HeartPulse, text: "Live USSD *384*44# sandbox session" },
                    { icon: Lock, text: "NDPR compliance architecture review" },
                    { icon: Clock, text: "48-hour response commitment" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5 text-blue-100">
                      <span className="w-7 h-7 rounded-lg bg-blue-900/80 border border-blue-700/60 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-blue-800/60 space-y-2 text-xs">
                  <p className="flex items-center gap-2 text-blue-200">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    alphaspark.ng@gmail.com
                  </p>
                  <p className="flex items-center gap-2 text-blue-200">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    09075444148
                  </p>
                  <p className="flex items-center gap-2 text-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    Confidential · No data shared
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-3 p-6 sm:p-8 space-y-4">
              <div>
                <label className={labelClass} htmlFor="demo-name">
                  Full Name
                </label>
                <input
                  id="demo-name"
                  type="text"
                  required
                  placeholder="Dr. / Alh. / Aisha Ibrahim"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} htmlFor="demo-org">
                    Stakeholder Organization
                  </label>
                  <select
                    id="demo-org"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    className={inputClass}
                  >
                    {ORG_OPTIONS.map((org) => (
                      <option key={org.value} value={org.value}>
                        {org.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="demo-lga">
                    Target Gombe LGA
                  </label>
                  <select
                    id="demo-lga"
                    value={formData.lga}
                    onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                    className={inputClass}
                  >
                    {GOMBE_LGA_KEYS.map((lga) => (
                      <option key={lga} value={lga}>
                        {lga} LGA
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} htmlFor="demo-email">
                    Email Address
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    required
                    placeholder="yourname@domain.gov.ng"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="demo-phone">
                    Phone (Call / WhatsApp)
                  </label>
                  <input
                    id="demo-phone"
                    type="tel"
                    required
                    placeholder="0803XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`${inputClass} font-mono`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="demo-notes">
                  Notes or Specific Interest (Optional)
                </label>
                <textarea
                  id="demo-notes"
                  rows={3}
                  placeholder="e.g. Inquiring about pilot integration for 5 PHCs in Yamaltu/Deba or paediatric adherence support..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeDemo}
                  className="px-5 py-2.5 rounded-xl text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shine px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm shadow-glow-blue transition-all flex items-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
