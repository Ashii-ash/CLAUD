"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  { n: "01", title: "Bespoke Crystal", desc: "Hand-crafted crystal sculptures and chandeliers conceived as singular works of art for landmark interiors." },
  { n: "02", title: "Luxury Glass", desc: "Precision-engineered glass surfaces and architectural elements that redefine light, space, and material." },
  { n: "03", title: "Decorative Installations", desc: "Large-scale glass and crystal installations designed to define a space — lobbies to boardrooms." },
  { n: "04", title: "Architectural Features", desc: "Structural glass features — partitions, facades, staircases — where engineering meets aesthetic mastery." },
  { n: "05", title: "Premium Mirrors", desc: "Bespoke mirror compositions with artisan frames, bevelling, and custom gilding for refined spaces." },
  { n: "06", title: "Signature Commissions", desc: "Fully bespoke commissions for clients who require a creation that exists nowhere else in the world." },
];

export default function WhyMeliz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="why" ref={ref} className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Headline row */}
      <div className="flex-shrink-0 py-12 lg:py-16 px-5 lg:px-8 border-b border-black/8 flex items-end justify-between">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display-text"
            style={{ fontSize: "clamp(2.5rem, 8vw, 9rem)" }}
          >
            Why MELIZ
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="body-label max-w-[200px] text-right hidden lg:block"
        >
          A standard without compromise. Backed by 20+ years of UAE manufacturing excellence.
        </motion.p>
      </div>

      {/* Pillars grid: 2 cols × 3 rows on mobile, 3 cols × 2 rows on desktop */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2">
        {pillars.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            className="border-r border-b border-black/8 p-6 lg:p-8 flex flex-col justify-between group hover:bg-[#faf8f4] transition-colors duration-300"
          >
            <div>
              <div className="body-label mb-4 text-[#C6A36A]">{p.n}</div>
              <h3
                className="display-text text-[#0A0A0A] group-hover:text-[#C6A36A] transition-colors duration-300 leading-tight"
                style={{ fontSize: "clamp(1rem, 2.2vw, 1.8rem)" }}
              >
                {p.title}
              </h3>
            </div>
            <p className="body-label leading-relaxed hidden lg:block mt-4">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
