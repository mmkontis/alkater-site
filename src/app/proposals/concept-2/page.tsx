"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  HardHat,
  Truck,
  Paintbrush,
  Ruler,
  Droplets,
  PhoneCall,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { LOGO } from "@/lib/photos";

const HIGH_RES_PHOTOS = [
  "/HighRes/image-1772753897780.jpg",
  "/HighRes/image-1772753887996.png",
  "/HighRes/image-1772753878297.png",
  "/HighRes/image-1772753736848.png",
  "/HighRes/image-1772753692358.png",
  "/HighRes/image-1772753675852.jpg",
  "/HighRes/image-1772753660495.png",
  "/HighRes/image-1772753640619.jpg",
];

const SERVICES = [
  { icon: Building2, title: "Δημόσια Έργα", desc: "Κατασκευή και συντήρηση δημοσίων υποδομών με τήρηση αυστηρών προδιαγραφών." },
  { icon: HardHat, title: "Οικοδομικά Έργα", desc: "Ολοκληρωμένες κατασκευαστικές λύσεις — από θεμελίωση μέχρι παράδοση." },
  { icon: Truck, title: "Οδοποιία & Ασφαλτοστρώσεις", desc: "Κατασκευή και συντήρηση οδικών δικτύων με σύγχρονα μηχανήματα." },
  { icon: Paintbrush, title: "Διαγραμμίσεις & Σήμανση", desc: "Οριζόντια σήμανση οδών, διαβάσεις πεζών και ζώνες ασφαλείας." },
  { icon: Ruler, title: "Χωματουργικά Έργα", desc: "Εκσκαφές, επιχωματώσεις, διαμορφώσεις εδάφους." },
  { icon: Droplets, title: "Υδραυλικά Έργα", desc: "Δίκτυα ύδρευσης, αποχέτευσης και αποστράγγισης." },
];

const PROJECTS = [
  { src: "/Photos/project-1.jpg", title: "Οδοποιία Εθνικής Οδού", category: "Ασφαλτοστρώσεις" },
  { src: "/Photos/project-3.jpg", title: "Αστική Ανάπλαση", category: "Δημόσια Έργα" },
  { src: "/Photos/project-5.jpg", title: "Βιομηχανικό Κτίριο", category: "Οικοδομικά" },
  { src: "/Photos/project-7.jpg", title: "Λιμενικά Έργα", category: "Υποδομές" },
  { src: "/Photos/project-9.jpg", title: "Διαμόρφωση Χώρου", category: "Χωματουργικά" },
  { src: "/Photos/project-11.jpg", title: "Δίκτυο Ύδρευσης", category: "Υδραυλικά" },
];

const NAV_LINKS: [string, string][] = [
  ["Υπηρεσίες", "#services"],
  ["Έργα", "#projects"],
  ["Εταιρεία", "#about"],
  ["Επικοινωνία", "#contact"],
];

