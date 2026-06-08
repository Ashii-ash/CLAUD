"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const collections = [
  { num: "01", title: "Bespoke Crystal", sub: "Signature Collection", desc: "Hand-crafted crystal sculptures, chandeliers, and ornamental pieces conceived as singular works of art for private residences and landmark interiors." },
  { num: "02", title: "Luxury Glass", sub: "Architectural Series", desc: "Precision-engineered luxury glass surfaces, panels, and architectural elements that redefine the relationship between light, space, and material." },
  { num: "03", title: "Decorative Installations", sub: "Statement Pieces", desc: "Large-scale decorative glass and crystal installations designed to define a space — from hotel lobbies to executive boardrooms." },
  { num: "04", title: "Architectural Features", sub: "Structural Design", desc: "Structural and semi-structural glass features — partitions, facades, staircases — where engineering meets aesthetic mastery." },
  { num: "05", title: "Premium Mirrors", sub: "Mirror Artistry", desc: "Bespoke mirror compositions with artisan frames, bevelling, and custom gilding for spaces that demand refined reflections." },
  { num: "06", title: "Signature Commissions", sub: "Private Commissions", desc: "Fully bespoke commissions for clients who require a creation that exists nowhere else in the world." },
];

export default function Collections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="collections" ref={ref} className="relative bg-[#080808] py-32 lg:py-48 overflow-hidden">
      <div className="absolute top-16 right-8 lg:right-16 text-[0.5rem] tracking-[0.5em] uppercase text-white/10 font-light">02</div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="mb-20 lg:mb-28 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-8">
              <div className="w-6 h-px bg-[#C6A36A]" />
              <span className="text-[0.5rem] tracking-[0.55em] uppercase text-[#C6A36A] font-light">Collections</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.4rem,5.5vw,5rem)] font-light text-white leading-[1.0] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Curated for the <em className="text-[#C6A36A]">Extraordinary.</em>
              </motion.h2>
            </div>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-white/25 text-[0.8rem] leading-relaxed max-w-[240px] lg:text-right font-light">
            Each collection represents a distinct mastery of material, form, and light.
          </motion.p>
        </div>

        {/* Collection list — full-width rows, editorial */}
        <div className="divide-y divide-white/[0.05]">
          {collections.map((c, i) => (
            <motion.div key={c.num}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
              className="group py-8 lg:py-10 cursor-default">
              <div className="flex items-start lg:items-center gap-6 lg:gap-12">
                {/* Number */}
                <span className="text-[0.5rem] tracking-[0.4em] text-white/20 font-light flex-shrink-0 mt-1 lg:mt-0 w-8">{c.num}</span>

                {/* Title */}
                <h3 className={`text-xl lg:text-3xl font-light tracking-tight transition-colors duration-400 flex-shrink-0 lg:w-[300px] ${active === i ? "text-[#C6A36A]" : "text-white"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {c.title}
                </h3>

                {/* Sub tag — hidden on mobile */}
                <span className="hidden lg:block text-[0.5rem] tracking-[0.4em] uppercase text-white/20 font-light flex-shrink-0 w-[180px]">{c.sub}</span>

                {/* Description — expands on hover desktop, always visible mobile */}
                <p className={`text-white/30 text-[0.8rem] leading-relaxed font-light flex-1 transition-all duration-500 ${active === i ? "text-white/50" : ""} hidden lg:block`}>
                  {c.desc}
                </p>

                {/* Arrow */}
                <div className={`flex-shrink-0 text-[#C6A36A] transition-all duration-300 ${active === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"} hidden lg:block`}>→</div>
              </div>
              {/* Mobile desc */}
              <p className="lg:hidden text-white/30 text-[0.8rem] leading-relaxed font-light mt-3 ml-14">{c.desc}</p>
              {/* Hover line */}
              <div className={`h-px bg-[#C6A36A] mt-0 transition-all duration-500 ${active === i ? "w-full opacity-30" : "w-0 opacity-0"}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
