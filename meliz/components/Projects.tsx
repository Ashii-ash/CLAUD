"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Luxury Villa — Crystal Staircase",
    location: "Palm Jumeirah, Dubai",
    category: "Residential",
    size: "large",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Five-Star Hotel Lobby Installation",
    location: "Downtown Dubai",
    category: "Hospitality",
    size: "tall",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Architectural Glass Facade",
    location: "DIFC, Dubai",
    category: "Commercial",
    size: "medium",
    aspect: "aspect-square",
  },
  {
    title: "Bespoke Crystal Chandelier",
    location: "Private Residence, Abu Dhabi",
    category: "Residential",
    size: "wide",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Government HQ Feature Wall",
    location: "Sharjah",
    category: "Government",
    size: "medium",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Signature Mirror Composition",
    location: "Luxury Boutique, Mall of Emirates",
    category: "Retail",
    size: "medium",
    aspect: "aspect-square",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-32 lg:py-40 bg-[#111111] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px bg-[#C6A36A]" />
              <span className="text-[0.6rem] tracking-[0.45em] uppercase text-[#C6A36A] font-medium">
                Featured Projects
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light text-white leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Spaces Transformed
              <br />
              <span className="italic text-[#C6A36A]">by Light.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-sm leading-relaxed max-w-xs lg:text-right"
          >
            Each project is a testament to our belief that extraordinary spaces deserve extraordinary materials.
          </motion.p>
        </div>

        {/* Masonry gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
              className={`break-inside-avoid ${project.aspect} luxury-placeholder relative group cursor-pointer overflow-hidden`}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center p-6">
                <div className="w-8 h-px bg-[#C6A36A]/30 mb-2" />
                <span className="text-[0.5rem] tracking-[0.4em] uppercase text-[#C6A36A]/40">
                  Photography Placeholder
                </span>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C6A36A]/20 group-hover:border-[#C6A36A]/50 transition-colors duration-400" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C6A36A]/20 group-hover:border-[#C6A36A]/50 transition-colors duration-400" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#C6A36A]/20 group-hover:border-[#C6A36A]/50 transition-colors duration-400" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#C6A36A]/20 group-hover:border-[#C6A36A]/50 transition-colors duration-400" />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/60 transition-colors duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <div className="text-[0.55rem] tracking-[0.35em] uppercase text-[#C6A36A] font-medium mb-1">
                  {project.category} · {project.location}
                </div>
                <h3
                  className="font-display text-base font-medium text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.3em] uppercase font-semibold text-white/60 hover:text-[#C6A36A] transition-colors duration-300"
          >
            Discuss Your Project
            <span className="text-base">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
