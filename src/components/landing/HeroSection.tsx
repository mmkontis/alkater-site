"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTheme } from "./ThemeContext";

const logoColorModes = [
  // Row 1: Red accent variants
  { id: "default", blue: "#ffffff", red: "#ffffff", gray: "#ffffff", swatch: ["#333333", "#E63B2E"], accent: "#E63B2E", tint: "transparent", logoLeft: "#ffffff", logoRight: "#ffffff" },
  { id: "white", blue: "#1B6B9E", red: "#E63B2E", gray: "#cccccc", swatch: ["#1B6B9E", "#E63B2E"], accent: "#E63B2E", tint: "#1B6B9E", logoLeft: "#1B6B9E", logoRight: "#E63B2E" },
  { id: "fresh", blue: "#1B6B9E", red: "#E63B2E", gray: "#cccccc", swatch: ["#1B6B9E", "#E63B2E"], accent: "#E63B2E", tint: "#1B6B9E", logoLeft: "#1B6B9E", logoRight: "#E63B2E" },
  { id: "original", blue: "#063D64", red: "#A21B21", gray: "#918F90", swatch: ["#063D64", "#A21B21"], accent: "#A21B21", tint: "#063D64", logoLeft: "#063D64", logoRight: "#A21B21" },
  { id: "proposal", blue: "#111111", red: "#E63B2E", gray: "#918F90", swatch: ["#111111", "#E63B2E"], accent: "#E63B2E", tint: "#111111", logoLeft: "var(--text-primary)", logoRight: "#E63B2E" },
  { id: "classic", blue: "#ffffff", red: "#E63B2E", gray: "#ffffff", swatch: ["#E63B2E"], accent: "#E63B2E", tint: "transparent", logoLeft: "var(--text-primary)", logoRight: "#E63B2E" },
  // Row 2: Blue accent variants
  { id: "blue-fresh", blue: "#1B6B9E", red: "#1B6B9E", gray: "#cccccc", swatch: ["#1B6B9E"], accent: "#1B6B9E", tint: "#0D3B5E", logoLeft: "#1B6B9E", logoRight: "#1B6B9E" },
  { id: "blue-original", blue: "#063D64", red: "#063D64", gray: "#918F90", swatch: ["#063D64"], accent: "#063D64", tint: "#031E32", logoLeft: "#063D64", logoRight: "#063D64" },
  { id: "blue-red", blue: "#1B6B9E", red: "#A21B21", gray: "#918F90", swatch: ["#A21B21", "#1B6B9E"], accent: "#1B6B9E", tint: "#A21B21", logoLeft: "#1B6B9E", logoRight: "#A21B21" },
  { id: "red-dark", blue: "#A21B21", red: "#A21B21", gray: "#918F90", swatch: ["#A21B21"], accent: "#A21B21", tint: "#4a0d10", logoLeft: "#A21B21", logoRight: "#A21B21" },
] as const;

import type { HeroSlide } from "@/lib/queries";
export type { HeroSlide };

const DEFAULT_SLIDES: HeroSlide[] = [
  { id: "1", heading: "ΧΤΙΖΟΥΜΕ", heading_accent: "ΤΟ ΑΥΡΙΟ.", subtitle: "Τεχνική αρτιότητα, εμπειρία δεκαετιών και δέσμευση στην ποιότητα — αυτές είναι οι αξίες που οικοδομούν κάθε μας έργο.", video_url: "/Videos/construction/01_cement_truck_trench_ext_v1.mp4", sort_order: 0 },
  { id: "2", heading: "ΠΟΙΟΤΗΤΑ", heading_accent: "ΣΕ ΚΑΘΕ ΕΡΓΟ.", subtitle: "Από μικρές επισκευές μέχρι μεγάλα έργα υποδομής, η ποιότητα είναι πάντα η προτεραιότητά μας.", video_url: "/Videos/construction/13_downloaded_v2.mp4", sort_order: 1 },
  { id: "3", heading: "ΕΜΠΕΙΡΙΑ", heading_accent: "ΔΕΚΑΕΤΙΩΝ.", subtitle: "Με πάνω από δεκαετίες εμπειρίας στον κατασκευαστικό κλάδο, φέρνουμε αξιοπιστία σε κάθε βήμα.", video_url: "/Videos/construction/08_road_line_painting_initial_v2.mp4", sort_order: 2 },
];

