"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Consultation",
    desc: "We begin with a deep understanding of your brief — your brand, audience, deadline, and the impression you need to create.",
  },
  {
    n: "02",
    title: "Design",
    desc: "Our in-house creative team develops concepts, mockups, and material proposals tailored to your specifications.",
  },
  {
    n: "03",
    title: "Prototype",
    desc: "A physical sample is produced for your approval before full production begins — no surprises, only certainty.",
  },
  {
    n: "04",
    title: "Production",
    desc: "Full-scale manufacturing using premium materials and precision equipment — entirely within our Sharjah facility.",
  },
  {
    n: "05",
    title: "Quality Control",
    desc: "Every unit passes through rigorous quality inspection. We maintain zero-tolerance standards on finishing and accuracy.",
  },
  {
    n: "06",
    title: "Delivery",
    desc: "Careful packaging and reliable delivery across the UAE and GCC — your order arrives on time, in perfect condition.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#C8A96A]" />
              <span className="label text-[#C8A96A]">How We Work</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="heading-display text-[#111]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Manufacturing
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                className="heading-display text-[#111] italic"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Process.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-text max-w-xs text-right hidden lg:block"
          >
            From first conversation to final delivery — a process built for precision.
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-[39px] lg:left-[79px] top-0 bottom-0 w-px bg-[#ECECEC]">
            <motion.div
              style={{ height: lineH }}
              className="w-full bg-gradient-to-b from-[#C8A96A] to-[#8E6A3B]"
            />
          </div>

          <div className="space-y-0">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="relative flex gap-8 lg:gap-16 items-start pb-12 lg:pb-16 group"
              >
                {/* Node */}
                <div className="flex-shrink-0 w-20 lg:w-40 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="w-5 h-5 rounded-full border-2 border-[#C8A96A] bg-white group-hover:bg-[#C8A96A] transition-colors duration-300 relative z-10 mt-1"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pb-0">
                  <span className="label text-[#C8A96A] mb-2 block">{s.n}</span>
                  <h3
                    className="heading-display text-[#111] group-hover:text-[#C8A96A] transition-colors duration-300 mb-3 leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="body-text max-w-lg">{s.desc}</p>
                </div>

                {/* Step number large bg */}
                <div
                  className="hidden lg:block heading-display text-[#111]/4 leading-none flex-shrink-0 self-start"
                  style={{ fontSize: "6rem" }}
                >
                  {s.n}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
