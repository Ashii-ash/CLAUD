"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "20+", label: "Years of Excellence" },
  { value: "500+", label: "Luxury Projects" },
  { value: "12", label: "Countries Served" },
  { value: "100%", label: "Bespoke Creations" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 lg:py-40 bg-[#111111] relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(198,163,106,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px bg-[#C6A36A]" />
              <span className="text-[0.6rem] tracking-[0.45em] uppercase text-[#C6A36A] font-medium">
                Our Story
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.1] text-white mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Where Craftsmanship
              <br />
              <span className="italic text-[#C6A36A]">Meets Luxury.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/55 leading-relaxed text-[0.95rem] mb-6"
            >
              MELIZ is the luxury division of ATATC — Al Tabaa Advertising Materials LLC — a name that has defined manufacturing excellence in the UAE for over two decades. Born from an unwavering commitment to quality, MELIZ distils this legacy into something rarer: bespoke crystal and architectural glass experiences created for those who accept nothing less than extraordinary.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/55 leading-relaxed text-[0.95rem] mb-10"
            >
              Behind every MELIZ creation is a complete production ecosystem: design consultants, master craftsmen, precision fabricators, and installation specialists — all under one roof. From an intimate villa commission to a landmark architectural installation, we command every detail from concept to completion.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              href="#collections"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.3em] uppercase font-semibold text-[#C6A36A] hover:gap-5 transition-all duration-300"
            >
              Discover Collections
              <span className="text-lg leading-none">→</span>
            </motion.a>
          </div>

          {/* Right: Stats + Visual */}
          <div className="space-y-8">
            {/* Large placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="luxury-placeholder aspect-[4/3] w-full relative"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <div className="w-12 h-px bg-[#C6A36A]/40" />
                <span className="text-[0.55rem] tracking-[0.4em] uppercase text-[#C6A36A]/50 mt-2">
                  Atelier Photography
                </span>
                <span className="text-[0.5rem] tracking-[0.3em] uppercase text-white/20 mt-1">
                  Coming Soon
                </span>
                <div className="w-12 h-px bg-[#C6A36A]/40 mt-2" />
              </div>
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C6A36A]/30" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C6A36A]/30" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#C6A36A]/30" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#C6A36A]/30" />
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="border border-white/8 p-6 hover:border-[#C6A36A]/30 transition-colors duration-400 group"
                >
                  <div
                    className="font-display text-3xl font-light text-[#C6A36A] mb-1 group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
