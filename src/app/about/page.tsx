"use client";

import { motion } from "framer-motion";
import { InnerPageLayout, PageHero, SectionHeading } from "@/components/landing/InnerPageLayout";
import { Target, Eye, Heart } from "lucide-react";
import Image from "next/image";

const STATS = [
  { value: "25+", label: "Χρόνια Εμπειρίας" },
  { value: "150+", label: "Ολοκληρωμένα Έργα" },
  { value: "500+", label: "Χιλιόμετρα Οδικού Δικτύου" },
  { value: "50+", label: "Εξειδικευμένο Προσωπικό" },
];

const VALUES = [
  { icon: Target, title: "Ακρίβεια", desc: "Κάθε έργο εκτελείται με μαθηματική ακρίβεια, τηρώντας αυστηρά τις τεχνικές προδιαγραφές και τα χρονοδιαγράμματα." },
  { icon: Eye, title: "Διαφάνεια", desc: "Πλήρης ενημέρωση και ανοιχτή επικοινωνία με τους πελάτες μας σε κάθε φάση του έργου." },
  { icon: Heart, title: "Αφοσίωση", desc: "Η δέσμευσή μας στην ποιότητα και την ασφάλεια δεν είναι διαπραγματεύσιμη — είναι η ταυτότητά μας." },
];

const MILESTONES = [
  { year: "1998", text: "Ίδρυση της ΑΛΚΑΤΕΡ Α.Ε. στην Ηγουμενίτσα" },
  { year: "2005", text: "Ολοκλήρωση του πρώτου μεγάλου δημόσιου έργου" },
  { year: "2010", text: "Επέκταση στόλου μηχανημάτων — απόκτηση σύγχρονου εξοπλισμού ασφαλτόστρωσης" },
  { year: "2015", text: "Ανάληψη έργων σε όλη την Ήπειρο και τη Δυτική Ελλάδα" },
  { year: "2025", text: "Πιστοποιήσεις ISO 9001, ISO 14001, ISO 45001 & ISO 50001" },
  { year: "2025", text: "150+ ολοκληρωμένα έργα και συνεχής ανάπτυξη" },
];

const sectionDivider = (
  <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--tint) 25%, rgba(255,255,255,0.06)), transparent)" }} />
);

export default function AboutPage() {
  return (
    <InnerPageLayout>
      <PageHero
        label="Εταιρεια"
        title={<>Η Ιστορια<br /><span className="text-[#E63B2E]">Μας.</span></>}
        subtitle="Από το 1998, η ΑΛΚΑΤΕΡ Α.Ε. χτίζει υποδομές που αντέχουν στον χρόνο. Με έδρα την Ηγουμενίτσα, η εταιρεία μας αποτελεί σημείο αναφοράς στον κατασκευαστικό κλάδο της Ηπείρου."
        image="/HighRes/image-1772752810544.png"
      />

      {/* Stats */}
      {sectionDivider}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, color-mix(in srgb, var(--tint) 8%, transparent), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ columnGap: 0 }}>
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="py-12 md:py-16 px-6 md:px-8 text-center"
                style={{ borderRight: i < 3 ? "1px solid color-mix(in srgb, var(--tint) 15%, rgba(255,255,255,0.04))" : "none" }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "var(--link-color, var(--accent))" }}>{stat.value}</div>
                <div className="font-['Space_Mono'] text-xs md:text-sm text-[#E8E4DD]/60 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      {sectionDivider}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(#F5F3EE_1px,transparent_1px),linear-gradient(90deg,#F5F3EE_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 80% 40%, color-mix(in srgb, var(--tint) 10%, transparent), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading label="Αποστολη" title={<>Δεσμευση Στην <span className="text-[#E63B2E]">Ποιοτητα.</span></>} />
              <div className="prose prose-invert prose-lg font-['Space_Mono'] text-[#E8E4DD]/70 max-w-none">
                <p className="mb-6">
                  Η ΑΛΚΑΤΕΡ Α.Ε. ιδρύθηκε με όραμα να προσφέρει κατασκευαστικές υπηρεσίες υψηλών προδιαγραφών στην Ήπειρο και τη Δυτική Ελλάδα. Με πάνω από 25 χρόνια εμπειρίας, έχουμε εξελιχθεί σε μία από τις πιο αξιόπιστες κατασκευαστικές εταιρείες της περιοχής.
                </p>
                <p>
                  Η φιλοσοφία μας βασίζεται στην αρχή ότι κάθε έργο — ανεξαρτήτως μεγέθους — αξίζει τον ίδιο βαθμό αφοσίωσης και τεχνικής αρτιότητας. Αυτή η αρχή μας οδηγεί σε κάθε απόφαση.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src="/HighRes/image-1772752827339.png" alt="Εργο ΑΛΚΑΤΕΡ" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
              <div className="absolute inset-0 opacity-20" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--tint) 30%, transparent), transparent)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      {sectionDivider}
      <section className="py-24 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 10% 80%, color-mix(in srgb, var(--tint) 10%, transparent), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 90% 20%, color-mix(in srgb, var(--tint) 6%, transparent), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <SectionHeading label="Αξιες" title={<>Τι Μας <span className="text-[#E63B2E]">Οριζει.</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 group transition-colors duration-500 rounded-lg"
                style={{ backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, var(--tint))", border: "1px solid color-mix(in srgb, var(--tint) 15%, rgba(255,255,255,0.05))" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in srgb, var(--tint) 40%, rgba(255,255,255,0.1))")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "color-mix(in srgb, var(--tint) 15%, rgba(255,255,255,0.05))")}
              >
                <v.icon className="w-10 h-10 mb-6" style={{ color: "var(--link-color, var(--accent))" }} />
                <h3 className="text-2xl font-bold uppercase mb-4">{v.title}</h3>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      {sectionDivider}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 90% 20%, color-mix(in srgb, var(--tint) 8%, transparent), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <SectionHeading label="Χρονολογιο" title={<>Η Πορεια <span className="text-[#E63B2E]">Μας.</span></>} />
          <div className="space-y-0">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-8 py-8"
                style={{ borderBottom: "1px solid color-mix(in srgb, var(--tint) 12%, rgba(255,255,255,0.04))" }}
              >
                <div className="text-3xl md:text-4xl font-bold shrink-0 w-24" style={{ color: "var(--link-color, var(--accent))" }}>{m.year}</div>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/80 text-base md:text-lg pt-2">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
