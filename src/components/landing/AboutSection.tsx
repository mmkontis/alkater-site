"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const STATS = [
  { label: "Έτη Εμπειρίας", value: 30, suffix: "+" },
  { label: "Ολοκληρωμένα Έργα", value: 500, suffix: "+" },
  { label: "Περιοχές Κάλυψης", value: 15, suffix: "" },
  { label: "Εξειδικευμένο Προσωπικό", value: 45, suffix: "+" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden font-['Space_Grotesk'] transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#E63B2E]" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute inset-0 transition-colors duration-500 pointer-events-none" style={{ backgroundColor: "var(--tint-subtle)" }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px]" style={{ backgroundColor: "var(--text-muted)" }}></span>
              <span className="font-['Space_Mono'] uppercase tracking-widest text-sm" style={{ color: "var(--text-muted)" }}>Η Εταιρεια</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-8 leading-[1.1]" style={{ color: "var(--text-primary)" }}>
              Κατασκευαζοντας <br/>
              <span className="text-[#E63B2E]">Δρομους</span> &<br/>
              <span style={{ color: "var(--text-primary)" }}>Υποδομες</span>
            </h2>

            <div className="font-['Space_Mono'] text-base md:text-lg leading-relaxed mb-10 space-y-6 max-w-xl" style={{ color: "var(--text-secondary)" }}>
              <p>
                Με πολυετή εμπειρία στον κατασκευαστικό τομέα, η ΑΛΚΑΤΕΡ εγγυάται την αρτιότητα και
                αντοχή των έργων της. Η εξειδίκευσή μας εστιάζεται στα δημόσια και ιδιωτικά έργα
                υποδομής, με έμφαση στην οδοποιία.
              </p>
              <p className="text-sm">
                Βασιζόμαστε σε σύγχρονο ιδιόκτητο εξοπλισμό, πιστοποιημένα υλικά και εξειδικευμένο
                προσωπικό για την παράδοση έργων που ανταποκρίνονται στις πιο αυστηρές προδιαγραφές.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-12 mt-12 pt-12" style={{ borderTop: "1px solid var(--border-hover)" }}>
              {STATS.map((stat, index) => (
                <Counter key={index} stat={stat} index={index} />
              ))}
            </div>
          </motion.div>

          <div className="order-1 lg:order-2 relative h-[50vh] min-h-[400px] lg:h-[800px] w-full rounded-2xl overflow-hidden group">
            <motion.div
              style={mounted ? { y: parallaxY } : {}}
              className="absolute inset-0 -top-20 -bottom-20"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 grayscale-[0.5] group-hover:grayscale-0"
              >
                <source src="/Videos/construction/09_asphalt_dump_truck_initial_v1.mp4" type="video/mp4" />
              </video>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
              <div className="font-['Space_Grotesk'] font-bold text-3xl tracking-tighter text-white opacity-80 mix-blend-overlay uppercase">
                Αλκατερ
              </div>
            </div>

            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ border: "1px solid var(--border-hover)" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ stat, index }: { stat: { label: string; value: number; suffix: string }; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const incrementTime = (duration / end);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col"
    >
      <div className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-2 flex items-baseline" style={{ color: "var(--text-primary)" }}>
        {count}
        <span className="text-[#E63B2E] ml-1">{stat.suffix}</span>
      </div>
      <div className="text-xs md:text-sm font-['Space_Mono'] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}
