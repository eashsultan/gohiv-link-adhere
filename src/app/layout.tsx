import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoHIV Link & Adhere | Bridging the HIV Care Continuum in Gombe State",
  description:
    "An offline-first, privacy-centric health-tech platform connecting at-risk individuals to testing, care, and daily adherence support in Gombe State, Nigeria—no smartphone or internet required. Supporting GOMSACA, SASCP, and SFH pilot initiatives.",
  keywords: [
    "GoHIV",
    "Gombe State",
    "HIV Care Continuum",
    "GOMSACA",
    "SASCP",
    "SFH Nigeria",
    "Offline-first Health Tech",
    "USSD Adherence",
    "ARV Adherence",
    "Paediatric Caregiver Mode",
  ],
  authors: [{ name: "Alpha Spark", url: "mailto:alphaspark.ng@gmail.com" }],
  openGraph: {
    title: "GoHIV Link & Adhere — Gombe State HIV Care Continuum",
    description:
      "Offline-first, privacy-centric linkage & adherence platform for Gombe State, Nigeria. USSD, SMS & IVR powered—no smartphone or internet required.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
