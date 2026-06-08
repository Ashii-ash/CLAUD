"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="bg-white border-t border-black/8">
      {/* Large MELIZ text at bottom */}
      <div className="overflow-hidden border-b border-black/8">
        <motion.div
          initial={{ y: "30%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="px-5 lg:px-8 pt-16 pb-0"
        >
          <div
            className="display-text text-[#0A0A0A] leading-none"
            style={{ fontSize: "clamp(5rem, 18vw, 22rem)" }}
          >
            MELIZ
          </div>
        </motion.div>
      </div>

      {/* Info row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 border-b border-black/8"
      >
        <div className="px-5 lg:px-8 py-10 border-r border-black/8">
          <div className="body-label text-[#C6A36A] mb-3">Tagline</div>
          <div className="body-label text-[#0A0A0A] font-semibold">Crafted Beyond Glass.</div>
        </div>
        <div className="px-5 lg:px-8 py-10 border-r border-black/8">
          <div className="body-label text-[#C6A36A] mb-3">Contact</div>
          <a href="tel:+971503458369" className="body-label block hover:text-[#C6A36A] transition-colors">+971 50 345 8369</a>
          <a href="mailto:info@meliz.ae" className="body-label block hover:text-[#C6A36A] transition-colors">info@meliz.ae</a>
        </div>
        <div className="px-5 lg:px-8 py-10 border-r border-black/8">
          <div className="body-label text-[#C6A36A] mb-3">Collections</div>
          {["Bespoke Crystal", "Luxury Glass", "Architectural Features", "Premium Mirrors"].map(c => (
            <div key={c} className="body-label">{c}</div>
          ))}
        </div>
        <div className="px-5 lg:px-8 py-10">
          <div className="body-label text-[#C6A36A] mb-3">About</div>
          <div className="body-label">A Luxury Division of ATATC</div>
          <div className="body-label">Dubai, UAE</div>
          <a href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
            target="_blank" rel="noopener noreferrer"
            className="body-label text-[#C6A36A] hover:underline mt-4 block">
            WhatsApp Us →
          </a>
        </div>
      </motion.div>

      <div className="px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="body-label">© 2024 MELIZ — Al Tabaa Advertising Materials LLC. All rights reserved.</div>
        <div className="body-label">www.meliz.ae</div>
      </div>
    </footer>
  );
}
