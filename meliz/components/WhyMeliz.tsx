"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    icon: "✦",
    title: "20+ Years of Expertise",
    description: "Backed by ATATC's two decades of manufacturing excellence in the UAE, MELIZ brings unparalleled institutional knowledge to every commission.",
  },
  {
    icon: "◈",
    title: "Bespoke Manufacturing",
    description: "No two MELIZ creations are alike. Every piece is engineered and handcrafted to the precise requirements of your space and vision.",
  },
  {
    icon: "◇",
    title: "Luxury Finishing",
    description: "We insist on the finest raw materials and finishing processes, with quality control standards that meet the demands of the world's most discerning clients.",
  },
  {
    icon: "○",
    title: "Design Consultation",
    description: "Our in-house design team works alongside architects and interior designers to create solutions that elevate rather than decorate.",
  },
  {
    icon: "△",
    title: "Precision Craftsmanship",
    description: "Each creation moves through the hands of master craftsmen whose skill has been refined over careers dedicated to their art.",
  },
  {
    icon: "□",
    title: "End-to-End Delivery",
    description: "From the initial consultation to final installation, MELIZ manages the entire journey — protecting your vision and schedule.",
  },
];

export default function WhyMeliz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why" ref={ref} className="py-32 lg:py-40 bg-[#0e0e0e] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(198,163,106,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-px bg-[#C6A36A]" />
            <span className="text-[0.6rem] tracking-[0.45em] uppercase text-[#C6A36A] font-medium">
              Why Choose MELIZ
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light text-white leading-[1.1]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Standard
            <br />
            <span className="italic text-[#C6A36A]">Without Compromise.</span>
          </motion.h2>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-10 h-10 border border-[#C6A36A]/30 flex items-center justify-center group-hover:border-[#C6A36A] group-hover:bg-[#C6A36A]/5 transition-all duration-400">
                  <span className="text-[#C6A36A] text-base">{pillar.icon}</span>
                </div>
                <div>
                  <h3
                    className="font-display text-lg font-medium text-white mb-3 group-hover:text-[#C6A36A] transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-24 pt-16 border-t border-white/8 text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C6A36A]/40" />
            <span className="text-[#C6A36A] text-lg">◆</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C6A36A]/40" />
          </div>
          <blockquote
            className="font-display text-xl lg:text-2xl font-light italic text-white/70 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "Luxury Crystal. Architectural Beauty. Timeless Craftsmanship."
          </blockquote>
          <div className="text-[0.6rem] tracking-[0.4em] uppercase text-[#C6A36A]/60 font-medium mt-4">
            MELIZ — Dubai, UAE
          </div>
        </motion.div>
      </div>
    </section>
  );
}
