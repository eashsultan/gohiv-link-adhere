import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#050D1A",
          royal: "#0F2752",
          navy: "#153366",
          electric: "#2563EB",
          sky: "#38BDF8",
          skySoft: "#F0F9FF",
          gold: "#F59E0B",
          goldHover: "#D97706",
          orange: "#EA580C",
          orangeHover: "#C2410C",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-amber": "0 0 44px -10px rgba(245, 158, 11, 0.5)",
        "glow-blue": "0 0 44px -10px rgba(37, 99, 235, 0.45)",
        "glow-emerald": "0 0 36px -8px rgba(16, 185, 129, 0.45)",
        "deep": "0 32px 64px -24px rgba(2, 6, 23, 0.45)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
