"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Menu, X } from "lucide-react";
import { Footer } from "./Footer";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/proposals/concept-1", label: "Αρχικη" },
  { href: "/proposals/concept-1/about", label: "Εταιρεια" },
  { href: "/proposals/concept-1/team", label: "Ομαδα" },
  { href: "/proposals/concept-1/equipment", label: "Εξοπλισμος" },
  { href: "/proposals/concept-1/certifications", label: "Πιστοποιησεις" },
  { href: "/proposals/concept-1/contact", label: "Επικοινωνια" },
  { href: "/proposals/concept-1/careers", label: "Καριερα" },
  { href: "/proposals/concept-1#blog", label: "Αρθρα" },
];

function AlkaterLogoWhite({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.197 226.772" className={className}>
      <g fill="#ffffff">
        <path d="M 91.402344 83.144531 L 84.304688 101.132812 L 98.5 101.132812 Z M 102.292969 110.082031 L 80.515625 110.082031 L 77.53125 117.019531 L 65.839844 117.019531 L 89.628906 62.824219 L 93.257812 62.824219 L 116.96875 117.019531 L 105.277344 117.019531 Z" />
        <path d="M 153.367188 117.019531 L 139.496094 84.679688 L 125.625 117.019531 L 113.929688 117.019531 L 137.71875 62.824219 L 141.347656 62.824219 L 165.0625 117.019531 Z" />
        <path d="M 177.371094 99.304688 L 182.457031 94.089844 L 189.585938 101.519531 L 204.558594 101.519531 L 189.949219 86.601562 L 213.554688 62.820312 L 198.753906 62.820312 L 177.304688 84.105469 L 177.304688 62.820312 L 166.996094 62.820312 L 166.996094 116.53125 C 166.996094 116.667969 166.996094 116.773438 166.980469 117.027344 L 177.132812 107.035156 Z" />
        <path d="M 250.847656 82.621094 L 233.828125 82.621094 L 233.828125 72.78125 L 278.832031 72.78125 L 278.832031 82.621094 L 261.734375 82.621094 L 261.734375 126.007812 L 250.847656 126.007812 Z" />
        <path d="M 278.832031 72.78125 L 314.640625 72.78125 L 314.640625 82.621094 L 289.71875 82.621094 L 289.71875 93.425781 L 308.027344 93.425781 L 308.027344 102.703125 L 289.71875 102.703125 L 289.71875 116.171875 L 315.609375 116.171875 L 315.609375 126.007812 L 278.832031 126.007812 Z" />
        <path d="M 339.152344 97.703125 C 344.234375 97.703125 347.21875 94.554688 347.21875 89.957031 C 347.21875 85.441406 344.074219 82.378906 339.152344 82.378906 L 330.042969 82.378906 L 330.042969 97.703125 Z M 319.152344 72.78125 L 339.152344 72.78125 C 350.285156 72.78125 358.347656 79.714844 358.347656 89.957031 C 358.347656 100.121094 350.285156 107.21875 339.152344 107.21875 L 330.042969 107.21875 L 330.042969 126.011719 L 319.152344 126.011719 Z" />
        <path d="M 204.558594 101.519531 L 189.585938 101.519531 L 166.964844 124.171875 L 167.011719 125.992188 L 179.957031 125.835938 L 197.09375 108.722656 Z" />
        <path d="M 228.210938 62.832031 L 200.941406 90.304688 L 208.066406 97.734375 L 218.875 87.097656 L 218.875 107.1875 L 208.164062 107.1875 L 198.308594 117.027344 L 218.875 117.027344 L 218.875 126.007812 L 229.183594 126.007812 L 229.183594 62.820312 Z" />
      </g>
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
    </svg>
  );
}

export function InnerPageLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <main className="bg-[#111111] min-h-screen text-[#F5F3EE] antialiased selection:bg-[#E63B2E] selection:text-white font-['Space_Grotesk']">
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      `}} />

      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="innerNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#innerNoiseFilter)" />
        </svg>
      </div>

      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/proposals/concept-1" className="inline-flex items-center gap-2 font-['Space_Mono'] uppercase tracking-widest text-sm hover:text-[#E63B2E] transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Πισω
        </Link>
        <Link href="/proposals/concept-1">
          <AlkaterLogoWhite className="h-24 w-auto" />
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center gap-2 font-['Space_Mono'] uppercase tracking-widest text-sm hover:text-[#E63B2E] transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          Μενου
        </button>
      </div>

      {/* Mobile/Desktop Nav Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[90] bg-[#111111]/95 backdrop-blur-xl flex items-center justify-center">
          <nav className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-3xl md:text-5xl font-bold uppercase tracking-tighter transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#E63B2E]"
                    : "text-[#F5F3EE] hover:text-[#E63B2E]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {children}
      <Footer />
    </main>
  );
}

export function PageHero({ label, title, subtitle, image }: { label: string; title: React.ReactNode; subtitle: string; image?: string }) {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {image && (
        <>
          <div className="absolute inset-0 z-0">
            <img src={image} alt="" className="w-full h-full object-cover opacity-30 grayscale-[0.5]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/60 z-0" />
        </>
      )}
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-[2px] bg-[#E63B2E]" />
          <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">{label}</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-8">
          {title}
        </h1>
        <p className="font-['Space_Mono'] text-lg md:text-xl text-[#E8E4DD]/70 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="w-8 h-[2px] bg-[#E63B2E]" />
        <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">{label}</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-[1.1]">
        {title}
      </h2>
    </div>
  );
}
