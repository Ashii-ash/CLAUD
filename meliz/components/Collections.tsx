"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const collections = [
  {
    number: "01",
    title: "Bespoke Crystal",
    description: "Hand-crafted crystal sculptures, chandeliers, and ornamental pieces conceived as singular works of art for private residences and landmark interiors.",
    tag: "Signature Collection",
  },
  {
    number: "02",
    title: "Luxury Glass",
    description: "Precision-engineered luxury glass surfaces, panels, and architectural elements that redefine the relationship between light, space, and material.",
    tag: "Architectural Series",
  },
  {
    number: "03",
    title: "Decorative Installations",
    description: "Large-scale decorative glass and crystal installations designed to define a space — from hotel lobbies to executive boardrooms.",
    tag: "Statement Pieces",
  },
  {
    number: "04",
    title: "Architectural Features",
    description: "Structural and semi-structural glass features — partitions, facades, staircases, and canopies — where engineering meets aesthetic mastery.",
    tag: "Structural Design",
  },
  {
    number: "05",
    title: "Premium Mirrors",
    description: "Bespoke mirror compositions with artisan frames, bevelling, and custom gilding for spaces that demand refined reflections.",
    tag: "Mirror Artistry",
  },
  {
    number: "06",
    title: "Signature Commissions",
    description: "Fully bespoke commissions for clients who require a creation that exists nowhere else in the world. The ultimate expression of individual luxury.",
    tag: "Private Commissions",
  },
];

export default function Collections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="collections" ref={ref} className="py-32 lg:py-40 bg-[#0e0e0e] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-8 h-px bg-[#C6A36A]" />
            <span className="text-[0.6rem] tracking-[0.45em] uppercase text-[#C6A36A] font-medium">
              Our Collections
            </span>
            <div className="w-8 h-px bg-[#C6A36A]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light text-white leading-[1.1]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Curated for the
            <br />
            <span className="italic text-[#C6A36A]">Extraordinary.</span>
          </motion.h2>
        </div>

        {/* Collections grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {collections.map((col, i) => (
            <motion.div
              key={col.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              className="bg-[#0e0e0e] p-10 group hover:bg-[#141414] transition-colors duration-400 relative overflow-hidden"
            >
              {/* Hover gold accent */}
              <div className="absolute top-0 left-0 w-0 h-px bg-[#C6A36A] group-hover:w-full transition-all duration-500" />

              {/* Number */}
              <div
                className="font-display text-5xl font-light text-white/8 group-hover:text-[#C6A36A]/15 transition-colors duration-400 mb-6 leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {col.number}
              </div>

              {/* Tag */}
              <div className="text-[0.55rem] tracking-[0.4em] uppercase text-[#C6A36A]/60 font-medium mb-3">
                {col.tag}
              </div>

              {/* Title */}
              <h3
                className="font-display text-xl font-medium text-white mb-4 group-hover:text-[#C6A36A] transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {col.title}
              </h3>

              {/* Description */}
              <p className="text-white/45 text-sm leading-relaxed">
                {col.description}
              </p>

              {/* Arrow */}
              <div className="mt-8 flex items-center gap-2 text-[#C6A36A]/0 group-hover:text-[#C6A36A] transition-all duration-300">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase font-semibold">Enquire</span>
                <span className="text-base">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
