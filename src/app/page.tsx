"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Baby,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  Flame,
  Globe2,
  HeartHandshake,
  HeartPulse,
  Info,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Minus,
  Phone,
  Play,
  Pause,
  Plus,
  Radio,
  RefreshCw,
  Send,
  Shield,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Volume2,
  Wifi,
  WifiOff,
  X,
  Zap,
} from "lucide-react";

// --- GOMBE STATE LOCAL GOVERNMENT AREAS & CLINICAL PILOT DATA ---
interface LgaData {
  name: string;
  facilities: string[];
  phcCount: number;
  targetUsers: number;
  chewWorkers: number;
  linkageTarget: string;
  terrain: string;
}

const GOMBE_LGAS_DATA: Record<string, LgaData> = {
  Gombe: {
    name: "Gombe (Metropolitan)",
    facilities: [
      "State Specialist Hospital Gombe (ART Centre)",
      "Urban Maternity Centre Gombe",
      "Federal Teaching Hospital Gombe (FTHG)",
      "Pantami Primary Health Centre",
    ],
    phcCount: 18,
    targetUsers: 1450,
    chewWorkers: 42,
    linkageTarget: "94.5%",
    terrain: "Urban / High Density",
  },
  Akko: {
    name: "Akko LGA",
    facilities: [
      "Kumo General Hospital",
      "Pindiga Primary Health Centre",
      "Kashere Health Centre",
      "Tula Comprehensive Health Post",
    ],
    phcCount: 24,
    targetUsers: 680,
    chewWorkers: 28,
    linkageTarget: "91.8%",
    terrain: "Semi-Urban / Agricultural",
  },
  "Yamaltu/Deba": {
    name: "Yamaltu/Deba LGA",
    facilities: [
      "Deba Cottage Hospital",
      "Dadin Kowa Model PHC",
      "Zambuk Health Centre",
      "Kuri Primary Health Clinic",
    ],
    phcCount: 22,
    targetUsers: 550,
    chewWorkers: 24,
    linkageTarget: "90.4%",
    terrain: "Riverine / Agrarian",
  },
  Balanga: {
    name: "Balanga LGA",
    facilities: [
      "Talasse Cottage Hospital",
      "Gelengu Comprehensive Health Centre",
      "Cham Maternal Health Post",
    ],
    phcCount: 16,
    targetUsers: 380,
    chewWorkers: 18,
    linkageTarget: "89.2%",
    terrain: "Hilly / Dispersed Settlements",
  },
  Billiri: {
    name: "Billiri LGA",
    facilities: [
      "Billiri General Hospital (ART Hub)",
      "Todi PHC Clinic",
      "Tangale Health Outreach Post",
    ],
    phcCount: 14,
    targetUsers: 420,
    chewWorkers: 20,
    linkageTarget: "92.0%",
    terrain: "Semi-Urban Highlands",
  },
  Dukku: {
    name: "Dukku LGA",
    facilities: [
      "Dukku General Hospital",
      "Malala Primary Healthcare Centre",
      "Gombe Abba Rural Clinic",
    ],
    phcCount: 19,
    targetUsers: 410,
    chewWorkers: 22,
    linkageTarget: "88.5%",
    terrain: "Northern Arid / Low Connectivity",
  },
  Funakaye: {
    name: "Funakaye LGA",
    facilities: [
      "Bajoga General Hospital",
      "Ashaka Cement Health Centre",
      "Bogo Model PHC",
    ],
    phcCount: 15,
    targetUsers: 360,
    chewWorkers: 19,
    linkageTarget: "90.1%",
    terrain: "Industrial / Savannah Border",
  },
  Kaltungo: {
    name: "Kaltungo LGA",
    facilities: [
      "Kaltungo General Hospital (Major ART Hub)",
      "Awak Model Health Post",
      "Kamo Primary Care Centre",
    ],
    phcCount: 17,
    targetUsers: 450,
    chewWorkers: 22,
    linkageTarget: "93.1%",
    terrain: "Hilly / Cultural Corridor",
  },
  Kwami: {
    name: "Kwami LGA",
    facilities: [
      "Mallam Sidi Cottage Hospital",
      "Kwami Central Primary Healthcare Post",
      "Boise Rural Health Centre",
    ],
    phcCount: 13,
    targetUsers: 290,
    chewWorkers: 15,
    linkageTarget: "88.9%",
    terrain: "Rural Savannah",
  },
  Nafada: {
    name: "Nafada LGA",
    facilities: [
      "Nafada Comprehensive Health Centre",
      "Birin Bole Health Post",
      "Guduku Outreach Station",
    ],
    phcCount: 11,
    targetUsers: 260,
    chewWorkers: 14,
    linkageTarget: "87.5%",
    terrain: "River Basin / Arid Remote",
  },
  Shongom: {
    name: "Shongom LGA",
    facilities: [
      "Filiya Cottage Hospital",
      "Lala Model Primary Healthcare Centre",
      "Gundale Rural Post",
    ],
    phcCount: 12,
    targetUsers: 250,
    chewWorkers: 14,
    linkageTarget: "89.0%",
    terrain: "Southern Valley / Border Corridor",
  },
};

