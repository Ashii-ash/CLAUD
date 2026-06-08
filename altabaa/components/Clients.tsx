"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CLIENT_NAMES = [
  "Emirates Group", "DEWA", "Sharjah Government",
  "Emaar Properties", "Dubai Tourism", "Etisalat",
  "Abu Dhabi ADNOC", "Mubadala", "Majid Al Futtaim",
  "Al Habtoor Group", "Rotana Hotels", "Jumeirah Group",
  "DP World", "RAK Ceramics", "Al Futtaim",
  "Abu Dhabi Islamic Bank", "Dubai Islamic Bank", "First Abu Dhabi Bank",
];

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...CLIENT_NAMES, ...CLIENT_NAMES];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="inline-flex gap-0"
      >
        {doubled.map((name, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="heading-display text-[#111] hover:text-[#C8A96A] transition-colors duration-300 cursor-default px-8"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 2.2rem)" }}>
              {name}
            </span>
            <span className="text-[#C8A96A]/40 text-sm">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Clients() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="clients" ref={ref} className="bg-[#F7F7F5] py-20 lg:py-28 overflow-hidden border-t border-[#ECECEC]">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-12 lg:mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="flex items-center gap-3 mb-5"
        >
          <span className="w-6 h-px bg-[#C8A96A]" />
          <span className="label text-[#C8A96A]">Trusted By</span>
        </motion.div>
        <div className="flex items-end justify-between">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="heading-display text-[#111]"
              style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)" }}
            >
              500+ Corporate Clients
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-text hidden lg:block text-right max-w-[260px]"
          >
            From government entities to Fortune 500 companies across the UAE & GCC.
          </motion.p>
        </div>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="space-y-4"
      >
        <div className="py-5 border-t border-b border-[#ECECEC]">
          <Marquee />
        </div>
        <div className="py-5 border-b border-[#ECECEC]">
          <Marquee reverse />
        </div>
      </motion.div>
    </section>
  );
}
