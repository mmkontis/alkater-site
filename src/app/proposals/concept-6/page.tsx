"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ArrowUpRight,
} from "lucide-react";

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
  { icon: Building2, title: "Δημόσια Έργα", desc: "Κατασκευή και συντήρηση δημοσίων υποδομών με τήρηση αυστηρών προδιαγραφών και χρονοδιαγραμμάτων.", image: HIGH_RES_PHOTOS[4] },
  { icon: HardHat, title: "Οικοδομικά Έργα", desc: "Ολοκληρωμένες κατασκευαστικές λύσεις — από τη θεμελίωση μέχρι την παράδοση κλειδί στο χέρι.", image: HIGH_RES_PHOTOS[0] },
  { icon: Truck, title: "Οδοποιία & Ασφαλτοστρώσεις", desc: "Κατασκευή, ανακατασκευή και συντήρηση οδικών δικτύων με σύγχρονα μηχανήματα.", image: HIGH_RES_PHOTOS[1] },
  { icon: Paintbrush, title: "Διαγραμμίσεις & Σήμανση", desc: "Οριζόντια σήμανση οδών, διαβάσεις πεζών, χώροι στάθμευσης και ζώνες ασφαλείας.", image: HIGH_RES_PHOTOS[7] },
  { icon: Ruler, title: "Χωματουργικά Έργα", desc: "Εκσκαφές, επιχωματώσεις, διαμορφώσεις εδάφους και προετοιμασία εργοταξίου.", image: HIGH_RES_PHOTOS[6] },
  { icon: Droplets, title: "Υδραυλικά Έργα", desc: "Δίκτυα ύδρευσης, αποχέτευσης, αποστράγγισης και τεχνικά έργα υποδομής.", image: HIGH_RES_PHOTOS[5] },
];

const NAV_LINKS: [string, string][] = [
  ["Υπηρεσίες", "#services"],
  ["Έργα", "#projects"],
  ["Εταιρεία", "#about"],
  ["Επικοινωνία", "#contact"],
];