const GOMBE_LGA_KEYS = Object.keys(GOMBE_LGAS_DATA);

// Toast notification interface
interface ToastMessage {
  id: number;
  title: string;
  description: string;
  type: "success" | "info" | "warning";
}

export default function GoHIVLandingPage() {
  // Navigation & Language
  const [lang, setLang] = useState<"en" | "ha">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = (title: string, description: string, type: "success" | "info" | "warning" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // ---------------------------------------------------------------------------
  // HERO SECTION: HERO VIEW SWITCHER (NURSE HERO vs. USSD KEYPAD DIALER)
  // ---------------------------------------------------------------------------
  const [heroDisplayMode, setHeroDisplayMode] = useState<"nurse" | "ussd">("nurse");

  // USSD Interactive Machine
  const [ussdScreen, setUssdScreen] = useState<string>("dialpad");
  const [ussdDialInput, setUssdDialInput] = useState("*384*44#");
  const [ussdSessionActive, setUssdSessionActive] = useState(false);
  const [generatedVoucher, setGeneratedVoucher] = useState("GHV-GMB-9921");

  // Hero Quick Interaction State
  const [heroIntakeVerified, setHeroIntakeVerified] = useState(false);
  const [heroOfflineState, setHeroOfflineState] = useState(true);

  // ---------------------------------------------------------------------------
  // CORE MODULES: INTERACTIVE TABBED PLAYGROUND
  // ---------------------------------------------------------------------------
  const [activeModuleTab, setActiveModuleTab] = useState<"testing" | "adherence" | "caregiver">("testing");

  // Adherence Live SMS Generator
  const [smsReminderTime, setSmsReminderTime] = useState("08:00 AM");
  const [smsLang, setSmsLang] = useState<"ha" | "en">("ha");
  const [simulatedSmsBanner, setSimulatedSmsBanner] = useState<string | null>(null);

  // Caregiver Mode Interactive Paediatric Schedule
  const [childrenList, setChildrenList] = useState([
    { id: 1, name: "Amina (4 yrs)", regimen: "DTG 10mg Paediatric Dosing", morningTaken: true, eveningTaken: false },
    { id: 2, name: "Ibrahim (7 yrs)", regimen: "TLD Junior Dispersible Tab", morningTaken: false, eveningTaken: false },
  ]);

  // ---------------------------------------------------------------------------
  // WHY GOHIV? INTERACTIVE PLAYGROUNDS
  // ---------------------------------------------------------------------------
  const [demoPhoneInput, setDemoPhoneInput] = useState("0803 754 4148");
  const [hashedTokenOutput, setHashedTokenOutput] = useState("GHV-GMB-8419-SEC");

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlaybackProgress, setAudioPlaybackProgress] = useState(0);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ---------------------------------------------------------------------------
  // PILOT 2027: INTERACTIVE IMPACT CALCULATOR & LGA SELECTOR
  // ---------------------------------------------------------------------------
  const [activeLgaKey, setActiveLgaKey] = useState<string>("Gombe");
  const [pilotUserScale, setPilotUserScale] = useState<number>(5000);

  // ---------------------------------------------------------------------------
  // STAKEHOLDER DEMO MODAL FORM
  // ---------------------------------------------------------------------------
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    org: "GOMSACA",
    email: "",
    phone: "",
    lga: "Gombe",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle USSD Keypad Press
  const handleKeypadPress = (val: string) => {
    if (!ussdSessionActive) {
      setUssdDialInput((prev) => prev + val);
    } else {
      if (ussdScreen === "mainMenu") {
        if (val === "1") setUssdScreen("riskQ1");
        else if (val === "2") setUssdScreen("clinicSelect");
        else if (val === "3") setUssdScreen("medsConfirm");
        else if (val === "4") setUssdScreen("caregiver");
      } else if (ussdScreen === "riskQ1") {
        if (val === "1" || val === "2") setUssdScreen("riskResult");
      } else if (ussdScreen === "clinicSelect") {
        if (val === "1" || val === "2" || val === "3") setUssdScreen("clinicResult");
      }
    }
  };

  const handleDialSend = () => {
    if (!ussdSessionActive) {
      setUssdSessionActive(true);
      setUssdScreen("mainMenu");
      showToast("USSD Connected", "Dialed *384*44# via 2G GSM cellular gateway", "info");
    } else {
      setUssdScreen("mainMenu");
    }
  };

  const handleEndUssd = () => {
    setUssdSessionActive(false);
    setUssdScreen("dialpad");
    showToast("Session Ended", "USSD session terminated safely. Zero airtime deducted.", "info");
  };

  const handleTriggerLiveSms = () => {
    const text =
      smsLang === "ha"
        ? "GoHIV: Barka da safiya! Lokacin shan maganinku ya yi. Amsa da 1 (Na sha) ko 2 (Zan sha anjima). Kyauta ne!"
        : "GoHIV: Good morning! Time for your daily wellness dose. Reply 1 (Taken) or 2 (Will take later). Toll-Free!";
    setSimulatedSmsBanner(text);
    showToast("Live SMS Received", "Simulated GSM delivery for " + smsReminderTime, "success");
    setTimeout(() => {
      setSimulatedSmsBanner(null);
    }, 7000);
  };

  useEffect(() => {
    if (isPlayingAudio) {
      audioIntervalRef.current = setInterval(() => {
        setAudioPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 500);
    } else if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlayingAudio]);

  const handleGenerateHash = () => {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const mockHash = `GHV-${activeLgaKey.substring(0, 3).toUpperCase()}-${randomHex}-NDPR`;
    setHashedTokenOutput(mockHash);
    showToast("Cryptographic Token Generated", `Mapped ${demoPhoneInput} to anonymous salt token ${mockHash}`, "success");
  };

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast("Request Submitted", `Partnership expression received for ${formData.org}`, "success");
  };

  const currentLga = GOMBE_LGAS_DATA[activeLgaKey] || GOMBE_LGAS_DATA["Gombe"];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-blue-950">
      {/* =========================================================================
          FLOATING TOAST NOTIFICATION STACK
      ========================================================================= */}
      <aside aria-label="Notifications" className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl shadow-xl border text-xs backdrop-blur-md animate-in slide-in-from-top-3 fade-in duration-300 ${
              toast.type === "success"
                ? "bg-slate-900/95 text-white border-emerald-500/50"
                : toast.type === "info"
                ? "bg-blue-950/95 text-white border-blue-500/50"
                : "bg-amber-950/95 text-white border-amber-500/50"
            }`}
          >
            <div className="p-1 rounded-lg bg-white/10 shrink-0">
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Info className="w-4 h-4 text-sky-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-[13px]">{toast.title}</p>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">{toast.description}</p>
            </div>
          </div>
        ))}
      </aside>

      {/* Simulated Live GSM SMS Banner */}
      {simulatedSmsBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-top-6 duration-300">
          <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border-2 border-amber-400 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono mb-1">
                <span>SIMULATED GSM SMS · TOLL-FREE</span>
                <span>Just Now</span>
              </div>
              <p className="text-xs font-medium text-slate-100 leading-snug">{simulatedSmsBanner}</p>
            </div>
            <button
              onClick={() => setSimulatedSmsBanner(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          1. NAVIGATION BAR
      ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
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
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#pilot-program"
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors"
              >
                Pilot Program
              </a>
              <a
                href="#contact"
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Right Action Items */}
            <div className="hidden md:flex items-center gap-4">
              <div
                role="group"
                aria-label="Language Selector"
                className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold"
              >
                <button
                  type="button"
                  onClick={() => {
                    setLang("en");
                    showToast("Switched to English", "Landing page set to English mode", "info");
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
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
                  onClick={() => {
                    setLang("ha");
                    showToast("An canza zuwa Hausa", "An canza harshen shafin zuwa Harshen Hausa", "info");
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
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
              >
                {lang.toUpperCase()}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100"
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
            <div className="pt-2 border-t border-slate-100">
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
          2. HERO SECTION WITH REQUESTED HERO IMAGE & TACTILE INTERACTIVITY
      ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-white via-slate-50 to-sky-50/50">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Hero Column: Copy & Dual CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
              {/* Stakeholder & Pilot Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-950 text-xs sm:text-sm font-semibold shadow-xs">
                <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span>
                  {lang === "en"
                    ? "Unified HIV Care Continuum · Gombe State Pilot"
                    : "Hadaddiyar Hanyar Kula da Kanjamau · Jihar Gombe"}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-blue-950 leading-[1.12]">
                {lang === "en" ? (
                  <>
                    Bridging the{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600">
                      HIV Care Continuum
                    </span>{" "}
                    in Gombe State.
                  </>
                ) : (
                  <>
                    Hada Hanyoyin{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600">
                      Kula da Kanjamau
                    </span>{" "}
                    a Jihar Gombe.
                  </>
                )}
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                {lang === "en"
                  ? "An offline-first, privacy-centric platform connecting at-risk individuals to testing, care, and daily adherence support—no smartphone or internet required."
                  : "Tsari na zamani mai aiki ba tare da intanet ko wayar zamani ba, yana hada masu bukata da gwaji, magani, da bibiyar shan kwayoyin yau da kullum a asirce."}
              </p>

              {/* Dual Call-to-Action Buttons */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
                {/* Primary CTA: Warm Gold */}
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-base text-slate-950 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 shadow-lg shadow-amber-400/25 hover:shadow-xl transition-all"
                >
                  <span>{lang === "en" ? "View Core Features" : "Duba Muhimman Ayyuka"}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                {/* Secondary CTA: Outline */}
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base text-blue-950 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-blue-700 transition-all"
                >
                  <HeartHandshake className="w-5 h-5 text-blue-700" />
                  <span>{lang === "en" ? "Partner With Us" : "Yi Hadin Gwiwa da Mu"}</span>
                </button>
              </div>

              {/* Quick Hero Telemetry Bar */}
              <div className="w-full grid grid-cols-3 gap-2 pt-2">
                <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <p className="text-xl font-black text-blue-950">5,000+</p>
                  <p className="text-[11px] font-semibold text-slate-500">Pilot Cohort</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <p className="text-xl font-black text-emerald-600">&gt; 90%</p>
                  <p className="text-[11px] font-semibold text-slate-500">48h Linkage</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <p className="text-xl font-black text-amber-600">11 LGAs</p>
                  <p className="text-[11px] font-semibold text-slate-500">Gombe Ready</p>
                </div>
              </div>

              {/* Stakeholder Framework Alignment Pill Strip */}
              <div className="pt-4 w-full border-t border-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                  Tailored for Seamless Ecosystem Integration With:
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-xs">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    <span>GOMSACA</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-xs">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>SASCP</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>SFH Nigeria</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: BEAUTIFUL HERO IMAGE + FLOATING INTERACTIVE WIDGETS */}
            <div className="lg:col-span-6 relative flex flex-col items-center">
              {/* Interactive View Mode Switcher */}
              <div className="w-full max-w-lg flex items-center justify-between p-1.5 mb-3 bg-slate-200/80 rounded-2xl border border-slate-300 text-xs font-bold z-20">
                <button
                  type="button"
                  onClick={() => {
                    setHeroDisplayMode("nurse");
                    showToast("Clinical Care View", "Viewing Community Health Extension Worker profile", "info");
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    heroDisplayMode === "nurse"
                      ? "bg-blue-900 text-white shadow-md font-extrabold"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Clinical Health Worker View</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHeroDisplayMode("ussd");
                    showToast("USSD Keypad Mode", "Feature Phone Dialing Simulator (*384*44#)", "info");
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    heroDisplayMode === "ussd"
                      ? "bg-blue-900 text-white shadow-md font-extrabold"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Interactive USSD Keypad (*384*44#)</span>
                </button>
              </div>

              {/* MAIN HERO CARD CONTAINER */}
              <div className="w-full max-w-lg relative">
                {/* ---------------- MODE 1: THE REQUESTED HERO IMAGE WITH FLOATING CARDS ---------------- */}
                {heroDisplayMode === "nurse" && (
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200/90 bg-white group">
                    {/* The Hero Image from Pinterest Link */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                      <img
                        src="/hero-image.jpg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://i.pinimg.com/736x/89/d9/5f/89d95fdc82936e4eceb748c4f444177f.jpg";
                        }}
                        alt="Gombe State Community Health Extension Worker supporting HIV care"
                        className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Subtle gradient vignette at bottom for text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                      {/* Floating Badge Top-Left: Offline-First Node */}
                      <div className="absolute top-4 left-4 z-10">
                        <button
                          type="button"
                          onClick={() => {
                            setHeroOfflineState(!heroOfflineState);
                            showToast(
                              !heroOfflineState ? "Offline Engine Active" : "Online Mode",
                              !heroOfflineState
                                ? "Zero-Data USSD/SMS fallback mode is on"
                                : "Syncing to Gombe State Health Cloud",
                              "info"
                            );
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold border border-slate-700 shadow-lg hover:scale-105 transition-all"
                        >
                          <span className={`w-2.5 h-2.5 rounded-full ${heroOfflineState ? "bg-emerald-400 animate-pulse" : "bg-sky-400"}`} />
                          <span>{heroOfflineState ? "Offline-First Sync: Active" : "Online Cloud Sync"}</span>
                        </button>
                      </div>

                      {/* Floating Quick Dial Button Top-Right */}
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          type="button"
                          onClick={() => {
                            setHeroDisplayMode("ussd");
                            setUssdSessionActive(true);
                            setUssdScreen("mainMenu");
                            showToast("Dialed *384*44#", "Opened interactive USSD feature phone session", "success");
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-lg hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all"
                        >
                          <Phone className="w-3.5 h-3.5 fill-current" />
                          <span>Dial *384*44#</span>
                        </button>
                      </div>

                      {/* Floating Card at Bottom: Interactive Telemetry & Health Worker Profile */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl text-slate-900 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                              <HeartPulse className="w-4 h-4 text-blue-700" />
                            </div>
                            <div>
                              <p className="text-xs font-extrabold text-blue-950">Gombe State Healthcare Extension</p>
                              <p className="text-[11px] text-slate-500">CHEW Outreach · State Specialist Hospital</p>
                            </div>
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Verified
                          </span>
                        </div>

                        {/* Interactive Adherence Toggle Pill */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-slate-500 text-[11px] block">Anonymous Patient Log:</span>
                            <span className="font-mono font-bold text-blue-900">GHV-GMB-8492</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setHeroIntakeVerified(!heroIntakeVerified);
                              showToast(
                                !heroIntakeVerified ? "Dose Verified!" : "Intake Reset",
                                !heroIntakeVerified
                                  ? "Morning ARV logged for patient GHV-GMB-8492"
                                  : "Reset patient intake status",
                                "success"
                              );
                            }}
                            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                              heroIntakeVerified
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-amber-400 hover:bg-amber-500 text-slate-950"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{heroIntakeVerified ? "Dose Logged (8:00 AM)" : "Verify Dose Intake"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------- MODE 2: INTERACTIVE USSD FEATURE PHONE KEYPAD ---------------- */}
                {heroDisplayMode === "ussd" && (
                  <div className="p-5 rounded-3xl bg-white border-2 border-slate-200/90 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                        <span>Gombe 2G GSM Net</span>
                      </div>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Zero Airtime · Toll Free
                      </span>
                    </div>

                    {/* USSD Monospace Screen */}
                    <div className="bg-slate-950 rounded-2xl p-4 text-amber-300 font-mono text-xs shadow-inner border border-slate-800 min-h-[170px] flex flex-col justify-between">
                      {ussdScreen === "dialpad" && (
                        <div className="space-y-3 py-2">
                          <p className="text-slate-400 text-[11px]">Ready to dial Gombe USSD Gateway:</p>
                          <div className="p-3 bg-slate-900 rounded-xl text-center text-xl font-bold text-emerald-400 tracking-wider">
                            {ussdDialInput || "Enter code"}
                          </div>
                          <p className="text-[10px] text-slate-500 text-center">
                            Press [DIAL *384*44#] below to start session
                          </p>
                        </div>
                      )}

                      {ussdScreen === "mainMenu" && (
                        <div className="space-y-1.5 py-1 text-slate-100 animate-in fade-in">
                          <p className="text-amber-300 font-bold">
                            {lang === "en" ? "Maraba / Welcome to GoHIV Gombe:" : "Maraba da zuwa GoHIV Gombe:"}
                          </p>
                          <p>1. {lang === "en" ? "Anonymous Risk Test" : "Binciken Hatsarin Kamuwa"}</p>
                          <p>2. {lang === "en" ? "Nearest Clinic Locator" : "Gano Cibiyar Karbar Magani"}</p>
                          <p>3. {lang === "en" ? "Daily ARV Dose Log" : "Taimakon Shan Magani"}</p>
                          <p>4. {lang === "en" ? "Caregiver / Paediatric Mode" : "Yanayin Kula da Yara"}</p>
                        </div>
                      )}

                      {ussdScreen === "riskQ1" && (
                        <div className="space-y-1.5 py-1 text-slate-100 animate-in fade-in">
                          <p className="text-sky-300 font-bold">[Step 1/2] Confidential Screen:</p>
                          <p>Have you taken an HIV test in the last 6 months?</p>
                          <p className="text-amber-300">1. Yes / Ee</p>
                          <p className="text-amber-300">2. No / A&apos;a</p>
                          <p className="text-[10px] text-slate-400 mt-2">Press [1] or [2] on keypad</p>
                        </div>
                      )}

                      {ussdScreen === "riskResult" && (
                        <div className="space-y-1.5 py-1 text-slate-100 animate-in fade-in">
                          <p className="text-emerald-400 font-bold">✓ Test Voucher Issued!</p>
                          <p className="text-slate-300 text-[11px]">
                            Private Code: <span className="text-amber-300 font-bold">{generatedVoucher}</span>
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Present this confidential voucher at any Gombe PHC for priority free screening.
                          </p>
                          <p className="text-xs text-sky-400 font-bold mt-2">Press [0] for Main Menu</p>
                        </div>
                      )}

                      {ussdScreen === "clinicSelect" && (
                        <div className="space-y-1.5 py-1 text-slate-100 animate-in fade-in">
                          <p className="text-sky-300 font-bold">Select Your Local Area:</p>
                          <p>1. Gombe Central / Spec Hospital</p>
                          <p>2. Akko / Kumo General</p>
                          <p>3. Yamaltu/Deba Cottage</p>
                          <p className="text-[10px] text-slate-400">Press [1], [2], or [3]</p>
                        </div>
                      )}

                      {ussdScreen === "clinicResult" && (
                        <div className="space-y-1.5 py-1 text-slate-100 animate-in fade-in">
                          <p className="text-emerald-400 font-bold">Nearest Active Center:</p>
                          <p className="text-amber-300 font-bold">State Specialist Hospital Gombe</p>
                          <p className="text-[11px] text-slate-300">Open Mon-Fri: 8am - 4pm · Walk-ins Welcome</p>
                          <p className="text-xs text-sky-400 font-bold mt-2">Press [0] for Main Menu</p>
                        </div>
                      )}

                      {ussdScreen === "medsConfirm" && (
                        <div className="space-y-1.5 py-1 text-slate-100 animate-in fade-in">
                          <p className="text-emerald-400 font-bold">Daily ARV Check-In:</p>
                          <p>Did you take your scheduled morning dose today?</p>
                          <p className="text-amber-300">1. Ee (Taken) · Logged</p>
                          <p className="text-amber-300">2. A&apos;a (Need Refill Alert)</p>
                          <p className="text-xs text-sky-400 font-bold mt-2">Press [1] to confirm</p>
                        </div>
                      )}

                      {ussdScreen === "caregiver" && (
                        <div className="space-y-1.5 py-1 text-slate-100 animate-in fade-in">
                          <p className="text-amber-300 font-bold">Caregiver Mode (Yara):</p>
                          <p>1. Amina (4 yrs) - Dose Due</p>
                          <p>2. Ibrahim (7 yrs) - Taken</p>
                          <p className="text-xs text-sky-400 font-bold mt-2">Press [0] for Main Menu</p>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-400">
                        <span>{ussdSessionActive ? "🟢 SESSION ACTIVE" : "⚪ STANDBY"}</span>
                        <span>0 AIRTIME DEDUCTED</span>
                      </div>
                    </div>

                    {/* Hardware Keypad */}
                    <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleKeypadPress(key)}
                          className="h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-blue-100 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center justify-center active:scale-95"
                        >
                          {key}
                        </button>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {!ussdSessionActive ? (
                        <button
                          type="button"
                          onClick={handleDialSend}
                          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          <span>DIAL *384*44#</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleEndUssd}
                          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-700 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                        >
                          <X className="w-4 h-4" />
                          <span>END SESSION</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setUssdScreen("mainMenu");
                          setUssdSessionActive(true);
                          showToast("Main Menu", "Returned to USSD root menu", "info");
                        }}
                        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>MENU</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CORE MODULES: WITH INTERACTIVE DEMO TABS
      ========================================================================= */}
      <section id="features" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              Interactive Continuum Explorer
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
              Three Pillars for Zero Lost-to-Follow-Up
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore how GoHIV solves testing linkage, daily ARV adherence, and paediatric caregiver
              support in rural and peri-urban Gombe.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              type="button"
              onClick={() => setActiveModuleTab("testing")}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeModuleTab === "testing"
                  ? "bg-blue-900 text-white shadow-lg shadow-blue-900/20 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <HeartPulse className="w-4 h-4 text-amber-400" />
              <span>1. Testing &amp; Linkage</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModuleTab("adherence")}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeModuleTab === "adherence"
                  ? "bg-blue-900 text-white shadow-lg shadow-blue-900/20 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>2. Adherence &amp; Support</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModuleTab("caregiver")}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeModuleTab === "caregiver"
                  ? "bg-blue-900 text-white shadow-lg shadow-blue-900/20 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Baby className="w-4 h-4 text-emerald-400" />
              <span>3. Caregiver Mode</span>
            </button>
          </div>

          {/* Dynamic Module Showcase Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border-2 border-slate-200/90 shadow-xl">
            {/* MODULE 1: TESTING & LINKAGE */}
            {activeModuleTab === "testing" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                <div className="lg:col-span-7 space-y-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                    Module 01: Testing &amp; Linkage
                  </span>
                  <h3 className="text-3xl font-black text-blue-950">
                    Anonymous Risk Assessments &amp; 48-Hour Linkage
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Anonymous risk assessments and offline facility locators to seamlessly link positive
                    cases to care. Eliminates social fear through zero-identity self-screening.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800">
                        Confidential self-risk evaluation via USSD
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800">
                        Offline mapping of 11 Gombe LGAs ART clinics
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Live Voucher Generator</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Fast-Track Link
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
                    <p className="text-xs text-blue-900 font-semibold">Anonymous Client Linkage Token:</p>
                    <p className="text-2xl font-mono font-black text-blue-950 tracking-wider">
                      {generatedVoucher}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Generated via USSD *384*44# · Valid at any Gombe Primary Healthcare Facility
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newVoucher = `GHV-GMB-${Math.floor(1000 + Math.random() * 9000)}`;
                      setGeneratedVoucher(newVoucher);
                      showToast("New Voucher Created", newVoucher, "success");
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 font-bold text-xs text-white transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Generate New Test Voucher</span>
                  </button>
                </div>
              </div>
            )}

            {/* MODULE 2: ADHERENCE & SUPPORT */}
            {activeModuleTab === "adherence" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                <div className="lg:col-span-7 space-y-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                    Module 02: Adherence &amp; Support
                  </span>
                  <h3 className="text-3xl font-black text-blue-950">
                    Automated Multi-Channel Medication Reminders
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Automated SMS, USSD, and WhatsApp medication reminders for daily ARVs and
                    long-acting PrEP. Patients verify pill intake with a single digit reply at zero
                    cost.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800">
                        Discreet dosing prompts in Hausa &amp; English
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800">
                        Predictive 7-day clinic stockout alerts
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Trigger Sample SMS</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      Zero-Airtime
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Language</label>
                      <select
                        value={smsLang}
                        onChange={(e) => setSmsLang(e.target.value as "ha" | "en")}
                        className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                      >
                        <option value="ha">Hausa (Harshe)</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Time Schedule</label>
                      <select
                        value={smsReminderTime}
                        onChange={(e) => setSmsReminderTime(e.target.value)}
                        className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                      >
                        <option value="08:00 AM">08:00 AM (Morning)</option>
                        <option value="08:00 PM">08:00 PM (Night)</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleTriggerLiveSms}
                    className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test SMS to My Screen</span>
                  </button>
                </div>
              </div>
            )}

            {/* MODULE 3: CAREGIVER MODE */}
            {activeModuleTab === "caregiver" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                <div className="lg:col-span-7 space-y-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Module 03: Caregiver Mode
                  </span>
                  <h3 className="text-3xl font-black text-blue-950">
                    Paediatric Dosing &amp; Multi-Child Management
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Simplified tools allowing caregivers to manage paediatric adherence and log daily
                    schedules for multiple children. Designed with direct alert escalation to
                    Community Health Workers (CHEWs).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800">
                        Multi-child dose scheduling &amp; proxy check-in
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800">
                        Weight-adjusted paediatric dosage warnings
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Guardian Ward Adherence</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      2 Children Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    {childrenList.map((child) => (
                      <div
                        key={child.id}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900">{child.name}</p>
                          <p className="text-[10px] text-slate-500">{child.regimen}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setChildrenList((prev) =>
                              prev.map((c) =>
                                c.id === child.id ? { ...c, morningTaken: !c.morningTaken } : c
                              )
                            );
                            showToast("Child Dose Updated", `Updated status for ${child.name}`, "success");
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                            child.morningTaken
                              ? "bg-emerald-600 text-white"
                              : "bg-amber-400 hover:bg-amber-500 text-slate-950"
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>{child.morningTaken ? "Dose Done" : "Mark Taken"}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY GOHIV? WITH INTERACTIVE PROOF-OF-CONCEPT PLAYGROUNDS
      ========================================================================= */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
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

          {/* Feature 1: Offline-First & USSD Ready */}
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
              </div>
            </div>
          </div>

          {/* Feature 2: Privacy by Design WITH INTERACTIVE HASHER PLAYGROUND */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">NDPR Compliance Tester</h4>
                      <p className="text-xs text-slate-500">Nigeria Data Protection Regulation</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Active Salt Hash
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Test With A Mobile Phone Number:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={demoPhoneInput}
                        onChange={(e) => setDemoPhoneInput(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                        placeholder="0803XXXXXXX"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateHash}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                      >
                        Encrypt Token
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center text-slate-400">
                    <span className="text-[11px] font-mono font-semibold bg-sky-100 text-blue-900 px-3 py-0.5 rounded-full">
                      ↓ One-Way SHA-256 State Salt
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-blue-950">Pseudonymous Token ID:</span>
                    <span className="font-mono font-bold text-blue-700">{hashedTokenOutput}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-700" /> Zero Status Storage Policy
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Servers never hold names, addresses, or unencrypted test outcomes. The client
                      alone holds their confidential PIN.
                    </p>
                  </div>
                </div>
              </div>
            </div>

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
                      Reminder messages are packaged as generic, neutral wellness prompts so onlookers
                      cannot infer HIV treatment status.
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

          {/* Feature 3: Localized for Gombe WITH WORKING AUDIO SIMULATOR */}
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
                    Low Literacy Ready
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Sakon GoHIV Gombe</span>
                    <span>Yau, 8:00 na safe</span>
                  </div>
                  <p className="text-sm font-medium text-amber-300 leading-snug">
                    &ldquo;Barka da safiya. Lokacin shan maganin kariyar lafiyarku ya yi. Kar a manta
                    a sha tare da ruwa mai tsabta.&rdquo;
                  </p>
                  <p className="text-xs text-slate-400">
                    Translation: &ldquo;Good morning. It is time for your scheduled health dosing.
                    Please take it with clean water.&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsPlayingAudio(!isPlayingAudio);
                          showToast(
                            !isPlayingAudio ? "Playing Audio Sample" : "Audio Paused",
                            "Simulating Hausa IVR automated phone call playback",
                            "info"
                          );
                        }}
                        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                      >
                        {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <div>
                        <p className="text-xs font-bold text-blue-950">Hausa IVR Voice Note (0:18)</p>
                        <p className="text-[11px] text-slate-500">Audio call prompt for rural non-readers</p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-blue-900">
                      {isPlayingAudio ? `${Math.floor((audioPlaybackProgress / 100) * 18)}s / 18s` : "0:18"}
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-300"
                      style={{ width: `${audioPlaybackProgress}%` }}
                    />
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
        className="py-24 bg-gradient-to-b from-[#071329] via-[#0D2040] to-[#091730] text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-blue-900/40 border border-blue-700/50 hover:border-amber-400/60 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-amber-400 flex items-center justify-center font-bold">
                  01
                </div>
                <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">Primary KPI</p>
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

            <div className="p-6 rounded-3xl bg-blue-900/40 border border-blue-700/50 hover:border-amber-400/60 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-emerald-400 flex items-center justify-center font-bold">
                  02
                </div>
                <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">Retention Target</p>
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

            <div className="p-6 rounded-3xl bg-blue-900/40 border border-blue-700/50 hover:border-amber-400/60 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-sky-400 flex items-center justify-center font-bold">
                  03
                </div>
                <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">UNAIDS Goal</p>
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

            <div className="p-6 rounded-3xl bg-blue-900/40 border border-blue-700/50 hover:border-amber-400/60 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-orange-400 flex items-center justify-center font-bold">
                  04
                </div>
                <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">Paediatric Focus</p>
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

          {/* Interactive Pilot Impact Calculator Slider */}
          <div className="p-8 rounded-3xl bg-blue-950/90 border border-blue-700/80 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Interactive Projection Model
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Pilot Scale &amp; State Impact Calculator
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-blue-300 block">Target User Cohort:</span>
                <span className="text-3xl font-black text-amber-300 font-mono">
                  {pilotUserScale.toLocaleString()} Users
                </span>
              </div>
            </div>

            {/* Slider */}
            <div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={pilotUserScale}
                onChange={(e) => setPilotUserScale(Number(e.target.value))}
                className="w-full accent-amber-400 h-2 bg-blue-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-blue-300 mt-2 font-mono">
                <span>1,000 Users (Ward Level)</span>
                <span>5,000 Users (Current Pilot Target)</span>
                <span>10,000 Users (Full State Expansion)</span>
              </div>
            </div>

            {/* Reactive Output Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-blue-900/50 border border-blue-800">
                <p className="text-xs text-blue-300">Projected Linkages:</p>
                <p className="text-xl font-bold text-white font-mono mt-1">
                  +{Math.floor(pilotUserScale * 0.91).toLocaleString()} Patients
                </p>
                <p className="text-[10px] text-emerald-400 mt-0.5">Linked to care in 48h</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-900/50 border border-blue-800">
                <p className="text-xs text-blue-300">Daily Adherence SMS:</p>
                <p className="text-xl font-bold text-white font-mono mt-1">
                  {(pilotUserScale * 30).toLocaleString()} /mo
                </p>
                <p className="text-[10px] text-amber-400 mt-0.5">Zero-airtime prompts</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-900/50 border border-blue-800">
                <p className="text-xs text-blue-300">Paediatric Retention:</p>
                <p className="text-xl font-bold text-white font-mono mt-1">
                  {Math.floor(pilotUserScale * 0.18).toLocaleString()} Children
                </p>
                <p className="text-[10px] text-sky-400 mt-0.5">Under Caregiver Mode</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-900/50 border border-blue-800">
                <p className="text-xs text-blue-300">Viral Load Target:</p>
                <p className="text-xl font-bold text-white font-mono mt-1">95.4%</p>
                <p className="text-[10px] text-emerald-400 mt-0.5">UNAIDS 95-95-95 aligned</p>
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
              {GOMBE_LGA_KEYS.map((lga) => (
                <button
                  key={lga}
                  type="button"
                  onClick={() => {
                    setActiveLgaKey(lga);
                    showToast("LGA Selected", `${lga} LGA profile loaded with clinical sites`, "info");
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeLgaKey === lga
                      ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20 scale-105"
                      : "bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50"
                  }`}
                >
                  {lga}
                </button>
              ))}
            </div>

            {/* Active LGA Interactive Profile Box */}
            <div className="mt-6 p-6 rounded-2xl bg-blue-900/40 border border-blue-800 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div>
                  <span className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                    Active Clinical Pilot Profile:
                  </span>
                  <h5 className="text-2xl font-bold text-white">{currentLga.name}</h5>
                  <p className="text-xs text-blue-200">
                    Terrain: {currentLga.terrain} · Targeted Pilot Cohort: {currentLga.targetUsers} Participants
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Designated ART Facilities &amp; PHCs in {activeLgaKey}:
                  </p>
                  <ul className="space-y-1">
                    {currentLga.facilities.map((fac, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-blue-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 shrink-0 sm:min-w-[220px]">
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-800">
                    <span className="text-slate-400 block text-[10px]">PHC Facilities:</span>
                    <span className="text-base font-bold text-white">{currentLga.phcCount} Health Posts</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-800">
                    <span className="text-slate-400 block text-[10px]">Field CHEWs Assigned:</span>
                    <span className="text-base font-bold text-white">{currentLga.chewWorkers} Health Workers</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, lga: activeLgaKey }));
                    setIsDemoModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-white text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Express Interest for {activeLgaKey}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CALL TO ACTION & FOOTER AREA
      ========================================================================= */}
      <footer id="contact" className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white shadow-2xl border border-blue-800 relative overflow-hidden">
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

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
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

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 shadow-xl shadow-orange-600/30 transition-all text-center"
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

            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-2">Navigation</p>
              <p><a href="#features" className="text-slate-600 hover:text-blue-900">Core Modules</a></p>
              <p><a href="#how-it-works" className="text-slate-600 hover:text-blue-900">Offline &amp; USSD Architecture</a></p>
              <p><a href="#pilot-program" className="text-slate-600 hover:text-blue-900">2027 Pilot Program</a></p>
              <p><a href="#contact" className="text-slate-600 hover:text-blue-900">Stakeholder Contact</a></p>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-900 uppercase tracking-wider mb-2">Institutional Alignment</p>
              <p className="text-slate-600">GOMSACA · Gombe State</p>
              <p className="text-slate-600">SASCP · State AIDS &amp; STIs Programme</p>
              <p className="text-slate-600">Society for Family Health (SFH)</p>
              <p className="text-slate-600">Nigeria Data Protection Regulation (NDPR)</p>
            </div>

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
            <button
              type="button"
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
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
