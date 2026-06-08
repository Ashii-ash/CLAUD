"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PROJECTS = [
  {
    id: "001",
    title: "Government National Day Gifts",
    client: "UAE Government Entity",
    industry: "Government",
    solution: "Custom gift sets featuring branded acrylic trophies, premium packaging, and personalised stationery for 1,200 recipients.",
    photo: "photo-1579033461380-adb47c3eb938",
    year: "2024",
  },
  {
    id: "002",
    title: "Corporate Onboarding Kits",
    client: "Leading Telecom Corporation",
    industry: "Corporate",
    solution: "Employee welcome kits with branded notebooks, premium pens, USB drives, and luxury rigid box packaging.",
    photo: "photo-1607082348824-0a96f2a4b9da",
    year: "2024",
  },
  {
    id: "003",
    title: "Luxury Ramadan Gift Sets",
    client: "Hospitality Group",
    industry: "Hospitality",
    solution: "Bespoke Ramadan gift sets with hand-finished packaging, Arabic calligraphy, and curated premium contents.",
    photo: "photo-1513201099705-a9746e1e201f",
    year: "2024",
  },
  {
    id: "004",
    title: "Acrylic Award Collection",
    client: "Regional Awards Ceremony",
    industry: "Events",
    solution: "Bespoke crystal and acrylic award designs for 48 categories, laser engraved with custom typography.",
    photo: "photo-1567427017947-545c5f8d16ad",
    year: "2023",
  },
  {
    id: "005",
    title: "Retail Brand Identity Pack",
    client: "UAE Fashion Retailer",
    industry: "Retail",
    solution: "Full brand package: business cards, stationery, rigid boxes, carrier bags, and UV-printed labels.",
    photo: "photo-1586974798095-4f25f5e8af85",
    year: "2023",
  },
  {
    id: "006",
    title: "Exhibition Display System",
    client: "Real Estate Developer",
    industry: "Real Estate",
    solution: "Full exhibition stand design and fabrication with printed backdrops, acrylic signage, and branded merchandise.",
    photo: "photo-1542744173-8e7e53415bb0",
    year: "2023",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="bg-[#F7F7F5] py-20 lg:py-32 overflow-hidden">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6 pb-10 border-b border-[#ECECEC]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#C8A96A]" />
              <span className="label text-[#C8A96A]">Our Work</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="heading-display text-[#111]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Selected Projects
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-text max-w-xs text-right hidden lg:block"
          >
            A selection of work from our 5,000+ delivered projects across the UAE & GCC.
          </motion.p>
        </div>

        {/* Project list — editorial list style */}
        <div className="space-y-0">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
              className="group border-b border-[#ECECEC] cursor-pointer"
            >
              <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[80px_1fr_200px_180px_60px] items-center gap-4 lg:gap-8 py-6 lg:py-8 hover:bg-white transition-colors duration-300 px-0">
                {/* Number */}
                <span className="label text-[#C8A96A]">{p.id}</span>

                {/* Title + meta */}
                <div>
                  <h3
                    className="heading-display text-[#111] group-hover:text-[#C8A96A] transition-colors duration-300 leading-tight"
                    style={{ fontSize: "clamp(1.1rem, 2.2vw, 2rem)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="label mt-1 hidden lg:block">{p.solution}</p>
                </div>

                {/* Industry */}
                <div className="hidden lg:block">
                  <span className="label text-[#C8A96A] border border-[#C8A96A]/30 px-3 py-1.5">{p.industry}</span>
                </div>

                {/* Client */}
                <div className="hidden lg:block">
                  <p className="label">{p.client}</p>
                  <p className="label text-[#999] mt-0.5">{p.year}</p>
                </div>

                {/* Arrow */}
                <motion.span
                  animate={{ x: activeProject === i ? 4 : 0 }}
                  className="label text-[#C8A96A] flex-shrink-0"
                >
                  →
                </motion.span>
              </div>

              {/* Expanded image on hover — desktop only */}
              <AnimatePresence>
                {activeProject === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 280, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden hidden lg:block"
                  >
                    <div className="relative h-full">
                      <Image
                        src={`https://images.unsplash.com/${p.photo}?w=1400&q=80&auto=format&fit=crop`}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <p className="label text-[#C8A96A] mb-1">{p.industry} · {p.year}</p>
                        <h4 className="heading-display text-white text-2xl">{p.title}</h4>
                        <p className="label text-white/60 mt-1">{p.client}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
