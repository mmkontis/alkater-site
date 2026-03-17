"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import {
  HardHat, Truck, Construction, PaintBucket, Ruler, ShieldCheck,
  Layers, Wrench, type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/queries";

const ICON_MAP: Record<string, LucideIcon> = {
  Construction,
  PaintBucket,
  Truck,
  HardHat,
  Ruler,
  ShieldCheck,
  Layers,
  Wrench,
};

function resolveIcon(name: string) {
  const Icon = ICON_MAP[name];
  if (!Icon) return <Layers className="w-8 h-8 md:w-12 md:h-12" style={{ color: "var(--text-muted)" }} />;
  return <Icon className="w-8 h-8 md:w-12 md:h-12" style={{ color: "var(--text-muted)" }} />;
}

export function ServicesSection({ services }: { services: Service[] }) {
  const containerRef = useRef<HTMLElement>(null);

  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-40 font-['Space_Grotesk'] overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(#F5F3EE_1px,transparent_1px),linear-gradient(90deg,#F5F3EE_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]"></div>
      <div className="absolute inset-0 transition-colors duration-500 pointer-events-none" style={{ backgroundColor: "var(--tint-subtle)" }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[2px]" style={{ backgroundColor: "var(--text-muted)" }}></span>
              <span className="font-['Space_Mono'] uppercase tracking-widest text-sm" style={{ color: "var(--text-muted)" }}>Εξειδικευση</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase max-w-2xl leading-[0.9]">
              Οι <span className="text-[#E63B2E]">Υπηρεσιες</span> Μας.
            </h2>
          </div>

          <div className="max-w-md font-['Space_Mono'] text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <p>
              Η ΑΛΚΑΤΕΡ εξειδικεύεται σε όλο το φάσμα των κατασκευαστικών έργων υποδομής,
              εστιάζοντας στην ποιότητα, την ασφάλεια και την καινοτομία, με άρτια
              εκπαιδευμένο προσωπικό και σύγχρονο εξοπλισμό.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <a href={`/proposals/concept-1/services/${service.id}`} key={service.id} className="block w-full">
              <ServiceCard
                service={{
                  title: service.name,
                  description: service.description,
                  icon: resolveIcon(service.icon),
                  video: service.video_url ?? "",
                  startTime: service.video_start_time || undefined,
                }}
                index={index}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: { title: string; description: string; icon: React.ReactNode; video: string; startTime?: number }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile (no hover capability)
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Intersection Observer for mobile scroll-triggered activation
  // Uses rootMargin to create a "sweet spot" in the center of the viewport
  // so cards activate when they're roughly centered on screen
  useEffect(() => {
    if (!isMobile || !cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  const isActive = isMobile ? isInView : isHovered;

  // On mobile: always keep videos playing (muted autoplay is allowed on iOS/Android).
  // Only toggle visual state (grayscale/color) via isActive.
  // On desktop: play/pause on hover as before.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isMobile) {
      // On mobile, start playing immediately and never pause
      if (service.startTime) video.currentTime = service.startTime;
      video.play().catch(() => {});
    } else {
      if (isActive) {
        if (service.startTime) video.currentTime = service.startTime;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [isActive, isMobile, service.startTime]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !service.startTime) return;
    const handleEnded = () => {
      video.currentTime = service.startTime!;
      video.play().catch(() => {});
    };
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [service.startTime]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-[350px] md:h-[380px] w-full overflow-hidden rounded-2xl border transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={`${service.video}#t=${service.startTime ?? 0.1}`}
          muted
          autoPlay={isMobile}
          loop
          playsInline
          preload={isMobile ? "auto" : "metadata"}
          className={`absolute inset-0 w-full h-full object-cover ${
            isActive
              ? "opacity-60 scale-110 grayscale-0"
              : "opacity-40 scale-100 grayscale mix-blend-luminosity"
          }`}
          style={{
            transition: isActive
              ? "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
              : "opacity 0.6s cubic-bezier(0.4, 0, 1, 1), transform 0.8s cubic-bezier(0.4, 0, 1, 1), filter 0.6s cubic-bezier(0.4, 0, 1, 1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, var(--tint) 35%, transparent), color-mix(in srgb, var(--accent) 10%, transparent))`,
            opacity: isActive ? 0 : 1,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10">
        <div
          className={`mb-4 transform ${isActive ? "-translate-y-2" : ""} group-hover:-translate-y-2`}
          style={{
            transition: isActive
              ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
              : "transform 0.4s cubic-bezier(0.4, 0, 1, 1)",
          }}
        >
          {service.icon}
        </div>

        <h3
          className={`text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-4 transform ${isActive ? "-translate-y-2" : ""} group-hover:-translate-y-2 text-white`}
          style={{
            transition: isActive
              ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.05s"
              : "transform 0.4s cubic-bezier(0.4, 0, 1, 1)",
          }}
        >
          {service.title}
        </h3>

        <div
          className={`overflow-hidden transform ${isActive ? "h-auto opacity-100 translate-y-0" : "h-0 opacity-0 translate-y-4"} group-hover:h-auto group-hover:opacity-100 group-hover:translate-y-0`}
          style={{
            transition: isActive
              ? "height 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s"
              : "height 0.3s cubic-bezier(0.4, 0, 1, 1), opacity 0.3s cubic-bezier(0.4, 0, 1, 1), transform 0.3s cubic-bezier(0.4, 0, 1, 1)",
          }}
        >
          <p className="font-['Space_Mono'] text-[#E8E4DD]/80 text-sm md:text-base">
            {service.description}
          </p>
        </div>
      </div>

      <div
        className={`absolute top-6 right-6 font-['Space_Mono'] text-4xl font-bold ${isActive ? "text-white/30" : "text-white/20"} group-hover:text-white/30`}
        style={{
          transition: isActive
            ? "color 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            : "color 0.4s cubic-bezier(0.4, 0, 1, 1)",
        }}
      >
        0{index + 1}
      </div>
    </motion.div>
  );
}
