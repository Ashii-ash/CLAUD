"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const letters = ["M", "E", "L", "I", "Z"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const crystalY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const crystalOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lettersY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[650px] bg-white overflow-hidden flex flex-col pt-[60px]">

      {/* Top center label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{ opacity: labelOpacity }}
        className="absolute top-[80px] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none"
      >
        <p className="body-label leading-loose">
          The Art of Crystal<br />
          & Architectural Glass
        </p>
      </motion.div>

      {/* Center: Crystal sculpture with parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: crystalY, opacity: crystalOpacity }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
      >
        <div className="relative w-[min(400px,58vw)] h-[min(400px,58vw)]">
          <div className="absolute inset-0 border border-[#C6A36A]/15 rotate-12 scale-110" />
          <div className="absolute inset-0 border border-black/4 rotate-6" />
          <div className="absolute inset-[12%] bg-gradient-to-br from-[#f8f6f2] via-[#f0ece4] to-[#e8e2d8] rotate-12 shadow-[0_20px_80px_rgba(0,0,0,0.05)]" />
          <div className="absolute inset-[20%] bg-gradient-to-tl from-[#ede8df] via-[#f5f1ea] to-white rotate-6 shadow-[0_10px_40px_rgba(198,163,106,0.08)]" />
          <div className="absolute inset-[28%] bg-gradient-to-br from-white via-[#faf8f4] to-[#f0ece4] shadow-[inset_0_2px_20px_rgba(198,163,106,0.12),0_4px_20px_rgba(0,0,0,0.04)]" />
          <div className="absolute inset-[36%] bg-gradient-to-tl from-[#C6A36A]/12 via-[#C6A36A]/4 to-white rotate-45" />
          <div className="absolute top-1/2 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[#C6A36A]/25 to-transparent" />
          <div className="absolute left-1/2 top-[12%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-[#C6A36A]/18 to-transparent" />
        </div>
      </motion.div>

      {/* Bottom right metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.6 }}
        style={{ opacity: labelOpacity }}
        className="absolute bottom-10 right-8 lg:right-10 text-right z-20"
      >
        <p className="body-label">Luxury Division<br /><span className="text-[#C6A36A]">ATATC Group</span></p>
      </motion.div>

      {/* MELIZ letters — spread full-width, parallax on scroll */}
      <motion.div
        style={{ y: lettersY }}
        className="absolute inset-0 z-10 flex items-center justify-between px-4 lg:px-6 pointer-events-none select-none overflow-hidden"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={letter}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.4,
              delay: 0.5 + i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="display-text leading-none text-[#0A0A0A]"
            style={{ fontSize: "clamp(5rem, 17vw, 21rem)" }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: labelOpacity }}
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto"
        aria-label="Scroll down"
      >
        <span className="body-label">Scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-black/30 origin-top"
        />
      </motion.button>
    </section>
  );
}
