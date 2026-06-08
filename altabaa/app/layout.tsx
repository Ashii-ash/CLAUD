import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al Tabaa Cards — Premium Printing & Corporate Gifts UAE | Sharjah",
  description:
    "Al Tabaa Cards is the UAE's premier printing and corporate gifting manufacturer. 20+ years crafting luxury packaging, corporate gifts, awards, acrylic fabrication, signage, and branding solutions across the UAE & GCC.",
  keywords: [
    "corporate gifts UAE",
    "premium printing Sharjah",
    "luxury packaging UAE",
    "business cards Dubai",
    "acrylic awards UAE",
    "corporate gifts GCC",
    "offset printing Sharjah",
    "branded merchandise UAE",
    "custom gift boxes",
    "National Day gifts UAE",
    "Al Tabaa Cards",
  ],
  openGraph: {
    title: "Al Tabaa Cards — Premium Printing & Corporate Gifts UAE",
    description:
      "20+ years crafting luxury packaging, corporate gifts, awards, acrylic fabrication and premium printing solutions across the UAE & GCC.",
    type: "website",
    locale: "en_AE",
    siteName: "Al Tabaa Cards",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Tabaa Cards — Premium Printing & Corporate Gifts UAE",
    description:
      "Luxury printing, corporate gifts, packaging, and awards. 20+ years. Sharjah, UAE.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-white text-[#111111] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
