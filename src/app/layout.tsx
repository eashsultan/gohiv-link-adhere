import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
