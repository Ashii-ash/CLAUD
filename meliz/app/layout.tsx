import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MELIZ — Crafted Beyond Glass",
  description: "Bespoke crystal and luxury architectural creations designed for extraordinary spaces. MELIZ is the luxury division of ATATC, Dubai.",
  keywords: ["luxury crystal", "architectural glass", "bespoke interiors", "Dubai luxury", "crystal installations"],
  openGraph: {
    title: "MELIZ — Crafted Beyond Glass",
    description: "Bespoke crystal and luxury architectural creations designed for extraordinary spaces.",
    type: "website",
    locale: "en_AE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} h-full`}>
      <body className="min-h-full bg-white text-[#0A0A0A] antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
