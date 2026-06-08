"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const cols = [
  { n: "01", title: "Bespoke Crystal", desc: "Hand-crafted crystal sculptures, chandeliers, and ornamental pieces conceived as singular works of art for private residences and landmark interiors." },
  { n: "02", title: "Luxury Glass", desc: "Precision-engineered luxury glass surfaces, panels, and architectural elements that redefine the relationship between light, space, and material." },
  { n: "03", title: "Decorative Installations", desc: "Large-scale decorative glass and crystal installations designed to define a space — from hotel lobbies to executive boardrooms." },
  { n: "04", title: "Architectural Features", desc: "Structural and semi-structural glass features — partitions, facades, staircases — where engineering meets aesthetic mastery." },
  { n: "05", title: "Premium Mirrors", desc: "Bespoke mirror compositions with artisan frames, bevelling, and custom gilding for spaces that demand refined reflections." },
  { n: "06", title: "Signature Commissions", desc: "Fully bespoke commissions for clients who require a creation that exists nowhere else in the world. The ultimate expression of individual luxury." },
];

export default function Collections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="collections" ref={ref} className="bg-white border-t border-black/8 overflow-hidden">

      {/* Section headline */}
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
              Our Collections
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-label max-w-[220px] lg:text-right"
          >
            Each collection represents a distinct mastery of material, form, and light.
          </motion.p>
        </div>
      </div>

      {/* Collection rows */}
      <div>
        {cols.map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={`border-b border-black/8 px-5 lg:px-8 py-14 lg:py-20 flex items-start lg:items-center gap-6 lg:gap-16 cursor-default transition-colors duration-300 ${active === i ? "bg-[#faf8f4]" : "bg-white"}`}
          >
            <span className="body-label w-8 flex-shrink-0 mt-0.5 lg:mt-0">{c.n}</span>

            <h3
              className={`display-text flex-shrink-0 lg:w-[380px] transition-colors duration-300 ${active === i ? "text-[#C6A36A]" : "text-[#0A0A0A]"}`}
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 3.2rem)" }}
            >
              {c.title}
            </h3>

            <p className="body-label leading-relaxed hidden lg:block flex-1 max-w-[500px]">{c.desc}</p>

            <div className={`ml-auto flex-shrink-0 text-sm transition-all duration-300 ${active === i ? "opacity-100 text-[#C6A36A]" : "opacity-0"}`}>→</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
