"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

const letters = ["M", "E", "L", "I", "Z"];

const THRESHOLD = 380;   // px of scroll to complete transition
const NAVBAR_H  = 60;    // navbar height in px
const END_FONT  = 28;    // compact font size in px

export default function Hero() {
  // Reactive viewport dimensions as MotionValues so transforms update on resize
  const vpW = useMotionValue(1440);
  const vpH = useMotionValue(800);

  useEffect(() => {
    const update = () => { vpW.set(window.innerWidth); vpH.set(window.innerHeight); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [vpW, vpH]);

  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 160, damping: 28 });
  const progress = useTransform(smooth, [0, THRESHOLD], [0, 1], { clamp: true });

  // Font size: spread hero size → compact navbar size (px)
  const fontSizePx = useTransform(
    [progress, vpW] as const,
    ([p, w]: number[]) => {
      const start = Math.max(w * 0.17, 60);
      return start + (END_FONT - start) * p;
    }
  );
  const fontSize = useMotionTemplate`${fontSizePx}px`;

  // Letter spacing: simulates justify-between spread → tight
  const letterSpacingEm = useTransform(progress, [0, 1], [0.65, -0.02]);
  const letterSpacing = useMotionTemplate`${letterSpacingEm}em`;

  // Y offset: letters start centered in viewport, end centered in navbar
  const y = useTransform(
    [progress, vpW, vpH] as const,
    ([p, w, h]: number[]) => {
      const startFont = Math.max(w * 0.17, 60);
      const yStart = h / 2 - startFont / 2;       // vertically centered
      const yEnd   = NAVBAR_H / 2 - END_FONT / 2; // centered in navbar
      return yStart + (yEnd - yStart) * p;
    }
  );

  // Crystal fades and rises as you scroll
  const crystalOpacity = useTransform(smooth, [0, 280], [1, 0]);
  const crystalY       = useTransform(smooth, [0, 500], [0, -70]);
  const labelOpacity   = useTransform(smooth, [0, 180], [1, 0]);

  return (
    <>
      {/* Hero scroll zone — defines the 100vh space */}
      <div className="h-screen min-h-[650px] bg-white relative overflow-hidden">

        {/* Top center subtitle */}
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

        {/* Bottom-right metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          style={{ opacity: labelOpacity }}
          className="absolute bottom-10 right-8 lg:right-10 text-right z-10 pointer-events-none"
        >
          <p className="body-label">Luxury Division<br /><span className="text-[#C6A36A]">ATATC Group</span></p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ opacity: labelOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        >
          <span className="body-label">Scroll</span>
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-black/30 origin-top"
          />
        </motion.div>
      </div>

      {/* ─── Fixed overlay: crystal + MELIZ ─── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 45 }}>

        {/* Crystal shape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: crystalY, opacity: crystalOpacity }}
          className="absolute inset-0 flex items-center justify-center"
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

        {/* MELIZ — scroll-driven spread → compact */}
        <motion.div
          style={{ y, fontSize, letterSpacing }}
          className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap leading-none select-none"
        >
          {letters.map((letter, i) => (
            <motion.span
              key={letter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="display-text text-[#0A0A0A] inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </>
  );
}
