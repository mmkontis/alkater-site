"use client";

import { motion } from "framer-motion";
import { InnerPageLayout, PageHero, SectionHeading } from "@/components/landing/InnerPageLayout";
import { HardHat, Wrench, FileCheck, Truck } from "lucide-react";

const TEAM = [
  { name: "Κωνσταντίνος Αλκατερίδης", role: "Διευθύνων Σύμβουλος", desc: "25+ χρόνια εμπειρίας στον κατασκευαστικό κλάδο. Ιδρυτής και κινητήρια δύναμη της εταιρείας." },
  { name: "Μαρία Παπαδοπούλου", role: "Τεχνική Διευθύντρια", desc: "Πολιτικός μηχανικός με εξειδίκευση σε οδοποιία και έργα υποδομής. Υπεύθυνη τεχνικού σχεδιασμού." },
  { name: "Γιώργος Νικολάου", role: "Υπεύθυνος Έργων", desc: "Διαχείριση και επίβλεψη εργοταξίων. Εξασφάλιση τήρησης χρονοδιαγραμμάτων και προδιαγραφών ποιότητας." },
  { name: "Ελένη Κατσαρού", role: "Οικονομική Διευθύντρια", desc: "Διαχείριση οικονομικών, προσφορές δημοπρασιών και σχέσεις με φορείς του δημοσίου." },
  { name: "Δημήτρης Λάμπρου", role: "Αρχηγός Συνεργείου", desc: "20+ χρόνια εμπειρία στο πεδίο. Συντονισμός συνεργείων και μηχανημάτων σε κάθε εργοτάξιο." },
  { name: "Αντώνης Βασιλείου", role: "Υπεύθυνος Ασφάλειας", desc: "Τεχνικός ασφάλειας εργασιών. Εφαρμογή πρωτοκόλλων ασφαλείας σε όλα τα εργοτάξια." },
];

const DEPARTMENTS = [
  { icon: HardHat, title: "Τεχνικό Τμήμα", count: "12", desc: "Μηχανικοί, τοπογράφοι και τεχνικοί εξειδικευμένοι σε οδοποιία και υποδομές." },
  { icon: Truck, title: "Συνεργεία Πεδίου", count: "25+", desc: "Εξειδικευμένοι χειριστές μηχανημάτων και εργάτες με πολυετή εμπειρία." },
  { icon: FileCheck, title: "Διοικητικό Τμήμα", count: "8", desc: "Λογιστήριο, γραμματεία, νομική υποστήριξη και διαχείριση προμηθειών." },
  { icon: Wrench, title: "Τμήμα Συντήρησης", count: "6", desc: "Τεχνικοί συντήρησης μηχανημάτων και οχημάτων — εξασφάλιση αδιάλειπτης λειτουργίας." },
];

export default function TeamPage() {
  return (
    <InnerPageLayout>
      <PageHero
        label="Ομαδα"
        title={<>Οι Ανθρωποι<br /><span className="text-[#E63B2E]">Πισω Απο Καθε Εργο.</span></>}
        subtitle="Η δύναμη της ΑΛΚΑΤΕΡ είναι οι άνθρωποί της. Μια ομάδα ειδικών με πάθος για τις κατασκευές και αφοσίωση στην ποιότητα."
      />

      {/* Departments */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading label="Τμηματα" title={<>Η Δομη <span className="text-[#E63B2E]">Μας.</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEPARTMENTS.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#1A1A1A] p-8 border border-white/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E63B2E]/5 rounded-full blur-2xl group-hover:bg-[#E63B2E]/10 transition-colors duration-500" />
                <d.icon className="w-8 h-8 text-[#E63B2E] mb-4 relative z-10" />
                <div className="text-3xl font-bold text-[#E63B2E] mb-1 relative z-10">{d.count}</div>
                <h3 className="text-lg font-bold uppercase mb-3 relative z-10">{d.title}</h3>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm relative z-10">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading label="Στελεχη" title={<>Η Ηγεσια <span className="text-[#E63B2E]">Μας.</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#111111] border border-white/5 p-8 hover:border-[#E63B2E]/20 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-[#E63B2E]/10 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-[#E63B2E]">{member.name[0]}</span>
                </div>
                <h3 className="text-xl font-bold uppercase mb-1">{member.name}</h3>
                <p className="font-['Space_Mono'] text-[#E63B2E] text-xs uppercase tracking-widest mb-4">{member.role}</p>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
