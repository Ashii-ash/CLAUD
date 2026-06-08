"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Al Tabaa Cards,\n\nName: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage:\n${form.message}`
    );
    window.open(`https://wa.me/971503458369?text=${msg}`, "_blank");
  };

  const SERVICES = [
    "Corporate Gifts",
    "Luxury Packaging",
    "Awards & Trophies",
    "Premium Printing",
    "Acrylic Fabrication",
    "Branding & Signage",
    "Custom Requirement",
  ];

  return (
    <section id="contact" ref={ref} className="bg-[#F7F7F5] py-20 lg:py-32 overflow-hidden">
      <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#C8A96A]" />
              <span className="label text-[#C8A96A]">Get in Touch</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="heading-display text-[#111]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 7rem)" }}
              >
                Start a
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
                Conversation.
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4 hidden lg:flex"
          >
            {[
              { label: "Phone", value: "+971 6 565 2000", href: "tel:+97165652000" },
              { label: "WhatsApp", value: "+971 50 345 8369", href: "https://wa.me/971503458369" },
              { label: "Email", value: "info@altabaacards.com", href: "mailto:info@altabaacards.com" },
            ].map((c) => (
              <div key={c.label}>
                <p className="label text-[#C8A96A] mb-0.5">{c.label}</p>
                <a href={c.href} className="label text-[#111] hover:text-[#C8A96A] transition-colors duration-200">
                  {c.value}
                </a>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-[#ECECEC]">
          {/* Contact info (mobile) + form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 lg:p-12 flex flex-col gap-8 lg:hidden"
          >
            {[
              { label: "Phone", value: "+971 6 565 2000", href: "tel:+97165652000" },
              { label: "WhatsApp", value: "+971 50 345 8369", href: "https://wa.me/971503458369" },
              { label: "Email", value: "info@altabaacards.com", href: "mailto:info@altabaacards.com" },
              { label: "Address", value: "Sharjah, UAE", href: "#" },
            ].map((c) => (
              <div key={c.label}>
                <p className="label text-[#C8A96A] mb-1">{c.label}</p>
                <a href={c.href} className="label text-[#111] hover:text-[#C8A96A] transition-colors">
                  {c.value}
                </a>
              </div>
            ))}
          </motion.div>

          {/* Left: info block (desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-[#111] p-8 lg:p-14 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div>
                <p className="label text-[#C8A96A] mb-3">Visit Our Facility</p>
                <p className="heading-display text-white text-xl leading-tight">
                  Industrial Area,<br />Sharjah, UAE
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Phone", value: "+971 6 565 2000", href: "tel:+97165652000" },
                  { label: "WhatsApp", value: "+971 50 345 8369", href: "https://wa.me/971503458369" },
                  { label: "Email", value: "info@altabaacards.com", href: "mailto:info@altabaacards.com" },
                  { label: "Hours", value: "Sun–Thu 8am–6pm", href: "#" },
                ].map((c) => (
                  <div key={c.label}>
                    <p className="label text-[#C8A96A] mb-1">{c.label}</p>
                    <a href={c.href} className="label text-white/60 hover:text-[#C8A96A] transition-colors text-[0.6rem] tracking-[0.12em]">
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/971503458369?text=Hello%20Al%20Tabaa%20Cards%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-[#C8A96A] text-[#111] px-8 py-4 label font-semibold text-[0.6rem] hover:bg-white transition-colors duration-300 group self-start"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Open WhatsApp
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 lg:p-14 flex flex-col gap-7"
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                { name: "company", label: "Company", type: "text", placeholder: "Company name" },
                { name: "email", label: "Email", type: "email", placeholder: "email@company.com" },
                { name: "phone", label: "Phone", type: "tel", placeholder: "+971 XX XXX XXXX" },
              ].map((f) => (
                <div
                  key={f.name}
                  className="col-span-2 sm:col-span-1 border-b border-[#ECECEC] pb-4 focus-within:border-[#C8A96A] transition-colors duration-300"
                >
                  <label className="label text-[#C8A96A] block mb-3">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    value={form[f.name as keyof typeof form]}
                    onChange={change}
                    className="w-full bg-transparent label text-[#111] placeholder-[#bbb] focus:outline-none text-[0.65rem] tracking-[0.12em]"
                  />
                </div>
              ))}
            </div>

            <div className="border-b border-[#ECECEC] pb-4 focus-within:border-[#C8A96A] transition-colors duration-300">
              <label className="label text-[#C8A96A] block mb-3">Service Required</label>
              <select
                name="service"
                value={form.service}
                onChange={change}
                className="w-full bg-transparent label text-[#111] focus:outline-none text-[0.65rem] tracking-[0.12em] cursor-pointer"
              >
                <option value="">Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="border-b border-[#ECECEC] pb-4 focus-within:border-[#C8A96A] transition-colors duration-300">
              <label className="label text-[#C8A96A] block mb-3">Project Brief</label>
              <textarea
                name="message"
                rows={5}
                placeholder="Describe your project, quantity, deadline, and any specific requirements..."
                value={form.message}
                onChange={change}
                className="w-full bg-transparent label text-[#111] placeholder-[#bbb] focus:outline-none resize-none text-[0.65rem] tracking-[0.12em]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#111] text-white label font-semibold py-5 hover:bg-[#C8A96A] hover:text-[#111] transition-colors duration-300 flex items-center justify-center gap-3 group"
            >
              Send via WhatsApp
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
