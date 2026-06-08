"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LINKS = {
  Services: ["Corporate Gifts", "Luxury Packaging", "Awards", "Printing", "Acrylic", "Branding"],
  Industries: ["Government", "Corporate", "Hospitality", "Retail", "Events", "Real Estate"],
  Company: ["About", "Projects", "Process", "Industries", "Contact", "Request Quote"],
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="bg-[#111] border-t border-white/8 overflow-hidden">
      {/* Large wordmark */}
      <div className="overflow-hidden border-b border-white/8">
        <motion.div
          initial={{ y: "30%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 lg:px-10 pt-16 pb-0"
        >
          <div
            className="heading-display text-white/8 leading-none select-none"
            style={{ fontSize: "clamp(5rem, 18vw, 22rem)" }}
          >
            Al Tabaa
          </div>
        </motion.div>
      </div>

      {/* Info grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-5 border-b border-white/8"
      >
        {/* Brand column */}
        <div className="col-span-2 lg:col-span-2 px-6 lg:px-10 py-10 border-b lg:border-b-0 border-r border-white/8">
          <div className="mb-5">
            <p className="heading-display text-white text-xl mb-0.5">Al Tabaa Cards</p>
            <p className="label text-white/30">Sharjah, UAE · Est. 2000</p>
          </div>
          <p className="label text-white/40 leading-relaxed max-w-xs mb-8">
            The UAE&apos;s premier manufacturer of premium printing, luxury packaging, corporate gifts, awards, and branding solutions.
          </p>
          <a
            href="https://wa.me/971503458369?text=Hello%20Al%20Tabaa%20Cards"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 label text-[#C8A96A] hover:text-white transition-colors duration-200 group"
          >
            WhatsApp Us
            <span className="w-4 h-px bg-current group-hover:w-6 transition-all duration-300" />
          </a>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([cat, links]) => (
          <div key={cat} className="px-6 lg:px-8 py-10 border-r border-white/8 last:border-r-0">
            <p className="label text-[#C8A96A] mb-5">{cat}</p>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="label text-white/40 hover:text-white transition-colors duration-200 text-[0.6rem] tracking-[0.12em]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <div className="px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/8">
        <p className="label text-white/30 text-[0.55rem]">
          © 2026 Al Tabaa Cards — Al Tabaa Advertising Materials LLC. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="tel:+97165652000" className="label text-white/30 hover:text-[#C8A96A] transition-colors text-[0.55rem]">
            +971 6 565 2000
          </a>
          <a href="mailto:info@altabaacards.com" className="label text-white/30 hover:text-[#C8A96A] transition-colors text-[0.55rem]">
            info@altabaacards.com
          </a>
        </div>
      </div>
    </footer>
  );
}
