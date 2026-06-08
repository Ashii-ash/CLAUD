"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const taglineOpacity = useTransform(scrollY, [80, 280], [1, 0]);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-5 lg:px-8 h-[60px] bg-white/95 backdrop-blur-sm">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-[#0A0A0A] text-white px-5 py-3 text-[0.7rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#C6A36A] transition-colors duration-300"
        >
          <span className="flex flex-col gap-[4px]">
            <span className={`block w-4 h-px bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block w-4 h-px bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-px bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </span>
          <span className="hidden sm:inline">Menu</span>
        </button>

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

        <a
          href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20gifting%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border-2 border-[#0A0A0A] text-[#0A0A0A] px-5 lg:px-7 py-3 text-[0.7rem] tracking-[0.2em] uppercase font-semibold hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 group"
        >
          <span className="hidden sm:inline">Begin a Project</span>
          <span className="sm:hidden">Enquire</span>
          <span className="text-base leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </nav>

      {/* Menu overlay: z-[55] — above MELIZ overlay (z-45) and hero crystal, below navbar (z-[60]) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-white flex flex-col px-8 lg:px-20 pt-[60px] pb-8 justify-evenly"
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
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 + i * 0.06 }}
                onClick={() => go(l.href)}
                className="display-text text-[clamp(2rem,7vh,7rem)] text-[#0A0A0A] text-left hover:text-[#C6A36A] transition-colors duration-300 border-b border-black/5 leading-tight"
              >
                {l.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-8"
            >
              <a href="tel:+971503458369" className="body-label hover:text-[#C6A36A] transition-colors">+971 50 345 8369</a>
              <a href="mailto:info@meliz.ae" className="body-label hover:text-[#C6A36A] transition-colors">info@meliz.ae</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
