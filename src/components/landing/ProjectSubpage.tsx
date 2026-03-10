"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Maximize2,
  User,
  X,
} from "lucide-react";
import { getAdjacentProjects, getProjectBySlug } from "@/lib/projects";

const PROJECT_ALIASES: Record<string, string> = {
  "asphalt-project-1": "asfaltostrosi-ethnikis-odou",
};

function resolveProjectSlug(slug: string) {
  return PROJECT_ALIASES[slug] ?? slug;
}

export function ProjectSubpage({ slug }: { slug: string }) {
  const resolvedSlug = resolveProjectSlug(slug);
  const project = getProjectBySlug(resolvedSlug);
  const { prev, next } = getAdjacentProjects(resolvedSlug);

  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  if (!project) {
    return (
      <main className="bg-[#111111] min-h-screen flex items-center justify-center font-['Space_Grotesk']">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#F5F3EE] mb-4">404</h1>
          <p className="text-[#E8E4DD]/60 font-['Space_Mono'] mb-8">Το υποεργο δεν βρεθηκε.</p>
          <Link
            href="/proposals/concept-5"
            className="inline-flex items-center gap-2 text-[#E63B2E] font-['Space_Mono'] text-sm uppercase tracking-widest hover:gap-4 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Επιστροφη
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#111111] min-h-screen text-[#F5F3EE] antialiased selection:bg-[#E63B2E] selection:text-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        html { scroll-behavior: smooth; }
      `,
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="projectNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#projectNoiseFilter)" />
        </svg>
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <Link
          href="/proposals/concept-5"
          className="group flex items-center gap-3 text-[#F5F3EE]/80 hover:text-[#F5F3EE] transition-colors font-['Space_Mono'] text-xs uppercase tracking-widest"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:border-[#E63B2E]/50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="hidden md:inline">Ολα τα εργα</span>
        </Link>

        <Link
          href="/proposals/concept-5"
          className="font-['Space_Grotesk'] font-bold text-xl tracking-tighter text-[#F5F3EE]"
        >
          ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
        </Link>
      </motion.nav>

      <section ref={heroRef} className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <motion.div style={mounted ? { scale: heroScale } : {}} className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/20" />
        </motion.div>

        <motion.div
          style={mounted ? { opacity: heroOpacity } : {}}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="bg-[#E63B2E] text-white font-['Space_Mono'] text-[10px] uppercase tracking-widest py-1.5 px-4 rounded-full">
                {project.category}
              </span>
              <span className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest">
                {project.year}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase leading-[0.95] max-w-4xl"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-2 mt-6 font-['Space_Mono'] text-[#E8E4DD]/60 text-sm"
            >
              <MapPin className="w-4 h-4 text-[#E63B2E]" />
              {project.location}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="relative py-16 md:py-24 font-['Space_Grotesk']">
        <div className="absolute inset-0 bg-[linear-gradient(#F5F3EE_1px,transparent_1px),linear-gradient(90deg,#F5F3EE_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-[#E63B2E]" />
                <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">
                  Περιγραφη Υποεργου
                </span>
              </div>

              <p className="font-['Space_Mono'] text-[#E8E4DD]/80 text-base md:text-lg leading-relaxed mb-12 max-w-2xl">
                {project.description}
              </p>

              <div className="mb-16">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[#F5F3EE] mb-8">
                  Αντικειμενο <span className="text-[#E63B2E]">Εργασιων</span>
                </h3>
                <div className="space-y-4">
                  {project.scope.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group flex items-start gap-4 p-4 rounded-xl bg-[#1A1A1A] border border-white/5 hover:border-[#E63B2E]/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#E63B2E]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#E63B2E]/20 transition-colors">
                        <ChevronRight className="w-4 h-4 text-[#E63B2E]" />
                      </div>
                      <span className="font-['Space_Mono'] text-[#E8E4DD]/80 text-sm md:text-base">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 space-y-6">
                <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 md:p-8 space-y-6">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-[#F5F3EE] mb-2">
                    Στοιχεια Εργου
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-[#E63B2E]" />
                      </div>
                      <div>
                        <p className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest mb-1">
                          Φορεας
                        </p>
                        <p className="text-[#F5F3EE] text-sm">{project.client}</p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/5" />

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#E63B2E]" />
                      </div>
                      <div>
                        <p className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest mb-1">
                          Τοποθεσια
                        </p>
                        <p className="text-[#F5F3EE] text-sm">{project.location}</p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/5" />

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-[#E63B2E]" />
                      </div>
                      <div>
                        <p className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest mb-1">
                          Ετος
                        </p>
                        <p className="text-[#F5F3EE] text-sm">{project.year}</p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/5" />

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-[#E63B2E]" />
                      </div>
                      <div>
                        <p className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest mb-1">
                          Διαρκεια
                        </p>
                        <p className="text-[#F5F3EE] text-sm">{project.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="mailto:alkater2024@outlook.com?subject=Ενδιαφέρον για συνεργασία"
                  className="group relative w-full inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#E63B2E] px-8 py-4 text-sm font-['Space_Mono'] uppercase tracking-widest text-white hover:scale-[1.02] transition-all duration-300"
                >
                  <span className="relative z-10">Επικοινωνηστε μαζι μας</span>
                  <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 mix-blend-difference" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#1A1A1A] font-['Space_Grotesk']">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-[#E63B2E]" />
              <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">
                Φωτογραφιες
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter uppercase text-[#F5F3EE] leading-[1.1]">
              Απο Το <span className="text-[#E63B2E]">Εργο.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {project.gallery.map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] overflow-hidden bg-[#111111] cursor-pointer rounded-xl"
              >
                <Image
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 font-['Space_Grotesk']">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {prev && (
            <Link
              href={`/proposals/concept-5/projects/${prev.slug}`}
              className="group relative flex items-center gap-6 p-8 md:p-12 lg:p-16 hover:bg-[#1A1A1A] transition-colors border-b md:border-b-0 md:border-r border-white/5"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E63B2E]/50 transition-colors shrink-0">
                <ArrowLeft className="w-5 h-5 text-[#E8E4DD]/60 group-hover:text-[#E63B2E] transition-colors" />
              </div>
              <div>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/40 text-xs uppercase tracking-widest mb-2">
                  Προηγουμενο Εργο
                </p>
                <p className="text-lg md:text-xl font-bold uppercase tracking-tight text-[#F5F3EE] group-hover:text-[#E63B2E] transition-colors">
                  {prev.title}
                </p>
              </div>
            </Link>
          )}
          {next && (
            <Link
              href={`/proposals/concept-5/projects/${next.slug}`}
              className="group relative flex items-center justify-end gap-6 p-8 md:p-12 lg:p-16 hover:bg-[#1A1A1A] transition-colors text-right"
            >
              <div>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/40 text-xs uppercase tracking-widest mb-2">
                  Επομενο Εργο
                </p>
                <p className="text-lg md:text-xl font-bold uppercase tracking-tight text-[#F5F3EE] group-hover:text-[#E63B2E] transition-colors">
                  {next.title}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E63B2E]/50 transition-colors shrink-0">
                <ArrowRight className="w-5 h-5 text-[#E8E4DD]/60 group-hover:text-[#E63B2E] transition-colors" />
              </div>
            </Link>
          )}
        </div>
      </section>

      <div className="border-t border-white/5 py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-['Space_Mono'] text-xs text-[#E8E4DD]/40 uppercase tracking-widest max-w-7xl mx-auto">
        <div>&copy; {new Date().getFullYear()} ΑΛΚΑΤΕΡ ΚΑΤΑΣΚΕΥΑΣΤΙΚΗ.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#E63B2E] transition-colors">
            Οροι Χρησης
          </a>
          <a href="#" className="hover:text-[#E63B2E] transition-colors">
            Πολιτικη Απορρητου
          </a>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 z-[210] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 z-[210] p-4 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length);
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 z-[210] p-4 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % project.gallery.length);
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-5xl aspect-[16/10] mx-4 md:mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.gallery[lightboxIndex]}
                alt={`${project.title} - ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {project.gallery.map((img, i) => (
                <button
                  key={img}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === lightboxIndex ? "bg-[#E63B2E] w-6" : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
