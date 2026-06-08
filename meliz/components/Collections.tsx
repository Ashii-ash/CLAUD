"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const cols = [
  { n: "01", title: "Bespoke Crystal", desc: "Hand-crafted crystal sculptures, chandeliers, and ornamental pieces conceived as singular works of art for private residences and landmark interiors." },
  { n: "02", title: "Luxury Glass", desc: "Precision-engineered luxury glass surfaces, panels, and architectural elements that redefine the relationship between light, space, and material." },
  { n: "03", title: "Decorative Installations", desc: "Large-scale decorative glass and crystal installations designed to define a space — from hotel lobbies to executive boardrooms." },
  { n: "04", title: "Architectural Features", desc: "Structural and semi-structural glass features — partitions, facades, staircases — where engineering meets aesthetic mastery." },
  { n: "05", title: "Premium Mirrors", desc: "Bespoke mirror compositions with artisan frames, bevelling, and custom gilding for spaces that demand refined reflections." },
  { n: "06", title: "Signature Commissions", desc: "Fully bespoke commissions for clients who require a creation that exists nowhere else in the world. The ultimate expression of individual luxury." },
];

export default function Collections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="collections" ref={ref} className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Headline row (~20%) */}
      <div className="flex-shrink-0 border-b border-black/8 px-5 lg:px-8 py-12 lg:py-16 flex items-end justify-between">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display-text"
            style={{ fontSize: "clamp(2.5rem, 8vw, 9rem)" }}
          >
            Our Collections
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="body-label max-w-[200px] text-right hidden lg:block"
        >
          Each collection represents a distinct mastery of material, form, and light.
        </motion.p>
      </div>

      {/* Full-bleed image with 3-col overlay at bottom */}
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85&auto=format&fit=crop"
            alt="Luxury white interior"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* 3 collection names overlaid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 border-t border-white/10">
          {cols.slice(0, 3).map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`border-r border-white/10 last:border-r-0 px-5 lg:px-8 py-8 cursor-default transition-colors duration-300 ${active === i ? "bg-white/10" : ""}`}
            >
              <div className="body-label text-[#C6A36A] mb-2">{c.n}</div>
              <div
                className={`display-text transition-colors duration-300 ${active === i ? "text-[#C6A36A]" : "text-white"}`}
                style={{ fontSize: "clamp(1rem, 2.2vw, 2rem)" }}
              >
                {c.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
