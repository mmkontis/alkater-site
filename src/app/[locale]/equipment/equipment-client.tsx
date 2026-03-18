"use client";

import { motion } from "framer-motion";
import { InnerPageLayout, PageHero, SectionHeading } from "@/components/landing/InnerPageLayout";
import Image from "next/image";

const EQUIPMENT_CATEGORIES = [
  {
    title: "Ασφαλτοστρωτήρες",
    items: [
      { name: "Vögele Super 1800-3i", spec: "Πλάτος διάστρωσης έως 7.5m" },
      { name: "Bomag BF 300", spec: "Ηλεκτρονικός έλεγχος πάχους" },
    ],
    image: "/HighRes/image-1772752810544.png",
  },
  {
    title: "Οδοστρωτήρες",
    items: [
      { name: "Bomag BW 174", spec: "Διπλός κύλινδρος, 8 τόνοι" },
      { name: "Hamm HD+ 90i", spec: "Ελαστικοφόρος, 9 τόνοι" },
      { name: "Bomag BW 120", spec: "Μικρός κύλινδρος, 2.5 τόνοι" },
    ],
    image: "/HighRes/image-1772752818829.png",
  },
  {
    title: "Εκσκαφείς & Φορτωτές",
    items: [
      { name: "Caterpillar 320", spec: "Ερπυστριοφόρος, 20 τόνοι" },
      { name: "JCB 3CX", spec: "Εκσκαφέας-φορτωτής" },
      { name: "Caterpillar 950", spec: "Φορτωτής, 5 τόνοι" },
    ],
    image: "/HighRes/image-1772752202824.png",
  },
  {
    title: "Φορτηγά & Μεταφορές",
    items: [
      { name: "MAN TGS 33.400", spec: "Ανατρεπόμενο, 18 κ.μ." },
      { name: "Mercedes Arocs 3343", spec: "Ανατρεπόμενο, 16 κ.μ." },
      { name: "Iveco Trakker", spec: "Βαρέα φορτία, 20 κ.μ." },
    ],
    image: "/HighRes/image-1772752230967.png",
  },
  {
    title: "Μηχανήματα Διαγράμμισης",
    items: [
      { name: "Hofmann H26-1", spec: "Αυτοκινούμενο, θερμοπλαστικό" },
      { name: "Graco LineDriver", spec: "Χειροκίνητο, ψυχρό χρώμα" },
    ],
    image: "/HighRes/image-1772753366441.png",
  },
];

export default function EquipmentPageClient() {
  return (
    <InnerPageLayout>
      <PageHero
        label="Εξοπλισμος"
        title={<>Τα Μηχανηματα<br /><span className="text-[#E63B2E]">Μας.</span></>}
        subtitle="Ο σύγχρονος μηχανολογικός εξοπλισμός της ΑΛΚΑΤΕΡ αποτελεί εγγύηση ποιότητας και αξιοπιστίας σε κάθε έργο. Συνεχής ανανέωση και συντήρηση του στόλου μας."
        image="/HighRes/image-1772752827339.png"
      />

      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading label="Στολος" title={<>Κατηγοριες <span className="text-[#E63B2E]">Εξοπλισμου.</span></>} />

          <div className="space-y-16">
            {EQUIPMENT_CATEGORIES.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6">{cat.title}</h3>
                  <div className="space-y-4">
                    {cat.items.map((item, j) => (
                      <div key={j} className="flex justify-between items-baseline py-3 border-b border-white/5">
                        <span className="text-[#F5F3EE] font-medium">{item.name}</span>
                        <span className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest">{item.spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`relative aspect-video overflow-hidden rounded-lg ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image src={cat.image} alt={cat.title} fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Stats */}
      <section className="py-16 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "30+", label: "Μηχανηματα" },
              { value: "15", label: "Φορτηγα" },
              { value: "5", label: "Ασφαλτοστρωτηρες" },
              { value: "24/7", label: "Διαθεσιμοτητα" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-8"
              >
                <div className="text-4xl font-bold text-[#E63B2E] mb-2">{s.value}</div>
                <div className="font-['Space_Mono'] text-xs text-[#E8E4DD]/60 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
