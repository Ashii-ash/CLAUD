"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    quote: "MELIZ transformed our Palm Jumeirah villa with a bespoke crystal installation that simply cannot be replicated. The craftsmanship, the attention to detail, the service — extraordinary on every level.",
    name: "Private Client",
    role: "Villa Owner, Palm Jumeirah",
    initial: "A",
  },
  {
    quote: "As an interior designer, I demand suppliers who understand the difference between decoration and design. MELIZ understands it completely. Their input elevated the entire project.",
    name: "Design Professional",
    role: "Principal Interior Designer, Dubai",
    initial: "S",
  },
  {
    quote: "The architectural glass facade MELIZ created for our DIFC headquarters has become an icon of the building. We continue to receive compliments from visiting clients and dignitaries.",
    name: "Corporate Client",
    role: "Director, DIFC Corporation",
    initial: "F",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" ref={ref} className="py-32 lg:py-40 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,163,106,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-8 h-px bg-[#C6A36A]" />
          <span className="text-[0.6rem] tracking-[0.45em] uppercase text-[#C6A36A] font-medium">
            Client Voices
          </span>
          <div className="w-8 h-px bg-[#C6A36A]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light text-white leading-[1.1] mb-20"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Words of the
          <br />
          <span className="italic text-[#C6A36A]">Discerning.</span>
        </motion.h2>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Quote mark */}
          <div
            className="font-display text-[10rem] leading-none text-[#C6A36A]/8 absolute -top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            &#8220;
          </div>

          {/* Active testimonial */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <p
              className="font-display text-xl lg:text-2xl font-light italic text-white/75 leading-relaxed mb-10 max-w-3xl mx-auto"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{testimonials[active].quote}&rdquo;
            </p>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#C6A36A]/15 border border-[#C6A36A]/30 flex items-center justify-center">
                <span
                  className="font-display text-[#C6A36A] font-medium text-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {testimonials[active].initial}
                </span>
              </div>
              <div className="text-[0.7rem] tracking-[0.2em] uppercase text-white/70 font-medium mt-1">
                {testimonials[active].name}
              </div>
              <div className="text-[0.6rem] tracking-[0.2em] text-white/35">
                {testimonials[active].role}
              </div>
            </div>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 ${
                  i === active
                    ? "w-8 h-px bg-[#C6A36A]"
                    : "w-2 h-px bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
