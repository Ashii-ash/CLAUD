"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="bg-[#0a0a0a] border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="mb-4">
              <div
                className="font-display text-3xl font-semibold tracking-[0.15em] text-white mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                MELIZ
              </div>
              <div className="text-[0.55rem] tracking-[0.4em] text-[#C6A36A] uppercase font-medium">
                Luxury Division
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              Bespoke crystal and luxury architectural creations designed for extraordinary spaces. A luxury division of ATATC.
            </p>
            <div className="text-[0.6rem] tracking-[0.35em] uppercase text-white/25 font-medium">
              Crafted Beyond Glass.
            </div>
          </motion.div>

          {/* Collections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-[0.6rem] tracking-[0.4em] uppercase text-[#C6A36A] font-medium mb-6">
              Collections
            </div>
            <ul className="space-y-3">
              {[
                "Bespoke Crystal",
                "Luxury Glass",
                "Decorative Installations",
                "Architectural Features",
                "Premium Mirrors",
                "Signature Commissions",
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/40 text-xs hover:text-white/70 transition-colors duration-300 cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-[0.6rem] tracking-[0.4em] uppercase text-[#C6A36A] font-medium mb-6">
              Contact
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+971503458369"
                  className="text-white/40 text-xs hover:text-[#C6A36A] transition-colors duration-300 block"
                >
                  +971 50 345 8369
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@meliz.ae"
                  className="text-white/40 text-xs hover:text-[#C6A36A] transition-colors duration-300 block"
                >
                  info@meliz.ae
                </a>
              </li>
              <li>
                <a
                  href="https://www.meliz.ae"
                  className="text-white/40 text-xs hover:text-[#C6A36A] transition-colors duration-300 block"
                >
                  www.meliz.ae
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.6rem] tracking-[0.25em] uppercase font-semibold text-[#C6A36A] hover:text-white transition-colors duration-300"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[0.6rem] tracking-[0.2em] text-white/20">
            © 2024 MELIZ — A Luxury Division of ATATC. All rights reserved.
          </div>
          <div className="text-[0.6rem] tracking-[0.2em] text-white/15">
            Al Tabaa Advertising Materials LLC · Dubai, UAE
          </div>
        </div>
      </div>
    </footer>
  );
}
