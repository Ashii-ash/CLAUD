"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] bg-white overflow-hidden flex flex-col pt-[60px]">

      {/* Top center small label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute top-[80px] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none"
      >
        <p className="body-label leading-loose">
          The Art of Crystal<br />& Architectural Glass
        </p>
      </motion.div>

      {/* Center: Crystal sculpture placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center z-0"
      >
        {/* Abstract crystal shape using CSS */}
        <div className="relative w-[min(420px,65vw)] h-[min(420px,65vw)]">
          {/* Outer rotated square */}
          <div className="absolute inset-0 border border-[#C6A36A]/20 rotate-12 scale-110" />
          <div className="absolute inset-0 border border-black/5 rotate-6" />
          {/* Inner shapes — layered glass facets */}
          <div className="absolute inset-[15%] bg-gradient-to-br from-[#f8f6f2] via-[#f0ece4] to-[#e8e2d8] rotate-12 shadow-[0_20px_80px_rgba(0,0,0,0.06)]" />
          <div className="absolute inset-[20%] bg-gradient-to-tl from-[#ede8df] via-[#f5f1ea] to-white rotate-6 shadow-[0_10px_40px_rgba(198,163,106,0.1)]" />
          <div className="absolute inset-[28%] bg-gradient-to-br from-white via-[#faf8f4] to-[#f0ece4] shadow-[inset_0_2px_20px_rgba(198,163,106,0.15),0_4px_20px_rgba(0,0,0,0.05)]" />
          <div className="absolute inset-[35%] bg-gradient-to-tl from-[#C6A36A]/15 via-[#C6A36A]/5 to-white rotate-45" />
          {/* Gold accent lines */}
          <div className="absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#C6A36A]/30 to-transparent" />
          <div className="absolute left-1/2 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-[#C6A36A]/20 to-transparent" />
          {/* Photography placeholder label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[0.4rem] tracking-[0.5em] uppercase text-black/20">Crystal</span>
          </div>
        </div>
      </motion.div>

      {/* Bleed-off-edge brand name letters — positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between overflow-hidden pointer-events-none select-none pb-0">
        {/* M — far left, partially cut */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="display-text leading-none translate-x-[-10%]"
          style={{ fontSize: "clamp(8rem, 22vw, 28rem)", color: "#0A0A0A" }}
        >
          M
        </motion.div>

        {/* Right: small label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-right pb-8 pr-8 flex-shrink-0"
        >
          <p className="body-label">Luxury Division<br /><span className="text-[#C6A36A]">ATATC Group</span></p>
        </motion.div>

        {/* Z — far right, partially cut */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="display-text leading-none translate-x-[10%]"
          style={{ fontSize: "clamp(8rem, 22vw, 28rem)", color: "#0A0A0A" }}
        >
          Z
        </motion.div>
      </div>

      {/* Bottom right: scroll arrow */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 right-8 z-20 w-10 h-10 border border-black/15 flex items-center justify-center hover:border-[#C6A36A] hover:text-[#C6A36A] transition-colors duration-300"
        aria-label="Scroll down"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg leading-none"
        >↓</motion.span>
      </motion.button>
    </section>
  );
}
