"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const INDUSTRIES = [
  { name: "Corporate", desc: "Fortune 500s and regional conglomerates trust us for branded gifts, office materials, and recognition awards." },
  { name: "Government", desc: "UAE and GCC government entities rely on us for National Day gifts, official stationery, and branded communications." },
  { name: "Hospitality", desc: "Hotels and resorts commission Ramadan collections, VIP amenity kits, and premium branded materials." },
  { name: "Retail", desc: "Fashion and lifestyle brands use our packaging, bags, labels, and branded merchandise to elevate the unboxing." },
  { name: "Healthcare", desc: "Clinics, hospitals, and pharma companies trust us for branded materials, gifts, and premium stationery." },
  { name: "Real Estate", desc: "Developers and agencies use our exhibition materials, premium brochures, and corporate gift solutions." },
  { name: "Events", desc: "Award ceremonies, conferences, and launches rely on our trophies, medals, branded gifts, and signage." },
  { name: "Education", desc: "Universities and schools commission graduation gifts, plaques, and premium branded communications." },
  { name: "Luxury Brands", desc: "Luxury houses work with us for bespoke packaging, limited-edition gifts, and premium branded materials." },
  { name: "Construction", desc: "Construction and engineering firms rely on our branded merchandise, safety awards, and site signage." },
];

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="industries" ref={ref} className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#C8A96A]" />
              <span className="label text-[#C8A96A]">Who We Serve</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="heading-display text-[#111]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Industries
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-text max-w-xs text-right hidden lg:block"
          >
            Trusted by organisations across every major sector in the UAE & GCC.
          </motion.p>
        </div>

        {/* Industry accordion list */}
        <div className="border-t border-[#ECECEC]">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="border-b border-[#ECECEC]"
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between py-5 lg:py-7 group text-left"
              >
                <div className="flex items-center gap-5 lg:gap-10">
                  <span className="label text-[#C8A96A] w-6">{String(i + 1).padStart(2, "0")}</span>
                  <h3
                    className="heading-display text-[#111] group-hover:text-[#C8A96A] transition-colors duration-300"
                    style={{ fontSize: "clamp(1.3rem, 3vw, 3rem)" }}
                  >
                    {ind.name}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: active === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="label text-[#C8A96A] text-xl flex-shrink-0"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-7 pl-11 lg:pl-[4.5rem]">
                      <p className="body-text max-w-xl">{ind.desc}</p>
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