function AlkaterLogo({ blue, red, gray, className }: { blue: string; red: string; gray: string; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.197 226.772" className={className}>
      <g fill={gray}>
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
      <g fill={blue}>
        <path d="M 91.402344 83.144531 L 84.304688 101.132812 L 98.5 101.132812 Z M 102.292969 110.082031 L 80.515625 110.082031 L 77.53125 117.019531 L 65.839844 117.019531 L 89.628906 62.824219 L 93.257812 62.824219 L 116.96875 117.019531 L 105.277344 117.019531 Z" />
        <path d="M 153.367188 117.019531 L 139.496094 84.679688 L 125.625 117.019531 L 113.929688 117.019531 L 137.71875 62.824219 L 141.347656 62.824219 L 165.0625 117.019531 Z" />
        <path d="M 177.371094 99.304688 L 182.457031 94.089844 L 189.585938 101.519531 L 204.558594 101.519531 L 189.949219 86.601562 L 213.554688 62.820312 L 198.753906 62.820312 L 177.304688 84.105469 L 177.304688 62.820312 L 166.996094 62.820312 L 166.996094 116.53125 C 166.996094 116.667969 166.996094 116.773438 166.980469 117.027344 L 177.132812 107.035156 Z" />
      </g>
      <g fill={red}>
        <path d="M 250.847656 82.621094 L 233.828125 82.621094 L 233.828125 72.78125 L 278.832031 72.78125 L 278.832031 82.621094 L 261.734375 82.621094 L 261.734375 126.007812 L 250.847656 126.007812 Z" />
        <path d="M 278.832031 72.78125 L 314.640625 72.78125 L 314.640625 82.621094 L 289.71875 82.621094 L 289.71875 93.425781 L 308.027344 93.425781 L 308.027344 102.703125 L 289.71875 102.703125 L 289.71875 116.171875 L 315.609375 116.171875 L 315.609375 126.007812 L 278.832031 126.007812 Z" />
        <path d="M 339.152344 97.703125 C 344.234375 97.703125 347.21875 94.554688 347.21875 89.957031 C 347.21875 85.441406 344.074219 82.378906 339.152344 82.378906 L 330.042969 82.378906 L 330.042969 97.703125 Z M 319.152344 72.78125 L 339.152344 72.78125 C 350.285156 72.78125 358.347656 79.714844 358.347656 89.957031 C 358.347656 100.121094 350.285156 107.21875 339.152344 107.21875 L 330.042969 107.21875 L 330.042969 126.011719 L 319.152344 126.011719 Z" />
        <path d="M 204.558594 101.519531 L 189.585938 101.519531 L 166.964844 124.171875 L 167.011719 125.992188 L 179.957031 125.835938 L 197.09375 108.722656 Z" />
        <path d="M 228.210938 62.832031 L 200.941406 90.304688 L 208.066406 97.734375 L 218.875 87.097656 L 218.875 107.1875 L 208.164062 107.1875 L 198.308594 117.027344 L 218.875 117.027344 L 218.875 126.007812 L 229.183594 126.007812 L 229.183594 62.820312 Z" />
      </g>
    </svg>
  );
}

export function HeroSection({ slides: slidesProp }: { slides?: HeroSlide[] }) {
  const slides = slidesProp?.length ? slidesProp : DEFAULT_SLIDES;
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [logoMode] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  useTheme();

  const currentColors = logoColorModes[logoMode];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance based on video duration
  useEffect(() => {
    if (slides.length <= 1) return;

    const scheduleNext = () => {
      const video = videoRefs.current[activeSlide];
      const duration = video?.duration && isFinite(video.duration) ? video.duration * 1000 : 6000;
      return setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, duration);
    };

    const timer = scheduleNext();
    return () => clearTimeout(timer);
  }, [activeSlide, slides.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const slide = slides[activeSlide];

  return (
    <section
      ref={containerRef}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center selection:bg-[#E63B2E] selection:text-white font-['Space_Grotesk']"
      style={{ backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, var(--tint))" }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      `}} />

      {/* Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-5 mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="noiseFilterHero">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterHero)" />
        </svg>
      </div>

      {/* Video backgrounds */}
      <motion.div
        style={mounted ? { scale, y, opacity } : {}}
        className="absolute inset-0 z-0 h-full w-full overflow-hidden"
      >
        {slides.map((s, i) => (
          <video
            key={s.id}
            ref={(el) => { videoRefs.current[i] = el; }}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
            style={{ opacity: mounted && activeSlide === i ? 1 : 0 }}
          >
            <source src={s.video_url} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--tint) 20%, rgba(0,0,0,0.45)), color-mix(in srgb, var(--overlay-bg) 70%, transparent))" }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-5xl mx-auto w-full pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 w-full max-w-md"
        >
          <AlkaterLogo
            blue={currentColors.blue}
            red={currentColors.red}
            gray={currentColors.gray}
            className="w-full transition-colors duration-500"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <h1
              className="mb-6 font-['Space_Grotesk'] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter uppercase leading-[0.9]"
              style={{ color: "var(--text-primary)" }}
            >
              {slide.heading} <br />
              <span style={{ color: "var(--logo-right)" }}>
                {slide.heading_accent}
              </span>
            </h1>

            <p
              className="font-['Space_Mono'] max-w-2xl mt-6 text-sm md:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators — hidden when only 1 slide */}
        {slides.length > 1 && (
          <div className="flex gap-2 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className="py-2 cursor-pointer group"
              >
                <span
                  className="block h-[3px] rounded-full transition-all duration-500 group-hover:opacity-80"
                  style={{
                    width: activeSlide === i ? "2.5rem" : "1rem",
                    backgroundColor: activeSlide === i ? "var(--accent)" : "var(--text-muted)",
                    opacity: activeSlide === i ? 1 : 0.4,
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border"
          style={{ borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)", backgroundColor: "color-mix(in srgb, var(--tint) 15%, rgba(0,0,0,0.3))" }}
        >
          <ArrowDown className="w-5 h-5" style={{ color: "var(--accent)", opacity: 0.7 }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
