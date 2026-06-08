"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  { quote: "MELIZ transformed our Palm Jumeirah villa with a bespoke crystal installation that simply cannot be replicated. The craftsmanship, the service — extraordinary on every level.", name: "Private Client", role: "Villa Owner, Palm Jumeirah" },
  { quote: "As an interior designer, I demand suppliers who understand the difference between decoration and design. MELIZ understands it completely. Their input elevated the entire project.", name: "Design Professional", role: "Principal Designer, Dubai" },
  { quote: "The architectural glass facade MELIZ created for our DIFC headquarters has become an icon of the building. Compliments from every visiting client and dignitary.", name: "Corporate Client", role: "Director, DIFC Corporation" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} className="bg-white border-t border-black/8 overflow-hidden">

      {/* Headline */}
      <div className="overflow-hidden py-28 lg:py-48 px-5 lg:px-8 border-b border-black/8">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display-text"
            style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}
          >
            Client Voices
          </motion.h2>
        </div>
      </div>

      {/* Quote area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="grid lg:grid-cols-[1fr_300px] border-b border-black/8"
      >
        {/* Quote */}
        <div className="px-5 lg:px-8 py-20 lg:py-32 border-r border-black/8">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="display-text text-[#0A0A0A] leading-[1.15] max-w-[700px]"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)" }}
            >
              &ldquo;{testimonials[active].quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`m-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-12"
            >
              <div className="body-label text-[#C6A36A]">{testimonials[active].name}</div>
              <div className="body-label mt-1">{testimonials[active].role}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex flex-row lg:flex-col border-t lg:border-t-0 border-black/8">
          {testimonials.map((t, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex-1 lg:flex-none px-6 py-10 text-left border-b border-black/8 last:border-b-0 transition-colors duration-300 ${active === i ? "bg-[#faf8f4]" : "hover:bg-[#faf8f4]/50"}`}>
              <div className={`w-5 h-px mb-5 transition-all duration-300 ${active === i ? "bg-[#C6A36A]" : "bg-black/15"}`} />
              <div className="body-label text-[#C6A36A] mb-1 hidden lg:block">{t.role}</div>
              <div className="body-label text-[#0A0A0A] font-semibold hidden lg:block">{t.name}</div>
              <div className="body-label lg:hidden">{String(i + 1).padStart(2, "0")}</div>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
