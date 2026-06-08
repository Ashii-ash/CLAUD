"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const AWARD_TYPES = [
  {
    title: "Crystal Awards",
    desc: "Premium optical crystal, laser-engraved to perfection. The pinnacle of recognition.",
    photo: "photo-1567427017947-545c5f8d16ad",
    accent: "#C8A96A",
  },
  {
    title: "Acrylic Awards",
    desc: "Clear and coloured acrylic trophies with precision cutting and custom typography.",
    photo: "photo-1580927752452-89d86da3fa0a",
    accent: "#8E6A3B",
  },
  {
    title: "Metal Awards",
    desc: "Solid brass, aluminium, and zinc alloy awards — weighty, lasting, prestigious.",
    photo: "photo-1579033461380-adb47c3eb938",
    accent: "#C8A96A",
  },
  {
    title: "Wooden Awards",
    desc: "Sustainably sourced timber with laser engraving and inlay options — natural luxury.",
    photo: "photo-1511993226760-3cd09b3c40f6",
    accent: "#8E6A3B",
  },
  {
    title: "Corporate Plaques",
    desc: "Wall plaques, desk plaques, and commemorative pieces for milestones and achievements.",
    photo: "photo-1519677100203-a0e668c92439",
    accent: "#C8A96A",
  },
  {
    title: "Medals & Coins",
    desc: "Die-cast medals and commemorative coins for sporting, military, and corporate events.",
    photo: "photo-1571781926291-c477ebfd024b",
    accent: "#8E6A3B",
  },
];

export default function Awards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="awards" ref={ref} className="bg-[#F7F7F5] py-20 lg:py-32 overflow-hidden">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 lg:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#C8A96A]" />
              <span className="label text-[#C8A96A]">Recognition & Awards</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="heading-display text-[#111]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 6.5rem)" }}
              >
                Awards &
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                className="heading-display text-[#111] italic"
                style={{ fontSize: "clamp(2.5rem, 5vw, 6.5rem)" }}
              >
                Trophies.
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-end"
          >
            <p className="body-text mb-6">
              From intimate team recognition to grand-ceremony trophies — we design and
              manufacture awards that carry weight, both literally and symbolically. Every
              piece is engineered to last a lifetime and engraved with precision.
            </p>
            <a
              href="https://wa.me/971503458369?text=Hello%20Al%20Tabaa%20Cards%2C%20I%20would%20like%20to%20enquire%20about%20awards%20and%20trophies."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 label text-[#111] hover:text-[#C8A96A] transition-colors duration-300 group self-start"
            >
              <span>Enquire About Awards</span>
              <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {AWARD_TYPES.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
              className="relative overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={`https://images.unsplash.com/${a.photo}?w=700&q=80&auto=format&fit=crop`}
                alt={a.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Gold accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: a.accent }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
                <h3
                  className="heading-display text-white mb-2 group-hover:text-[#C8A96A] transition-colors duration-300"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)" }}
                >
                  {a.title}
                </h3>
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  className="label text-white/60 leading-relaxed overflow-hidden"
                >
                  {a.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
