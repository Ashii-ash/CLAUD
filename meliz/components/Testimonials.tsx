"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  { quote: "MELIZ transformed our Palm Jumeirah villa with a bespoke crystal installation that simply cannot be replicated. The craftsmanship, the attention to detail, the service — extraordinary on every level.", name: "Private Client", role: "Villa Owner, Palm Jumeirah" },
  { quote: "As an interior designer, I demand suppliers who understand the difference between decoration and design. MELIZ understands it completely. Their input elevated the entire project.", name: "Design Professional", role: "Principal Interior Designer, Dubai" },
  { quote: "The architectural glass facade MELIZ created for our DIFC headquarters has become an icon of the building. We continue to receive compliments from visiting clients and dignitaries.", name: "Corporate Client", role: "Director, DIFC Corporation" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} className="relative bg-[#080808] py-32 lg:py-48 overflow-hidden">
      <div className="absolute top-16 right-8 lg:right-16 text-[0.5rem] tracking-[0.5em] uppercase text-white/10 font-light">06</div>

      {/* Large decorative quote mark */}
      <div className="absolute top-24 left-8 lg:left-16 text-[20rem] leading-none text-white/[0.018] pointer-events-none select-none font-light"
        style={{ fontFamily: "'Playfair Display', serif" }}>&ldquo;</div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-20 lg:mb-28">
          <div className="w-6 h-px bg-[#C6A36A]" />
          <span className="text-[0.5rem] tracking-[0.55em] uppercase text-[#C6A36A] font-light">Client Voices</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start">
          {/* Quote */}
          <div>
            <AnimatePresence mode="wait">
              <motion.blockquote key={active}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-[clamp(1.1rem,2.8vw,2.2rem)] font-light italic text-white/60 leading-[1.5] max-w-[700px] mb-10"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                &ldquo;{testimonials[active].quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`meta-${active}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}>
                <div className="text-[0.65rem] tracking-[0.3em] uppercase text-white/50 font-light">{testimonials[active].name}</div>
                <div className="text-[0.6rem] tracking-[0.25em] text-white/20 font-light mt-1">{testimonials[active].role}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            className="flex flex-row lg:flex-col gap-0 lg:pt-4">
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`text-left py-6 lg:py-8 border-b border-white/[0.06] last:border-0 w-full transition-all duration-400 group pr-4 ${active === i ? "" : "opacity-40 hover:opacity-70"}`}>
                <div className={`h-px mb-4 transition-all duration-500 ${active === i ? "w-8 bg-[#C6A36A]" : "w-4 bg-white/20"}`} />
                <div className="text-[0.6rem] tracking-[0.3em] uppercase text-white/50 font-light mb-1">{t.role}</div>
                <div className="text-[0.75rem] text-white font-light leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}>{t.name}</div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
