"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", title: "Consultation", desc: "We begin with a deep understanding of your space, vision, and aspirations. Our consultants listen before they speak." },
  { n: "02", title: "Concept Design", desc: "Our designers translate your vision into precise concepts — exploring form, light, and material before a single piece is made." },
  { n: "03", title: "Material Selection", desc: "We source only the finest crystals and specialty glass from the world's most respected producers, chosen specifically for your project." },
  { n: "04", title: "Production", desc: "Our master craftsmen bring the approved design to life using a combination of traditional technique and precision engineering." },
  { n: "05", title: "Installation", desc: "Our specialists deliver and place every element with care, ensuring the finished result matches the original vision exactly." },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="process" ref={ref} className="relative bg-[#060606] py-32 lg:py-48 overflow-hidden">
      <div className="absolute top-16 right-8 lg:right-16 text-[0.5rem] tracking-[0.5em] uppercase text-white/10 font-light">05</div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-32 items-start">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-32">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-8">
              <div className="w-6 h-px bg-[#C6A36A]" />
              <span className="text-[0.5rem] tracking-[0.55em] uppercase text-[#C6A36A] font-light">The Process</span>
            </motion.div>
            <div className="overflow-hidden mb-3">
              <motion.h2 initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.4rem,5.5vw,5rem)] font-light text-white leading-[1.0] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                From Vision
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-12">
              <motion.h2 initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.4rem,5.5vw,5rem)] font-semibold italic text-[#C6A36A] leading-[1.0] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                to Reality.
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
              className="text-white/30 text-[0.8rem] leading-relaxed font-light max-w-[320px] mb-16">
              A MELIZ project is a journey — methodical, considered, and entirely dedicated to realising your vision with unwavering precision.
            </motion.p>

            {/* Process visual — tall narrow placeholder */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative aspect-[2/3] max-w-[200px] bg-gradient-to-b from-[#141414] to-[#0d0d0d] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <div className="w-6 h-px bg-[#C6A36A]/20" />
                <span className="text-[0.4rem] tracking-[0.4em] uppercase text-white/10">Studio</span>
                <div className="w-6 h-px bg-[#C6A36A]/20" />
              </div>
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#C6A36A]/15" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#C6A36A]/15" />
            </motion.div>
          </div>

          {/* Right: steps */}
          <div className="mt-0 lg:pt-4">
            {steps.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                className="group border-b border-white/[0.06] py-10 last:border-0 hover:border-[#C6A36A]/20 transition-colors duration-400">
                <div className="flex gap-8">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className="text-[0.45rem] tracking-[0.4em] text-[#C6A36A]/40 font-light">{s.n}</span>
                    {i < steps.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-white/[0.06] to-transparent mt-4 min-h-[40px]" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-white mb-3 group-hover:text-[#C6A36A] transition-colors duration-400"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {s.title}
                    </h3>
                    <p className="text-white/30 text-[0.8rem] leading-relaxed font-light">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
