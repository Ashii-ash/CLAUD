"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const SERVICES = [
  {
    id: "01",
    title: "Corporate Gifts",
    desc: "VIP gift sets, executive collections, National Day gifts, Ramadan gifts, employee welcome kits — crafted for lasting impressions.",
    photo: "photo-1549465220-1a8b9238cd48",
    tags: ["VIP Gifts", "Ramadan", "National Day", "Welcome Kits"],
    wide: true,
  },
  {
    id: "02",
    title: "Luxury Packaging",
    desc: "Rigid boxes, paper bags, custom sleeves, and premium packaging engineered to elevate your product.",
    photo: "photo-1558769132-cb1aea458c5e",
    tags: ["Rigid Boxes", "Paper Bags", "Labels", "Stickers"],
    wide: false,
  },
  {
    id: "03",
    title: "Awards & Trophies",
    desc: "Crystal, acrylic, metal, wooden — bespoke awards and plaques for corporate recognition and events.",
    photo: "photo-1567427017947-545c5f8d16ad",
    tags: ["Crystal", "Acrylic", "Metal", "Wooden"],
    wide: false,
  },
  {
    id: "04",
    title: "Premium Printing",
    desc: "Offset, digital, UV, and screen printing with precision finishing for business cards, brochures, and more.",
    photo: "photo-1588681664899-f142ff2dc9b1",
    tags: ["Offset", "Digital", "UV Print", "Screen"],
    wide: false,
  },
  {
    id: "05",
    title: "Acrylic Fabrication",
    desc: "Custom acrylic displays, signage, awards, and fabricated pieces — laser-cut to perfection.",
    photo: "photo-1580927752452-89d86da3fa0a",
    tags: ["Laser Cut", "CNC", "Signage", "Displays"],
    wide: false,
  },
  {
    id: "06",
    title: "Branding & Signage",
    desc: "Office branding, exhibition displays, event branding, and full signage systems for corporate environments.",
    photo: "photo-1542744173-8e7e53415bb0",
    tags: ["Office Branding", "Exhibition", "Events", "Signage"],
    wide: true,
  },
];

function ServiceCard({ s, i, inView }: { s: typeof SERVICES[0]; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden group cursor-pointer border border-[#ECECEC] ${s.wide ? "lg:col-span-2" : ""}`}
      style={{ aspectRatio: s.wide ? "2/1" : "1/1" }}
    >
      {/* Image */}
      <Image
        src={`https://images.unsplash.com/${s.photo}?w=900&q=80&auto=format&fit=crop`}
        alt={s.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={s.wide ? "50vw" : "33vw"}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <motion.div
        animate={{ opacity: hovered ? 0.15 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-[#C8A96A]"
      />

      {/* Number */}
      <div className="absolute top-5 left-5">
        <span className="label text-white/40">{s.id}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <motion.h3
          className="heading-display text-white mb-3 leading-tight"
          style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}
        >
          {s.title}
        </motion.h3>
        <motion.p
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.35 }}
          className="body-text text-white/70 text-sm mb-4 max-w-xs leading-relaxed"
        >
          {s.desc}
        </motion.p>
        <div className="flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <span key={t} className="label text-[#C8A96A] text-[0.5rem] border border-[#C8A96A]/30 px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
        transition={{ duration: 0.3 }}
        className="absolute top-5 right-5 w-8 h-8 bg-[#C8A96A] flex items-center justify-center"
      >
        <span className="text-[#111] text-sm">→</span>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="services" ref={ref} className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#C8A96A]" />
              <span className="label text-[#C8A96A]">What We Make</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="heading-display text-[#111]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Our Services
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-text max-w-xs text-right hidden lg:block"
          >
            End-to-end manufacturing under one roof — from concept to delivery.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 border border-[#ECECEC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-8 py-6"
        >
          <div>
            <p className="heading-display text-[#111] text-xl mb-1">Need something custom?</p>
            <p className="label">We manufacture to any specification — tell us what you need.</p>
          </div>
          <a
            href="https://wa.me/971503458369?text=Hello%20Al%20Tabaa%20Cards%2C%20I%20have%20a%20custom%20requirement."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-[#111] text-white px-7 py-3.5 label font-semibold text-[0.6rem] hover:bg-[#C8A96A] hover:text-[#111] transition-colors duration-300 group"
          >
            Discuss Requirements
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
