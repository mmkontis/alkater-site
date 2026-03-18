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
  ChevronDown,
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
  { icon: Building2, title: "Δημόσια Έργα", desc: "Κατασκευή και συντήρηση δημοσίων υποδομών με τήρηση αυστηρών προδιαγραφών και χρονοδιαγραμμάτων." },
  { icon: HardHat, title: "Οικοδομικά Έργα", desc: "Ολοκληρωμένες κατασκευαστικές λύσεις — από τη θεμελίωση μέχρι την παράδοση κλειδί στο χέρι." },
  { icon: Truck, title: "Οδοποιία & Ασφαλτοστρώσεις", desc: "Κατασκευή, ανακατασκευή και συντήρηση οδικών δικτύων με σύγχρονα μηχανήματα." },
  { icon: Paintbrush, title: "Διαγραμμίσεις & Σήμανση", desc: "Οριζόντια σήμανση οδών, διαβάσεις πεζών, χώροι στάθμευσης και ζώνες ασφαλείας." },
  { icon: Ruler, title: "Χωματουργικά Έργα", desc: "Εκσκαφές, επιχωματώσεις, διαμορφώσεις εδάφους και προετοιμασία εργοταξίου." },
  { icon: Droplets, title: "Υδραυλικά Έργα", desc: "Δίκτυα ύδρευσης, αποχέτευσης, αποστράγγισης και τεχνικά έργα υποδομής." },
];

const NAV_LINKS: [string, string][] = [
  ["Υπηρεσίες", "#services"],
  ["Έργα", "#projects"],
  ["Εταιρεία", "#about"],
  ["Επικοινωνία", "#contact"],
];

/* ─── Parallax helper ─── */
function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollY;
}

