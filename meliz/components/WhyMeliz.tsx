"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  { n: "01", title: "20+ Years of Expertise", desc: "Backed by ATATC's two decades of manufacturing excellence in the UAE, MELIZ brings unparalleled institutional knowledge to every commission." },
  { n: "02", title: "Bespoke Manufacturing", desc: "No two MELIZ creations are alike. Every piece is engineered and handcrafted to the precise requirements of your space and vision." },
  { n: "03", title: "Luxury Finishing", desc: "We insist on the finest raw materials and finishing processes, meeting the demands of the world's most discerning clients." },
  { n: "04", title: "Design Consultation", desc: "Our in-house team works alongside architects and interior designers to create solutions that elevate rather than decorate." },
  { n: "05", title: "Precision Craftsmanship", desc: "Each creation passes through the hands of master craftsmen whose skill has been refined over careers dedicated to their art." },
  { n: "06", title: "End-to-End Delivery", desc: "From initial consultation to final installation, MELIZ manages the entire journey — protecting your vision and schedule." },
];

export default function WhyMeliz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="why" ref={ref} className="relative bg-[#080808] py-32 lg:py-48 overflow-hidden">
      <div className="absolute top-16 right-8 lg:right-16 text-[0.5rem] tracking-[0.5em] uppercase text-white/10 font-light">04</div>

      {/* Large background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-light text-white/[0.015] leading-none pointer-events-none select-none tracking-tighter"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        MELIZ
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 relative">
        {/* Header */}
        <div className="mb-20 lg:mb-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-[#C6A36A]" />
            <span className="text-[0.5rem] tracking-[0.55em] uppercase text-[#C6A36A] font-light">Why MELIZ</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-light text-white leading-[1.0] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              A Standard <em className="text-[#C6A36A]">Without Compromise.</em>
            </motion.h2>
          </div>
        </div>

        {/* Pillars — two column editorial */}
        <div className="grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0">
          {pillars.map((p, i) => (
            <motion.div key={p.n}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
              className={`py-10 group ${i % 2 === 0 ? "lg:pr-16 lg:border-r lg:border-white/[0.05]" : "lg:pl-16"} ${i < 4 ? "lg:border-b lg:border-white/[0.05]" : ""} border-white/[0.05]`}>
              <div className="flex items-start gap-6">
                <span className="text-[0.45rem] tracking-[0.4em] text-white/15 font-light flex-shrink-0 mt-1">{p.n}</span>
                <div>
                  <h3 className="text-lg font-light text-white mb-3 group-hover:text-[#C6A36A] transition-colors duration-400"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {p.title}
                  </h3>
                  <p className="text-white/30 text-[0.8rem] leading-relaxed font-light">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing quote */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-24 pt-16 border-t border-white/[0.05] text-center">
          <blockquote className="text-xl lg:text-3xl font-light italic text-white/30 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            &ldquo;Luxury Crystal. Architectural Beauty. Timeless Craftsmanship.&rdquo;
          </blockquote>
          <div className="text-[0.5rem] tracking-[0.5em] uppercase text-[#C6A36A]/40 font-light mt-5">MELIZ · Dubai, UAE</div>
        </motion.div>
      </div>
    </section>
  );
}
