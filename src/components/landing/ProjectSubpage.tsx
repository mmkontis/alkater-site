"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Maximize2,
  User,
  X,
} from "lucide-react";
import { getAdjacentProjects, getProjectBySlug } from "@/lib/projects";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

function AlkaterLogoWhite({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.197 226.772" className={className}>
      <g fill="#ffffff">
        <path d="M 99.054688 144.394531 L 94.449219 144.394531 L 94.449219 141.734375 L 106.625 141.734375 L 106.625 144.394531 L 101.996094 144.394531 L 101.996094 156.132812 L 99.054688 156.132812 Z" />
        <path d="M 111.835938 141.734375 L 121.523438 141.734375 L 121.523438 144.394531 L 114.78125 144.394531 L 114.78125 147.320312 L 119.734375 147.320312 L 119.734375 149.828125 L 114.78125 149.828125 L 114.78125 153.472656 L 121.785156 153.472656 L 121.785156 156.132812 L 111.835938 156.132812 Z" />
        <path d="M 135.699219 156.132812 L 132.648438 151.355469 L 129.59375 156.132812 L 126.234375 156.132812 L 131.011719 148.804688 L 126.515625 141.734375 L 129.875 141.734375 L 132.648438 146.273438 L 135.394531 141.734375 L 138.734375 141.734375 L 134.304688 148.804688 L 139.039062 156.132812 Z" />
        <path d="M 156.535156 141.734375 L 156.535156 156.394531 L 155.554688 156.394531 L 147.21875 147.496094 L 147.21875 156.132812 L 144.273438 156.132812 L 144.273438 141.472656 L 145.230469 141.472656 L 153.589844 150.328125 L 153.589844 141.734375 Z" />
        <path d="M 163.097656 141.734375 L 166.042969 141.734375 L 166.042969 156.132812 L 163.097656 156.132812 Z" />
        <path d="M 181.730469 156.132812 L 175.554688 148.628906 L 175.554688 156.132812 L 172.609375 156.132812 L 172.609375 141.734375 L 175.554688 141.734375 L 175.554688 148.410156 L 181.050781 141.734375 L 184.566406 141.734375 L 179.046875 148.519531 L 185.285156 156.132812 Z" />
        <path d="M 190.496094 141.734375 L 193.441406 141.734375 L 193.441406 147.253906 L 199.8125 147.253906 L 199.8125 141.734375 L 202.757812 141.734375 L 202.757812 156.132812 L 199.8125 156.132812 L 199.8125 149.914062 L 193.441406 149.914062 L 193.441406 156.132812 L 190.496094 156.132812 Z" />
        <path d="M 218.703125 141.734375 L 228.390625 141.734375 L 228.390625 144.394531 L 221.648438 144.394531 L 221.648438 147.320312 L 226.601562 147.320312 L 226.601562 149.828125 L 221.648438 149.828125 L 221.648438 153.472656 L 228.648438 153.472656 L 228.648438 156.132812 L 218.703125 156.132812 Z" />
        <path d="M 237.722656 144.394531 L 233.121094 144.394531 L 233.121094 141.734375 L 245.292969 141.734375 L 245.292969 144.394531 L 240.671875 144.394531 L 240.671875 156.132812 L 237.722656 156.132812 Z" />
        <path d="M 254.414062 146.96875 L 252.492188 151.835938 L 256.332031 151.835938 Z M 257.355469 154.257812 L 251.464844 154.257812 L 250.660156 156.132812 L 247.496094 156.132812 L 253.929688 141.472656 L 254.914062 141.472656 L 261.328125 156.132812 L 258.164062 156.132812 Z" />
        <path d="M 266.5625 141.734375 L 269.507812 141.734375 L 269.507812 156.132812 L 266.5625 156.132812 Z" />
        <path d="M 281.484375 148.476562 C 282.855469 148.476562 283.664062 147.625 283.664062 146.382812 C 283.664062 145.160156 282.8125 144.332031 281.484375 144.332031 L 279.019531 144.332031 L 279.019531 148.476562 Z M 276.074219 141.734375 L 281.484375 141.734375 C 284.496094 141.734375 286.675781 143.609375 286.675781 146.382812 C 286.675781 149.132812 284.496094 151.050781 281.484375 151.050781 L 279.019531 151.050781 L 279.019531 156.132812 L 276.074219 156.132812 Z" />
        <path d="M 292.304688 141.734375 L 301.988281 141.734375 L 301.988281 144.394531 L 295.246094 144.394531 L 295.246094 147.320312 L 300.199219 147.320312 L 300.199219 149.828125 L 295.246094 149.828125 L 295.246094 153.472656 L 302.25 153.472656 L 302.25 156.132812 L 292.304688 156.132812 Z" />
        <path d="M 308.074219 141.734375 L 311.019531 141.734375 L 311.019531 156.132812 L 308.074219 156.132812 Z" />
        <path d="M 323.125 146.96875 L 321.207031 151.835938 L 325.046875 151.835938 Z M 326.070312 154.257812 L 320.179688 154.257812 L 319.375 156.132812 L 316.210938 156.132812 L 322.644531 141.472656 L 323.628906 141.472656 L 330.042969 156.132812 L 326.878906 156.132812 Z" />
      </g>
      <g fill="#ffffff">
        <path d="M 91.402344 83.144531 L 84.304688 101.132812 L 98.5 101.132812 Z M 102.292969 110.082031 L 80.515625 110.082031 L 77.53125 117.019531 L 65.839844 117.019531 L 89.628906 62.824219 L 93.257812 62.824219 L 116.96875 117.019531 L 105.277344 117.019531 Z" />
        <path d="M 153.367188 117.019531 L 139.496094 84.679688 L 125.625 117.019531 L 113.929688 117.019531 L 137.71875 62.824219 L 141.347656 62.824219 L 165.0625 117.019531 Z" />
        <path d="M 177.371094 99.304688 L 182.457031 94.089844 L 189.585938 101.519531 L 204.558594 101.519531 L 189.949219 86.601562 L 213.554688 62.820312 L 198.753906 62.820312 L 177.304688 84.105469 L 177.304688 62.820312 L 166.996094 62.820312 L 166.996094 116.53125 C 166.996094 116.667969 166.996094 116.773438 166.980469 117.027344 L 177.132812 107.035156 Z" />
      </g>
      <g fill="#ffffff">
        <path d="M 250.847656 82.621094 L 233.828125 82.621094 L 233.828125 72.78125 L 278.832031 72.78125 L 278.832031 82.621094 L 261.734375 82.621094 L 261.734375 126.007812 L 250.847656 126.007812 Z" />
        <path d="M 278.832031 72.78125 L 314.640625 72.78125 L 314.640625 82.621094 L 289.71875 82.621094 L 289.71875 93.425781 L 308.027344 93.425781 L 308.027344 102.703125 L 289.71875 102.703125 L 289.71875 116.171875 L 315.609375 116.171875 L 315.609375 126.007812 L 278.832031 126.007812 Z" />
        <path d="M 339.152344 97.703125 C 344.234375 97.703125 347.21875 94.554688 347.21875 89.957031 C 347.21875 85.441406 344.074219 82.378906 339.152344 82.378906 L 330.042969 82.378906 L 330.042969 97.703125 Z M 319.152344 72.78125 L 339.152344 72.78125 C 350.285156 72.78125 358.347656 79.714844 358.347656 89.957031 C 358.347656 100.121094 350.285156 107.21875 339.152344 107.21875 L 330.042969 107.21875 L 330.042969 126.011719 L 319.152344 126.011719 Z" />
        <path d="M 204.558594 101.519531 L 189.585938 101.519531 L 166.964844 124.171875 L 167.011719 125.992188 L 179.957031 125.835938 L 197.09375 108.722656 Z" />
        <path d="M 228.210938 62.832031 L 200.941406 90.304688 L 208.066406 97.734375 L 218.875 87.097656 L 218.875 107.1875 L 208.164062 107.1875 L 198.308594 117.027344 L 218.875 117.027344 L 218.875 126.007812 L 229.183594 126.007812 L 229.183594 62.820312 Z" />
      </g>
    </svg>
  );
}

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
          <p className="text-[#E8E4DD]/60 font-['Space_Mono'] mb-8">Το έργο δεν βρέθηκε.</p>
          <Link
            href="/"
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

      {/* Fixed Nav with Back Button */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center md:mix-blend-difference text-white">
        <Link href="/" className="inline-flex items-center gap-2 font-['Space_Mono'] uppercase tracking-widest text-sm hover:text-[#E63B2E] transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Πισω
        </Link>
        <Link href="/">
          <AlkaterLogoWhite className="h-24 w-auto" />
        </Link>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative h-[75vh] md:h-[90vh] overflow-hidden">
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
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 pb-6 md:pb-10 z-10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-['Space_Grotesk'] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter uppercase leading-[0.9] max-w-4xl mb-6"
            >
              {project.title.split(" ").length > 2 ? (
                <>
                  {project.title.split(" ").slice(0, 2).join(" ")}<br />
                  {project.title.split(" ").slice(2).join(" ")}.
                </>
              ) : (
                <>{project.title}.</>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="font-['Space_Mono'] text-lg md:text-xl text-[#E8E4DD]/80 max-w-2xl leading-relaxed"
            >
              {project.description.split(".")[0]}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center gap-2 mt-6 font-['Space_Mono'] text-[#E8E4DD]/60 text-sm"
            >
              <MapPin className="w-4 h-4 text-[#E63B2E]" />
              {project.location}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Project Details */}
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
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[2px] bg-[#E63B2E]" />
                <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">
                  Εργο
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 text-white">
                Περιγραφη & Ποιοτητα
              </h2>

              <div className="prose prose-invert prose-lg font-['Space_Mono'] text-[#E8E4DD]/70 max-w-none mb-12">
                <p>{project.description}</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-16"
              >
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[#F5F3EE] mb-8">
                  Αντικειμενο Εργου
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {project.scope.map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-[#E63B2E] shrink-0" />
                      <span className="font-['Space_Mono'] text-[#E8E4DD]/80 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 space-y-6">
                <div className="bg-[#1A1A1A] border border-white/5 p-6 md:p-8 space-y-6">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-[#F5F3EE] mb-2">
                    Στοιχεια Εργου
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-[#E63B2E]" />
                      </div>
                      <div>
                        <p className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest mb-1">Φορεας</p>
                        <p className="text-[#F5F3EE] text-sm">{project.client}</p>
                      </div>
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#E63B2E]" />
                      </div>
                      <div>
                        <p className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest mb-1">Τοποθεσια</p>
                        <p className="text-[#F5F3EE] text-sm">{project.location}</p>
                      </div>
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-[#E63B2E]" />
                      </div>
                      <div>
                        <p className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest mb-1">Ετος</p>
                        <p className="text-[#F5F3EE] text-sm">{project.year}</p>
                      </div>
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-[#E63B2E]" />
                      </div>
                      <div>
                        <p className="font-['Space_Mono'] text-[#E8E4DD]/50 text-xs uppercase tracking-widest mb-1">Διαρκεια</p>
                        <p className="text-[#F5F3EE] text-sm">{project.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="group relative w-full inline-flex items-center justify-center overflow-hidden bg-[#E63B2E] px-8 py-4 text-sm font-['Space_Mono'] uppercase tracking-widest text-white hover:scale-[1.02] transition-all duration-300"
                >
                  <span className="relative z-10">Ζητηστε Προσφορα</span>
                  <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 mix-blend-difference" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {project.gallery.map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-video overflow-hidden bg-[#111111] cursor-pointer"
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

      {/* Adjacent Projects — editorial style from asphalt page */}
      {(prev || next) && (
        <section className="py-24 bg-[#0a0a0a] relative border-t border-white/5 font-['Space_Grotesk']">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-white mb-4">
                  Αλλα <span className="text-[#E63B2E]">Εργα.</span>
                </h2>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/60">Δείτε περισσότερα από τα έργα μας.</p>
              </div>
              <Link
                href="/"
                className="hidden md:flex items-center gap-2 font-['Space_Mono'] text-sm uppercase tracking-widest text-[#E8E4DD]/60 hover:text-white transition-colors"
              >
                Ολα τα εργα <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[prev, next].filter(Boolean).map((proj, idx) => (
                <Link key={proj!.slug} href={`/projects/${proj!.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative aspect-video overflow-hidden bg-[#1A1A1A] cursor-pointer"
                  >
                    <Image src={proj!.image} alt={proj!.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                      <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{proj!.title}</h3>
                      <p className="font-['Space_Mono'] text-sm text-[#E63B2E] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{proj!.location}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      <Footer />

      {/* Lightbox */}
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
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[210] p-2 md:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length);
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[210] p-2 md:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
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
