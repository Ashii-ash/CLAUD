"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", title: "Consultation", desc: "We begin with an in-depth understanding of your space, vision, and aspirations." },
  { n: "02", title: "Concept Design", desc: "Our designers translate your vision into precise concepts exploring form, light, and material." },
  { n: "03", title: "Material Selection", desc: "We source only the finest crystals and specialty glass from the world's most respected producers." },
  { n: "04", title: "Production", desc: "Our master craftsmen bring the approved design to life with traditional technique and precision engineering." },
  { n: "05", title: "Installation", desc: "Our specialist installation team delivers every element with care, matching the original vision exactly." },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="process" ref={ref} className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Headline row (~15%) */}
      <div className="flex-shrink-0 overflow-hidden py-10 lg:py-14 px-5 lg:px-8 border-b border-black/8 flex items-end justify-between">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display-text"
            style={{ fontSize: "clamp(2.5rem, 8vw, 9rem)" }}
          >
            The Process
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="body-label max-w-[200px] text-right hidden lg:block"
        >
          From vision to reality — a methodical journey dedicated to your creation.
        </motion.p>
      </div>

      {/* Steps: flex-1 shared equally */}
      <div className="flex-1 flex flex-col">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            className="flex-1 flex items-center gap-8 lg:gap-16 px-5 lg:px-8 border-b border-black/8 group hover:bg-[#faf8f4] transition-colors duration-300"
          >
            <span
              className="display-text text-[#C6A36A] flex-shrink-0 leading-none"
              style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
            >
              {s.n}
            </span>
            <h3
              className="display-text text-[#0A0A0A] group-hover:text-[#C6A36A] transition-colors duration-300 flex-shrink-0 lg:w-[380px] leading-tight"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)" }}
            >
              {s.title}
            </h3>
            <p className="body-label leading-relaxed hidden lg:block max-w-[400px]">{s.desc}</p>
            <div className="ml-auto body-label text-[#C6A36A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">→</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
