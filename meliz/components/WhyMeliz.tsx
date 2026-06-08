"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  { n: "01", title: "Elite Gifting", desc: "Exclusive gifting experiences crafted for those who demand nothing less than extraordinary." },
  { n: "02", title: "Corporate Gifts", desc: "Sophisticated corporate gifting solutions that leave a lasting impression on every recipient." },
  { n: "03", title: "Luxury Gift Sets", desc: "Meticulously curated gift sets combining the finest products in stunning presentation." },
  { n: "04", title: "Signature Gifts", desc: "One-of-a-kind creations personalised to perfection — gifts that exist nowhere else in the world." },
  { n: "05", title: "Gift Hampers", desc: "Premium hampers filled with handpicked luxury goods, beautifully arranged for any occasion." },
  { n: "06", title: "Premium Packaging", desc: "Artisan packaging and presentation that elevates every gift into an unforgettable unboxing moment." },
];

export default function WhyMeliz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="why" ref={ref} className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Headline row */}
      <div className="flex-shrink-0 pt-[60px] pb-12 lg:pb-16 px-5 lg:px-8 border-b border-black/8 flex items-end justify-between">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display-text"
            style={{ fontSize: "clamp(2.5rem, 8vw, 9rem)" }}
          >
            Why MELIZ
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="body-label max-w-[200px] text-right hidden lg:block"
        >
          A standard without compromise. Dubai&apos;s most trusted luxury gifting brand.
        </motion.p>
      </div>

      {/* Pillars grid: 2 cols × 3 rows on mobile, 3 cols × 2 rows on desktop */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2">
        {pillars.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            className="border-r border-b border-black/8 p-6 lg:p-8 flex flex-col justify-between group hover:bg-[#faf8f4] transition-colors duration-300"
          >
            <div>
              <div className="body-label mb-4 text-[#C6A36A]">{p.n}</div>
              <h3
                className="display-text text-[#0A0A0A] group-hover:text-[#C6A36A] transition-colors duration-300 leading-tight"
                style={{ fontSize: "clamp(1rem, 2.2vw, 1.8rem)" }}
              >
                {p.title}
              </h3>
            </div>
            <p className="body-label leading-relaxed hidden lg:block mt-4">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
