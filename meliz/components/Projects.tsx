"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const projects = [
  { title: "Crystal Staircase", location: "Palm Jumeirah Villa, Dubai", cat: "Residential", year: "2024", photo: "photo-1558618666-fcd25c85cd64" },
  { title: "Hotel Lobby Installation", location: "Downtown Dubai", cat: "Hospitality", year: "2023", photo: "photo-1616486338812-3dadae4b4ace" },
  { title: "Architectural Glass Facade", location: "DIFC Headquarters", cat: "Commercial", year: "2024", photo: "photo-1497366216548-37526070297c" },
  { title: "Private Crystal Chandelier", location: "Abu Dhabi Residence", cat: "Residential", year: "2023", photo: "photo-1565193566173-7a0ee3dbe261" },
  { title: "Government Feature Wall", location: "Sharjah Cultural Centre", cat: "Government", year: "2023", photo: "photo-1631679706909-1844bbd07221" },
  { title: "Signature Mirror Installation", location: "Luxury Boutique, Dubai", cat: "Retail", year: "2024", photo: "photo-1582407947304-fd86f028f716" },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Headline row */}
      <div className="flex-shrink-0 border-b border-black/8 px-5 lg:px-8 py-10 lg:py-14 flex items-end justify-between">
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
