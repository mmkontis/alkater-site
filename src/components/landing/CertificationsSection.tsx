"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, FileCheck2, BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const CERTS = [
  { icon: ShieldCheck, title: "ISO 9001:2015", label: "Διαχείριση Ποιότητας" },
  { icon: Award, title: "ISO 14001:2015", label: "Περιβαλλοντική Διαχείριση" },
  { icon: FileCheck2, title: "ISO 45001:2018", label: "Υγεία & Ασφάλεια" },
  { icon: BadgeCheck, title: "Μ.Ε.ΕΠ.", label: "Μητρώο Εργοληπτών" },
];

export function CertificationsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden font-['Space_Grotesk'] transition-colors duration-500" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="absolute inset-0 transition-colors duration-500 pointer-events-none" style={{ backgroundColor: "var(--tint-subtle)" }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px]" style={{ backgroundColor: "var(--text-muted)" }} />
            <span className="font-['Space_Mono'] uppercase tracking-widest text-sm" style={{ color: "var(--text-muted)" }}>Πιστοποιησεις</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[1.1]" style={{ color: "var(--text-primary)" }}>
              Ποιοτητα<br />
              <span className="text-[#E63B2E]">Πιστοποιημενη.</span>
            </h2>
            <Link
              href="/proposals/concept-1/certifications"
              className="group flex items-center gap-3 font-['Space_Mono'] text-sm uppercase tracking-widest text-[#E63B2E] hover:gap-5 transition-all shrink-0"
            >
              Ολες οι πιστοποιησεις
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CERTS.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 md:p-8 border transition-colors group hover:border-[#E63B2E]/30"
              style={{ borderColor: "var(--border-hover)", backgroundColor: "var(--bg-surface)" }}
            >
              <cert.icon className="w-10 h-10 mb-6" style={{ color: "var(--text-muted)" }} />
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
                {cert.title}
              </h3>
              <p className="font-['Space_Mono'] text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {cert.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
