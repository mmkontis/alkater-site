"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { InnerPageLayout } from "@/components/landing/InnerPageLayout";
import { ContactForm } from "@/components/landing/ContactForm";
import { Mail, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "alkater2024@outlook.com", href: "mailto:alkater2024@outlook.com" },
  { icon: Phone, label: "Τηλεφωνο", value: "+30 26650 XXXXX", href: "tel:+3026650XXXXX" },
  { icon: MapPin, label: "Εδρα", value: "Ηγουμενίτσα, Θεσπρωτία" },
  { icon: Clock, label: "Ωραριο", value: "Δευ - Παρ: 07:00 - 17:00" },
];

const sectionDivider = (
  <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--tint) 25%, rgba(255,255,255,0.06)), transparent)" }} />
);

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
        <div className="absolute inset-0 z-0">
          <iframe
            ref={iframeRef}
            src="/map.html"
            className="w-full h-full border-0 pointer-events-none"
            loading="lazy"
            title="Leaflet map"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--bg-primary) 97%, var(--tint)), color-mix(in srgb, var(--bg-primary) 97%, var(--tint)) 10%, rgba(17,17,17,0.80) 50%, rgba(17,17,17,0.40))" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, color-mix(in srgb, var(--bg-primary) 70%, var(--tint)), transparent)" }} />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[2px]" style={{ backgroundColor: "var(--link-color, #E63B2E)" }} />
            <span className="font-['Space_Mono'] uppercase tracking-widest text-sm" style={{ color: "var(--link-color, #E63B2E)" }}>Επικοινωνια</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6" style={{ color: "var(--text-primary)" }}>
            Ας Μιλησουμε<br />
            <span className="text-[#E63B2E]">Για Το Εργο Σας.</span>
          </h1>
          <p className="font-['Space_Mono'] text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Είμαστε πάντα διαθέσιμοι να συζητήσουμε νέα έργα, δημιουργικές ιδέες, ή ευκαιρίες για συνεργασία.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      {sectionDivider}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 0%, color-mix(in srgb, var(--tint) 6%, transparent), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 group transition-colors rounded-lg"
                style={{ backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, var(--tint))", border: "1px solid color-mix(in srgb, var(--tint) 15%, rgba(255,255,255,0.05))" }}
              >
                {info.href ? (
                  <a href={info.href} className="block">
                    <info.icon className="w-7 h-7 mb-3" style={{ color: "var(--link-color)" }} />
                    <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>{info.label}</p>
                    <p className="text-sm md:text-base font-medium flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      {info.value}
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text-muted)" }} />
                    </p>
                  </a>
                ) : (
                  <>
                    <info.icon className="w-7 h-7 mb-3" style={{ color: "var(--link-color)" }} />
                    <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>{info.label}</p>
                    <p className="text-sm md:text-base font-medium" style={{ color: "var(--text-primary)" }}>{info.value}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {sectionDivider}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, color-mix(in srgb, var(--tint) 8%, transparent), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
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
                <span className="w-8 h-[2px]" style={{ backgroundColor: "var(--link-color, #E63B2E)" }} />
                <span className="font-['Space_Mono'] uppercase tracking-widest text-sm" style={{ color: "var(--link-color, #E63B2E)" }}>Φορμα</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-6 leading-[1.1]" style={{ color: "var(--text-primary)" }}>
                Στειλτε Μας<br />
                <span className="text-[#E63B2E]">Μηνυμα.</span>
              </h2>

              <p className="font-['Space_Mono'] text-sm md:text-base leading-relaxed max-w-md mb-10" style={{ color: "var(--text-muted)" }}>
                Η έδρα της ΑΛΚΑΤΕΡ βρίσκεται στην Ηγουμενίτσα Θεσπρωτίας, με δυνατότητα ανάληψης έργων σε ολόκληρη την Ήπειρο και τη Δυτική Ελλάδα.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:alkater.ae@gmail.com"
                  className="group flex items-center gap-4 p-4 rounded-xl transition-colors"
                  style={{ backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, var(--tint))", border: "1px solid color-mix(in srgb, var(--tint) 15%, rgba(255,255,255,0.05))" }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "color-mix(in srgb, var(--link-color) 15%, var(--bg-primary))", color: "var(--link-color)" }}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>Email</p>
                    <p className="font-['Space_Mono'] text-sm" style={{ color: "var(--text-primary)" }}>alkater.ae@gmail.com</p>
                  </div>
                  <ArrowUpRight className="ml-auto w-4 h-4 transition-colors" style={{ color: "var(--text-muted)" }} />
                </a>

                <div
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, var(--tint))", border: "1px solid color-mix(in srgb, var(--tint) 15%, rgba(255,255,255,0.05))" }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "color-mix(in srgb, var(--link-color) 15%, var(--bg-primary))", color: "var(--link-color)" }}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "var(--text-muted)" }}>Εδρα</p>
                    <p className="font-['Space_Mono'] text-sm" style={{ color: "var(--text-primary)" }}>Ηγουμενίτσα, Θεσπρωτία</p>
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
              className="p-8 md:p-10 rounded-2xl relative overflow-hidden"
              style={{ backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, var(--tint))", border: "1px solid color-mix(in srgb, var(--tint) 15%, rgba(255,255,255,0.05))" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ backgroundColor: "color-mix(in srgb, var(--tint) 8%, transparent)" }} />

              <ContactForm title="Στειλτε μας μηνυμα" />
            </motion.div>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
