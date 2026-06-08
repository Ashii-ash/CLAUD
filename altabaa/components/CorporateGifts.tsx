"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const GIFT_CATEGORIES = [
  {
    title: "VIP Executive Gifts",
    desc: "Curated luxury sets for C-suite gifting — leather goods, premium stationery, branded accessories.",
    photo: "photo-1549465220-1a8b9238cd48",
    tag: "Executive",
  },
  {
    title: "Ramadan Gift Sets",
    desc: "Thoughtfully crafted Ramadan collections with Arabic calligraphy, premium dates, and luxury packaging.",
    photo: "photo-1513201099705-a9746e1e201f",
    tag: "Seasonal",
  },
  {
    title: "National Day Gifts",
    desc: "Patriotic gift collections celebrating UAE and GCC National Days — branded with care and precision.",
    photo: "photo-1579033461380-adb47c3eb938",
    tag: "Seasonal",
  },
  {
    title: "Employee Welcome Kits",
    desc: "Branded onboarding kits that make a first impression — notebooks, accessories, and premium packaging.",
    photo: "photo-1607082348824-0a96f2a4b9da",
    tag: "Corporate",
  },
  {
    title: "Premium Stationery Sets",
    desc: "Embossed notebooks, engraved pens, and branded stationery collections for corporate gifting.",
    photo: "photo-1588681664899-f142ff2dc9b1",
    tag: "Stationery",
  },
  {
    title: "Custom Gift Sets",
    desc: "Fully bespoke gift curation and packaging built around your brief, budget, and brand identity.",
    photo: "photo-1558769132-cb1aea458c5e",
    tag: "Bespoke",
  },
];

export default function CorporateGifts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="gifts" ref={ref} className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 mb-14 lg:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#C8A96A]" />
              <span className="label text-[#C8A96A]">Gift Collections</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="heading-display text-[#111]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
              >
                Corporate
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                className="heading-display text-[#111] italic"
                style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
              >
                Gifting.
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
              Every gift carries your brand identity. We design, manufacture, and package
              corporate gifts that communicate prestige — from intimate executive sets to
              large-scale seasonal campaigns.
            </p>
            <div className="flex flex-wrap gap-3">
              {["VIP Gifts", "Ramadan", "National Day", "Welcome Kits", "Stationery", "Bespoke"].map((tag) => (
                <span key={tag} className="label border border-[#ECECEC] px-3 py-1.5 hover:border-[#C8A96A] hover:text-[#C8A96A] transition-colors duration-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Gift grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ECECEC]">
          {GIFT_CATEGORIES.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
              className="group relative overflow-hidden bg-white"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={`https://images.unsplash.com/${g.photo}?w=700&q=80&auto=format&fit=crop`}
                  alt={g.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="label text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1">{g.tag}</span>
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <h3
                  className="heading-display text-[#111] group-hover:text-[#C8A96A] transition-colors duration-300 mb-3"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)" }}
                >
                  {g.title}
                </h3>
                <p className="label text-[#888] leading-relaxed">{g.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
