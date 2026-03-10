"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactSection } from "@/components/landing/ContactSection";

export default function AsphaltServicePage() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="bg-[#111111] min-h-screen text-[#F5F3EE] antialiased selection:bg-[#E63B2E] selection:text-white font-['Space_Grotesk']">
      {/* Global CSS for fonts and smooth scrolling */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      `}} />

      {/* Global Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="globalNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#globalNoiseFilter)" />
        </svg>
      </div>

      {/* Header/Nav Spacer equivalent */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
         <Link href="/proposals/concept-5" className="inline-flex items-center gap-2 font-['Space_Mono'] uppercase tracking-widest text-sm hover:text-[#E63B2E] transition-colors">
            <ChevronLeft className="w-5 h-5" />
            Πισω
         </Link>
      </div>

      {/* Hero Section */}
      <section ref={containerRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={mounted ? { y, opacity } : {}}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/Photos/project-3.jpg"
            alt="Ασφαλτοστρώσεις"
            fill
            className="object-cover opacity-60 grayscale-[0.5]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
             <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[2px] bg-[#E63B2E]"></span>
                <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">Υπηρεσια</span>
              </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]">
              Ασφαλτο<br/>στρωσεις.
            </h1>
            <p className="font-['Space_Mono'] text-xl md:text-2xl text-[#E8E4DD]/80 max-w-2xl leading-relaxed">
              Ολοκληρωμένες υπηρεσίες ασφαλτόστρωσης υψηλών προδιαγραφών για οδικά δίκτυα, χώρους στάθμευσης και ιδιωτικές εγκαταστάσεις.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative">
         <div className="absolute inset-0 bg-[linear-gradient(#F5F3EE_1px,transparent_1px),linear-gradient(90deg,#F5F3EE_1px,transparent_1px)] bg-[size:100px_100px] opacity-[0.02] pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 text-white">
                  Εξειδικευση & Ποιοτητα
                </h2>
                <div className="prose prose-invert prose-lg font-['Space_Mono'] text-[#E8E4DD]/70 max-w-none">
                  <p className="mb-6">
                    Η ΑΛΚΑΤΕΡ διαθέτει πολυετή εμπειρία και τον πιο σύγχρονο μηχανολογικό εξοπλισμό για την εκτέλεση έργων ασφαλτόστρωσης κάθε κλίμακας. Αναλαμβάνουμε από την αρχική προετοιμασία του εδάφους μέχρι την τελική διάστρωση του ασφαλτομίγματος.
                  </p>
                  <p>
                    Χρησιμοποιούμε πιστοποιημένα υλικά υψηλής ποιότητας, διασφαλίζοντας την αντοχή στον χρόνο και τις καιρικές συνθήκες. Η ομάδα των έμπειρων μηχανικών και χειριστών μας εγγυάται το άρτιο τεχνικά και αισθητικά αποτέλεσμα, τηρώντας αυστηρά τα χρονοδιαγράμματα.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                 <h3 className="text-2xl font-bold uppercase mb-8 text-white">Τι περιλαμβανει η υπηρεσια</h3>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      "Κατασκευή και συντήρηση οδικού δικτύου",
                      "Ασφαλτοστρώσεις χώρων στάθμευσης",
                      "Βιομηχανικά δάπεδα εξωτερικών χώρων",
                      "Αποκατάσταση τομών δικτύων κοινής ωφέλειας",
                      "Φρεζάρισμα παλαιού ασφαλτοτάπητα",
                      "Προεργασία και οδοστρωσία"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#E63B2E] shrink-0 mt-0.5" />
                        <span className="font-['Space_Mono'] text-[#E8E4DD]/80">{item}</span>
                      </li>
                    ))}
                 </ul>
              </motion.div>
            </div>

            {/* Sidebar / Stats / CTA */}
            <div className="lg:col-span-4 space-y-8">
               <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#1A1A1A] p-8 border border-white/5 relative overflow-hidden group"
               >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#E63B2E]/10 rounded-full blur-3xl group-hover:bg-[#E63B2E]/20 transition-colors duration-500"></div>
                  <h4 className="text-xl font-bold uppercase mb-6 text-white relative z-10">Στατιστικα</h4>
                  <div className="space-y-6 relative z-10">
                    <div>
                      <div className="text-4xl font-bold text-[#E63B2E] mb-1">500+</div>
                      <div className="font-['Space_Mono'] text-sm text-[#E8E4DD]/60 uppercase tracking-widest">Χιλιομετρα Οδικου Δικτυου</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#E63B2E] mb-1">15+</div>
                      <div className="font-['Space_Mono'] text-sm text-[#E8E4DD]/60 uppercase tracking-widest">Ετη Εμπειριας</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#E63B2E] mb-1">100%</div>
                      <div className="font-['Space_Mono'] text-sm text-[#E8E4DD]/60 uppercase tracking-widest">Εγγυηση Ποιοτητας</div>
                    </div>
                  </div>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6, delay: 0.2 }}
               >
                 <a
                    href="#contact"
                    className="group relative flex items-center justify-between w-full overflow-hidden border border-white/20 bg-[#E63B2E] px-8 py-6 text-sm font-['Space_Mono'] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    <span className="relative z-10 font-bold">Ζητηστε Προσφορα</span>
                    <ArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-2 transition-transform" />
                  </a>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Projects Carousel/Grid */}
      <section className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-white mb-4">
                  Σχετικα <span className="text-[#E63B2E]">Εργα.</span>
                </h2>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/60">Δείτε δείγματα της δουλειάς μας στον τομέα των ασφαλτοστρώσεων.</p>
              </div>
              <Link 
                href="/proposals/concept-5#projects" 
                className="hidden md:flex items-center gap-2 font-['Space_Mono'] text-sm uppercase tracking-widest text-[#E8E4DD]/60 hover:text-white transition-colors"
              >
                Ολα τα εργα <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { img: "/Photos/project-1.jpg", title: "Ασφαλτόστρωση Εθνικής Οδού", loc: "Ηγουμενίτσα" },
                { img: "/Photos/project-15.jpg", title: "Ανακατασκευή Οδικού Δικτύου", loc: "Πάργα" }
              ].map((proj, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative aspect-video overflow-hidden bg-[#1A1A1A] cursor-pointer"
                >
                  <Image src={proj.img} alt={proj.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                     <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{proj.title}</h3>
                     <p className="font-['Space_Mono'] text-sm text-[#E63B2E] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{proj.loc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
}
