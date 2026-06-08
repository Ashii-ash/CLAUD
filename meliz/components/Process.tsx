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
    <section id="process" ref={ref} className="bg-white border-t border-black/8 overflow-hidden">

      {/* Headline */}
      <div className="overflow-hidden py-20 lg:py-32 px-5 lg:px-8 border-b border-black/8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="display-text"
              style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}
            >
              The Process
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-label max-w-[220px] lg:text-right"
          >
            From vision to reality — a methodical journey dedicated to your creation.
          </motion.p>
        </div>
      </div>

      {/* Steps */}
      <div>
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            className="border-b border-black/8 px-5 lg:px-8 py-8 lg:py-12 flex items-start lg:items-center gap-6 lg:gap-16 group hover:bg-[#faf8f4] transition-colors duration-300"
          >
            <span
              className="display-text text-[#0A0A0A]/10 group-hover:text-[#C6A36A]/30 transition-colors duration-300 flex-shrink-0 leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
            >
              {s.n}
            </span>
            <h3
              className="display-text text-[#0A0A0A] group-hover:text-[#C6A36A] transition-colors duration-300 flex-shrink-0 lg:w-[380px] leading-tight"
              style={{ fontSize: "clamp(1.4rem, 3vw, 3rem)" }}
            >
              {s.title}
            </h3>
            <p className="body-label leading-relaxed hidden lg:block max-w-[400px]">{s.desc}</p>
            <div className={`ml-auto body-label text-[#C6A36A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0`}>→</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
