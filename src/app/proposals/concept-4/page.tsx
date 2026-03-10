"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  HardHat,
  Ruler,
  Truck,
  Paintbrush,
  Droplets,
  PhoneCall,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Shield,
  Clock,
  Users,
} from "lucide-react";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  animation = "animate-fade-up",
  delay = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: string;
  as?: React.ElementType;
}) {
  const { ref, visible } = useInView();
  return (
    <Tag
      ref={ref}
      className={`${className} ${visible ? `${animation} ${delay}` : "opacity-0"}`}
    >
      {children}
    </Tag>
  );
}

/* ─── Data ─── */
const SERVICES = [
  {
    icon: Building2,
    title: "Δημόσια Έργα",
    description: "Κατασκευή και συντήρηση δημοσίων υποδομών με τήρηση αυστηρών προδιαγραφών και χρονοδιαγραμμάτων.",
    image: "/HighRes/image-1772753692358.jpg",
  },
  {
    icon: HardHat,
    title: "Οικοδομικά Έργα",
    description: "Ολοκληρωμένες κατασκευαστικές λύσεις — από τη θεμελίωση μέχρι την παράδοση κλειδί στο χέρι.",
    image: "/HighRes/image-1772753897780.jpg",
  },
  {
    icon: Truck,
    title: "Οδοποιία & Ασφαλτοστρώσεις",
    description: "Κατασκευή, ανακατασκευή και συντήρηση οδικών δικτύων με σύγχρονα μηχανήματα.",
    image: "/HighRes/image-1772753887996.jpg",
  },
  {
    icon: Paintbrush,
    title: "Διαγραμμίσεις & Σήμανση",
    description: "Οριζόντια σήμανση οδών, διαβάσεις πεζών, χώροι στάθμευσης και ζώνες ασφαλείας.",
    image: "/HighRes/image-1772753640619.jpg",
  },
  {
    icon: Ruler,
    title: "Χωματουργικά Έργα",
    description: "Εκσκαφές, επιχωματώσεις, διαμορφώσεις εδάφους και προετοιμασία εργοταξίου.",
    image: "/HighRes/image-1772753660495.jpg",
  },
  {
    icon: Droplets,
    title: "Υδραυλικά Έργα",
    description: "Δίκτυα ύδρευσης, αποχέτευσης, αποστράγγισης και τεχνικά έργα υποδομής.",
    image: "/HighRes/image-1772753675852.jpg",
  },
];

const STATS = [
  { value: "25+", label: "Χρόνια Εμπειρίας" },
  { value: "150+", label: "Ολοκληρωμένα Έργα" },
  { value: "50+", label: "Ενεργοί Συνεργάτες" },
  { value: "100%", label: "Τήρηση Προθεσμιών" },
];

const WHY_US = [
  { icon: Shield, title: "Ποιότητα & Ασφάλεια", text: "Αυστηρά πρότυπα ποιότητας και ασφαλείας σε κάθε έργο." },
  { icon: Clock, title: "Τήρηση Χρονοδιαγραμμάτων", text: "Παραδίδουμε εντός προθεσμίας, κάθε φορά." },
  { icon: Users, title: "Εξειδικευμένο Προσωπικό", text: "Μηχανικοί και τεχνικοί με πολυετή εμπειρία." },
  { icon: HardHat, title: "Σύγχρονος Εξοπλισμός", text: "Ιδιόκτητα μηχανήματα τελευταίας τεχνολογίας." },
];

const GALLERY = [
  { src: "/HighRes/image-1772753736848.jpg", span: "col-span-2 row-span-2" },
  { src: "/HighRes/image-1772753878297.jpg", span: "" },
  { src: "/Photos/project-6.jpg", span: "" },
  { src: "/Photos/project-10.jpg", span: "" },
  { src: "/Photos/project-11.jpg", span: "col-span-2" },
  { src: "/Photos/project-12.jpg", span: "" },
  { src: "/Photos/project-13.jpg", span: "" },
  { src: "/Photos/project-14.jpg", span: "" },
  { src: "/Photos/project-16.jpg", span: "" },
];

