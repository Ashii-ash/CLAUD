"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-[#080808]/90 backdrop-blur-sm" : ""
        }`}
      >
        <div className="px-8 lg:px-16 flex items-center justify-between h-[72px]">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex flex-col">
            <span className="text-white text-sm tracking-[0.4em] font-light uppercase group-hover:text-[#C6A36A] transition-colors duration-500">MELIZ</span>
            <span className="text-[#C6A36A] text-[0.5rem] tracking-[0.6em] uppercase mt-0.5 font-light">Crystal & Glass</span>
          </button>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((l) => (
              <button key={l.label} onClick={() => go(l.href)}
                className="text-[0.6rem] tracking-[0.35em] uppercase text-white/40 hover:text-white transition-colors duration-400 font-light">
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
              target="_blank" rel="noopener noreferrer"
              className="text-[0.6rem] tracking-[0.35em] uppercase text-[#C6A36A] border-b border-[#C6A36A]/40 pb-px hover:border-[#C6A36A] transition-all duration-300 font-light">
              Begin a Project →
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-[5px] p-2">
            <span className={`block h-px bg-white transition-all duration-400 ${menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`} />
            <span className={`block h-px bg-[#C6A36A] transition-all duration-400 ${menuOpen ? "opacity-0 w-4" : "w-4"}`} />
            <span className={`block h-px bg-white transition-all duration-400 ${menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col justify-end pb-16 px-10 lg:hidden">
            <div className="space-y-8">
              {navLinks.map((l, i) => (
                <motion.button key={l.label} onClick={() => go(l.href)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="block text-left text-3xl font-light text-white hover:text-[#C6A36A] transition-colors tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
