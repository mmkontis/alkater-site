"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { InnerPageLayout } from "@/components/landing/InnerPageLayout";
import { Mail, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "alkater2024@outlook.com", href: "mailto:alkater2024@outlook.com" },
  { icon: Phone, label: "Τηλεφωνο", value: "+30 26650 XXXXX", href: "tel:+3026650XXXXX" },
  { icon: MapPin, label: "Εδρα", value: "Ηγουμενίτσα, Θεσπρωτία" },
  { icon: Clock, label: "Ωραριο", value: "Δευ - Παρ: 07:00 - 17:00" },
];

export default function ContactPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "setTheme", tiles: "dark", filter: "none" },
        "*"
      );
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <InnerPageLayout>
      {/* Hero with Map Background */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden min-h-[60vh] flex items-end">
        {/* Map background */}
        <div className="absolute inset-0 z-0">
          <iframe
            ref={iframeRef}
            src="/map.html"
            className="w-full h-full border-0 pointer-events-none"
            loading="lazy"
            title="Leaflet map"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/70 to-transparent" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[2px] bg-[#E63B2E]" />
            <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">Επικοινωνια</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6">
            Ας Μιλησουμε<br />
            <span className="text-[#E63B2E]">Για Το Εργο Σας.</span>
          </h1>
          <p className="font-['Space_Mono'] text-base md:text-lg text-[#E8E4DD]/70 max-w-2xl leading-relaxed">
            Είμαστε πάντα διαθέσιμοι να συζητήσουμε νέα έργα, δημιουργικές ιδέες, ή ευκαιρίες για συνεργασία.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#1A1A1A] p-6 border border-white/5 group hover:border-[#E63B2E]/30 transition-colors"
              >
                {info.href ? (
                  <a href={info.href} className="block">
                    <info.icon className="w-7 h-7 text-[#E63B2E] mb-3" />
                    <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#E8E4DD]/50 mb-1">{info.label}</p>
                    <p className="text-sm md:text-base font-medium flex items-center gap-2">
                      {info.value}
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E8E4DD]/40 group-hover:text-[#E63B2E] transition-colors" />
                    </p>
                  </a>
                ) : (
                  <>
                    <info.icon className="w-7 h-7 text-[#E63B2E] mb-3" />
                    <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#E8E4DD]/50 mb-1">{info.label}</p>
                    <p className="text-sm md:text-base font-medium">{info.value}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form — same style as homepage */}
      <section className="py-12 md:py-16 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side — text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[2px] bg-[#E63B2E]" />
                <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">Φορμα</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-6 leading-[1.1]">
                Στειλτε Μας<br />
                <span className="text-[#E63B2E]">Μηνυμα.</span>
              </h2>

              <p className="font-['Space_Mono'] text-sm md:text-base leading-relaxed text-[#E8E4DD]/60 max-w-md mb-10">
                Η έδρα της ΑΛΚΑΤΕΡ βρίσκεται στην Ηγουμενίτσα Θεσπρωτίας, με δυνατότητα ανάληψης έργων σε ολόκληρη την Ήπειρο και τη Δυτική Ελλάδα.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:alkater2024@outlook.com"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-[#1A1A1A] border border-white/5 hover:border-[#E63B2E]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E63B2E]/10 flex items-center justify-center text-[#E63B2E] group-hover:bg-[#E63B2E] group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#E8E4DD]/50 mb-0.5">Email</p>
                    <p className="font-['Space_Mono'] text-sm">alkater2024@outlook.com</p>
                  </div>
                  <ArrowUpRight className="ml-auto w-4 h-4 text-[#E8E4DD]/30 group-hover:text-[#E63B2E] transition-colors" />
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1A1A1A] border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#E63B2E]/10 flex items-center justify-center text-[#E63B2E]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#E8E4DD]/50 mb-0.5">Εδρα</p>
                    <p className="font-['Space_Mono'] text-sm">Ηγουμενίτσα, Θεσπρωτία</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side — form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 md:p-10 rounded-2xl bg-[#1A1A1A] border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E63B2E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <h3 className="text-xl font-bold uppercase tracking-tight mb-8">
                Στειλτε μας μηνυμα
              </h3>

              <form className="space-y-5 relative z-10 font-['Space_Mono']" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-[#E8E4DD]/50">Ονοματεπωνυμο</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E63B2E] transition-colors text-[#F5F3EE] text-sm"
                      placeholder="π.χ. Γιάννης Παπαδόπουλος"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-[#E8E4DD]/50">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E63B2E] transition-colors text-[#F5F3EE] text-sm"
                      placeholder="π.χ. email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-[#E8E4DD]/50">Τηλεφωνο</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E63B2E] transition-colors text-[#F5F3EE] text-sm"
                    placeholder="π.χ. 69XXXXXXXX"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-[10px] uppercase tracking-widest text-[#E8E4DD]/50">Θεμα</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E63B2E] transition-colors text-[#F5F3EE] text-sm"
                    placeholder="Τι αφορά το μήνυμά σας;"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-[#E8E4DD]/50">Μηνυμα</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E63B2E] transition-colors resize-none text-[#F5F3EE] text-sm"
                    placeholder="Περιγράψτε το έργο ή το αίτημά σας..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#E63B2E] px-8 py-4 text-sm font-['Space_Mono'] uppercase tracking-widest text-white hover:scale-[1.02] transition-all duration-300"
                >
                  <span className="relative z-10">Αποστολη Μηνυματος</span>
                  <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 mix-blend-difference" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
