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
    <section id="contact" ref={ref} className="bg-white border-t border-black/8 overflow-hidden">

      {/* Headline */}
      <div className="overflow-hidden py-20 lg:py-32 px-5 lg:px-8 border-b border-black/8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="display-text"
              style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}
            >
              Begin a Commission
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="body-label max-w-[220px] lg:text-right"
          >
            Every extraordinary space begins with a conversation.
          </motion.p>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-2 border-b border-black/8">
        {/* Left: contact info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="px-5 lg:px-8 py-16 lg:py-24 border-b lg:border-b-0 lg:border-r border-black/8"
        >
          <div className="space-y-10 mb-16">
            {[
              { l: "Phone & WhatsApp", v: "+971 50 345 8369", h: "tel:+971503458369" },
              { l: "Email", v: "info@meliz.ae", h: "mailto:info@meliz.ae" },
              { l: "Website", v: "www.meliz.ae", h: "https://www.meliz.ae" },
            ].map(item => (
              <div key={item.l}>
                <div className="body-label mb-2 text-[#C6A36A]">{item.l}</div>
                <a href={item.h} className="display-text text-[#0A0A0A] hover:text-[#C6A36A] transition-colors duration-300"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 2rem)" }}>
                  {item.v}
                </a>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/971503458369?text=Hello%20MELIZ%2C%20I%20would%20like%20to%20discuss%20a%20luxury%20crystal%20or%20glass%20project."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-8 py-4 body-label font-semibold hover:bg-[#C6A36A] transition-colors duration-300 text-white"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Open WhatsApp
          </a>
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="px-5 lg:px-8 py-16 lg:py-24 space-y-8"
        >
          {[
            { n: "name", l: "Full Name", t: "text", p: "Your name" },
            { n: "email", l: "Email", t: "email", p: "your@email.com" },
            { n: "phone", l: "Phone", t: "tel", p: "+971 XX XXX XXXX" },
          ].map(f => (
            <div key={f.n} className="border-b border-black/10 pb-4 group focus-within:border-[#C6A36A] transition-colors duration-300">
              <label className="body-label block mb-3 text-[#C6A36A]">{f.l}</label>
              <input type={f.t} name={f.n} placeholder={f.p}
                value={form[f.n as keyof typeof form]} onChange={change}
                className="w-full bg-transparent body-label text-[#0A0A0A] placeholder-black/20 focus:outline-none text-sm tracking-wide" />
            </div>
          ))}
          <div className="border-b border-black/10 pb-4 focus-within:border-[#C6A36A] transition-colors duration-300">
            <label className="body-label block mb-3 text-[#C6A36A]">Project Brief</label>
            <textarea name="message" rows={4} placeholder="Describe your project, space, and vision..."
              value={form.message} onChange={change}
              className="w-full bg-transparent body-label text-[#0A0A0A] placeholder-black/20 focus:outline-none resize-none text-sm tracking-wide" />
          </div>
          <button type="submit"
            className="w-full bg-[#0A0A0A] text-white body-label font-semibold py-4 hover:bg-[#C6A36A] transition-colors duration-300">
            Send Enquiry via WhatsApp →
          </button>
        </motion.form>
      </div>
    </section>
  );
}
