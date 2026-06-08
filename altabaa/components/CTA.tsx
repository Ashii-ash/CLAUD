"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="bg-[#C8A96A] py-24 lg:py-40 overflow-hidden relative">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-[#111]" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-[#111]" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-[#111]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-[#111]" />
      </div>

      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-3 mb-8 lg:justify-center"
          >
            <span className="w-6 h-px bg-[#111]/40" />
            <span className="label text-[#111]/60">Ready to Begin?</span>
            <span className="w-6 h-px bg-[#111]/40" />
          </motion.div>

          <div className="overflow-hidden mb-3">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="heading-display text-[#111]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 9rem)" }}
            >
              Let&apos;s Build Something
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              className="heading-display text-[#111] italic"
              style={{ fontSize: "clamp(2.5rem, 7vw, 9rem)" }}
            >
              Extraordinary.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="body-text text-[#111]/70 max-w-xl lg:text-center mb-12"
          >
            20+ years of precision manufacturing. 500+ trusted clients. One commitment — to make your brand unforgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://wa.me/971503458369?text=Hello%20Al%20Tabaa%20Cards%2C%20I%20would%20like%20to%20start%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#111] text-white px-10 py-5 label font-semibold text-[0.65rem] hover:bg-white hover:text-[#111] transition-colors duration-300 group"
            >
              Start Your Project
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <a
              href="tel:+97165652000"
              className="inline-flex items-center gap-3 border border-[#111]/30 text-[#111] px-10 py-5 label text-[0.65rem] hover:bg-[#111] hover:text-white transition-colors duration-300"
            >
              Call Us: +971 6 565 2000
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