/* ─── Intersection observer for reveal ─── */
function useInView(threshold = 0.12) {
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

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Concept5() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollY = useParallax();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F3EE] font-sans">
      {/* Grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-[60] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* ── NAVBAR ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#111111]/95 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="#" className="text-xl font-bold tracking-tighter">
            ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] font-medium text-[#F5F3EE]/50 hover:text-[#F5F3EE] transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#E63B2E] px-6 py-2.5 text-[13px] font-bold text-white transition-all hover:brightness-110"
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
          <div className="border-t border-white/5 bg-[#111111] lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm text-[#F5F3EE]/70 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay loop muted playsInline
            className="h-full w-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <source src="/Videos/construction/11_road_survey_trimmed_8s_v2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#111111]/60 to-[#111111]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#E63B2E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                Alkater — Κατασκευάζουμε
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter">
              CONSTRUCT<br />
              THE{" "}
              <em className="font-serif font-normal italic text-[#E8E4DD]/60">
                Infrastructure.
              </em>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#F5F3EE]/40">
              Η ΑΛΚΑΤΕΡ Α.Ε. κατασκευάζει δημόσια & ιδιωτικά έργα με ποιότητα,
              αξιοπιστία και σύγχρονο εξοπλισμό.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#projects"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#E63B2E] px-8 text-[15px] font-bold text-white transition-all hover:shadow-lg hover:shadow-[#E63B2E]/25"
              >
                Δείτε τα Έργα μας
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#services"
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#F5F3EE]/15 px-8 text-[15px] font-medium text-[#F5F3EE]/70 hover:border-[#F5F3EE]/40 hover:text-white transition-colors"
              >
                Υπηρεσίες
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
          <Link href="#stats" className="flex flex-col items-center gap-2 text-[#F5F3EE]/30 hover:text-[#F5F3EE]/60 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="border-y border-white/5">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {[
            ["200+", "Ολοκληρωμένα Έργα"],
            ["25+", "Χρόνια Εμπειρίας"],
            ["50+", "Ενεργοί Συνεργάτες"],
            ["100%", "Τήρηση Προθεσμιών"],
          ].map(([n, l]) => (
            <Reveal key={l} className="px-6 py-12 text-center">
              <p className="text-4xl font-black tracking-tight text-[#E63B2E] md:text-5xl">{n}</p>
              <p className="mt-2 text-xs font-mono uppercase tracking-widest text-[#F5F3EE]/30">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#E63B2E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                01 — Υπηρεσίες
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              Τι <em className="font-serif font-normal italic text-[#E8E4DD]/50">Κατασκευάζουμε</em>
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={i}>
                <div className="group relative overflow-hidden border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-[#E63B2E]/30 hover:bg-white/[0.04]">
                  <service.icon className="h-8 w-8 text-[#E63B2E] mb-6" />
                  <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-[#F5F3EE]/40">{service.desc}</p>
                  <div className="mt-6 h-px w-0 bg-[#E63B2E] transition-all duration-700 group-hover:w-16" />
                  <span className="absolute top-6 right-6 font-mono text-[10px] text-[#F5F3EE]/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 lg:py-36 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#E63B2E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                02 — Portfolio
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              Ενδεικτικά <em className="font-serif font-normal italic text-[#E8E4DD]/50">Έργα</em>
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { src: "/Photos/project-6.jpg", title: "Οδοποιία Εθνικής Οδού", category: "Ασφαλτοστρώσεις", large: true },
              { src: "/Photos/project-10.jpg", title: "Αστική Ανάπλαση", category: "Δημόσια Έργα", large: false },
              { src: "/Photos/project-14.jpg", title: "Βιομηχανικό Κτίριο", category: "Οικοδομικά", large: false },
              { src: "/Photos/project-17.jpg", title: "Λιμενικά Έργα", category: "Υποδομές", large: true },
              { src: "/Photos/project-19.jpg", title: "Διαμόρφωση Χώρου", category: "Χωματουργικά", large: false },
              { src: "/Photos/project-20.jpg", title: "Δίκτυο Ύδρευσης", category: "Υδραυλικά", large: false },
            ].map((project, i) => (
              <Reveal
                key={i}
                className={project.large ? "md:col-span-2" : ""}
              >
                <div className={`group relative overflow-hidden cursor-pointer ${project.large ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#111111]/60 group-hover:bg-[#111111]/40 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63B2E]">{project.category}</span>
                    <h3 className="mt-1 text-xl font-bold">{project.title}</h3>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 text-[#E63B2E]" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 lg:py-36 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-20 lg:flex-row lg:items-center">
            <Reveal className="lg:w-1/2">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={HIGH_RES_PHOTOS[0]}
                    alt="ΑΛΚΑΤΕΡ"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 border border-[#E63B2E]/20 h-full w-full -z-10" />
              </div>
            </Reveal>

            <Reveal className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-[#E63B2E]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                  03 — Η Εταιρεία
                </span>
              </div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Γιατί <em className="font-serif font-normal italic text-[#E8E4DD]/50">ΑΛΚΑΤΕΡ</em>
              </h2>
              <p className="mt-8 text-base leading-relaxed text-[#F5F3EE]/40">
                Με έδρα την Ηγουμενίτσα, η ΑΛΚΑΤΕΡ Α.Ε. έχει καθιερωθεί ως μια από τις πιο
                αξιόπιστες κατασκευαστικές εταιρείες στη Θεσπρωτία και την Ήπειρο.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#F5F3EE]/40">
                Κάθε έργο μας αντανακλά δέσμευση στην ποιότητα, τήρηση χρονοδιαγραμμάτων
                και σύγχρονες μεθόδους κατασκευής.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-4">
                {[
                  ["25+", "Χρόνια Εμπειρίας"],
                  ["150+", "Ολοκληρωμένα Έργα"],
                  ["50+", "Ενεργοί Συνεργάτες"],
                  ["100%", "Τήρηση Προθεσμιών"],
                ].map(([n, l]) => (
                  <div key={l} className="border border-white/5 p-5">
                    <p className="text-2xl font-black text-[#E63B2E]">{n}</p>
                    <p className="mt-1 text-xs font-mono text-[#F5F3EE]/30">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-28 lg:py-36 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0">
          <Image src={HIGH_RES_PHOTOS[1]} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#111111]/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <Reveal className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-[#E63B2E]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E63B2E]">
                  04 — Επικοινωνία
                </span>
              </div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Ας <em className="font-serif font-normal italic text-[#E8E4DD]/50">Συνεργαστούμε</em>
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

            <Reveal className="w-full lg:w-1/2">
              <div className="space-y-7 border border-white/5 bg-white/[0.03] p-6 md:p-10 backdrop-blur-sm">
                {[
                  { icon: MapPin, label: "Έδρα", primary: "Ηγουμενίτσα, Θεσπρωτία", secondary: "Ήπειρος, Ελλάδα" },
                  { icon: PhoneCall, label: "Τηλέφωνο", primary: "+30 26650 XXXXX" },
                  { icon: Mail, label: "Email", primary: "alkater2024@outlook.com" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10">
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
      <footer className="border-t border-white/5 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="text-xl font-bold tracking-tighter mb-6">
                ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
              </p>
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
