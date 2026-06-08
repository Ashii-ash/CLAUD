"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

/** Single word with horizontal parallax. Parent must pass scrollYProgress. */
export function ParallaxWord({
  children,
  scrollYProgress,
  direction,
  speed = 80,
  fontSize = "clamp(1.6rem, 6vw, 7.5rem)",
}: {
  children: ReactNode;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  direction: 1 | -1;
  speed?: number;
  fontSize?: string;
}) {
  const x = useTransform(scrollYProgress, [0, 1], [`${direction * -speed / 2}px`, `${direction * speed / 2}px`]);
  return (
    <motion.span
      style={{ x, fontSize }}
      className="display-text text-[#0A0A0A]"
    >
      {children}
    </motion.span>
  );
}

/** Container for a 3-word parallax strip */
export function ParallaxStrip({
  words,
  speed = 80,
  fontSize = "clamp(1.6rem, 6vw, 7.5rem)",
  className = "",
}: {
  words: string[];
  speed?: number;
  fontSize?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const dirs: (1 | -1)[] = [-1, 1, -1];

  return (
    <div ref={ref} className={`flex items-baseline justify-between px-5 lg:px-8 py-28 lg:py-40 gap-2 overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <ParallaxWord
          key={word}
          scrollYProgress={scrollYProgress}
          direction={dirs[i] ?? 1}
          speed={speed}
          fontSize={fontSize}
        >
          {word}
        </ParallaxWord>
      ))}
    </div>
  );
}

/** Fade + slide up on scroll enter */
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
