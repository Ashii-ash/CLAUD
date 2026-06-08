"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" ref={ref} className="bg-white overflow-hidden">

      {/* Row 1: headline */}
      <div className="overflow-hidden border-t border-black/8 pt-20 lg:pt-40 pb-20 lg:pb-32 px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-4 lg:gap-8">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display-text"
            style={{ fontSize: "clamp(3rem, 11vw, 13rem)" }}
          >
            The Momentum
          </motion.h2>
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="display-text lg:text-right"
            style={{ fontSize: "clamp(3rem, 11vw, 13rem)" }}
          >
            Of Craft
          </motion.h2>
        </div>
      </div>

      {/* Row 2: centered body text — spacious */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex justify-center py-20 lg:py-36 px-8 border-t border-black/8"
      >
        <p className="body-label text-center max-w-[340px] leading-[2.2]">
          MELIZ is born from the manufacturing excellence and decades of expertise behind ATATC — Al Tabaa Advertising Materials LLC — a name that has defined quality in the UAE for over twenty years. We create bespoke crystal and architectural glass for spaces that demand the extraordinary.
        </p>
      </motion.div>

      {/* Row 3: large text left + image right */}
      <div className="grid lg:grid-cols-2 items-end border-t border-black/8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-5 lg:px-8 py-16 lg:py-32"
        >
          <p
            className="display-text text-[#0A0A0A] leading-[1.1]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 4.5rem)" }}
          >
            Bespoke manufacturing. Luxury finishing. Design consultation. Precision craftsmanship. End-to-end delivery.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative aspect-[4/3] lg:aspect-auto lg:h-[520px] bg-gradient-to-br from-[#f0ece4] via-[#e8e2d8] to-[#ddd5c8] overflow-hidden"
        >
          <div className="absolute inset-0 flex items-end p-8">
            <p className="body-label">Atelier Photography · Coming Soon</p>
          </div>
        </motion.div>
      </div>

      {/* Row 4: Three-word spread — generous padding */}
      <div className="border-t border-black/8 overflow-hidden">
        <div className="flex items-baseline justify-between px-5 lg:px-8 py-16 lg:py-24 gap-2">
          {["A New", "Premium", "Standard"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.08 }}
              className="display-text text-[#0A0A0A]"
              style={{ fontSize: "clamp(1.6rem, 6vw, 7.5rem)" }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Row 5: Stats */}
      <div className="border-t border-black/8 grid grid-cols-2 lg:grid-cols-4">
        {[
          { v: "20+", l: "Years of Expertise" },
          { v: "500+", l: "Luxury Projects" },
          { v: "12", l: "Countries Served" },
          { v: "100%", l: "Bespoke Creations" },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.07 }}
            className="border-r border-b lg:border-b-0 border-black/8 last:border-r-0 px-5 lg:px-10 py-10 lg:py-16 group hover:bg-[#faf8f4] transition-colors duration-300"
          >
            <div
              className="display-text text-[#0A0A0A] group-hover:text-[#C6A36A] transition-colors duration-300 mb-3"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {s.v}
            </div>
            <div className="body-label">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
