"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── PRESET C: Brutalist Signal (Raw Precision) ──
// Identity: A control room for the future — no decoration, pure information density.
// Palette: Paper #E8E4DD (Primary), Signal Red #E63B2E (Accent), Off-white #F5F3EE (Background), Black #111111 (Text/Dark)
// Typography: Headings: Space Grotesk. Drama: DM Serif Display Italic. Data: Space Mono.
// Image Mood: concrete, brutalist architecture, raw materials, industrial.
// Hero line pattern: "[Direct verb] the" (Bold Sans) / "[System noun]." (Massive Serif Italic)

const THEME = {
  primary: "#E8E4DD",
  accent: "#E63B2E",
  background: "#F5F3EE",
  dark: "#111111",
};

// ── Helpers ──
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

// ── Components ──

function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] opacity-5 mix-blend-overlay">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

// A. NAVBAR — "The Floating Island"
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-300">
      <div
        className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-[#F5F3EE]/80 backdrop-blur-xl border border-[#111111]/10 text-[#111111]"
            : "bg-transparent text-white"
        }`}
      >
        <div className="font-['Space_Grotesk'] font-bold text-xl tracking-tighter">
          ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-['Space_Mono'] text-sm uppercase tracking-widest">
          <Link href="#features" className="hover:-translate-y-[1px] transition-transform">Δυνατοτητες</Link>
          <Link href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Φιλοσοφια</Link>
          <Link href="#protocol" className="hover:-translate-y-[1px] transition-transform">Πρωτοκολλο</Link>
        </nav>

        <Link
          href="#projects"
          className="group relative overflow-hidden rounded-full bg-[#E63B2E] px-6 py-2.5 text-sm font-['Space_Mono'] uppercase tracking-widest text-[#F5F3EE] hover:scale-[1.03] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        >
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#111111]">
            ΕΡΓΑ <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="absolute inset-0 bg-[#F5F3EE] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
        </Link>
      </div>
    </header>
  );
}

// B. HERO SECTION
function Hero() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2
      });
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative h-[100dvh] w-full bg-[#111111] overflow-hidden">
      {/* Background Image - Brutalist/Concrete */}
      <Image
        src="/Photos/project-3.jpg" // A raw/concrete looking project photo
        alt="ΑΛΚΑΤΕΡ Κατασκευαστική"
        fill
        className="object-cover opacity-60 mix-blend-luminosity"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-32">
        <div className="max-w-5xl">
          <p className="hero-text font-['Space_Mono'] text-[#E63B2E] uppercase tracking-widest mb-6 border-l-2 border-[#E63B2E] pl-4">
            ΑΛΚΑΤΕΡ — ΚΑΤΑΣΚΕΥΑΖΟΥΜΕ ΤΟ ΜΕΛΛΟΝ ΤΗΣ ΗΠΕΙΡΟΥ
          </p>
          <h1 className="text-[#F5F3EE] leading-[0.9]">
            <span className="hero-text block font-['Space_Grotesk'] font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter">
              CONSTRUCT THE
            </span>
            <span className="hero-text block font-['DM_Serif_Display'] italic text-7xl md:text-9xl lg:text-[11rem] text-[#E8E4DD] ml-8 md:ml-16 mt-[-1rem] md:mt-[-2rem]">
              Infrastructure.
            </span>
          </h1>
          
          <div className="hero-cta mt-12 md:mt-16">
             <Link
                href="#projects"
                className="group relative inline-flex overflow-hidden rounded-full bg-[#E63B2E] px-8 md:px-12 py-4 md:py-6 text-base md:text-lg font-['Space_Mono'] uppercase tracking-widest text-[#F5F3EE] hover:scale-[1.03] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              >
                <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-[#111111]">
                  ΔΕΙΤΕ ΤΑ ΕΡΓΑ ΜΑΣ <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-[#F5F3EE] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// C. FEATURES — "Interactive Functional Artifacts"
function Features() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-container",
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  // Card 1 Logic - Shuffler (25+ Years Experience)
  const [cards, setCards] = useState(["1998", "2010", "2026"]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        if(last) newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Card 2 Logic - Typewriter (Modern Equipment)
  const [text, setText] = useState("");
  const fullText = "INITIALIZING FLEET... SYSTEM CHECK OK. DEPLOYING HEAVY MACHINERY TO SECTOR 7. CALIBRATING PRECISION INSTRUMENTS. STATUS: OPTIMAL.";
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
         i = 0;
         setTimeout(()=>{}, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Card 3 Logic - Scheduler (Specialized Personnel)
  // Handled via CSS animations in the component for simplicity

  return (
    <section id="features" ref={comp} className="py-32 bg-[#F5F3EE] relative z-10 rounded-t-[3rem] -mt-8 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20">
           <p className="font-['Space_Mono'] text-[#E63B2E] uppercase tracking-widest text-sm mb-4 border-l-2 border-[#E63B2E] pl-4">01 // Capabilities</p>
           <h2 className="font-['Space_Grotesk'] font-bold text-5xl md:text-6xl text-[#111111] tracking-tighter">
             SYSTEM RESOURCES.
           </h2>
        </div>

        <div className="features-container grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Diagnostic Shuffler */}
          <div className="feature-card bg-white rounded-[2rem] p-8 border border-[#111111]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-96 flex flex-col group relative overflow-hidden">
            <h3 className="font-['Space_Grotesk'] font-bold text-2xl text-[#111111] mb-2">25+ ΕΤΗ ΕΜΠΕΙΡΙΑΣ</h3>
            <p className="font-['Space_Mono'] text-sm text-[#111111]/60 mb-8">Ιστορικό εκτέλεσης έργων</p>
            
            <div className="relative flex-1 flex items-center justify-center mt-auto mb-10">
              {cards.map((year, i) => (
                <div 
                  key={year}
                  className="absolute w-4/5 bg-[#F5F3EE] border border-[#111111]/20 rounded-xl p-4 text-center font-['Space_Mono'] text-3xl font-bold text-[#111111] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{
                    transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
                    zIndex: 10 - i,
                    opacity: 1 - i * 0.2
                  }}
                >
                  EST. {year}
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="feature-card bg-[#111111] rounded-[2rem] p-8 h-96 flex flex-col group relative overflow-hidden">
            <div className="absolute top-8 right-8 flex items-center gap-2">
               <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E63B2E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E63B2E]"></span>
              </span>
              <span className="font-['Space_Mono'] text-[#E63B2E] text-xs">LIVE FEED</span>
            </div>
            
            <h3 className="font-['Space_Grotesk'] font-bold text-2xl text-[#F5F3EE] mb-2">ΣΥΓΧΡΟΝΟΣ ΕΞΟΠΛΙΣΜΟΣ</h3>
            <p className="font-['Space_Mono'] text-sm text-[#F5F3EE]/60 mb-8">Ιδιόκτητος στόλος μηχανημάτων</p>
            
            <div className="flex-1 bg-black/50 rounded-xl p-4 border border-white/10 font-['Space_Mono'] text-[#E8E4DD] text-sm leading-relaxed relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
              {text}
              <span className="animate-pulse text-[#E63B2E] ml-1">_</span>
            </div>
          </div>

          {/* Card 3: Cursor Protocol Scheduler */}
          <div className="feature-card bg-[#E8E4DD] rounded-[2rem] p-8 border border-[#111111]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-96 flex flex-col group relative overflow-hidden">
             <h3 className="font-['Space_Grotesk'] font-bold text-2xl text-[#111111] mb-2">ΕΞΕΙΔΙΚΕΥΜΕΝΟ ΠΡΟΣΩΠΙΚΟ</h3>
             <p className="font-['Space_Mono'] text-sm text-[#111111]/60 mb-8">Άρτια καταρτισμένοι μηχανικοί</p>
             
             <div className="flex-1 border border-[#111111]/20 rounded-xl p-4 bg-white relative">
                <div className="grid grid-cols-7 gap-1 text-center font-['Space_Mono'] text-xs mb-2">
                  {['S','M','T','W','T','F','S'].map(d=><div key={d} className="text-[#111111]/40">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({length: 28}).map((_,i) => (
                    <div key={i} className={`aspect-square rounded-sm border border-[#111111]/5 ${i===15 || i===16 || i===17 ? 'bg-[#E63B2E]' : 'bg-[#F5F3EE]'}`}></div>
                  ))}
                </div>
                {/* Fake cursor animation could go here, keeping it simpler for reliability */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#111111] text-[#F5F3EE] font-['Space_Mono'] text-xs py-2 text-center rounded-lg mt-4">
                  RESOURCES ALLOCATED
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// D. PHILOSOPHY — "The Manifesto"
function Philosophy() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".phil-text-1", {
        scrollTrigger: { trigger: ".phil-container", start: "top 80%" },
        opacity: 0, y: 20, duration: 1
      });
      gsap.from(".phil-text-2", {
        scrollTrigger: { trigger: ".phil-container", start: "top 60%" },
        opacity: 0, y: 40, duration: 1.5, ease: "power3.out"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={comp} className="py-40 bg-[#111111] relative overflow-hidden">
      <Image
        src="/Photos/project-14.jpg"
        alt="Texture"
        fill
        className="object-cover opacity-10 mix-blend-screen grayscale"
      />
      
      <div className="phil-container container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <p className="font-['Space_Mono'] text-[#E63B2E] uppercase tracking-widest text-sm mb-12">02 // Directive</p>
        
        <p className="phil-text-1 font-['Space_Grotesk'] text-xl md:text-2xl text-[#F5F3EE]/50 mb-8 max-w-2xl mx-auto">
          Most construction focuses on: completing the tender.
        </p>
        
        <p className="phil-text-2 font-['DM_Serif_Display'] italic text-5xl md:text-7xl lg:text-8xl text-[#E8E4DD] leading-tight">
          We focus on: <span className="text-[#E63B2E] not-italic font-['Space_Grotesk'] font-bold tracking-tighter uppercase">Endurance.</span>
        </p>
      </div>
    </section>
  );
}

// E. PROTOCOL — "Sticky Stacking Archive"
function Protocol() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card: any, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: ".protocol-section",
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            animation: gsap.to(card, {
              scale: 0.9,
              opacity: 0,
              filter: "blur(10px)",
              ease: "none"
            }),
            scrub: true,
          });
        }
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "ΑΝΑΛΥΣΗ ΥΠΟΔΟΜΗΣ",
      desc: "Λεπτομερής μελέτη των προδιαγραφών του έργου. Τοπογραφική και γεωτεχνική αξιολόγηση με χρήση σύγχρονων εργαλείων μέτρησης.",
      svg: (
         <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#111111] fill-none stroke-[2] opacity-20">
            <circle cx="50" cy="50" r="40" className="origin-center animate-[spin_10s_linear_infinite]" strokeDasharray="10 5" />
            <circle cx="50" cy="50" r="30" className="origin-center animate-[spin_15s_linear_infinite_reverse]" strokeDasharray="20 10" />
            <circle cx="50" cy="50" r="20" />
         </svg>
      )
    },
    {
      num: "02",
      title: "ΚΑΤΑΝΟΜΗ ΠΟΡΩΝ",
      desc: "Επιστράτευση του ιδιόκτητου στόλου μηχανημάτων και του εξειδικευμένου προσωπικού. Βελτιστοποίηση χρονοδιαγράμματος.",
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#111111] fill-none stroke-[2] opacity-20">
          <path d="M10 50 L90 50" strokeDasharray="5 5" />
          <path d="M50 10 L50 90" strokeDasharray="5 5" />
          <rect x="25" y="25" width="50" height="50" className="origin-center animate-pulse" />
        </svg>
      )
    },
    {
      num: "03",
      title: "ΕΚΤΕΛΕΣΗ & ΠΑΡΑΔΟΣΗ",
      desc: "Βιομηχανική ακρίβεια στην κατασκευή. Αυστηροί έλεγχοι ποιότητας και ασφάλειας σε κάθε φάση μέχρι την τελική παράδοση.",
      svg: (
         <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#111111] fill-none stroke-[2] opacity-20">
            <path d="M0 50 L30 50 L40 20 L60 80 L70 50 L100 50" className="animate-[dash_3s_linear_infinite]" strokeDasharray="200" strokeDashoffset="200" />
         </svg>
      )
    }
  ];

  return (
    <section id="protocol" ref={comp} className="protocol-section bg-[#F5F3EE] relative z-10" style={{ paddingBottom: '0' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash { to { stroke-dashoffset: 0; } }
      `}} />
      <div className="relative" style={{ height: `${steps.length * 100}vh` }}>
        {steps.map((step, i) => (
          <div key={i} className="protocol-card h-[100dvh] w-full flex items-center justify-center p-6 origin-top sticky top-0 bg-[#F5F3EE]" style={{ zIndex: steps.length - i }}>
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] p-12 shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-[#111111]/10">
              <div className="relative aspect-square bg-[#E8E4DD] rounded-[2rem] p-8 overflow-hidden flex items-center justify-center">
                {step.svg}
              </div>
              <div>
                <div className="font-['Space_Mono'] text-6xl md:text-8xl text-[#E63B2E] opacity-20 font-bold mb-4">{step.num}</div>
                <h3 className="font-['Space_Grotesk'] font-bold text-3xl md:text-4xl text-[#111111] mb-6 uppercase tracking-tighter">{step.title}</h3>
                <p className="font-['Space_Mono'] text-[#111111]/70 leading-relaxed text-lg">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// F. CTA / GET STARTED
function GetStarted() {
  return (
    <section className="py-32 bg-[#E63B2E] relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(#111111_1px,transparent_1px),linear-gradient(90deg,#111111_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="font-['Space_Grotesk'] font-bold text-5xl md:text-7xl text-white tracking-tighter mb-12 uppercase">
          INITIATE PROJECT.
        </h2>
        
        <Link
          href="#projects"
          className="group relative inline-flex overflow-hidden rounded-full bg-[#111111] px-12 py-6 text-lg font-['Space_Mono'] uppercase tracking-widest text-white hover:scale-[1.03] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        >
          <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-[#111111]">
            ΔΕΙΤΕ ΤΑ ΕΡΓΑ ΜΑΣ <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </span>
          <span className="absolute inset-0 bg-[#F5F3EE] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
        </Link>
      </div>
    </section>
  );
}

// G. FOOTER
function Footer() {
  return (
    <footer className="bg-[#111111] text-[#F5F3EE] pt-24 pb-12 rounded-t-[4rem] relative z-30 -mt-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          <div className="md:col-span-6">
            <div className="font-['Space_Grotesk'] font-bold text-4xl tracking-tighter mb-4">
              ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
            </div>
            <p className="font-['Space_Mono'] text-[#F5F3EE]/50 max-w-sm mb-8">
              Κατασκευαστική Εταιρεία Δημοσίων & Ιδιωτικών Έργων.
            </p>
            
            <div className="inline-flex items-center gap-3 bg-[#F5F3EE]/5 rounded-full px-4 py-2 border border-[#F5F3EE]/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-['Space_Mono'] text-xs tracking-widest text-[#F5F3EE]/80">SYSTEM OPERATIONAL</span>
            </div>
          </div>

          <div className="md:col-span-3">
             <h4 className="font-['Space_Mono'] text-[#E63B2E] text-xs uppercase tracking-widest mb-6 border-b border-[#F5F3EE]/10 pb-4">Δεδομενα</h4>
             <ul className="space-y-4 font-['Space_Mono'] text-sm text-[#F5F3EE]/70">
               <li><Link href="#features" className="hover:text-white transition-colors">Δυνατότητες</Link></li>
               <li><Link href="#philosophy" className="hover:text-white transition-colors">Φιλοσοφία</Link></li>
               <li><Link href="#protocol" className="hover:text-white transition-colors">Πρωτόκολλο</Link></li>
             </ul>
          </div>

          <div className="md:col-span-3">
             <h4 className="font-['Space_Mono'] text-[#E63B2E] text-xs uppercase tracking-widest mb-6 border-b border-[#F5F3EE]/10 pb-4">Επικοινωνια</h4>
             <ul className="space-y-4 font-['Space_Mono'] text-sm text-[#F5F3EE]/70">
               <li>Ηγουμενίτσα, Θεσπρωτία</li>
               <li>+30 26650 XXXXX</li>
               <li>alkater2024@outlook.com</li>
             </ul>
          </div>

        </div>

        <div className="border-t border-[#F5F3EE]/10 pt-8 flex flex-col md:flex-row justify-between items-center font-['Space_Mono'] text-xs text-[#F5F3EE]/40">
          <p>© {new Date().getFullYear()} ALKATER S.A. ALL RIGHTS RESERVED.</p>
          <p className="mt-4 md:mt-0 uppercase tracking-widest">Built for Endurance</p>
        </div>
      </div>
    </footer>
  );
}

export default function ProposalLandingPage() {
  return (
    <div className="relative min-h-screen bg-[#F5F3EE] selection:bg-[#E63B2E] selection:text-white font-['Space_Grotesk']">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      `}} />
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}
