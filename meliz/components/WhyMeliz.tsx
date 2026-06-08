"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ParallaxStrip } from "./ScrollReveal";

const pillars = [
  { n: "01", title: "20+ Years of Expertise", desc: "Backed by ATATC's two decades of manufacturing excellence in the UAE." },
  { n: "02", title: "Bespoke Manufacturing", desc: "No two MELIZ creations are alike. Every piece engineered for your space." },
  { n: "03", title: "Luxury Finishing", desc: "The finest raw materials and finishing processes for the most discerning clients." },
  { n: "04", title: "Design Consultation", desc: "Our team works alongside architects and designers to elevate every project." },
  { n: "05", title: "Precision Craftsmanship", desc: "Master craftsmen whose skill has been refined over careers in their art." },
  { n: "06", title: "End-to-End Delivery", desc: "From consultation to installation — we manage every detail." },
];

export default function WhyMeliz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="why" ref={ref} className="bg-white border-t border-black/8 overflow-hidden">

      {/* Headline */}
      <div className="overflow-hidden py-28 lg:py-48 px-5 lg:px-8 border-b border-black/8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="display-text"
              style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}
            >
              Why MELIZ
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-label max-w-[220px] lg:text-right"
          >
            A standard without compromise. Backed by 20+ years of UAE manufacturing excellence.
          </motion.p>
        </div>
      </div>

      {/* Sub-text parallax spread */}
      <div className="border-b border-black/8 overflow-hidden">
        <ParallaxStrip words={["A New", "Premium", "Format"]} fontSize="clamp(1rem, 6vw, 8rem)" speed={110} />
      </div>

      {/* Center body text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="flex justify-center py-28 lg:py-44 px-8"
      >
        <p className="body-label text-center max-w-[320px] leading-[2]">
          MELIZ is not only a luxury crystal house but also a strong architectural statement, bringing world-class design and craftsmanship to the UAE and beyond.
        </p>
      </motion.div>

      {/* Pillars grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 border-t border-black/8">
        {pillars.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            className="border-r border-b border-black/8 p-10 lg:p-16 group hover:bg-[#faf8f4] transition-colors duration-300"
          >
            <div className="body-label mb-6 text-[#C6A36A]">{p.n}</div>
            <h3
              className="display-text text-[#0A0A0A] group-hover:text-[#C6A36A] transition-colors duration-300 mb-5 leading-tight"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 2rem)" }}
            >
              {p.title}
            </h3>
            <p className="body-label leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
