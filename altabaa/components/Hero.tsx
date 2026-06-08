"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SERVICES = [
  "Premium Printing",
  "Luxury Packaging",
  "Corporate Gifts",
  "Awards & Trophies",
  "Acrylic Fabrication",
  "Signage & Branding",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#111]">
      {/* Background image with parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=2000&q=85&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </motion.div>

      {/* Thin gold lines — decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A96A]/20 to-transparent" />
        <div className="absolute bottom-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A96A]/15 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 px-6 lg:px-20 flex flex-col items-start max-w-[1400px] mx-auto w-full"
      >
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-[#C8A96A]" />
          <span className="label text-[#C8A96A]">Al Tabaa Cards · Est. 2000 · Sharjah, UAE</span>
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="heading-display text-white"
            style={{ fontSize: "clamp(3rem, 9vw, 11rem)" }}
          >
            Crafting Brands
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="heading-display text-white italic"
            style={{ fontSize: "clamp(3rem, 9vw, 11rem)" }}
          >
            Into Experiences.
          </motion.h1>
        </div>

        {/* Services list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-x-6 gap-y-2 mb-14 max-w-2xl"
        >
          {SERVICES.map((s, i) => (
            <span key={s} className="label text-white/50">
              {s}{i < SERVICES.length - 1 && <span className="mx-3 text-[#C8A96A]/40">·</span>}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <a
            href="https://wa.me/971503458369?text=Hello%20Al%20Tabaa%20Cards%2C%20I%20would%20like%20to%20start%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C8A96A] text-[#111] px-8 py-4 label font-semibold text-[0.65rem] hover:bg-white transition-colors duration-300 group"
          >
            Start Your Project
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <button
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 label text-[0.65rem] hover:border-[#C8A96A] hover:text-[#C8A96A] transition-colors duration-300"
          >
            Explore Our Work
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="label text-white/30 text-[0.55rem]">Scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#C8A96A]/60 to-transparent origin-top"
        />
      </motion.div>

      {/* Bottom stat strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-2 sm:grid-cols-4 border-t border-white/8"
      >
        {[
          { v: "20+", l: "Years" },
          { v: "5000+", l: "Projects" },
          { v: "500+", l: "Clients" },
          { v: "100%", l: "In-House" },
        ].map((s) => (
          <div
            key={s.l}
            className="px-6 py-5 border-r border-white/8 last:border-r-0 flex flex-col gap-0.5"
          >
            <span className="heading-display text-white text-2xl">{s.v}</span>
            <span className="label text-white/40 text-[0.55rem]">{s.l}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
