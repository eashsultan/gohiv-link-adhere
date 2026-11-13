"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

type ToastType = "success" | "info" | "warning";

interface ToastMessage {
  id: number;
  title: string;
  description: string;
  type: ToastType;
}

interface UIContextValue {
  lang: "en" | "ha";
  setLang: (lang: "en" | "ha") => void;
  showToast: (title: string, description: string, type?: ToastType) => void;
  demoOpen: boolean;
  demoPresetLga: string;
  openDemo: (lga?: string) => void;
  closeDemo: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}

const TOAST_DURATION = 4200;

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"en" | "ha">("en");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoPresetLga, setDemoPresetLga] = useState("Gombe");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, description: string, type: ToastType = "success") => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev.slice(-2), { id, title, description, type }]);
      const timer = setTimeout(() => dismissToast(id), TOAST_DURATION);
      timersRef.current.push(timer);
    },
    [dismissToast]
  );

  const openDemo = useCallback((lga?: string) => {
    if (lga) setDemoPresetLga(lga);
    setDemoOpen(true);
  }, []);

  const closeDemo = useCallback(() => setDemoOpen(false), []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <UIContext.Provider
      value={{ lang, setLang, showToast, demoOpen, demoPresetLga, openDemo, closeDemo }}
    >
      {children}
      <div
        aria-label="Notifications"
        className="fixed top-24 right-4 z-[90] flex flex-col gap-2.5 w-[calc(100%-2rem)] max-w-xs pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto animate-toast-in relative overflow-hidden rounded-2xl border shadow-deep backdrop-blur-xl"
          >
            <div
              className={`flex items-start gap-3 p-4 ${
                toast.type === "success"
                  ? "bg-slate-950/95 border-emerald-500/30"
                  : toast.type === "info"
                  ? "bg-slate-950/95 border-sky-500/30"
                  : "bg-slate-950/95 border-amber-500/40"
              }`}
            >
              <div className="p-1.5 rounded-xl bg-white/10 shrink-0">
                {toast.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : toast.type === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <Info className="w-4 h-4 text-sky-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-[13px] leading-snug">{toast.title}</p>
                <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="text-slate-500 hover:text-white p-0.5 rounded-md transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div
              className={`h-0.5 ${
                toast.type === "success"
                  ? "bg-emerald-400"
                  : toast.type === "warning"
                  ? "bg-amber-400"
                  : "bg-sky-400"
              }`}
              style={{
                animation: `toast-progress ${TOAST_DURATION}ms linear forwards`,
              }}
            />
          </div>
        ))}
      </div>
    </UIContext.Provider>
  );
}
