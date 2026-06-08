"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "20+", label: "Years of Expertise" },
  { value: "500+", label: "Luxury Projects" },
  { value: "12", label: "Countries" },
  { value: "100%", label: "Bespoke" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" ref={sectionRef} className="relative bg-[#080808] overflow-hidden">
      {/* Large section number */}
      <div className="absolute top-16 right-8 lg:right-16 text-[0.5rem] tracking-[0.5em] uppercase text-white/10 font-light">01</div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-32 lg:py-48" ref={ref}>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-0 items-start">

          {/* Left: image + stats */}
          <div className="relative">
            {/* Main image placeholder — tall architectural format */}
            <motion.div style={{ y: imgY }}
              className="relative w-full lg:w-[90%] aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#141414] via-[#111111] to-[#0d0d0d]">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <div className="w-10 h-px bg-[#C6A36A]/20" />
                <span className="text-[0.45rem] tracking-[0.5em] uppercase text-white/15">Atelier Photography</span>
                <div className="w-10 h-px bg-[#C6A36A]/20" />
              </div>
              {/* Corner marks */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C6A36A]/20" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#C6A36A]/20" />
              {/* Gold overlay gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#080808] to-transparent" />
            </motion.div>

            {/* Stats — overlapping bottom of image */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative lg:absolute lg:bottom-[-2rem] lg:right-[-2rem] grid grid-cols-2 gap-px bg-white/5 w-full lg:w-[280px] mt-8 lg:mt-0">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-[#0e0e0e] p-6 group hover:bg-[#131313] transition-colors duration-300">
                  <div className="text-2xl font-light text-[#C6A36A] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                  <div className="text-[0.5rem] tracking-[0.3em] uppercase text-white/30 font-light">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: text — offset down on desktop */}
          <div className="lg:pt-32 lg:pl-16 mt-16 lg:mt-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-10">
              <div className="w-6 h-px bg-[#C6A36A]" />
              <span className="text-[0.5rem] tracking-[0.55em] uppercase text-[#C6A36A] font-light">Our Story</span>
            </motion.div>

            <div className="overflow-hidden mb-3">
              <motion.h2 initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.4rem,5.5vw,5rem)] font-light text-white leading-[1.0] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Where Craft
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-12">
              <motion.h2 initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.4rem,5.5vw,5rem)] font-semibold italic text-[#C6A36A] leading-[1.0] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Meets Luxury.
              </motion.h2>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/40 text-[0.85rem] leading-[1.9] mb-6 font-light max-w-[420px]">
              MELIZ is the luxury division of ATATC — Al Tabaa Advertising Materials LLC — a name that has defined manufacturing excellence in the UAE for over two decades. Born from an unwavering commitment to quality, MELIZ distils this legacy into bespoke crystal and architectural glass experiences.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/30 text-[0.85rem] leading-[1.9] mb-12 font-light max-w-[420px]">
              Behind every MELIZ creation is a complete production ecosystem — design consultants, master craftsmen, precision fabricators, and installation specialists — all under one roof.
            </motion.p>

            <motion.button initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={() => document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-4 text-[0.6rem] tracking-[0.35em] uppercase text-white/40 hover:text-[#C6A36A] transition-all duration-400 group font-light">
              <span>Explore Collections</span>
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-sm">→</motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom divider line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-8 lg:mx-16" />
    </section>
  );
}
