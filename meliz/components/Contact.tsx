"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hello MELIZ,\n\nMy name is ${form.name}.\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`);
    window.open(`https://wa.me/971503458369?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" ref={ref} className="relative bg-[#060606] py-32 lg:py-48 overflow-hidden">
      <div className="absolute top-16 right-8 lg:right-16 text-[0.5rem] tracking-[0.5em] uppercase text-white/10 font-light">07</div>

      {/* Background geometry */}
      <div className="absolute bottom-0 right-0 w-[40vw] h-[60vh] border-t border-l border-white/[0.03] pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-[38vw] h-[58vh] border-t border-l border-[#C6A36A]/[0.04] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="mb-20 lg:mb-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-[#C6A36A]" />
            <span className="text-[0.5rem] tracking-[0.55em] uppercase text-[#C6A36A] font-light">Begin a Commission</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-light text-white leading-[1.0] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Start the <em className="text-[#C6A36A]">Conversation.</em>
            </motion.h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 lg:gap-32">
          {/* Left: details */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-white/30 text-[0.85rem] leading-relaxed font-light mb-16 max-w-[320px]">
              Every extraordinary space begins with a conversation. Contact our team to discuss your project — no matter the scale, we are ready to listen.
            </p>

            <div className="space-y-10">
              {[
                { label: "Phone & WhatsApp", val: "+971 50 345 8369", href: "tel:+971503458369" },
                { label: "Email", val: "info@meliz.ae", href: "mailto:info@meliz.ae" },
                { label: "Website", val: "www.meliz.ae", href: "https://www.meliz.ae" },
              ].map(item => (
                <div key={item.label} className="group">
                  <div className="text-[0.45rem] tracking-[0.5em] uppercase text-white/20 font-light mb-2">{item.label}</div>
                  <a href={item.href} className="text-white/50 text-sm font-light hover:text-[#C6A36A] transition-colors duration-300">{item.val}</a>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-white/[0.05]">
              <a href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-4 text-[0.6rem] tracking-[0.35em] uppercase font-light bg-[#C6A36A] text-[#080808] px-8 py-4 hover:bg-[#b5935a] transition-colors duration-300">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Open WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form onSubmit={submit}
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8">
            {[
              { name: "name", label: "Full Name", type: "text", ph: "Your name" },
              { name: "email", label: "Email", type: "email", ph: "your@email.com" },
              { name: "phone", label: "Phone", type: "tel", ph: "+971 XX XXX XXXX" },
            ].map(f => (
              <div key={f.name} className="border-b border-white/[0.08] focus-within:border-[#C6A36A]/40 transition-colors duration-300 pb-4 group">
                <label className="block text-[0.45rem] tracking-[0.5em] uppercase text-white/20 font-light mb-3">{f.label}</label>
                <input type={f.type} name={f.name} placeholder={f.ph}
                  value={form[f.name as keyof typeof form]} onChange={change}
                  className="w-full bg-transparent text-white/70 text-[0.85rem] font-light placeholder-white/15 focus:outline-none focus:text-white transition-colors duration-300" />
              </div>
            ))}
            <div className="border-b border-white/[0.08] focus-within:border-[#C6A36A]/40 transition-colors duration-300 pb-4">
              <label className="block text-[0.45rem] tracking-[0.5em] uppercase text-white/20 font-light mb-3">Project Brief</label>
              <textarea name="message" rows={4} placeholder="Describe your project, space, and vision..."
                value={form.message} onChange={change}
                className="w-full bg-transparent text-white/70 text-[0.85rem] font-light placeholder-white/15 focus:outline-none resize-none focus:text-white transition-colors duration-300" />
            </div>
            <button type="submit"
              className="w-full text-[0.6rem] tracking-[0.35em] uppercase font-light bg-[#C6A36A] text-[#080808] py-4 hover:bg-[#b5935a] transition-colors duration-300 mt-4">
              Send Enquiry via WhatsApp
            </button>
            <p className="text-white/15 text-[0.65rem] text-center font-light">Your message will open in WhatsApp.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
