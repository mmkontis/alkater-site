"use client";

import { motion } from "framer-motion";
import { InnerPageLayout, PageHero, SectionHeading } from "@/components/landing/InnerPageLayout";
import { ShieldCheck, Award, FileCheck2, BadgeCheck } from "lucide-react";

const CERTIFICATIONS = [
  {
    icon: ShieldCheck,
    title: "ISO 9001:2015",
    org: "Σύστημα Διαχείρισης Ποιότητας",
    desc: "Πιστοποίηση του συστήματος διαχείρισης ποιότητας για τον σχεδιασμό, την κατασκευή και τη συντήρηση οδικών έργων και υποδομών.",
    year: "2020",
  },
  {
    icon: Award,
    title: "ISO 14001:2015",
    org: "Σύστημα Περιβαλλοντικής Διαχείρισης",
    desc: "Δέσμευση στην περιβαλλοντική προστασία με ελαχιστοποίηση του αποτυπώματος σε κάθε κατασκευαστικό έργο.",
    year: "2021",
  },
  {
    icon: FileCheck2,
    title: "ISO 45001:2018",
    org: "Υγεία & Ασφάλεια στην Εργασία",
    desc: "Εφαρμογή αυστηρών πρωτοκόλλων ασφάλειας σε όλα τα εργοτάξια, προστατεύοντας εργαζομένους και συνεργάτες.",
    year: "2021",
  },
  {
    icon: BadgeCheck,
    title: "ΕΣΥΔ / Μ.Ε.ΕΠ.",
    org: "Μητρώο Εργοληπτικών Επιχειρήσεων",
    desc: "Εγγεγραμμένη εργοληπτική επιχείρηση στο Μητρώο Εργοληπτικών Επιχειρήσεων Δημοσίων Έργων, με δυνατότητα ανάληψης δημόσιων διαγωνισμών.",
    year: "1998",
  },
];

const MEMBERSHIPS = [
  "Τεχνικό Επιμελητήριο Ελλάδος (ΤΕΕ)",
  "Πανελλήνια Ένωση Εργοληπτών Δημοσίων Έργων (ΠΕΕΔΕ)",
  "Σύνδεσμος Τεχνικών Εταιρειών Ανωτέρων Τάξεων (ΣΤΕΑΤ)",
  "Εμπορικό & Βιομηχανικό Επιμελητήριο Θεσπρωτίας",
];

export default function CertificationsPage() {
  return (
    <InnerPageLayout>
      <PageHero
        label="Πιστοποιησεις"
        title={<>Ποιοτητα<br /><span className="text-[#E63B2E]">Πιστοποιημενη.</span></>}
        subtitle="Η ΑΛΚΑΤΕΡ δεσμεύεται στα υψηλότερα πρότυπα ποιότητας, ασφάλειας και περιβαλλοντικής διαχείρισης, με διεθνώς αναγνωρισμένες πιστοποιήσεις."
        image="/HighRes/image-1772752827339.png"
      />

      {/* Certifications Grid */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading label="Πιστοποιησεις" title={<>Διεθνη <span className="text-[#E63B2E]">Προτυπα.</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#1A1A1A] p-8 md:p-10 border border-white/5 group hover:border-[#E63B2E]/30 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E63B2E]/5 rounded-full blur-3xl group-hover:bg-[#E63B2E]/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <cert.icon className="w-12 h-12 text-[#E63B2E]" />
                    <span className="font-['Space_Mono'] text-[#E63B2E] text-sm">{cert.year}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">{cert.title}</h3>
                  <p className="font-['Space_Mono'] text-[#E63B2E] text-xs uppercase tracking-widest mb-4">{cert.org}</p>
                  <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm leading-relaxed">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading label="Μελη" title={<>Συμμετοχη Σε <span className="text-[#E63B2E]">Φορεις.</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEMBERSHIPS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-6 py-6 px-8 border border-white/5 bg-[#111111] hover:border-[#E63B2E]/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5 text-[#E63B2E]" />
                </div>
                <p className="font-['Space_Mono'] text-sm md:text-base">{m}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-[#E63B2E]" />
              <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">Δεσμευση</span>
              <span className="w-8 h-[2px] bg-[#E63B2E]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-8 leading-[1.1]">
              Η Ποιοτητα Δεν Ειναι<br /><span className="text-[#E63B2E]">Συμβιβασμος.</span>
            </h2>
            <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm md:text-base leading-relaxed">
              Κάθε πιστοποίηση που κατέχουμε αντιπροσωπεύει μια πραγματική δέσμευση — όχι απλώς ένα χαρτί.
              Εφαρμόζουμε τα πρότυπα αυτά καθημερινά, σε κάθε εργοτάξιο, σε κάθε έργο, χωρίς εξαιρέσεις.
            </p>
          </motion.div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
