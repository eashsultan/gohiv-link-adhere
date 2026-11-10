"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  ArrowRight,
  Baby,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  HeartHandshake,
  HeartPulse,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Radio,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Volume2,
  WifiOff,
  X,
  Zap,
} from "lucide-react";

// --- GOMBE STATE LOCAL GOVERNMENT AREAS ---
const GOMBE_LGAS = [
  "Akko",
  "Balanga",
  "Billiri",
  "Dukku",
  "Funakaye",
  "Gombe",
  "Kaltungo",
  "Kwami",
  "Nafada",
  "Shongom",
  "Yamaltu/Deba",
];

// --- CONTENT STRATEGY & LOCALIZATION DATA ---
const CONTENT = {
  en: {
    heroBadge: "Unified HIV Care Continuum · Gombe State Pilot",
    heroTitle: "Bridging the HIV Care Continuum in Gombe State.",
    heroSubtitle:
      "An offline-first, privacy-centric platform connecting at-risk individuals to testing, care, and daily adherence support—no smartphone or internet required.",
    ctaPrimary: "View Core Features",
    ctaSecondary: "Partner With Us",
    ussdHeadline: "USSD & Feature Phone Simulator",
    ussdSub: "Dial *384*44# from any phone in Gombe",
    ussdScreenGreeting: "Maraba / Welcome to GoHIV Gombe:",
    ussdOption1: "1. Anonymous Risk Assessment",
    ussdOption2: "2. Locate Nearest ART Center",
    ussdOption3: "3. Meds Refill & Daily Support",
    ussdOption4: "4. Caregiver / Paediatric Mode",
  },
  ha: {
    heroBadge: "Hadaddiyar Hanyar Kula da Cutar Kanjamau · Jihar Gombe",
    heroTitle: "Hada Hanyoyin Kula da Kanjamau a Jihar Gombe.",
    heroSubtitle:
      "Tsari na zamani mai aiki ba tare da intanet ko wayar zamani ba, yana hada masu bukata da gwaji, magani, da bibiyar shan kwayoyin yau da kullum a asirce.",
    ctaPrimary: "Duba Muhimman Ayyuka",
    ctaSecondary: "Yi Hadin Gwiwa da Mu",
    ussdHeadline: "Gwada USSD a Wayar Hannu",
    ussdSub: "Kira *384*44# a kowacce irin waya a Gombe",
    ussdScreenGreeting: "Maraba da zuwa GoHIV Jihar Gombe:",
    ussdOption1: "1. Binciken Hatsarin Kamuwa a Asirce",
    ussdOption2: "2. Gano Cibiyar Karbar Magani mafi kusa",
    ussdOption3: "3. Taimakon Shan Magani na Kullum",
    ussdOption4: "4. Yanayin Kula da Yara (Caregiver Mode)",
  },
};

