"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  HardHat,
  Ruler,
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

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function AnimatedSection({
  children,
  className = "",
  animation = "animate-fade-up",
  delay = "",
}: {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: string;
}) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? `${animation} ${delay}` : "opacity-0"}`}
    >
      {children}
    </div>
  );
}

const SERVICES = [
  {
    icon: Building2,
    title: "Δημόσια Έργα",
    description:
      "Κατασκευή και συντήρηση δημοσίων υποδομών με συνέπεια και τήρηση αυστηρών προδιαγραφών.",
    image: "/Photos/project-3.jpg",
  },
  {
    icon: HardHat,
    title: "Οικοδομικά Έργα",
    description:
      "Ολοκληρωμένες κατασκευαστικές λύσεις από τη θεμελίωση μέχρι την παράδοση.",
    image: "/Photos/project-5.jpg",
  },
  {
    icon: Ruler,
    title: "Έργα Υποδομής",
    description:
      "Χωματουργικά, οδοποιίες, δίκτυα ύδρευσης & αποχέτευσης και τεχνικά έργα.",
    image: "/Photos/project-8.jpg",
  },
];

const STATS = [
  { value: "25+", label: "Χρόνια Εμπειρίας" },
  { value: "150+", label: "Ολοκληρωμένα Έργα" },
  { value: "50+", label: "Ενεργοί Συνεργάτες" },
  { value: "100%", label: "Τήρηση Προθεσμιών" },
];

const WHY_US = [
  {
    icon: Shield,
    title: "Ποιότητα & Ασφάλεια",
    text: "Αυστηρά πρότυπα ποιότητας και ασφαλείας σε κάθε έργο.",
  },
  {
    icon: Clock,
    title: "Τήρηση Χρονοδιαγραμμάτων",
    text: "Παραδίδουμε εντός προθεσμίας, κάθε φορά.",
  },
  {
    icon: Users,
    title: "Εξειδικευμένο Προσωπικό",
    text: "Μηχανικοί και τεχνικοί με πολυετή εμπειρία.",
  },
  {
    icon: HardHat,
    title: "Σύγχρονος Εξοπλισμός",
    text: "Ιδιόκτητα μηχανήματα τελευταίας τεχνολογίας.",
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-neutral-200/60"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="#" className="relative w-44 h-14 shrink-0">
            <Image
              src="/Photos/Logo/alkater-logo-transparent.png"
              alt="ΑΛΚΑΤΕΡ"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {[
              ["Υπηρεσίες", "#services"],
              ["Έργα", "#projects"],
              ["Η Εταιρεία", "#about"],
              ["Επικοινωνία", "#contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  scrolled
                    ? "text-neutral-700 hover:text-[var(--brand-blue)]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="inline-flex items-center rounded-lg bg-[var(--brand-red)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-red-light)] transition-colors shadow-lg shadow-[var(--brand-red)]/20"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Καλέστε μας
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-neutral-700" : "text-white"
            }`}
            aria-label="Μενού"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t shadow-xl animate-fade-in">
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {[
                ["Υπηρεσίες", "#services"],
                ["Έργα", "#projects"],
                ["Η Εταιρεία", "#about"],
                ["Επικοινωνία", "#contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-semibold text-neutral-800 hover:text-[var(--brand-blue)] py-2 border-b border-neutral-100 last:border-0"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-[var(--brand-red)] px-6 py-3 text-sm font-semibold text-white"
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                Καλέστε μας
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/Photos/project-1.jpg"
              alt="Εργοτάξιο ΑΛΚΑΤΕΡ"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-blue-dark)]/90 via-[var(--brand-blue)]/70 to-[var(--brand-blue-dark)]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-6 relative z-10 pt-20">
            <div className="max-w-3xl">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 text-sm font-medium text-white/90 mb-8">
                  <Building2 className="h-4 w-4" />
                  Τεχνική & Κατασκευαστική Εταιρεία
                </span>
              </div>

              <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight mb-8">
                Χτίζουμε
                <br />
                <span className="text-[var(--brand-red-light)]">Υποδομές</span> που
                <br />
                Αντέχουν
              </h1>

              <p className="animate-fade-up delay-200 text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed">
                Η ΑΛΚΑΤΕΡ Α.Ε. κατασκευάζει δημόσια & ιδιωτικά έργα με ποιότητα,
                αξιοπιστία και σύγχρονο εξοπλισμό από την Ηγουμενίτσα σε όλη την Ήπειρο.
              </p>

              <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-[var(--brand-blue-dark)] font-bold text-base h-14 px-8 hover:bg-neutral-100 transition-colors shadow-2xl"
                >
                  Δείτε τα Έργα μας
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 text-white font-semibold text-base h-14 px-8 hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  Επικοινωνία
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-700">
            <Link href="#services" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
              <span className="text-xs font-medium tracking-widest uppercase">Ανακαλύψτε</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </Link>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="relative -mt-16 z-20">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-2xl shadow-black/5 border border-neutral-100 grid grid-cols-2 lg:grid-cols-4 divide-x divide-neutral-100">
              {STATS.map((stat, i) => (
                <AnimatedSection
                  key={i}
                  className="py-10 px-6 text-center"
                  delay={`delay-${(i + 1) * 100}`}
                >
                  <p className="text-3xl md:text-4xl font-extrabold text-[var(--brand-blue)] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-28 bg-[var(--background)]">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
              <span className="inline-block text-sm font-bold tracking-widest uppercase text-[var(--brand-red)] mb-4">
                Τι κάνουμε
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-6">
                Οι Υπηρεσίες μας
              </h2>
              <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                Εξειδικευόμαστε στην κατασκευή έργων υποδομής, προσφέροντας ολοκληρωμένες
                λύσεις για τον δημόσιο και ιδιωτικό τομέα.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {SERVICES.map((service, i) => (
                <AnimatedSection
                  key={i}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500"
                  delay={`delay-${(i + 1) * 100}`}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-[var(--brand-blue)]">
                      <service.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects Gallery ── */}
        <section id="projects" className="py-28 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-20">
              <span className="inline-block text-sm font-bold tracking-widest uppercase text-[var(--brand-red)] mb-4">
                Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-6">
                Ενδεικτικά Έργα
              </h2>
              <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                Δείτε μερικά από τα πρόσφατα έργα που έχουμε υλοποιήσει σε ολόκληρη την Ήπειρο.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { src: "/Photos/project-2.jpg", span: "md:col-span-2 md:row-span-2" },
                { src: "/Photos/project-4.jpg", span: "" },
                { src: "/Photos/project-6.jpg", span: "" },
                { src: "/Photos/project-9.jpg", span: "" },
                { src: "/Photos/project-10.jpg", span: "" },
                { src: "/Photos/project-11.jpg", span: "md:col-span-2" },
                { src: "/Photos/project-12.jpg", span: "" },
                { src: "/Photos/project-13.jpg", span: "" },
              ].map((item, i) => (
                <AnimatedSection
                  key={i}
                  className={`group relative overflow-hidden rounded-xl ${item.span} ${
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
                  <div className="absolute inset-0 bg-[var(--brand-blue-dark)]/0 group-hover:bg-[var(--brand-blue-dark)]/40 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white font-semibold text-lg tracking-wide">
                      Προβολή
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section id="about" className="py-28 bg-[var(--background)]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <AnimatedSection
                className="lg:w-1/2"
                animation="animate-slide-left"
              >
                <div className="relative">
                  <div className="relative aspect-[4/5] w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/Photos/project-7.jpg"
                      alt="Μηχανήματα ΑΛΚΑΤΕΡ"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block">
                    <Image
                      src="/Photos/project-14.jpg"
                      alt="Έργο ΑΛΚΑΤΕΡ"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 rounded-xl bg-[var(--brand-red)] flex items-center justify-center shadow-lg hidden md:flex">
                    <span className="text-white text-2xl font-extrabold">25+</span>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection
                className="lg:w-1/2 space-y-10"
                animation="animate-slide-right"
              >
                <div>
                  <span className="inline-block text-sm font-bold tracking-widest uppercase text-[var(--brand-red)] mb-4">
                    Η Εταιρεία
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-6">
                    Γιατί να επιλέξετε
                    <br />
                    την <span className="text-[var(--brand-blue)]">ΑΛΚΑΤΕΡ</span>
                  </h2>
                  <p className="text-lg text-neutral-500 leading-relaxed">
                    Με έδρα την Ηγουμενίτσα, η ΑΛΚΑΤΕΡ έχει καθιερωθεί ως μια από τις
                    πιο αξιόπιστες κατασκευαστικές εταιρείες στη Θεσπρωτία και την
                    Ήπειρο.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {WHY_US.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-5 rounded-xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-11 h-11 rounded-lg bg-[var(--brand-blue)]/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-[var(--brand-blue)]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-neutral-500 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ── Checklist Band ── */}
        <section className="py-16 bg-[var(--brand-blue-dark)]">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {[
                "Πολυετής εμπειρία",
                "Σύγχρονα μηχανήματα",
                "Πιστοποιημένη ποιότητα",
                "Τήρηση χρονοδιαγραμμάτων",
                "Ανταγωνιστικό κόστος",
              ].map((item, i) => (
                <AnimatedSection
                  key={i}
                  className="flex items-center gap-3"
                  delay={`delay-${(i + 1) * 100}`}
                >
                  <CheckCircle2 className="h-5 w-5 text-[var(--brand-red-light)]" />
                  <span className="text-white font-medium text-sm md:text-base">{item}</span>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact CTA ── */}
        <section id="contact" className="relative py-28 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/Photos/project-15.jpg"
              alt="Επικοινωνία"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-blue-dark)]/95 to-[var(--brand-blue)]/80" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <AnimatedSection className="lg:w-1/2" animation="animate-slide-left">
                <span className="inline-block text-sm font-bold tracking-widest uppercase text-[var(--brand-red-light)] mb-4">
                  Επικοινωνία
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
                  Έχετε κάποιο έργο
                  <br />
                  στο μυαλό σας;
                </h2>
                <p className="text-lg text-white/60 max-w-md leading-relaxed mb-10">
                  Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες σας
                  και να σας προτείνουμε την ιδανική λύση.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+302665012345"
                    className="inline-flex items-center justify-center rounded-xl bg-white text-[var(--brand-blue-dark)] font-bold text-base h-14 px-8 hover:bg-neutral-100 transition-colors shadow-2xl"
                  >
                    <PhoneCall className="mr-2 h-5 w-5" />
                    Καλέστε μας
                  </a>
                  <a
                    href="mailto:info@alkater.gr"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 text-white font-semibold text-base h-14 px-8 hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Email
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection
                className="lg:w-1/2"
                animation="animate-slide-right"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-10 space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Έδρα</h4>
                      <p className="text-white/60">Ηγουμενίτσα, Θεσπρωτία</p>
                      <p className="text-white/40 text-sm">Ήπειρος, Ελλάδα</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <PhoneCall className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Τηλέφωνο</h4>
                      <a href="tel:+302665012345" className="text-white/60 hover:text-white transition-colors">
                        +30 26650 XXXXX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Email</h4>
                      <a href="mailto:info@alkater.gr" className="text-white/60 hover:text-white transition-colors">
                        info@alkater.gr
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-neutral-900 text-neutral-400">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="relative w-44 h-14 mb-6">
                <Image
                  src="/Photos/Logo/alkater-logo-transparent.png"
                  alt="ΑΛΚΑΤΕΡ"
                  fill
                  className="object-contain object-left brightness-200 invert"
                />
              </div>
              <p className="text-sm leading-relaxed max-w-sm mb-6">
                Κατασκευαστική Εταιρεία Δημοσίων & Ιδιωτικών Έργων. Χτίζουμε
                υποδομές που αντέχουν στον χρόνο, με ποιότητα και αξιοπιστία.
              </p>
              <div className="flex h-1 w-20 rounded-full overflow-hidden">
                <div className="flex-1 bg-[var(--brand-blue)]" />
                <div className="flex-1 bg-[var(--brand-red)]" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                Σύνδεσμοι
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  ["Υπηρεσίες", "#services"],
                  ["Έργα", "#projects"],
                  ["Η Εταιρεία", "#about"],
                  ["Επικοινωνία", "#contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
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
                  info@alkater.gr
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-800">
          <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500">
            <p>&copy; {new Date().getFullYear()} ΑΛΚΑΤΕΡ Α.Ε. Με την επιφύλαξη παντός δικαιώματος.</p>
            <p className="mt-2 md:mt-0">Ηγουμενίτσα, Ήπειρος</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
