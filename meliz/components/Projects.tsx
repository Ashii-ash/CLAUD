"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ParallaxStrip } from "./ScrollReveal";

const projects = [
  { title: "Crystal Staircase", location: "Palm Jumeirah Villa, Dubai", cat: "Residential", year: "2024", tall: true, photo: "photo-1558618666-fcd25c85cd64" },
  { title: "Hotel Lobby Installation", location: "Downtown Dubai", cat: "Hospitality", year: "2023", tall: false, photo: "photo-1616486338812-3dadae4b4ace" },
  { title: "Architectural Glass Facade", location: "DIFC Headquarters", cat: "Commercial", year: "2024", tall: false, photo: "photo-1497366216548-37526070297c" },
  { title: "Private Crystal Chandelier", location: "Abu Dhabi Residence", cat: "Residential", year: "2023", tall: true, photo: "photo-1565193566173-7a0ee3dbe261" },
  { title: "Government Feature Wall", location: "Sharjah Cultural Centre", cat: "Government", year: "2023", tall: false, photo: "photo-1631679706909-1844bbd07221" },
  { title: "Signature Mirror Installation", location: "Luxury Boutique, Dubai", cat: "Retail", year: "2024", tall: false, photo: "photo-1582407947304-fd86f028f716" },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="bg-white border-t border-black/8 overflow-hidden">

      {/* Section headline */}
      <div className="overflow-hidden py-28 lg:py-48 px-5 lg:px-8 border-b border-black/8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="display-text"
              style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}
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
            className="body-label hover:text-[#C6A36A] transition-colors"
          >
            Discuss your project →
          </motion.a>
        </div>
      </div>

      {/* Sub-headline parallax spread */}
      <div className="border-b border-black/8 overflow-hidden">
        <ParallaxStrip words={["Spaces", "Transformed", "By Light"]} fontSize="clamp(1rem, 5.5vw, 7rem)" speed={90} />
      </div>

      {/* Small centered body text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="flex justify-center py-28 lg:py-44 px-8"
      >
        <p className="body-label text-center max-w-[300px] leading-[2]">
          Each project is a testament to our belief that extraordinary spaces deserve extraordinary materials.
        </p>
      </motion.div>

      {/* Project grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 border-t border-black/8">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative border-r border-b border-black/8 last:border-r-0 overflow-hidden group cursor-default"
            style={{ aspectRatio: p.tall ? "3/4" : "4/3" }}
          >
            <Image
              src={`https://images.unsplash.com/${p.photo}?w=800&q=80&auto=format&fit=crop`}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute top-4 left-4 body-label text-white/70">{String(i + 1).padStart(2, "0")}</div>
            <div className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-400 ${hovered === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
              <div className="body-label text-[#C6A36A] mb-1">{p.cat} · {p.year}</div>
              <div className="display-text text-white" style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.8rem)" }}>{p.title}</div>
              <div className="body-label mt-1 text-white/70">{p.location}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