export default function GoHIVLandingPage() {
  const [lang, setLang] = useState<"en" | "ha">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeLga, setActiveLga] = useState("Gombe");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Interactive USSD Simulator State
  const [ussdStep, setUssdStep] = useState<"idle" | "menu" | "option1" | "option2" | "option3">("menu");
  const [ussdInput, setUssdInput] = useState("");

  // Demo / Partner Form State
  const [formData, setFormData] = useState({
    name: "",
    org: "GOMSACA",
    email: "",
    phone: "",
    lga: "Gombe",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Copy helper
  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard?.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // simulated save
    }, 1000);
  };

  // Close modals on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDemoModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const t = CONTENT[lang];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-blue-950">
      {/* =========================================================================
          1. NAVIGATION BAR
      ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-1"
              aria-label="GoHIV Link & Adhere Home"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6 text-amber-400" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500 border-2 border-white"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-blue-950">
                    Go<span className="text-blue-600">HIV</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    Gombe
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500 tracking-wider">
                  Link &amp; Adhere
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
              <a
                href="#features"
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors focus:text-blue-900"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors focus:text-blue-900"
              >
                How it Works
              </a>
              <a
                href="#pilot-program"
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors focus:text-blue-900"
              >
                Pilot Program
              </a>
              <a
                href="#contact"
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors focus:text-blue-900"
              >
                Contact
              </a>
            </nav>

            {/* Right Action Items */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher Pill */}
              <div
                role="group"
                aria-label="Language Selector"
                className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold"
              >
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    lang === "en"
                      ? "bg-white text-blue-900 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-pressed={lang === "en"}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang("ha")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    lang === "ha"
                      ? "bg-white text-blue-900 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-pressed={lang === "ha"}
                >
                  Hausa
                </button>
              </div>

              {/* Primary CTA Button: Vibrant Orange */}
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setIsDemoModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 active:scale-[0.98] transition-all focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Request Demo</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "ha" : "en")}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200"
                aria-label="Toggle language"
              >
                {lang.toUpperCase()}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
            <nav className="flex flex-col space-y-3 font-semibold text-slate-700 text-base">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-900"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-900"
              >
                How it Works
              </a>
              <a
                href="#pilot-program"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-900"
              >
                Pilot Program
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-900"
              >
                Contact
              </a>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDemoModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-md text-center"
              >
                <Sparkles className="w-4 h-4" />
                Request Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION
      ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 bg-gradient-to-b from-white via-slate-50/50 to-sky-50/30">
        {/* Subtle background tech accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl -z-10 bg-gradient-to-r from-sky-200 via-blue-100 to-amber-100" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Column: Copy & Dual CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              {/* Stakeholder & Pilot Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-950 text-xs sm:text-sm font-semibold shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-blue-950 leading-[1.12]">
                {lang === "en" ? (
                  <>
                    Bridging the{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-electric-blue">
                      HIV Care Continuum
                    </span>{" "}
                    in Gombe State.
                  </>
                ) : (
                  <>
                    Hada Hanyoyin{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-electric-blue">
                      Kula da Kanjamau
                    </span>{" "}
                    a Jihar Gombe.
                  </>
                )}
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
                {t.heroSubtitle}
              </p>

              {/* Dual Call-to-Action Buttons */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* Primary CTA: Warm Gold */}
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-base text-slate-950 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 shadow-lg shadow-amber-400/25 hover:shadow-xl hover:shadow-amber-400/35 transition-all focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  <span>{t.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                {/* Secondary CTA: Outline */}
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base text-blue-950 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-blue-700 transition-all focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  <HeartHandshake className="w-5 h-5 text-blue-700" />
                  <span>{t.ctaSecondary}</span>
                </button>
              </div>

              {/* Stakeholder Framework Alignment Pill Strip */}
              <div className="pt-6 w-full border-t border-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Tailored for Seamless Ecosystem Integration With:
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-xs">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    <span>GOMSACA</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                      (Gombe State Agency)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-xs">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>SASCP</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                      (State AIDS &amp; STIs)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>SFH Nigeria</span>
                    <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                      (Society for Family Health)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Interactive Device Mockup (Phone + Medical Cross Sync) */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Background circular halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-sky-400/10 to-amber-400/15 rounded-3xl filter blur-2xl -z-10" />

              {/* Interactive Phone / Dashboard Shell */}
              <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200/90 relative">
                {/* Header status bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Offline-First Node: Active
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    <WifiOff className="w-3.5 h-3.5 text-slate-600" />
                    <span>Zero Data Needed</span>
                  </div>
                </div>

                {/* Medical Cross Sync Graphic Banner */}
                <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <HeartPulse className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-800/80 border border-blue-400/30 flex items-center justify-center shrink-0">
                      <HeartPulse className="w-7 h-7 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">
                        Gombe Continuum Engine
                      </p>
                      <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                        Client ID: <span className="font-mono text-amber-300">GHV-GMB-8492</span>
                      </h4>
                    </div>
                  </div>

                  {/* Continuum Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-blue-800/60">
                    <div className="flex justify-between text-[11px] font-medium text-blue-200 mb-1">
                      <span>1. Risk Screened</span>
                      <span className="text-amber-300 font-bold">2. Linked to ART</span>
                      <span>3. Adherence</span>
                    </div>
                    <div className="w-full bg-blue-950 rounded-full h-2 overflow-hidden flex">
                      <div className="bg-emerald-400 h-full w-1/3"></div>
                      <div className="bg-amber-400 h-full w-1/3"></div>
                      <div className="bg-blue-700 h-full w-1/3"></div>
                    </div>
                  </div>
                </div>

                {/* Interactive USSD Terminal Preview */}
                <div className="bg-slate-900 rounded-2xl p-4 text-emerald-400 font-mono text-xs shadow-inner border border-slate-800">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Smartphone className="w-3 h-3 text-amber-400" /> USSD Bridge (*384*44#)
                    </span>
                    <span className="text-emerald-400">2G / 3G / 4G GSM</span>
                  </div>

                  {/* USSD Dialog Screen Content */}
                  <div className="space-y-1.5 py-1 text-slate-100">
                    <p className="text-amber-300 font-bold">{t.ussdScreenGreeting}</p>
                    <p>{t.ussdOption1}</p>
                    <p>{t.ussdOption2}</p>
                    <p>{t.ussdOption3}</p>
                    <p>{t.ussdOption4}</p>
                  </div>

                  {/* Quick Action Simulator Buttons */}
                  <div className="mt-3 pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          lang === "en"
                            ? "Simulated USSD: Anonymous test voucher generated! SMS sent to client with encrypted clinic token."
                            : "USSD: An tura lambar sirri ta hanyar sakon SMS domin zuwa cibiyar gwaji a Gombe."
                        )
                      }
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-center font-sans font-semibold transition-colors"
                    >
                      Press [1] Risk Test
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          lang === "en"
                            ? "Simulated USSD: Locating nearest facility in Gombe: State Specialist Hospital & Urban Maternity Gombe."
                            : "USSD: Asibitin Kwararru na Jihar Gombe da Cibiyar Maternity ne mafi kusa da kai."
                        )
                      }
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg text-center font-sans font-semibold transition-colors"
                    >
                      Press [2] Locate Clinic
                    </button>
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100">
                    <p className="text-lg font-black text-blue-900">94.8%</p>
                    <p className="text-[10px] font-medium text-slate-600 uppercase">Adherence</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                    <p className="text-lg font-black text-amber-800">&lt; 48h</p>
                    <p className="text-[10px] font-medium text-slate-600 uppercase">Linkage</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                    <p className="text-lg font-black text-emerald-800">11 LGAs</p>
                    <p className="text-[10px] font-medium text-slate-600 uppercase">Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CORE MODULES (3-COLUMN CARD GRID)
      ========================================================================= */}
      <section id="features" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              Comprehensive Continuum Modules
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
              Three Pillars for Zero Lost-to-Follow-Up
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Designed specifically for the socioeconomic reality of northern Nigeria—supporting
              uninterrupted care from the very first risk screen to lifelong viral suppression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Testing & Linkage */}
            <div className="group relative rounded-3xl p-8 bg-slate-50 hover:bg-white border-2 border-slate-200/90 hover:border-blue-600/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <HeartPulse className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    Continuum Step 01
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3 group-hover:text-blue-700 transition-colors">
                  Testing &amp; Linkage
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                  Anonymous risk assessments and offline facility locators to seamlessly link positive
                  cases to care.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Confidential self-assessment via toll-free USSD &amp; SMS</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Offline mapping of all 11 Gombe LGAs ART clinics</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>48-Hour fast-track electronic referral voucher</span>
                </div>
              </div>
            </div>

            {/* Card 2: Adherence & Support */}
            <div className="group relative rounded-3xl p-8 bg-slate-50 hover:bg-white border-2 border-slate-200/90 hover:border-amber-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-sm">
                  <Clock className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    Continuum Step 02
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                  Adherence &amp; Support
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                  Automated SMS, USSD, and WhatsApp medication reminders for daily ARVs and
                  long-acting PrEP.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Discreet daily dosing notifications in Hausa &amp; English</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Zero-airtime pill check-in verification via 1-digit reply</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Predictive refill alerts 7 days prior to stock exhaustion</span>
                </div>
              </div>
            </div>

            {/* Card 3: Caregiver Mode */}
            <div className="group relative rounded-3xl p-8 bg-slate-50 hover:bg-white border-2 border-slate-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <Baby className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Continuum Step 03
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3 group-hover:text-emerald-700 transition-colors">
                  Caregiver Mode
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                  Simplified tools allowing caregivers to manage paediatric adherence and log daily
                  schedules for multiple children.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Multi-child dose scheduling and guardian proxy check-in</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Weight-adjusted paediatric dosage reminders &amp; alerts</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct SOS escalation to Community Health Workers (CHEWs)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY GOHIV? (FEATURE HIGHLIGHTS - ALTERNATING LAYOUT)
      ========================================================================= */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-700 bg-sky-100 px-3 py-1 rounded-full">
              Engineered For Nigeria&apos;s Grassroots
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950">
              Why GoHIV Link &amp; Adhere?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Designed from the ground up to overcome the exact bottlenecks hindering HIV care in
              Gombe State: connectivity blackspots, stigma, and language barriers.
            </p>
          </div>

          {/* Feature 1: Offline-First & USSD Ready (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-900 text-xs font-bold">
                <WifiOff className="w-4 h-4 text-blue-700" />
                Zero Connectivity Dependency
              </div>
              <h3 className="text-3xl font-extrabold text-blue-950 leading-tight">
                Offline-First &amp; USSD Ready
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Engineered for low-connectivity environments. Core features work seamlessly via USSD
                and SMS on basic feature phones.
              </p>
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-sky-100 text-blue-800 shrink-0">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 text-base">GSM Protocol Agnostic</h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Works over 2G GSM cellular bands with zero internet data or airtime required from
                      the patient.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 text-base">Local Encrypted Cache</h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Clinic terminals queue records locally during rural power cuts and auto-sync to
                      state servers upon reconnection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual 1: Dual Device Illustration */}
            <div className="lg:col-span-6">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white shadow-2xl border border-blue-800/40">
                <div className="flex items-center justify-between pb-4 border-b border-blue-800/60 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="font-semibold text-blue-200">Network: Gombe Rural Grid</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-800/80 text-amber-300 font-mono text-[11px]">
                    2G EDGE / Offline Sync
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Basic feature phone card */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Feature Phone</span>
                        <span>*384*44#</span>
                      </div>
                      <div className="p-3 rounded-lg bg-black text-amber-400 font-mono text-xs leading-relaxed">
                        GoHIV Reminder:
                        <br />
                        Kwanan 14/30.
                        <br />
                        Shan kwayar yau:
                        <br />
                        Amsa da 1 (Ee) ko 2 (A&apos;a).
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero-Airtime Toll Free</span>
                    </div>
                  </div>

                  {/* Tablet / CHW dashboard card */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>CHEW Tablet</span>
                        <span className="text-emerald-400">Synced</span>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-950/80 text-sky-200 text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Cohort:</span>
                          <span className="font-semibold text-white">Dukku LGA Clinic</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Active Clients:</span>
                          <span className="font-semibold text-white">412 Patients</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Missed Doses:</span>
                          <span className="font-semibold text-amber-400">&lt; 2.1%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>End-to-End Encrypted</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-800/60 text-center text-xs text-blue-300 font-medium">
                  Autonomous synchronization between village health posts and Gombe State health database.
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Privacy by Design (Visual Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual 2: Privacy / Cryptographic Token Architecture */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">NDPR Certified Architecture</h4>
                      <p className="text-xs text-slate-500">Nigeria Data Protection Regulation</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Compliant
                  </span>
                </div>

                {/* Stigma-Free ID flow */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-slate-600">Client Phone / SIM</span>
                    <span className="font-mono text-slate-500">0803 ••• 4414</span>
                  </div>

                  <div className="flex justify-center my-1 text-slate-400">
                    <span className="text-xs font-mono font-semibold bg-sky-100 text-blue-900 px-3 py-1 rounded-full">
                      ↓ SHA-256 One-Way Salted Hash
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-blue-950">Pseudonymous Token ID</span>
                    <span className="font-mono font-bold text-blue-700">GHV-AKKO-9041</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-700" /> Zero Status Storage Policy
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Servers never hold names, addresses, or unencrypted test outcomes. The client
                      alone holds their confidential PIN.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                  <span>Protected against social stigma</span>
                  <span>100% Volunteer Participation</span>
                </div>
              </div>
            </div>

            {/* Text 2 */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold">
                <Lock className="w-4 h-4 text-emerald-700" />
                Absolute Confidentiality &amp; Dignity
              </div>
              <h3 className="text-3xl font-extrabold text-blue-950 leading-tight">
                Privacy by Design
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                NDPR compliant. We never store identifiable HIV statuses. Enrolment uses phone
                numbers and secure pins, ensuring absolute confidentiality.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950">Zero-Stigma SMS Masking</h4>
                    <p className="text-sm text-slate-600">
                      Reminder messages are packaged as generic, neutral wellness prompts so nosy
                      onlookers cannot infer HIV treatment status.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950">Secure Client PIN Auth</h4>
                    <p className="text-sm text-slate-600">
                      Only the user can unlock schedule check-ins or link clinic appointments by typing
                      their private 4-digit PIN into their phone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Localized for Gombe (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold">
                <Volume2 className="w-4 h-4 text-amber-700" />
                Inclusivity &amp; Low-Literacy Support
              </div>
              <h3 className="text-3xl font-extrabold text-blue-950 leading-tight">
                Localized for Gombe
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Full Hausa and English language support, designed for low-literacy accessibility with
                high-contrast UI and voice-note readiness.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 text-base">IVR Voice-Note Readiness</h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Automated voice calls in pure conversational Hausa ensure non-literate community
                      members receive their daily reminders seamlessly.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 text-base">Community Cultural Context</h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Developed alongside local healthcare workers in Gombe, respecting local norms,
                      market days, and prayer schedules.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual 3: Hausa / English Language Audio Card Preview */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                      HA
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm sm:text-base">
                        Hausa Voice &amp; SMS Engine
                      </h4>
                      <p className="text-xs text-slate-500">Misalin Sakon Magani a Harshen Hausa</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">
                    Low Literacy
                  </span>
                </div>

                {/* Simulated Hausa message bubble */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 font-sans">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Sakon GoHIV Gombe</span>
                    <span>Yau, 8:00 na safe</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-amber-300 leading-snug">
                    &ldquo;Barka da safiya. Lokacin shan maganin kariyar lafiyarku ya yi. Kar a manta
                    a sha tare da ruwa mai tsabta.&rdquo;
                  </p>
                  <p className="text-xs text-slate-400">
                    English translation: &ldquo;Good morning. It is time for your scheduled health
                    dosing. Please remember to take it with clean water.&rdquo;
                  </p>
                </div>

                {/* Audio voice-note simulator */}
                <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-950">Hausa IVR Voice Note (0:18)</p>
                      <p className="text-[11px] text-slate-500">Audio prompt for non-readers</p>
                    </div>
                  </div>
                  {/* Waveform graphic */}
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse"></span>
                    <span className="w-1 h-6 bg-blue-600 rounded-full animate-pulse"></span>
                    <span className="w-1 h-4 bg-blue-500 rounded-full animate-pulse"></span>
                    <span className="w-1 h-7 bg-amber-500 rounded-full animate-pulse"></span>
                    <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. THE PILOT PROGRAM (STAKEHOLDER FOCUS - DEEP ROYAL BLUE)
      ========================================================================= */}
      <section
        id="pilot-program"
        className="py-24 bg-gradient-to-b from-[#08152B] via-[#0F2752] to-[#0A1B39] text-white relative overflow-hidden"
      >
        {/* Glow decoration */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-800/60 border border-blue-400/30 text-amber-300 text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4" />
              Strategic Implementation Target: 2027
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Join the 2027 Pilot Initiative
            </h2>
            <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed">
              We are currently preparing for a 5,000-user pilot in collaboration with local health
              facilities. Designed for seamless integration with GOMSACA, SASCP, and SFH frameworks.
            </p>
          </div>

          {/* 4 Key Metrics We Will Track */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Metric 1: Testing Uptake */}
            <div className="p-6 rounded-3xl bg-blue-900/40 border border-blue-700/50 hover:border-amber-400/60 transition-all backdrop-blur-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-amber-400 flex items-center justify-center font-bold">
                  01
                </div>
                <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                  Primary KPI
                </p>
                <h3 className="text-xl font-bold text-white">Testing Uptake</h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">
                  Targeting +45% increase in anonymous community screening uptake via USSD &amp; peer
                  referral vouchers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-800/80">
                <span className="text-2xl font-black text-amber-300">5,000+</span>
                <span className="text-xs text-blue-200 block">Enrolled Pilot Cohort</span>
              </div>
            </div>

            {/* Metric 2: Linkage Rates */}
            <div className="p-6 rounded-3xl bg-blue-900/40 border border-blue-700/50 hover:border-amber-400/60 transition-all backdrop-blur-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-emerald-400 flex items-center justify-center font-bold">
                  02
                </div>
                <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                  Retention Target
                </p>
                <h3 className="text-xl font-bold text-white">Linkage Rates</h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">
                  Accelerating verified linkage to ART clinics within 48 hours of positive reactive
                  results.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-800/80">
                <span className="text-2xl font-black text-emerald-400">&gt; 90%</span>
                <span className="text-xs text-blue-200 block">48-Hour Facility Linkage</span>
              </div>
            </div>

            {/* Metric 3: Viral Suppression */}
            <div className="p-6 rounded-3xl bg-blue-900/40 border border-blue-700/50 hover:border-amber-400/60 transition-all backdrop-blur-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-sky-400 flex items-center justify-center font-bold">
                  03
                </div>
                <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                  UNAIDS Goal
                </p>
                <h3 className="text-xl font-bold text-white">Viral Suppression</h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">
                  Sustaining daily medication adherence to achieve the 95-95-95 viral suppression
                  milestone.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-800/80">
                <span className="text-2xl font-black text-sky-300">95%</span>
                <span className="text-xs text-blue-200 block">6-Month Undetectable Load</span>
              </div>
            </div>

            {/* Metric 4: Caregiver Retention */}
            <div className="p-6 rounded-3xl bg-blue-900/40 border border-blue-700/50 hover:border-amber-400/60 transition-all backdrop-blur-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-orange-400 flex items-center justify-center font-bold">
                  04
                </div>
                <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                  Paediatric Focus
                </p>
                <h3 className="text-xl font-bold text-white">Caregiver Retention</h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">
                  Preventing lost-to-follow-up among infants and children through simplified proxy
                  guardian logging.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-800/80">
                <span className="text-2xl font-black text-orange-400">98%</span>
                <span className="text-xs text-blue-200 block">Paediatric Cohort Retention</span>
              </div>
            </div>
          </div>

          {/* Interactive Gombe State 11 LGAs Deployment Selector */}
          <div className="p-8 rounded-3xl bg-blue-950/70 border border-blue-800/80 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  Pilot LGA Deployment Footprint across Gombe State
                </h4>
                <p className="text-xs sm:text-sm text-blue-200 mt-1">
                  Click an LGA to view primary healthcare center (PHC) readiness &amp; demographic
                  profile:
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-800/80 border border-blue-700 text-blue-200 w-fit">
                All 11 Local Government Areas Supported
              </span>
            </div>

            {/* LGA Pill buttons */}
            <div className="flex flex-wrap gap-2">
              {GOMBE_LGAS.map((lga) => (
                <button
                  key={lga}
                  type="button"
                  onClick={() => setActiveLga(lga)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeLga === lga
                      ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20 scale-105"
                      : "bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50"
                  }`}
                >
                  {lga}
                </button>
              ))}
            </div>

            {/* Active LGA Detail Bar */}
            <div className="mt-6 p-4 rounded-2xl bg-blue-900/40 border border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                  Selected Local Government:
                </span>
                <p className="text-base font-bold text-white">
                  {activeLga} LGA · Primary Health Care &amp; General Hospital Network
                </p>
                <p className="text-blue-200 text-xs">
                  Readiness: USSD Gateway Configured · Hausa IVR Audio Prompts Installed · SFH /
                  SASCP Hub Linked.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, lga: activeLga }));
                  setIsDemoModalOpen(true);
                }}
                className="shrink-0 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-white text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Express Interest for {activeLga}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CALL TO ACTION & FOOTER AREA
      ========================================================================= */}
      <footer id="contact" className="bg-white border-t border-slate-200">
        {/* Main CTA Card Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white shadow-2xl border border-blue-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-blue-900/80 px-3 py-1 rounded-full border border-blue-700">
                  Stakeholder Collaboration
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Ready to close the gap in HIV care?
                </h3>
                <p className="text-blue-200 text-base sm:text-lg max-w-2xl leading-relaxed">
                  Join GOMSACA, SASCP, SFH, and Alpha Spark to initiate the GoHIV Link &amp; Adhere
                  pilot. Request a confidential stakeholder briefing or live technical walkthrough.
                </p>

                {/* Direct Contact Pills */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                  {/* Email button with copy state */}
                  <div className="flex items-center gap-2 bg-blue-900/70 border border-blue-700/80 rounded-xl px-3.5 py-2">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <a
                      href="mailto:alphaspark.ng@gmail.com"
                      className="font-medium text-white hover:underline"
                    >
                      alphaspark.ng@gmail.com
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy("alphaspark.ng@gmail.com", "email")}
                      className="ml-2 text-slate-300 hover:text-white"
                      title="Copy email"
                    >
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Phone button with copy state */}
                  <div className="flex items-center gap-2 bg-blue-900/70 border border-blue-700/80 rounded-xl px-3.5 py-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <a href="tel:09075444148" className="font-mono font-medium text-white hover:underline">
                      09075444148
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy("09075444148", "phone")}
                      className="ml-2 text-slate-300 hover:text-white"
                      title="Copy phone number"
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

              {/* Big CTA Button */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 shadow-xl shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-center focus:ring-2 focus:ring-orange-400"
                >
                  <Send className="w-4 h-4" />
                  <span>Get in Touch</span>
                </button>
                <a
                  href="tel:09075444148"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-blue-200 hover:text-white bg-blue-900/50 hover:bg-blue-900 border border-blue-700/60 transition-all text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 09075444148</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Detailed Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200">
            {/* Col 1: About */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-xs">
                  <HeartPulse className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xl font-black text-blue-950">
                  Go<span className="text-blue-600">HIV</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                An offline-first health-tech initiative dedicated to ending lost-to-follow-up across
                the HIV care continuum in Gombe State, Nigeria.
              </p>
              <div className="text-xs text-slate-500 font-medium">
                Developed by <span className="font-bold text-blue-950">Alpha Spark</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-2">Navigation</p>
              <p>
                <a href="#features" className="text-slate-600 hover:text-blue-900 transition-colors">
                  Core Modules
                </a>
              </p>
              <p>
                <a href="#how-it-works" className="text-slate-600 hover:text-blue-900 transition-colors">
                  Offline &amp; USSD Architecture
                </a>
              </p>
              <p>
                <a href="#pilot-program" className="text-slate-600 hover:text-blue-900 transition-colors">
                  2027 Pilot Program
                </a>
              </p>
              <p>
                <a href="#contact" className="text-slate-600 hover:text-blue-900 transition-colors">
                  Stakeholder Contact
                </a>
              </p>
            </div>

            {/* Col 3: Stakeholders */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-2">
                Institutional Alignment
              </p>
              <p className="text-slate-600">GOMSACA · Gombe State</p>
              <p className="text-slate-600">SASCP · State AIDS &amp; STIs Programme</p>
              <p className="text-slate-600">Society for Family Health (SFH)</p>
              <p className="text-slate-600">Nigeria Data Protection Regulation (NDPR)</p>
            </div>

            {/* Col 4: Contact info */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-2">Alpha Spark Secretariat</p>
              <p className="text-slate-600 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-700" />
                <span>alphaspark.ng@gmail.com</span>
              </p>
              <p className="text-slate-600 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>09075444148</span>
              </p>
              <p className="text-slate-600 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-700" />
                <span>Gombe State, Nigeria</span>
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} GoHIV Link &amp; Adhere. All rights reserved.</p>
            <p className="flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              NDPR Compliant · Zero identifiable HIV data stored on public cloud
            </p>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          7. INTERACTIVE STAKEHOLDER / REQUEST DEMO MODAL
      ========================================================================= */}
      {isDemoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-blue-950">Partnership Request Received!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Nagode! The Alpha Spark team will contact you shortly regarding the{" "}
                  <strong>{formData.org}</strong> briefing and pilot sandbox in{" "}
                  <strong>{formData.lga} LGA</strong>.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDemoModalOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-blue-900 text-white font-bold text-sm hover:bg-blue-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                    Pilot Onboarding
                  </span>
                  <h3 id="modal-title" className="text-2xl font-black text-blue-950">
                    Request Stakeholder Demo &amp; Pilot Briefing
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Schedule a personalized walkthrough of the USSD engine, offline sync, and
                    caregiver module for your organization.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. / Alh. / Aisha Ibrahim"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Stakeholder Organization
                      </label>
                      <select
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 text-sm bg-white"
                      >
                        <option value="GOMSACA">GOMSACA</option>
                        <option value="SASCP">SASCP</option>
                        <option value="SFH">Society for Family Health (SFH)</option>
                        <option value="Primary Healthcare Board">GPHCDA / PHC Clinic</option>
                        <option value="Implementing Partner">NGO / Implementing Partner</option>
                        <option value="Other Stakeholder">Other Health Partner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Target Gombe LGA
                      </label>
                      <select
                        value={formData.lga}
                        onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 text-sm bg-white"
                      >
                        {GOMBE_LGAS.map((lga) => (
                          <option key={lga} value={lga}>
                            {lga} LGA
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@domain.gov.ng"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone Number (Call / WhatsApp)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0803XXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Notes or Specific Interest (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Inquiring about pilot integration for 5 PHCs in Yamaltu/Deba or paediatric adherence support..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsDemoModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
