"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/proposals/concept-1", label: "Αρχικη" },
  { href: "/proposals/concept-1/about", label: "Εταιρεια" },
  { href: "/proposals/concept-1/certifications", label: "Πιστοποιησεις" },
  { href: "#blog", label: "Αρθρα" },
  { href: "/proposals/concept-1/contact", label: "Επικοινωνια" },
];

export function NavMenu() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Sticky top bar — appears after scrolling past hero */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="backdrop-blur-2xl border-b shadow-lg"
          style={{
            backgroundColor: "color-mix(in srgb, color-mix(in srgb, var(--bg-primary) 85%, var(--link-color)) 92%, transparent)",
            borderColor: "color-mix(in srgb, var(--accent) 20%, var(--border-color))",
          }}
        >
          <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-20">
            <Link href="/proposals/concept-1" className="inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="65 60 295 70" className="h-10 w-auto">
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
              </svg>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-['Space_Mono'] text-xs uppercase tracking-[0.12em] hover:text-[#E63B2E] transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden font-['Space_Mono'] uppercase tracking-widest text-xs flex items-center gap-2 hover:text-[#E63B2E] transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger — visible only while in hero area */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed top-6 left-6 z-[55] flex items-center gap-2 font-['Space_Mono'] uppercase tracking-widest text-sm md:mix-blend-difference text-white hover:text-[#E63B2E] transition-all duration-500 ${
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Menu className="w-6 h-6" />
        <span className="hidden md:inline">Μενου</span>
      </button>

      {/* Fullscreen overlay menu */}
      {open && (
        <div className="fixed inset-0 z-[95] bg-[#111111]/95 backdrop-blur-xl flex items-center justify-center">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 font-['Space_Mono'] uppercase tracking-widest text-sm text-white hover:text-[#E63B2E] transition-colors flex items-center gap-2"
          >
            <X className="w-6 h-6" />
            Κλεισιμο
          </button>

          <nav className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] uppercase tracking-tighter text-[#F5F3EE] hover:text-[#E63B2E] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
