"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";
import dynamic from "next/dynamic";



const THRESHOLD = 420;
const NAVBAR_H  = 60;
const END_FONT  = 26;

export default function Hero() {
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

  // Font size: hero size → compact navbar size (px)
  const fontSizePx = useTransform(
    [progress, vpW] as const,
    ([p, w]: number[]) => {
      const start = Math.max(w * 0.17, 60);
      return start + (END_FONT - start) * p;
    }
  );
  const fontSize = useMotionTemplate`${fontSizePx}px`;

  // Letter spacing: 0.36em puts M at left edge, Z at right edge.
  // As it compresses to -0.02em, letters physically travel inward and meet.
  const letterSpacingEm = useTransform(progress, [0, 1], [0.36, -0.02]);
  const letterSpacing = useMotionTemplate`${letterSpacingEm}em`;

  // Y: viewport center → navbar center
  const y = useTransform(
    [progress, vpW, vpH] as const,
    ([p, w, h]: number[]) => {
      const startFont = Math.max(w * 0.17, 60);
      const yStart = h / 2 - startFont / 2;
      const yEnd   = NAVBAR_H / 2 - END_FONT / 2;
      return yStart + (yEnd - yStart) * p;
    }
  );

  const crystalOpacity = useTransform(smooth, [0, 280], [1, 0]);
  const crystalY       = useTransform(smooth, [0, 500], [0, -70]);
  const labelOpacity   = useTransform(smooth, [0, 180], [1, 0]);

  return (
    <>
      {/* Hero scroll zone */}
      <section className="h-screen min-h-[650px] bg-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ opacity: labelOpacity }}
          className="absolute top-[80px] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none"
        >
          <p className="body-label leading-loose">
            Dubai&apos;s Premier<br />Luxury Gifting Brand
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          style={{ opacity: labelOpacity }}
          className="absolute bottom-10 right-8 lg:right-10 text-right z-10 pointer-events-none"
        >
          <p className="body-label">Elite Gifting<br /><span className="text-[#C6A36A]">Dubai, UAE</span></p>
        </motion.div>

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
      </section>

      {/* Fixed overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 45 }}>

        {/* Decorative crystal shape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: crystalY, opacity: crystalOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-[min(320px,45vw)] h-[min(320px,45vw)]">
            <div className="absolute inset-0 border border-[#C6A36A]/20 rotate-12 scale-110" />
            <div className="absolute inset-0 border border-black/5 rotate-6" />
            <div className="absolute inset-[15%] bg-gradient-to-br from-[#f8f6f2] via-[#f0ece4] to-[#e8e2d8] rotate-12 shadow-[0_20px_80px_rgba(0,0,0,0.05)]" />
            <div className="absolute inset-[25%] bg-gradient-to-tl from-[#ede8df] via-[#f5f1ea] to-white rotate-6" />
            <div className="absolute inset-[35%] bg-gradient-to-br from-white via-[#faf8f4] to-[#f0ece4] shadow-[inset_0_2px_20px_rgba(198,163,106,0.12)]" />
            <div className="absolute inset-[43%] bg-gradient-to-tl from-[#C6A36A]/15 via-[#C6A36A]/5 to-white rotate-45" />
            <div className="absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#C6A36A]/30 to-transparent" />
            <div className="absolute left-1/2 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-[#C6A36A]/20 to-transparent" />
          </div>
        </motion.div>

        {/* MELIZ — single centered text, letter-spacing drives spread → converge */}
        <motion.div
          style={{ y, fontSize, letterSpacing }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap select-none display-text text-[#0A0A0A] leading-none"
        >
          MELIZ
        </motion.div>
      </div>
    </>
  );
}
