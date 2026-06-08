"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  { title: "Crystal Staircase", location: "Palm Jumeirah Villa", category: "Residential", year: "2024", aspect: "aspect-[3/4]", size: "lg:col-span-1" },
  { title: "Hotel Lobby Installation", location: "Downtown Dubai", category: "Hospitality", year: "2023", aspect: "aspect-[3/4]", size: "lg:col-span-1" },
  { title: "Glass Facade", location: "DIFC Headquarters", category: "Commercial", year: "2024", aspect: "aspect-[16/9]", size: "lg:col-span-2" },
  { title: "Private Chandelier", location: "Abu Dhabi Residence", category: "Residential", year: "2023", aspect: "aspect-[4/5]", size: "lg:col-span-1" },
  { title: "Government Feature Wall", location: "Sharjah Cultural Centre", category: "Government", year: "2023", aspect: "aspect-[4/5]", size: "lg:col-span-1" },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="relative bg-[#060606] py-32 lg:py-48 overflow-hidden">
      <div className="absolute top-16 right-8 lg:right-16 text-[0.5rem] tracking-[0.5em] uppercase text-white/10 font-light">03</div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="mb-20 lg:mb-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-[#C6A36A]" />
            <span className="text-[0.5rem] tracking-[0.55em] uppercase text-[#C6A36A] font-light">Selected Work</span>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.4rem,5.5vw,5rem)] font-light text-white leading-[1.0] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Spaces Transformed <em className="text-[#C6A36A]">by Light.</em>
              </motion.h2>
            </div>
            <motion.a href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
              className="text-[0.6rem] tracking-[0.35em] uppercase text-white/30 hover:text-[#C6A36A] transition-colors duration-300 font-light flex-shrink-0">
              Discuss Your Project →
            </motion.a>
          </div>
        </div>

        {/* Grid — editorial asymmetric */}
        <div className="grid lg:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12 }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              className={`relative overflow-hidden cursor-pointer group ${p.size} ${p.aspect} bg-gradient-to-br from-[#141414] via-[#111111] to-[#0d0d0d]`}>

              {/* Placeholder imagery */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-px bg-[#C6A36A]/15" />
                  <span className="text-[0.4rem] tracking-[0.5em] uppercase text-white/10">Photography Placeholder</span>
                  <div className="w-8 h-px bg-[#C6A36A]/15" />
                </div>
              </div>

              {/* Overlay */}
              <div className={`absolute inset-0 bg-[#060606] transition-opacity duration-500 ${hovered === i ? "opacity-50" : "opacity-0"}`} />

              {/* Corner marks */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#C6A36A]/15 group-hover:border-[#C6A36A]/40 transition-colors duration-400" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#C6A36A]/15 group-hover:border-[#C6A36A]/40 transition-colors duration-400" />

              {/* Bottom info — slides up */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${hovered === i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <div className="text-[0.45rem] tracking-[0.5em] uppercase text-[#C6A36A] font-light mb-1">{p.category} · {p.year}</div>
                <div className="text-white text-sm font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{p.title}</div>
                <div className="text-white/40 text-[0.7rem] font-light mt-0.5">{p.location}</div>
              </div>

              {/* Top right index */}
              <div className="absolute top-4 right-4 text-[0.45rem] tracking-[0.4em] text-white/15 font-light">
                {String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
