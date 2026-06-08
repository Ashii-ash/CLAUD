"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const cols = [
  { n: "01", title: "Elite Gifting", desc: "Exclusive gifting experiences crafted for those who demand nothing less than extraordinary — where every detail is a statement of refinement." },
  { n: "02", title: "Elegant Gifting", desc: "Graceful, understated luxury gifts that speak volumes without saying a word. Timeless elegance for every occasion." },
  { n: "03", title: "Luxury Gift Sets", desc: "Meticulously curated gift sets combining the finest products, thoughtfully assembled in stunning presentation." },
  { n: "04", title: "Corporate Gifts", desc: "Sophisticated corporate gifting solutions tailored to your brand — leaving a lasting impression on every client and partner." },
  { n: "05", title: "Signature Gifts", desc: "Fully personalised, one-of-a-kind creations for clients who require a gift that exists nowhere else in the world." },
  { n: "06", title: "Occasion Gifts", desc: "From weddings to milestones — bespoke gifts designed to mark life's most meaningful moments with enduring luxury." },
];

export default function Collections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="collections" ref={ref} className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Headline row (~20%) */}
      <div className="flex-shrink-0 border-b border-black/8 px-5 lg:px-8 pt-[60px] pb-12 lg:pb-16 flex items-end justify-between">
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
          Each collection represents a distinct expression of luxury, elegance, and thoughtful gifting.
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
            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1920&q=85&auto=format&fit=crop"
            alt="Luxury gifting collection"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* 3 collection names overlaid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-1 sm:grid-cols-3 border-t border-white/10">
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
