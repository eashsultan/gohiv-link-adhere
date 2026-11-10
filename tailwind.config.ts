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
          dark: "#08152B",
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
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
