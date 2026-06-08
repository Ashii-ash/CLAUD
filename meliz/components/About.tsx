"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ParallaxStrip } from "./ScrollReveal";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" ref={ref} className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Top 60%: full-bleed image with headline overlay */}
      <div className="flex-1 relative overflow-hidden border-t border-black/8">
        <Image
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=85&auto=format&fit=crop"
          alt="Luxury gifting"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-5 lg:bottom-12 lg:left-8 overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display-text text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 8vw, 10rem)" }}
          >
            The Art of
          </motion.h2>
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="display-text text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 8vw, 10rem)" }}
          >
            Gifting
          </motion.h2>
        </div>
      </div>

      {/* Bottom row: body text left + stats right */}
      <div className="flex-shrink-0 border-t border-black/8">
        {/* Body text — full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="px-5 lg:px-8 py-6 border-b border-black/8"
        >
          <p className="body-label leading-[2]">
            MELIZ is Dubai&apos;s premier luxury gifting brand — where every gift is an experience. From elite corporate gifting to bespoke personal creations, we craft moments of extraordinary generosity for those who demand nothing less.
          </p>
        </motion.div>

        {/* Stats — 2×2 on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { v: "20+", l: "Years of Excellence" },
            { v: "5000+", l: "Gifts Delivered" },
            { v: "UAE", l: "Based in Dubai" },
            { v: "100%", l: "Bespoke Gifting" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 + i * 0.07 }}
              className="border-r border-b border-black/8 px-5 lg:px-8 py-7 group hover:bg-[#faf8f4] transition-colors duration-300"
            >
              <div
                className="display-text text-[#0A0A0A] group-hover:text-[#C6A36A] transition-colors duration-300 mb-2"
                style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)" }}
              >
                {s.v}
              </div>
              <div className="body-label">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
