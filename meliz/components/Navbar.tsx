"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  // Fade out center tagline as MELIZ scrolls in to take its place
  const taglineOpacity = useTransform(scrollY, [80, 280], [1, 0]);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 lg:px-8 h-[60px] bg-white/95 backdrop-blur-sm">
        {/* Left: hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-[#0A0A0A] text-white px-4 py-2.5 text-[0.6rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#C6A36A] transition-colors duration-300"
        >
          <span className="flex flex-col gap-[4px]">
            <span className={`block w-4 h-px bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block w-4 h-px bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-px bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </span>
          <span className="hidden sm:inline">Menu</span>
        </button>

        {/* Center: tagline fades out as MELIZ scrolls in */}
        <motion.div
          style={{ opacity: taglineOpacity }}
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
        >
          <p className="body-label hidden md:block leading-tight">
            Luxury Gifting<br />
            <span className="text-[#C6A36A]">Dubai, UAE</span>
          </p>
          <p className="body-label md:hidden text-[0.55rem]">MELIZ · Dubai</p>
        </motion.div>

        {/* Right: CTA */}
        <a
          href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20gifting%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border border-[#0A0A0A] text-[#0A0A0A] px-4 lg:px-6 py-2.5 text-[0.6rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 group"
        >
          <span className="hidden sm:inline">Begin a Project</span>
          <span className="sm:hidden">Enquire</span>
          <span className="text-base leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </nav>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center px-8 lg:px-20 pt-[60px]"
          >
            {[
              { label: "About", href: "#about" },
              { label: "Collections", href: "#collections" },
              { label: "Projects", href: "#projects" },
              { label: "Process", href: "#process" },
              { label: "Contact", href: "#contact" },
            ].map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07 }}
                onClick={() => go(l.href)}
                className="display-text text-[clamp(3rem,10vw,9rem)] text-[#0A0A0A] text-left hover:text-[#C6A36A] transition-colors duration-300 border-b border-black/5 py-3 block"
              >
                {l.label}
              </motion.button>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              className="mt-10 flex items-center gap-8">
              <a href="tel:+971503458369" className="body-label hover:text-[#C6A36A] transition-colors">+971 50 345 8369</a>
              <a href="mailto:info@meliz.ae" className="body-label hover:text-[#C6A36A] transition-colors">info@meliz.ae</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
