"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const STATS = [
  { value: "20+", label: "Years of Mastery" },
  { value: "5,000+", label: "Projects Delivered" },
  { value: "500+", label: "Corporate Clients" },
  { value: "100%", label: "In-House Production" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="about" ref={ref} className="bg-white overflow-hidden">
      {/* Top editorial split */}
      <div className="grid lg:grid-cols-2 min-h-[80vh] border-b border-[#ECECEC]">
        {/* Left: image */}
        <div className="relative overflow-hidden min-h-[50vh] lg:min-h-full">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1586074299757-dc655f18518c?w=1200&q=85&auto=format&fit=crop"
              alt="Al Tabaa Cards manufacturing facility"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />

          {/* Corner label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="absolute bottom-6 left-6"
          >
            <span className="label text-white/70 bg-black/30 backdrop-blur-sm px-3 py-2">
              Sharjah, UAE · Since 2000
            </span>
          </motion.div>
        </div>

        {/* Right: editorial text */}
        <div className="px-8 lg:px-16 py-16 lg:py-24 flex flex-col justify-center border-l border-[#ECECEC]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-[#C8A96A]" />
            <span className="label text-[#C8A96A]">Our Story</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="heading-display text-[#111]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              Two Decades of
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
              className="heading-display text-[#111] italic"
              style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
            >
              Precision Craft.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="body-text mb-6 max-w-md"
          >
            Al Tabaa Cards has been the UAE&apos;s trusted partner in premium printing,
            luxury packaging, and corporate gifting since 2000. Based in Sharjah, we
            serve leading brands, government entities, and corporations across the UAE
            and GCC with meticulous in-house manufacturing.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.72 }}
            className="body-text max-w-md"
          >
            From the first consultation to the final delivery, every project carries the
            same hallmark — absolute precision, thoughtful design, and materials that
            communicate excellence.
          </motion.p>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="mt-10 inline-flex items-center gap-3 label text-[#111] hover:text-[#C8A96A] transition-colors duration-300 group self-start"
          >
            <span>Begin a Project</span>
            <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
          </motion.a>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#ECECEC]">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
            className="px-8 lg:px-12 py-10 border-r border-[#ECECEC] last:border-r-0 group hover:bg-[#F7F7F5] transition-colors duration-300"
          >
            <div
              className="heading-display text-[#111] group-hover:text-[#C8A96A] transition-colors duration-300 mb-2"
              style={{ fontSize: "clamp(2rem, 4vw, 4.5rem)" }}
            >
              {s.value}
            </div>
            <div className="label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