const TRUST_ITEMS = [
  "Πολυετής εμπειρία",
  "Σύγχρονα μηχανήματα",
  "Πιστοποιημένη ποιότητα",
  "Τήρηση χρονοδιαγραμμάτων",
  "Ανταγωνιστικό κόστος",
];

const NAV_LINKS: [string, string][] = [
  ["Υπηρεσίες", "#services"],
  ["Έργα", "#projects"],
  ["Η Εταιρεία", "#about"],
  ["Επικοινωνία", "#contact"],
];

/* ─── Page ─── */
export default function Concept4() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* ================================================================
          1. NAVBAR
      ================================================================ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 shadow-lg shadow-black/[0.03] backdrop-blur-xl border-b border-neutral-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="#" className="relative h-12 w-40 shrink-0">
            <Image
              src="/Photos/Logo/alkater-logo-transparent.png"
              alt="ΑΛΚΑΤΕΡ"
              fill
              className={`object-contain object-left transition-all duration-500 ${!scrolled ? "brightness-0 invert" : ""}`}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                  scrolled
                    ? "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="ml-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand-red)] px-6 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-[var(--brand-red)]/25 transition-all hover:shadow-xl hover:shadow-[var(--brand-red)]/30 hover:brightness-110"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              Καλέστε μας
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`rounded-lg p-2 lg:hidden ${scrolled ? "text-neutral-700" : "text-white"}`}
            aria-label="Μενού"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="animate-fade-in border-t bg-white shadow-2xl lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-[15px] font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-red)] px-6 py-3 text-sm font-bold text-white"
              >
                <PhoneCall className="h-4 w-4" />
                Καλέστε μας
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* ================================================================
            2. HERO
        ================================================================ */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-neutral-900">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-60"
            >
              <source src="/Videos/sample_3-3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-blue-dark)]/80 via-[var(--brand-blue-dark)]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-black/30" />
          </div>

          {/* Decorative diagonal line */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div
            className="pointer-events-none absolute -right-20 top-1/4 z-10 h-[600px] w-[600px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, var(--brand-red-light), transparent 70%)" }}
          />

          <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-10">
            <div className="max-w-3xl">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 text-[13px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
                  <Building2 className="h-4 w-4 text-[var(--brand-red-light)]" />
                  Τεχνική & Κατασκευαστική Εταιρεία
                </span>
              </div>

              <h1 className="animate-fade-up delay-100 mt-10 text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-tight text-white">
                Χτίζουμε
                <br />
                <span className="bg-gradient-to-r from-[var(--brand-red-light)] to-[var(--brand-red)] bg-clip-text text-transparent">
                  Υποδομές
                </span>{" "}
                που
                <br />
                Αντέχουν
              </h1>

              <p className="animate-fade-up delay-200 mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
                Η ΑΛΚΑΤΕΡ Α.Ε. κατασκευάζει δημόσια & ιδιωτικά έργα με ποιότητα,
                αξιοπιστία και σύγχρονο εξοπλισμό — από την Ηγουμενίτσα σε όλη την Ήπειρο.
              </p>

              <div className="animate-fade-up delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#projects"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-[15px] font-bold text-[var(--brand-blue-dark)] shadow-2xl transition-all hover:shadow-white/20"
                >
                  Δείτε τα Έργα μας
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/25 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
                >
                  Επικοινωνία
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-fade-in delay-700">
            <Link
              href="#stats"
              className="flex flex-col items-center gap-2 text-white/40 transition-colors hover:text-white/70"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">Ανακαλύψτε</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </Link>
          </div>
        </section>

        {/* ================================================================
            3. STATS BAR
        ================================================================ */}
        <section id="stats" className="relative z-20 -mt-14">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 divide-x divide-neutral-100 rounded-2xl border border-neutral-100 bg-white shadow-2xl shadow-black/[0.04] lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal
                  key={i}
                  className="px-6 py-10 text-center lg:py-12"
                  delay={`delay-${(i + 1) * 100}`}
                >
                  <p className="text-3xl font-extrabold tracking-tight text-[var(--brand-blue)] md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-400">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            4. SERVICES
        ================================================================ */}
        <section id="services" className="py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
                Τι κάνουμε
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
                Οι Υπηρεσίες μας
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-500">
                Εξειδικευόμαστε στην κατασκευή έργων υποδομής, προσφέροντας ολοκληρωμένες
                λύσεις για τον δημόσιο και ιδιωτικό τομέα.
              </p>
            </Reveal>

            <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service, i) => (
                <Reveal
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  delay={`delay-${Math.min((i + 1) * 100, 600)}`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-[var(--brand-blue)] shadow-lg backdrop-blur-sm">
                      <service.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-neutral-900">{service.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-[var(--brand-blue)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Μάθετε περισσότερα
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            5. PROJECT GALLERY
        ================================================================ */}
        <section id="projects" className="bg-white py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
                Portfolio
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
                Ενδεικτικά Έργα
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-500">
                Δείτε μερικά από τα πρόσφατα έργα που έχουμε υλοποιήσει σε ολόκληρη
                την Ήπειρο.
              </p>
            </Reveal>

            <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {GALLERY.map((item, i) => (
                <Reveal
                  key={i}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl ${item.span} ${
                    item.span.includes("row-span-2") ? "aspect-square" : "aspect-[4/3]"
                  }`}
                  animation="animate-scale-in"
                  delay={`delay-${Math.min((i + 1) * 100, 700)}`}
                >
                  <Image
                    src={item.src}
                    alt={`Έργο ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[var(--brand-blue-dark)]/0 transition-colors duration-500 group-hover:bg-[var(--brand-blue-dark)]/50" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur-sm">
                      Προβολή
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            6. WHY CHOOSE US / ABOUT
        ================================================================ */}
        <section id="about" className="py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col items-center gap-20 lg:flex-row">
              {/* Left — Images */}
              <Reveal className="lg:w-5/12" animation="animate-slide-left">
                <div className="relative">
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src="/HighRes/image-1772753897780.jpg"
                      alt="Μηχανήματα ΑΛΚΑΤΕΡ"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-5 -right-5 hidden h-44 w-44 overflow-hidden rounded-2xl border-4 border-white shadow-xl md:block">
                    <Image
                      src="/HighRes/image-1772753692358.jpg"
                      alt="Έργο ΑΛΚΑΤΕΡ"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -left-3 -top-3 hidden h-20 w-20 items-center justify-center rounded-xl bg-[var(--brand-red)] shadow-lg md:flex">
                    <span className="text-xl font-extrabold text-white">25+</span>
                  </div>
                  {/* Decorative ring */}
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full border-2 border-[var(--brand-blue)]/10" />
                </div>
              </Reveal>

              {/* Right — Text + Grid */}
              <Reveal className="space-y-10 lg:w-7/12" animation="animate-slide-right">
                <div>
                  <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
                    Η Εταιρεία
                  </span>
                  <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
                    Γιατί να επιλέξετε
                    <br />
                    την{" "}
                    <span className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-blue-light)] bg-clip-text text-transparent">
                      ΑΛΚΑΤΕΡ
                    </span>
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-neutral-500">
                    Με έδρα την Ηγουμενίτσα, η ΑΛΚΑΤΕΡ έχει καθιερωθεί ως μια από τις πιο
                    αξιόπιστες κατασκευαστικές εταιρείες στη Θεσπρωτία και την Ήπειρο. Κάθε
                    έργο μας αντανακλά δέσμευση στην ποιότητα και τις σύγχρονες μεθόδους κατασκευής.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {WHY_US.map((item, i) => (
                    <div
                      key={i}
                      className="group flex gap-4 rounded-xl border border-neutral-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-blue)]/[0.08]">
                        <item.icon className="h-5 w-5 text-[var(--brand-blue)]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900">{item.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-neutral-500">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            7. TRUST BAND
        ================================================================ */}
        <section className="bg-[var(--brand-blue-dark)] py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-5">
              {TRUST_ITEMS.map((item, i) => (
                <Reveal key={i} className="flex items-center gap-3" delay={`delay-${(i + 1) * 100}`}>
                  <CheckCircle2 className="h-5 w-5 text-[var(--brand-red-light)]" />
                  <span className="text-sm font-medium text-white/90 md:text-base">{item}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            8. CONTACT CTA
        ================================================================ */}
        <section id="contact" className="relative overflow-hidden py-28 lg:py-36">
          <div className="absolute inset-0">
            <Image
              src="/HighRes/image-1772753887996.jpg"
              alt="Επικοινωνία"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-blue-dark)]/95 via-[var(--brand-blue-dark)]/85 to-[var(--brand-blue)]/75" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              {/* Left */}
              <Reveal className="lg:w-1/2" animation="animate-slide-left">
                <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--brand-red-light)]">
                  Επικοινωνία
                </span>
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  Έχετε κάποιο έργο
                  <br />
                  στο μυαλό σας;
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/50">
                  Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες σας και να σας
                  προτείνουμε την ιδανική λύση.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="tel:+302665012345"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-[15px] font-bold text-[var(--brand-blue-dark)] shadow-2xl transition-all hover:shadow-white/20"
                  >
                    <PhoneCall className="h-5 w-5" />
                    Καλέστε μας
                  </a>
                  <a
                    href="mailto:alkater2024@outlook.com"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white/25 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
                  >
                    <Mail className="h-5 w-5" />
                    Email
                  </a>
                </div>
              </Reveal>

              {/* Right — Glass card */}
              <Reveal className="w-full lg:w-1/2" animation="animate-slide-right">
                <div className="space-y-7 rounded-2xl border border-white/15 bg-white/[0.07] p-10 backdrop-blur-xl">
                  {[
                    {
                      icon: MapPin,
                      label: "Έδρα",
                      primary: "Ηγουμενίτσα, Θεσπρωτία",
                      secondary: "Ήπειρος, Ελλάδα",
                    },
                    {
                      icon: PhoneCall,
                      label: "Τηλέφωνο",
                      primary: "+30 26650 XXXXX",
                      href: "tel:+302665012345",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      primary: "alkater2024@outlook.com",
                      href: "mailto:alkater2024@outlook.com",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.label}</h4>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-0.5 text-white/60 transition-colors hover:text-white"
                          >
                            {item.primary}
                          </a>
                        ) : (
                          <>
                            <p className="mt-0.5 text-white/60">{item.primary}</p>
                            {item.secondary && (
                              <p className="text-sm text-white/35">{item.secondary}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================
          9. FOOTER
      ================================================================ */}
      <footer className="bg-neutral-900 text-neutral-400">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative mb-6 h-12 w-40">
                <Image
                  src="/Photos/Logo/alkater-logo-transparent.png"
                  alt="ΑΛΚΑΤΕΡ"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="max-w-sm text-sm leading-relaxed">
                Κατασκευαστική Εταιρεία Δημοσίων & Ιδιωτικών Έργων. Χτίζουμε υποδομές
                που αντέχουν στον χρόνο, με ποιότητα και αξιοπιστία.
              </p>
              <div className="mt-6 flex h-1 w-20 overflow-hidden rounded-full">
                <div className="flex-1 bg-[var(--brand-blue)]" />
                <div className="flex-1 bg-[var(--brand-red)]" />
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
                Σύνδεσμοι
              </h3>
              <ul className="space-y-3 text-sm">
                {NAV_LINKS.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
                Επικοινωνία
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  Ηγουμενίτσα, Θεσπρωτία
                </li>
                <li className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 shrink-0" />
                  +30 26650 XXXXX
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  alkater2024@outlook.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 text-xs text-neutral-500 md:flex-row">
            <p>&copy; {new Date().getFullYear()} ΑΛΚΑΤΕΡ Α.Ε. Με την επιφύλαξη παντός δικαιώματος.</p>
            <p className="mt-2 md:mt-0">Ηγουμενίτσα, Ήπειρος</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
