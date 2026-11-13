"use client";

import React, { useEffect, useState } from "react";
import { HeartPulse, Menu, Sparkles, X } from "lucide-react";
import { useUI } from "./providers";
import { Magnetic } from "./ui/Magnetic";

const NAV_LINKS = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it Works" },
  { id: "pilot-program", label: "Pilot" },
  { id: "voices", label: "Voices" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { lang, setLang, showToast, openDemo } = useUI();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleLangToggle = (next: "en" | "ha") => {
    if (next === lang) return;
    setLang(next);
    showToast(
      next === "en" ? "Switched to English" : "An canza zuwa Hausa",
      next === "en"
        ? "Landing page set to English mode"
        : "An canza harshen shafin zuwa Harshen Hausa",
      "info"
    );
  };

  return (
    <div className="sticky top-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
      <div className="max-w-7xl mx-auto">
        <header
          className={`rounded-3xl backdrop-blur-2xl border px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "bg-white/90 border-slate-200 shadow-deep"
              : "bg-white/70 border-white/60 shadow-lg shadow-slate-900/5"
          }`}
        >
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group rounded-xl"
            aria-label="GoHIV Link & Adhere Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-slate-950 text-white shadow-glow-blue group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border-2 border-white" />
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                  Go<span className="text-blue-600">HIV</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                  Gombe
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-[0.14em] uppercase">
                Link &amp; Adhere
              </span>
            </div>
          </a>

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-3.5 py-2 text-[13px] font-semibold rounded-xl transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-blue-900 bg-blue-50"
                    : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-amber-500 transition-all duration-300 ${
                    activeSection === link.id ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div
              role="group"
              aria-label="Language Selector"
              className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200"
            >
              {(["en", "ha"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleLangToggle(code)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 ${
                    lang === code
                      ? "bg-white text-blue-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <Magnetic strength={0.25} maxOffset={5}>
              <button
                type="button"
                onClick={() => openDemo()}
                className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] text-white bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-900 hover:to-blue-700 shadow-glow-blue active:scale-95 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Request Demo</span>
              </button>
            </Magnetic>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => handleLangToggle(lang === "en" ? "ha" : "en")}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200"
              aria-label="Toggle language"
            >
              {lang.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-5 space-y-4 shadow-deep animate-fade-slide">
            <nav className="flex flex-col space-y-1 font-semibold text-slate-700 text-sm">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between transition-colors animate-fade-slide"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    0{i + 1}
                  </span>
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openDemo();
              }}
              className="btn-shine w-full py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-center text-sm shadow-glow-amber"
            >
              Request Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
