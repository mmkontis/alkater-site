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
  Play,
} from "lucide-react";
import { LOGO, BRAND } from "@/lib/photos";

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

const NAV_LINKS: [string, string][] = [
  ["Υπηρεσίες", "#services"],
  ["Έργα", "#projects"],
  ["Εταιρεία", "#about"],
  ["Επικοινωνία", "#contact"],
];

export default function Concept3() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* ── NAVBAR ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 shadow-lg backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="#" className="shrink-0">
            <Image src={LOGO} alt="Alkater" width={140} height={46} className="object-contain" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="ml-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: BRAND.red }}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              Επικοινωνία
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
          <div className="border-t border-white/10 bg-black lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO (Full-bleed cinematic) ── */}
      <section className="relative h-screen overflow-hidden">
        {active === 0 ? (
          <video
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          >
            <source src="/Videos/construction/01_cement_truck_trench_ext_v1.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src={HIGH_RES_PHOTOS[active]}
            alt="Hero"
            fill
            className="object-cover transition-all duration-700"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: BRAND.blue }}>
              Concept 03 — Cinematic Hero
            </span>
            <h1 className="mt-3 max-w-3xl text-5xl font-black leading-none md:text-7xl">
              Κάθε Έργο,<br />μια <span style={{ color: BRAND.red }}>Ιστορία</span>
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/60">
              Φωτογραφία πρώτης γραμμής που μεταφέρει το μέγεθος και την ποιότητα
              κάθε κατασκευαστικού μας έργου.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest text-white"
                style={{ background: BRAND.red }}
              >
                Εξερευνήστε τα Έργα
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#services"
                className="rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white/70 hover:border-white hover:text-white transition-colors"
              >
                Υπηρεσίες
              </Link>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-8 right-6 z-10 hidden gap-2 sm:flex lg:right-10">
          {HIGH_RES_PHOTOS.slice(0, 5).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-14 w-20 overflow-hidden rounded transition-all ${
                i === active ? "ring-2 ring-white" : "opacity-50 hover:opacity-100"
              }`}
            >
              {i === 0 ? (
                <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" />
                </div>
              ) : (
                <Image src={src} alt="" fill className="object-cover" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {[
            ["200+", "Ολοκληρωμένα Έργα"],
            ["25+", "Χρόνια Εμπειρίας"],
            ["50+", "Συνεργάτες"],
            ["100%", "Δέσμευση"],
          ].map(([n, l]) => (
            <div key={l} className="px-6 py-10 text-center">
              <p className="text-4xl font-black" style={{ color: BRAND.blue }}>{n}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-widest text-white/40">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: BRAND.blue }}>
              Τι κάνουμε
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Οι Υπηρεσίες μας
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-sm text-white/50">
              Εξειδικευόμαστε στην κατασκευή έργων υποδομής, προσφέροντας ολοκληρωμένες
              λύσεις για τον δημόσιο και ιδιωτικό τομέα.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden rounded-xl">
                  <Image
                    src={HIGH_RES_PHOTOS[i]}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <service.icon className="h-6 w-6 mb-3" style={{ color: BRAND.blue }} />
                    <h3 className="text-lg font-bold">{service.title}</h3>
                    <p className="mt-1 text-sm text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS GALLERY ── */}
      <section id="projects" className="py-24 lg:py-32 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: BRAND.blue }}>
              Portfolio
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Ενδεικτικά Έργα
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              { src: "/Photos/project-2.jpg", label: "Κατασκευές", span: "md:col-span-2 md:row-span-2", tall: true },
              { src: "/Photos/project-4.jpg", label: "Ανακαινίσεις", span: "" },
              { src: "/Photos/project-8.jpg", label: "Τεχνικά Έργα", span: "" },
              { src: "/Photos/project-12.jpg", label: "Οδοποιία", span: "" },
              { src: "/Photos/project-15.jpg", label: "Χωματουργικά", span: "" },
              { src: "/Photos/project-18.jpg", label: "Ασφαλτοστρώσεις", span: "md:col-span-2" },
            ].map((item, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${item.span} ${
                  'tall' in item && item.tall ? "aspect-[4/3] md:aspect-square" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-lg font-bold">{item.label}</p>
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={HIGH_RES_PHOTOS[0]}
                  alt="ΑΛΚΑΤΕΡ"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-8">
                    {[["25+", "Χρόνια"], ["150+", "Έργα"], ["50+", "Ομάδα"]].map(([n, l]) => (
                      <div key={l}>
                        <p className="text-2xl font-black" style={{ color: BRAND.red }}>{n}</p>
                        <p className="text-xs text-white/60">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: BRAND.blue }}>
                Η Εταιρεία
              </span>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Γιατί να μας<br />
                <span style={{ color: BRAND.red }}>Εμπιστευτείτε</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/60">
                Με έδρα την Ηγουμενίτσα, η ΑΛΚΑΤΕΡ Α.Ε. έχει καθιερωθεί ως μια από τις πιο
                αξιόπιστες κατασκευαστικές εταιρείες στη Θεσπρωτία και την Ήπειρο.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Κάθε έργο μας αντανακλά δέσμευση στην ποιότητα, τήρηση χρονοδιαγραμμάτων
                και σύγχρονες μεθόδους κατασκευής.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Πολυετής εμπειρία σε δημόσια & ιδιωτικά έργα",
                  "Ιδιόκτητα σύγχρονα μηχανήματα",
                  "Πιστοποιημένη ποιότητα & ασφάλεια",
                  "Τήρηση χρονοδιαγραμμάτων & προϋπολογισμών",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.red }} />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HIGH_RES_PHOTOS[1]} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="lg:w-1/2 text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: BRAND.blue }}>
                Επικοινωνία
              </span>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Έχετε κάποιο έργο<br />στο <span style={{ color: BRAND.red }}>μυαλό</span> σας;
              </h2>
              <p className="mt-6 max-w-md text-base text-white/50 mx-auto lg:mx-0">
                Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες σας.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
                <a
                  href="tel:+302665012345"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white"
                  style={{ background: BRAND.red }}
                >
                  <PhoneCall className="h-5 w-5" />
                  Καλέστε μας
                </a>
                <a
                  href="mailto:alkater2024@outlook.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white/70 hover:border-white hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  Email
                </a>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-10 backdrop-blur-sm">
                {[
                  { icon: MapPin, label: "Έδρα", primary: "Ηγουμενίτσα, Θεσπρωτία", secondary: "Ήπειρος, Ελλάδα" },
                  { icon: PhoneCall, label: "Τηλέφωνο", primary: "+30 26650 XXXXX" },
                  { icon: Mail, label: "Email", primary: "alkater2024@outlook.com" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <item.icon className="h-5 w-5 text-white" />
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
      <footer className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Image src={LOGO} alt="ΑΛΚΑΤΕΡ" width={140} height={46} className="object-contain mb-6" />
              <p className="max-w-sm text-sm leading-relaxed text-white/40">
                Κατασκευαστική Εταιρεία Δημοσίων & Ιδιωτικών Έργων.
                Κάθε έργο, μια ιστορία.
              </p>
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
