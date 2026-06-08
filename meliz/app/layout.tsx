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
  title: "MELIZ — Luxury Gifting Dubai | Elite & Bespoke Gifts UAE",
  description: "MELIZ is Dubai's premier luxury gifting brand. We specialise in elite gifting, corporate gifts, luxury gift sets, signature gifts, gift hampers, and premium packaging — crafted for those who demand the extraordinary.",
  keywords: ["luxury gifting Dubai", "corporate gifts UAE", "bespoke gift sets", "elite gifting", "luxury hampers Dubai", "personalised gifts UAE", "premium packaging", "signature gifts", "occasion gifts Dubai", "MELIZ gifting"],
  openGraph: {
    title: "MELIZ — Luxury Gifting Dubai | Elite & Bespoke Gifts UAE",
    description: "Dubai's premier luxury gifting brand. Elite gifting, corporate gifts, luxury gift sets, signature gifts and premium packaging — crafted for the extraordinary.",
    type: "website",
    locale: "en_AE",
    siteName: "MELIZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "MELIZ — Luxury Gifting Dubai",
    description: "Elite gifting, corporate gifts, luxury gift sets and bespoke hampers in Dubai, UAE.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://meliz-luxury.vercel.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} h-full`}>
      <body className="min-h-full bg-white text-[#0A0A0A] antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