export default function Concept2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* ── NAVBAR ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1A1A1A]/95 shadow-lg backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="#" className="shrink-0">
            <Image src={LOGO} alt="Alkater" width={140} height={46} className="object-contain" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-none px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="ml-4 inline-flex items-center gap-2 bg-[#A00000] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#C00000]"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              Καλέστε μας
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 text-white lg:hidden"
            aria-label="Μενού"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#1A1A1A] lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
          >
            <source src="/Videos/construction/09_asphalt_dump_truck_initial_v1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />
        </div>

        <div
          className="pointer-events-none absolute -right-32 top-0 z-10 h-full w-96 opacity-15"
          style={{ background: "#004868", transform: "skewX(-12deg)" }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 z-10 h-64 w-64 opacity-10"
          style={{ background: "#A00000", transform: "skewX(-12deg)" }}
        />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#004868]">
            Concept 02 — Industrial Bold
          </span>
          <h1 className="mt-4 max-w-2xl text-6xl font-black leading-none tracking-tight md:text-8xl">
            ΧΤΙΖΟΥΜΕ<br />
            <span style={{ color: "#A00000" }}>ΤΟ</span> ΑΥΡΙΟ
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
            Τεχνική αρτιότητα, εμπειρία δεκαετιών και δέσμευση στην ποιότητα
            — αυτές είναι οι αξίες που οικοδομούν κάθε μας έργο.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 bg-[#A00000] px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#C00000]"
            >
              Τα Έργα μας
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#contact"
              className="border border-white/20 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white/70 hover:border-white hover:text-white transition-colors"
            >
              Επικοινωνία
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <Link href="#stats" className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </Link>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <section className="hidden sm:flex gap-2 overflow-hidden px-6 py-4 lg:px-8">
        <div className="relative h-36 md:h-48 flex-1 overflow-hidden group" style={{ minWidth: 100 }}>
          <video
            autoPlay loop muted playsInline
            className="absolute inset-0 h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          >
            <source src="/Videos/construction/08_road_line_painting_initial_v2.mp4" type="video/mp4" />
          </video>
        </div>
        {HIGH_RES_PHOTOS.slice(1, 5).map((src, i) => (
          <div key={i} className="relative h-36 md:h-48 flex-1 overflow-hidden" style={{ minWidth: 100 }}>
            <Image src={src} alt="" fill className="object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
          </div>
        ))}
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-white/10 px-6 py-8 md:py-12">
        {[
          ["200+", "Ολοκληρωμένα Έργα"],
          ["25+", "Χρόνια Εμπειρίας"],
          ["50+", "Συνεργάτες"],
          ["100%", "Δέσμευση"],
        ].map(([n, l]) => (
          <div key={l} className="border-r border-white/10 px-6 last:border-r-0 text-center py-4">
            <p className="text-3xl md:text-5xl font-black" style={{ color: "#004868" }}>{n}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/40">{l}</p>
          </div>
        ))}
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#A00000]">Υπηρεσίες</span>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Τι <span className="text-[#004868]">Κατασκευάζουμε</span>
            </h2>
            <div className="mt-4 h-1 w-20 bg-[#A00000]" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="group border border-white/10 bg-white/[0.03] p-8 transition-all hover:border-[#004868]/50 hover:bg-white/[0.06]"
              >
                <service.icon className="h-8 w-8 text-[#004868] mb-5" />
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{service.desc}</p>
                <div className="mt-4 h-0.5 w-0 bg-[#A00000] transition-all duration-500 group-hover:w-12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24 lg:py-32 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#A00000]">Portfolio</span>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Τα <span className="text-[#004868]">Έργα</span> μας
            </h2>
            <div className="mt-4 h-1 w-20 bg-[#A00000]" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <div key={i} className="group relative overflow-hidden aspect-[4/3] cursor-pointer">
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[#004868]/0 transition-colors duration-500 group-hover:bg-[#004868]/40" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A00000]">{project.category}</span>
                  <h3 className="mt-1 text-lg font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 lg:py-32 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={HIGH_RES_PHOTOS[0]}
                    alt="ΑΛΚΑΤΕΡ"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 h-full w-full border-2 border-[#004868]/30 -z-10"
                />
                <div className="absolute -top-3 -left-3 bg-[#A00000] px-6 py-4">
                  <span className="text-3xl font-black">25+</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Χρόνια</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#A00000]">Η Εταιρεία</span>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Γιατί <span className="text-[#004868]">ΑΛΚΑΤΕΡ</span>
              </h2>
              <div className="mt-4 h-1 w-20 bg-[#A00000]" />
              <p className="mt-8 text-base leading-relaxed text-white/60">
                Με έδρα την Ηγουμενίτσα, η ΑΛΚΑΤΕΡ Α.Ε. έχει καθιερωθεί ως μια από τις πιο
                αξιόπιστες κατασκευαστικές εταιρείες στη Θεσπρωτία και την Ήπειρο.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Κάθε έργο μας αντανακλά δέσμευση στην ποιότητα, τήρηση χρονοδιαγραμμάτων
                και σύγχρονες μεθόδους κατασκευής.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  "Πιστοποιημένη Ποιότητα",
                  "Σύγχρονος Εξοπλισμός",
                  "Τήρηση Προθεσμιών",
                  "Εξειδικευμένο Προσωπικό",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 border border-white/10 px-4 py-3">
                    <div className="h-2 w-2 bg-[#A00000]" />
                    <span className="text-sm font-semibold text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-24 lg:py-32 border-t border-white/10">
        <div
          className="pointer-events-none absolute -right-32 top-0 z-0 h-full w-96 opacity-10"
          style={{ background: "#004868", transform: "skewX(-12deg)" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-16 lg:flex-row">
            <div className="lg:w-1/2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#A00000]">Επικοινωνία</span>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Ας <span className="text-[#004868]">Συνεργαστούμε</span>
              </h2>
              <div className="mt-4 h-1 w-20 bg-[#A00000]" />
              <p className="mt-8 text-base leading-relaxed text-white/50">
                Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες σας
                και να σας προτείνουμε την ιδανική λύση.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="tel:+302665012345"
                  className="inline-flex items-center justify-center gap-2 bg-[#A00000] px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-[#C00000]"
                >
                  <PhoneCall className="h-5 w-5" />
                  Καλέστε μας
                </a>
                <a
                  href="mailto:alkater2024@outlook.com"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white/70 hover:border-white hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  Email
                </a>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="space-y-6 border border-white/10 bg-white/[0.03] p-6 md:p-10">
                {[
                  { icon: MapPin, label: "Έδρα", primary: "Ηγουμενίτσα, Θεσπρωτία", secondary: "Ήπειρος, Ελλάδα" },
                  { icon: PhoneCall, label: "Τηλέφωνο", primary: "+30 26650 XXXXX" },
                  { icon: Mail, label: "Email", primary: "alkater2024@outlook.com" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#004868]/20">
                      <item.icon className="h-5 w-5 text-[#004868]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{item.label}</h4>
                      <p className="mt-0.5 text-white/60">{item.primary}</p>
                      {item.secondary && <p className="text-sm text-white/35">{item.secondary}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Image src={LOGO} alt="ΑΛΚΑΤΕΡ" width={140} height={46} className="object-contain mb-6" />
              <p className="max-w-sm text-sm leading-relaxed text-white/40">
                Κατασκευαστική Εταιρεία Δημοσίων & Ιδιωτικών Έργων. Χτίζουμε υποδομές
                που αντέχουν στον χρόνο.
              </p>
              <div className="mt-6 flex h-1 w-20">
                <div className="flex-1 bg-[#004868]" />
                <div className="flex-1 bg-[#A00000]" />
              </div>
            </div>
            <div>
              <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/70">Σύνδεσμοι</h3>
              <ul className="space-y-3 text-sm text-white/40">
                {NAV_LINKS.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/70">Επικοινωνία</h3>
              <ul className="space-y-3 text-sm text-white/40">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Ηγουμενίτσα</li>
                <li className="flex items-center gap-2"><PhoneCall className="h-4 w-4 shrink-0" /> +30 26650 XXXXX</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> alkater2024@outlook.com</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 text-xs text-white/30 md:flex-row">
            <p>&copy; {new Date().getFullYear()} ΑΛΚΑΤΕΡ Α.Ε.</p>
            <Link href="/proposals" className="underline hover:text-white mt-2 md:mt-0">Επιστροφή στα proposals</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
