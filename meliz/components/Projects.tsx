"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const projects = [
  { title: "Elite Gifting", location: "Bespoke Luxury Experiences", cat: "Elite", year: "2024", photo: "photo-1513201099705-a9746e1e201f" },
  { title: "Corporate Gifts", location: "Tailored for Organisations", cat: "Corporate", year: "2024", photo: "photo-1549465220-1a8b9238cd48" },
  { title: "Luxury Gift Sets", location: "Curated Collections", cat: "Luxury", year: "2024", photo: "photo-1571781926291-c477ebfd024b" },
  { title: "Signature Gifts", location: "One-of-a-Kind Creations", cat: "Signature", year: "2024", photo: "photo-1607082348824-0a96f2a4b9da" },
  { title: "Gift Hampers", location: "Premium Curated Hampers", cat: "Hampers", year: "2024", photo: "photo-1547496502-affa22d38842" },
  { title: "Premium Packaging", location: "Artisan Presentation", cat: "Packaging", year: "2024", photo: "photo-1558769132-cb1aea458c5e" },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Headline row */}
      <div className="flex-shrink-0 border-b border-black/8 px-5 lg:px-8 pt-[60px] pb-10 lg:pb-14 flex items-end justify-between">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display-text"
            style={{ fontSize: "clamp(2.5rem, 8vw, 9rem)" }}
          >
            Selected Work
          </motion.h2>
        </div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20project."
          target="_blank" rel="noopener noreferrer"
          className="body-label hover:text-[#C6A36A] transition-colors flex-shrink-0"
        >
          Discuss your project →
        </motion.a>
      </div>

      {/* Photo grid: 3 cols × 2 rows filling flex-1 */}
      <div className="flex-1 grid grid-cols-3 grid-rows-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative overflow-hidden group cursor-default border-r border-b border-black/8"
          >
            <Image
              src={`https://images.unsplash.com/${p.photo}?w=800&q=80&auto=format&fit=crop`}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/45 transition-colors duration-500" />
            <div className="absolute top-4 left-4 body-label text-white/70">{String(i + 1).padStart(2, "0")}</div>
            <div className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-400 ${hovered === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
              <div className="body-label text-[#C6A36A] mb-1">{p.cat} · {p.year}</div>
              <div className="display-text text-white" style={{ fontSize: "clamp(0.85rem, 2vw, 1.6rem)" }}>{p.title}</div>
              <div className="body-label mt-1 text-white/70">{p.location}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
