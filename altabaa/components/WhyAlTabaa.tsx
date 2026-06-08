"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const REASONS = [
  {
    n: "01",
    title: "20+ Years of Mastery",
    desc: "Two decades of refining every process. Our experience translates directly into superior results, on time, every time.",
    icon: "◈",
  },
  {
    n: "02",
    title: "100% In-House Production",
    desc: "Full control from design to delivery. No middlemen, no delays — every process happens under our roof.",
    icon: "◎",
  },
  {
    n: "03",
    title: "Premium Materials Only",
    desc: "We source the finest raw materials globally. If it doesn't meet our standards, it doesn't reach your brand.",
    icon: "◆",
  },
  {
    n: "04",
    title: "Creative Team",
    desc: "Designers and brand strategists who understand luxury aesthetics and corporate communication at the highest level.",
    icon: "◐",
  },
  {
    n: "05",
    title: "Fast Delivery",
    desc: "Urgent orders are our specialty. We maintain production capacity to meet tight deadlines without compromise.",
    icon: "◉",
  },
  {
    n: "06",
    title: "Custom Design",
    desc: "Every brief is unique. We design bespoke solutions that reflect your brand identity with absolute precision.",
    icon: "◇",
  },
  {
    n: "07",
    title: "Precision Finishing",
    desc: "From embossing to foil stamping, laser engraving to UV coating — finishing details that elevate the ordinary.",
    icon: "◈",
  },
  {
    n: "08",
    title: "UAE & GCC Reach",
    desc: "Serving leading corporations, government entities, and luxury brands across the UAE and GCC region.",
    icon: "◎",
  },
];

export default function WhyAlTabaa() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="why" ref={ref} className="bg-[#111] py-20 lg:py-32 overflow-hidden">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#C8A96A]" />
              <span className="label text-[#C8A96A]">Why Choose Us</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="heading-display text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                The Al Tabaa
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                className="heading-display text-[#C8A96A] italic"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Difference.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-text text-white/50 max-w-xs text-right hidden lg:block"
          >
            Standards without compromise. Quality as a foundation, not a feature.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/8">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06 }}
              className="border-r border-b border-white/8 p-7 lg:p-8 group hover:bg-white/4 transition-colors duration-300 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <span className="text-[#C8A96A] text-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">{r.icon}</span>
                <span className="label text-white/20">{r.n}</span>
              </div>
              <h3
                className="heading-display text-white group-hover:text-[#C8A96A] transition-colors duration-300 leading-tight"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.5rem)" }}
              >
                {r.title}
              </h3>
              <p className="label text-white/40 leading-relaxed text-[0.62rem] tracking-[0.12em]">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
