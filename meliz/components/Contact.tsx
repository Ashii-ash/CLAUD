"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello MELIZ,\n\nMy name is ${form.name}.\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    window.open(`https://wa.me/971503458369?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" ref={ref} className="py-32 lg:py-40 bg-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left: Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px bg-[#C6A36A]" />
              <span className="text-[0.6rem] tracking-[0.45em] uppercase text-[#C6A36A] font-medium">
                Get in Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-light text-white leading-[1.1] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Begin Your
              <br />
              <span className="italic text-[#C6A36A]">Commission.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/45 text-sm leading-relaxed mb-14"
            >
              Every extraordinary space begins with a conversation. Contact our team to discuss your project — no matter the scale, we are ready to listen.
            </motion.p>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              {[
                {
                  label: "Phone & WhatsApp",
                  value: "+971 50 345 8369",
                  href: "tel:+971503458369",
                },
                {
                  label: "Email",
                  value: "info@meliz.ae",
                  href: "mailto:info@meliz.ae",
                },
                {
                  label: "Website",
                  value: "www.meliz.ae",
                  href: "https://www.meliz.ae",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-6 items-start group">
                  <div className="w-px h-10 bg-[#C6A36A]/30 mt-1 flex-shrink-0 group-hover:bg-[#C6A36A]/70 transition-colors duration-300" />
                  <div>
                    <div className="text-[0.55rem] tracking-[0.4em] uppercase text-white/30 font-medium mb-1">
                      {item.label}
                    </div>
                    <a
                      href={item.href}
                      className="text-white/70 hover:text-[#C6A36A] transition-colors duration-300 text-sm font-medium"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12"
            >
              <a
                href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.25em] uppercase font-semibold bg-[#C6A36A] text-[#111111] px-8 py-4 hover:bg-[#b5935a] transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Open WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                { name: "phone", label: "Phone Number", type: "tel", placeholder: "+971 XX XXX XXXX" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[0.6rem] tracking-[0.35em] uppercase text-white/40 font-medium mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 px-5 py-4 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#C6A36A]/50 transition-colors duration-300"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[0.6rem] tracking-[0.35em] uppercase text-white/40 font-medium mb-2">
                  Project Brief
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Describe your project, space, and vision..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 px-5 py-4 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#C6A36A]/50 transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full text-[0.7rem] tracking-[0.3em] uppercase font-semibold bg-[#C6A36A] text-[#111111] py-4 hover:bg-[#b5935a] transition-colors duration-300"
              >
                Send Enquiry via WhatsApp
              </button>

              <p className="text-white/25 text-xs text-center">
                Your message will be sent securely via WhatsApp.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
