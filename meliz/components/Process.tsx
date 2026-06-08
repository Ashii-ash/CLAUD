"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "We begin with an in-depth understanding of your space, vision, and aspirations. Our design consultants listen before they speak.",
  },
  {
    number: "02",
    title: "Concept Design",
    description: "Our designers translate your vision into precise concepts — exploring form, light, and material before a single piece is made.",
  },
  {
    number: "03",
    title: "Material Selection",
    description: "We source only the finest crystals and specialty glass from the world's most respected producers, chosen specifically for your project.",
  },
  {
    number: "04",
    title: "Production",
    description: "Our master craftsmen bring the approved design to life using a combination of traditional technique and precision engineering.",
  },
  {
    number: "05",
    title: "Installation",
    description: "Our specialist installation team delivers and places every element with care, ensuring the finished result matches the original vision exactly.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" ref={ref} className="py-32 lg:py-40 bg-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* Left: Header + Visual */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px bg-[#C6A36A]" />
              <span className="text-[0.6rem] tracking-[0.45em] uppercase text-[#C6A36A] font-medium">
                Our Process
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light text-white leading-[1.1] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              From Vision
              <br />
              <span className="italic text-[#C6A36A]">to Reality.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/45 text-sm leading-relaxed mb-12"
            >
              A MELIZ project is a journey — methodical, considered, and entirely dedicated to realising your vision with unwavering precision.
            </motion.p>

            {/* Process visual placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="luxury-placeholder aspect-[3/4] max-w-sm relative"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-px bg-[#C6A36A]/30" />
                <span className="text-[0.5rem] tracking-[0.4em] uppercase text-[#C6A36A]/40 mt-2">
                  Process Photography
                </span>
                <div className="w-10 h-px bg-[#C6A36A]/30 mt-2" />
              </div>
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#C6A36A]/25" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#C6A36A]/25" />
            </motion.div>
          </div>

          {/* Right: Steps */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                className="group"
              >
                <div className="flex gap-8 py-10 border-b border-white/8 group-hover:border-[#C6A36A]/25 transition-colors duration-400">
                  {/* Step number */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                      className="font-display text-3xl font-light text-white/15 group-hover:text-[#C6A36A]/40 transition-colors duration-400"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {step.number}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 mt-4 bg-gradient-to-b from-white/10 to-transparent min-h-8" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <h3
                      className="font-display text-xl font-medium text-white mb-3 group-hover:text-[#C6A36A] transition-colors duration-300"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
