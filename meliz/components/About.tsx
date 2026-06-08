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
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=85&auto=format&fit=crop"
          alt="Luxury interior"
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
            The Momentum
          </motion.h2>
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="display-text text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 8vw, 10rem)" }}
          >
            Of Craft
          </motion.h2>
        </div>
      </div>

      {/* Bottom row: body text left + stats right */}
      <div className="flex-shrink-0 grid grid-cols-2 lg:grid-cols-[1fr_3fr] border-t border-black/8">
        {/* Body text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="px-5 lg:px-8 py-8 border-r border-black/8 flex items-center"
        >
          <p className="body-label leading-[2]">
            MELIZ is born from ATATC&apos;s manufacturing excellence — over twenty years defining quality in the UAE. We create bespoke crystal and architectural glass for spaces that demand the extraordinary.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex">
          {[
            { v: "20+", l: "Years of Expertise" },
            { v: "500+", l: "Luxury Projects" },
            { v: "12", l: "Countries Served" },
            { v: "100%", l: "Bespoke Creations" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 + i * 0.07 }}
              className="flex-1 border-l border-black/8 px-6 py-8 group hover:bg-[#faf8f4] transition-colors duration-300"
            >
              <div
                className="display-text text-[#0A0A0A] group-hover:text-[#C6A36A] transition-colors duration-300 mb-2"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
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