/* ─── Intersection observer for reveal ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(2rem)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Concept6() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#111111] font-sans">
      {/* Noise texture overlay */}
      <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03] mix-blend-multiply">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* ── NAVBAR ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F5F3EE]/90 backdrop-blur-xl border-b border-[#111111]/5 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="#" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Photos/Logo/alkater-logo.svg" alt="ΑΛΚΑΤΕΡ" className="h-10 w-auto" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] font-semibold text-[#111111]/50 hover:text-[#111111] transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#E63B2E] px-6 py-2.5 text-[13px] font-bold text-white transition-all hover:shadow-lg hover:shadow-[#E63B2E]/20"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              Επικοινωνία
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 text-[#111111] lg:hidden"
            aria-label="Μενού"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#111111]/5 bg-[#F5F3EE] lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-[#111111]/70 hover:text-[#111111]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        {/* Background radial accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#E8E4DD_0%,transparent_60%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <Reveal>
                <div className="border-l-2 border-[#E63B2E] pl-4 mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                    Alkater — Κατασκευάζουμε
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.88] tracking-tighter">
                  CONSTRUCT<br />
                  THE{" "}
                  <em className="font-serif font-normal italic text-[#E8E4DD]" style={{ WebkitTextStroke: "1px #111111" }}>
                    Infra&shy;structure.
                  </em>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-[#111111]/50">
                  Η ΑΛΚΑΤΕΡ Α.Ε. κατασκευάζει δημόσια & ιδιωτικά έργα με ποιότητα,
                  αξιοπιστία και σύγχρονο εξοπλισμό — από την Ηγουμενίτσα σε όλη την Ήπειρο.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="#projects"
                    className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#E63B2E] px-8 text-[15px] font-bold text-white transition-all hover:shadow-xl hover:shadow-[#E63B2E]/20"
                  >
                    Δείτε τα Έργα μας
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="#services"
                    className="inline-flex h-14 items-center justify-center rounded-full border-2 border-[#111111]/10 px-8 text-[15px] font-semibold text-[#111111]/70 hover:border-[#111111]/30 hover:text-[#111111] transition-colors"
                  >
                    Υπηρεσίες
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:w-1/2" delay={200}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={HIGH_RES_PHOTOS[3]}
                  alt="Alkater project"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-black text-white">25+</p>
                    <p className="text-xs font-mono text-white/60 uppercase tracking-widest">Χρόνια Εμπειρίας</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-[#111111] text-[#F5F3EE]">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {[
            ["200+", "Ολοκληρωμένα Έργα"],
            ["25+", "Χρόνια Εμπειρίας"],
            ["50+", "Ενεργοί Συνεργάτες"],
            ["100%", "Τήρηση Προθεσμιών"],
          ].map(([n, l], i) => (
            <Reveal key={l} className="px-6 py-12 text-center" delay={i * 100}>
              <p className="text-4xl font-black tracking-tight text-[#E63B2E]">{n}</p>
              <p className="mt-2 text-xs font-mono uppercase tracking-widest text-[#F5F3EE]/30">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES (Protocol Cards) ── */}
      <section id="services" className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mb-20">
            <div className="border-l-2 border-[#E63B2E] pl-4 mb-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                01 — Υπηρεσίες
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              Τι{" "}
              <em className="font-serif font-normal italic text-[#E8E4DD]" style={{ WebkitTextStroke: "0.5px #111111" }}>
                Κατασκευάζουμε
              </em>
            </h2>
          </Reveal>

          {/* Interactive service cards */}
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="lg:w-1/2 space-y-3">
              {SERVICES.map((service, i) => (
                <Reveal key={i} delay={i * 80}>
                  <button
                    onClick={() => setActiveService(i)}
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                      activeService === i
                        ? "border-[#E63B2E]/30 bg-white shadow-lg"
                        : "border-[#111111]/5 bg-white/50 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        activeService === i ? "bg-[#E63B2E] text-white" : "bg-[#E8E4DD] text-[#111111]/50"
                      }`}>
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold">{service.title}</h3>
                          <span className="text-[10px] font-mono text-[#111111]/20">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <p className={`mt-1 text-sm leading-relaxed transition-all duration-300 ${
                          activeService === i ? "text-[#111111]/60 max-h-20 opacity-100" : "text-[#111111]/30 max-h-0 opacity-0 overflow-hidden"
                        }`}>
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>

            <Reveal className="lg:w-1/2 lg:sticky lg:top-28 lg:self-start" delay={200}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={SERVICES[activeService].image}
                  alt={SERVICES[activeService].title}
                  fill
                  className="object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs font-mono text-[#E63B2E] uppercase tracking-widest">{String(activeService + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-2xl font-black text-white">{SERVICES[activeService].title}</h3>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 lg:py-36 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mb-20">
            <div className="border-l-2 border-[#E63B2E] pl-4 mb-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                02 — Portfolio
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              Ενδεικτικά{" "}
              <em className="font-serif font-normal italic text-[#E8E4DD]" style={{ WebkitTextStroke: "0.5px #111111" }}>
                Έργα
              </em>
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { src: "/Photos/project-2.jpg", title: "Οδοποιία Εθνικής Οδού", cat: "Ασφαλτοστρώσεις", span: "md:col-span-2" },
              { src: "/Photos/project-5.jpg", title: "Βιομηχανικό Κτίριο", cat: "Οικοδομικά", span: "" },
              { src: "/Photos/project-9.jpg", title: "Διαμόρφωση Χώρου", cat: "Χωματουργικά", span: "" },
              { src: "/Photos/project-13.jpg", title: "Λιμενικά Έργα", cat: "Υποδομές", span: "md:col-span-2" },
              { src: "/Photos/project-16.jpg", title: "Δίκτυο Ύδρευσης", cat: "Υδραυλικά", span: "md:col-span-2" },
              { src: "/Photos/project-20.jpg", title: "Αστική Ανάπλαση", cat: "Δημόσια Έργα", span: "" },
            ].map((project, i) => (
              <Reveal key={i} className={project.span} delay={i * 80}>
                <div className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[16/10]">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#111111]/40 group-hover:bg-[#111111]/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63B2E]">{project.cat}</span>
                    <h3 className="mt-1 text-lg font-bold text-white">{project.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/0 group-hover:bg-white/20 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-20 lg:flex-row lg:items-center">
            <Reveal className="lg:w-5/12">
              <div className="relative">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={HIGH_RES_PHOTOS[0]}
                    alt="ΑΛΚΑΤΕΡ"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 rounded-xl bg-[#E63B2E] p-4 md:p-6 shadow-xl">
                  <p className="text-3xl font-black text-white">25+</p>
                  <p className="text-xs font-mono text-white/70 uppercase tracking-widest">Χρόνια</p>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:w-7/12" delay={150}>
              <div className="border-l-2 border-[#E63B2E] pl-4 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                  03 — Η Εταιρεία
                </span>
              </div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Γιατί{" "}
                <em className="font-serif font-normal italic text-[#E8E4DD]" style={{ WebkitTextStroke: "0.5px #111111" }}>
                  ΑΛΚΑΤΕΡ
                </em>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-[#111111]/50">
                Με έδρα την Ηγουμενίτσα, η ΑΛΚΑΤΕΡ Α.Ε. έχει καθιερωθεί ως μια από τις πιο
                αξιόπιστες κατασκευαστικές εταιρείες στη Θεσπρωτία και την Ήπειρο.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#111111]/50">
                Κάθε έργο μας αντανακλά δέσμευση στην ποιότητα, τήρηση χρονοδιαγραμμάτων
                και σύγχρονες μεθόδους κατασκευής.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-4">
                {[
                  "Πολυετής εμπειρία",
                  "Σύγχρονα μηχανήματα",
                  "Πιστοποιημένη ποιότητα",
                  "Τήρηση χρονοδιαγραμμάτων",
                  "Ανταγωνιστικό κόστος",
                  "Εξειδικευμένο προσωπικό",
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-white p-4 border border-[#111111]/5">
                    <div className="h-2 w-2 rounded-full bg-[#E63B2E]" />
                    <span className="text-sm font-semibold text-[#111111]/70">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-28 lg:py-36 bg-[#111111] text-[#F5F3EE] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,#1a1a1a_0%,transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <Reveal className="lg:w-1/2">
              <div className="border-l-2 border-[#E63B2E] pl-4 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                  04 — Επικοινωνία
                </span>
              </div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Ας{" "}
                <em className="font-serif font-normal italic text-[#E8E4DD]/30" style={{ WebkitTextStroke: "0.5px #F5F3EE" }}>
                  Συνεργαστούμε
                </em>
              </h2>
              <p className="mt-6 max-w-md text-base text-[#F5F3EE]/40">
                Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες σας
                και να σας προτείνουμε την ιδανική λύση.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="tel:+302665012345"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#E63B2E] px-8 text-[15px] font-bold text-white transition-all hover:shadow-lg hover:shadow-[#E63B2E]/25"
                >
                  <PhoneCall className="h-5 w-5" />
                  Καλέστε μας
                </a>
                <a
                  href="mailto:alkater2024@outlook.com"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#F5F3EE]/15 px-8 text-[15px] font-medium text-[#F5F3EE]/70 hover:border-[#F5F3EE]/40 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  Email
                </a>
              </div>
            </Reveal>

            <Reveal className="w-full lg:w-1/2" delay={150}>
              <div className="space-y-7 rounded-2xl border border-white/5 bg-white/[0.03] p-6 md:p-10 backdrop-blur-sm">
                {[
                  { icon: MapPin, label: "Έδρα", primary: "Ηγουμενίτσα, Θεσπρωτία", secondary: "Ήπειρος, Ελλάδα" },
                  { icon: PhoneCall, label: "Τηλέφωνο", primary: "+30 26650 XXXXX" },
                  { icon: Mail, label: "Email", primary: "alkater2024@outlook.com" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5">
                      <item.icon className="h-5 w-5 text-[#E63B2E]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{item.label}</h4>
                      <p className="mt-0.5 text-[#F5F3EE]/50">{item.primary}</p>
                      {item.secondary && <p className="text-sm text-[#F5F3EE]/25">{item.secondary}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0A0A] text-[#F5F3EE]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Photos/Logo/alkater-logo.svg" alt="ΑΛΚΑΤΕΡ" className="h-10 w-auto brightness-0 invert mb-6" />
              <p className="max-w-sm text-sm leading-relaxed text-[#F5F3EE]/30">
                Κατασκευαστική Εταιρεία Δημοσίων & Ιδιωτικών Έργων.
                Χτίζουμε υποδομές που αντέχουν στον χρόνο.
              </p>
              <div className="mt-6 h-px w-20 bg-[#E63B2E]" />
            </div>
            <div>
              <h3 className="mb-6 text-xs font-mono uppercase tracking-widest text-[#F5F3EE]/50">Σύνδεσμοι</h3>
              <ul className="space-y-3 text-sm text-[#F5F3EE]/30">
                {NAV_LINKS.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-xs font-mono uppercase tracking-widest text-[#F5F3EE]/50">Επικοινωνία</h3>
              <ul className="space-y-3 text-sm text-[#F5F3EE]/30">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Ηγουμενίτσα</li>
                <li className="flex items-center gap-2"><PhoneCall className="h-4 w-4 shrink-0" /> +30 26650 XXXXX</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> alkater2024@outlook.com</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 text-xs text-[#F5F3EE]/20 md:flex-row">
            <p>&copy; {new Date().getFullYear()} ΑΛΚΑΤΕΡ Α.Ε.</p>
            <Link href="/proposals" className="underline hover:text-white mt-2 md:mt-0">Επιστροφή στα proposals</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
