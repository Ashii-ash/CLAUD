"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "Al Tabaa Cards transformed our National Day gifting programme entirely. The quality of their packaging and branded gifts was exceptional — every recipient was genuinely impressed.",
    name: "Ahmed Al Mansouri",
    role: "Procurement Director, UAE Government Entity",
    industry: "Government",
  },
  {
    quote: "We've worked with many print suppliers in the UAE. None match Al Tabaa's consistency, attention to detail, and speed of delivery. They are simply the best in the region.",
    name: "Sarah Mitchell",
    role: "Brand Manager, Leading Telecom Group",
    industry: "Corporate",
  },
  {
    quote: "Our Ramadan gift sets were stunning. The craftsmanship, the packaging, the personalisation — everything was handled with absolute care. Our clients were blown away.",
    name: "Omar Khalil",
    role: "Director of Guest Relations, Luxury Hotel Group",
    industry: "Hospitality",
  },
  {
    quote: "Al Tabaa designed and produced our entire award collection for the regional ceremony. Crystal, acrylic, and metal pieces — all flawlessly executed. Exceptional partner.",
    name: "Leila Hassan",
    role: "Events Director, Regional Awards Ceremony",
    industry: "Events",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="testimonials" ref={ref} className="bg-[#111] py-20 lg:py-32 overflow-hidden">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#C8A96A]" />
              <span className="label text-[#C8A96A]">Client Voices</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="heading-display text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                What Clients
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                className="heading-display text-[#C8A96A] italic"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Say.
              </motion.h2>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8 border border-white/8">
          {/* Quote area */}
          <div className="p-8 lg:p-14 border-r border-white/8 flex flex-col justify-between min-h-[360px]">
            <div className="text-[#C8A96A] heading-display text-6xl opacity-40 mb-6 leading-none">&ldquo;</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote
                  className="heading-display text-white leading-[1.2] mb-8"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 2rem)" }}
                >
                  {TESTIMONIALS[active].quote}
                </blockquote>
                <div>
                  <p className="label text-[#C8A96A]">{TESTIMONIALS[active].name}</p>
                  <p className="label text-white/40 mt-1">{TESTIMONIALS[active].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mt-10 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex-1 h-px relative overflow-hidden bg-white/10"
                >
                  {active === i && (
                    <motion.div
                      className="absolute inset-0 bg-[#C8A96A]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation sidebar */}
          <div className="flex flex-row lg:flex-col">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-1 p-5 text-left border-b border-white/8 last:border-b-0 transition-colors duration-300 ${
                  active === i ? "bg-white/5" : "hover:bg-white/3"
                }`}
              >
                <div
                  className={`w-4 h-px mb-3 transition-all duration-300 ${active === i ? "bg-[#C8A96A] w-6" : "bg-white/20"}`}
                />
                <p className="label text-[#C8A96A] text-[0.5rem] mb-0.5 hidden lg:block">{t.industry}</p>
                <p className={`label text-[0.55rem] transition-colors duration-300 hidden lg:block ${active === i ? "text-white" : "text-white/30"}`}>
                  {t.name}
                </p>
                <p className="label text-white/30 hidden sm:block lg:hidden">{String(i + 1).padStart(2, "0")}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
