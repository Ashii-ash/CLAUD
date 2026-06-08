"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Awards", href: "#awards" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,0.97)"]);
  const navBorder = useTransform(scrollY, [0, 60], ["rgba(236,236,236,0)", "rgba(236,236,236,1)"]);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <motion.nav
        style={{ backgroundColor: navBg, borderBottomColor: navBorder, boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.04)" : "none" }}
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 lg:px-10 h-[72px] border-b backdrop-blur-sm transition-shadow duration-300"
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col leading-none group"
        >
          <span className="heading-display text-[#111] text-[1.15rem] tracking-tight group-hover:text-[#C8A96A] transition-colors duration-300">
            Al Tabaa
          </span>
          <span className="label text-[0.55rem] tracking-[0.22em] text-[#888] mt-0.5">
            Cards · Sharjah, UAE
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.slice(0, 5).map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.href)}
              className="label text-[#888] hover:text-[#111] transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C8A96A] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/971503458369?text=Hello%20Al%20Tabaa%20Cards%2C%20I%20would%20like%20to%20start%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 label font-semibold text-[0.6rem] hover:bg-[#C8A96A] transition-colors duration-300 group"
          >
            Start a Project
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-[5px] p-2 group lg:hidden"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>

          {/* Desktop hamburger for full menu */}
          <button
            onClick={() => setOpen(!open)}
            className="hidden lg:flex flex-col gap-[5px] p-2 group"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] bg-[#111] flex flex-col px-6 lg:px-20 pt-[72px]"
          >
            <div className="flex-1 flex flex-col justify-center gap-2 py-10">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  onClick={() => go(l.href)}
                  className="heading-display text-white text-left leading-none py-4 border-b border-white/8 hover:text-[#C8A96A] transition-colors duration-300 group flex items-center justify-between"
                  style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
                >
                  <span>{l.label}</span>
                  <span className="label text-white/30 group-hover:text-[#C8A96A] transition-colors text-right text-[0.55rem] hidden lg:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <a href="tel:+97165652000" className="label text-white/50 hover:text-[#C8A96A] transition-colors">
                +971 6 565 2000
              </a>
              <a href="mailto:info@altabaacards.com" className="label text-white/50 hover:text-[#C8A96A] transition-colors">
                info@altabaacards.com
              </a>
              <span className="label text-white/30">Sharjah, UAE</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
