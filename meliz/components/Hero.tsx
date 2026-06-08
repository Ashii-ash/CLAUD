"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#080808] flex flex-col">
      {/* Background: layered glass geometry */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        {/* Main large rectangle — architectural glass pane */}
        <div className="absolute top-[8%] right-[-5%] w-[55vw] h-[80vh] border border-white/[0.04] bg-gradient-to-br from-white/[0.02] to-transparent" />
        {/* Inner offset pane */}
        <div className="absolute top-[15%] right-[4%] w-[44vw] h-[65vh] border border-[#C6A36A]/[0.08] bg-gradient-to-br from-[#C6A36A]/[0.02] to-transparent" />
        {/* Thin vertical accent line */}
        <div className="absolute top-0 right-[28%] w-px h-full bg-gradient-to-b from-transparent via-[#C6A36A]/20 to-transparent" />
        {/* Horizontal accent */}
        <div className="absolute top-[58%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        {/* Corner mark top-right */}
        <div className="absolute top-[8%] right-[-5%] w-12 h-12 border-t border-r border-[#C6A36A]/30" />
        {/* Large blurred glow */}
        <div className="absolute top-[20%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-[#C6A36A]/[0.025] blur-[120px]" />
        {/* Placeholder photography area */}
        <div className="absolute top-[12%] right-[6%] w-[42vw] h-[62vh] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-[#181818] via-[#141414] to-[#101010] relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
              <div className="w-8 h-px bg-[#C6A36A]/20" />
              <span className="text-[0.45rem] tracking-[0.5em] uppercase text-white/15">Photography Placeholder</span>
              <div className="w-8 h-px bg-[#C6A36A]/20" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 flex flex-col justify-end h-full pb-16 lg:pb-20 px-8 lg:px-16">
        {/* Side label */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-8 flex flex-col items-center gap-3 hidden lg:flex">
          <span className="text-[0.45rem] tracking-[0.5em] uppercase text-white/25 rotate-[-90deg] whitespace-nowrap">Dubai, UAE</span>
          <div className="w-px h-16 bg-white/10" />
        </div>

        {/* Main text block */}
        <div className="max-w-[700px]">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-[#C6A36A]" />
            <span className="text-[0.55rem] tracking-[0.5em] uppercase text-[#C6A36A] font-light">Luxury Crystal & Glass</span>
          </motion.div>

          {/* Headline — massive, architectural */}
          <div className="overflow-hidden mb-2">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,9vw,9rem)] font-light text-white leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Crafted
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,9vw,9rem)] font-semibold italic text-[#C6A36A] leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Beyond Glass.
            </motion.h1>
          </div>

          {/* Sub + CTA row */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <p className="text-white/35 text-[0.8rem] leading-relaxed max-w-[280px] font-light">
              Bespoke crystal and architectural glass for spaces that demand the extraordinary.
            </p>
            <div className="flex items-center gap-6 flex-shrink-0">
              <button onClick={() => go("#collections")}
                className="text-[0.6rem] tracking-[0.35em] uppercase text-white bg-[#C6A36A] px-8 py-3.5 hover:bg-[#b5935a] transition-colors duration-300 font-light">
                Collections
              </button>
              <a href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
                target="_blank" rel="noopener noreferrer"
                className="text-[0.6rem] tracking-[0.35em] uppercase text-white/50 hover:text-[#C6A36A] transition-colors duration-300 font-light flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom metadata row */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 right-8 lg:right-16 flex items-center gap-6 text-right">
          <div className="text-right">
            <div className="text-[0.45rem] tracking-[0.5em] uppercase text-white/20 mb-1">Est.</div>
            <div className="text-[0.7rem] text-white/30 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>ATATC Group</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <div className="text-[0.45rem] tracking-[0.5em] uppercase text-white/20 mb-1">Experience</div>
            <div className="text-[0.7rem] text-white/30 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>20+ Years</div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-[#C6A36A]/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
