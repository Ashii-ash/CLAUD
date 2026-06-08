import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MELIZ — Crafted Beyond Glass",
  description: "Bespoke crystal and luxury architectural creations designed for extraordinary spaces. MELIZ is the luxury division of ATATC, bringing 20+ years of craftsmanship to premium interiors.",
  keywords: ["luxury crystal", "architectural glass", "bespoke interiors", "luxury UAE", "crystal installations", "decorative glass Dubai"],
  openGraph: {
    title: "MELIZ — Crafted Beyond Glass",
    description: "Bespoke crystal and luxury architectural creations designed for extraordinary spaces.",
    type: "website",
    locale: "en_AE",
    siteName: "MELIZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#111111] text-white antialiased">{children}</body>
    </html>
  );
}
