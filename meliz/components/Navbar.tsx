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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#111111]/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none group">
            <span
              className="font-display text-2xl font-semibold tracking-[0.15em] text-white transition-colors group-hover:text-[#C6A36A]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              MELIZ
            </span>
            <span className="text-[0.55rem] tracking-[0.35em] text-[#C6A36A] uppercase font-medium mt-0.5">
              Luxury Division
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-[0.7rem] tracking-[0.25em] uppercase text-white/70 hover:text-[#C6A36A] transition-colors duration-300 font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.65rem] tracking-[0.25em] uppercase font-semibold bg-[#C6A36A] text-[#111111] px-6 py-2.5 hover:bg-[#b5935a] transition-colors duration-300"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-[#C6A36A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#111111] flex flex-col justify-center items-center gap-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => handleNav(link.href)}
                className="text-2xl tracking-[0.2em] uppercase text-white hover:text-[#C6A36A] transition-colors font-display"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.75rem] tracking-[0.3em] uppercase font-semibold bg-[#C6A36A] text-[#111111] px-10 py-4 mt-4"
            >
              Enquire Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
