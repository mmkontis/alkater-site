"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HardHat, Truck, Construction, PaintBucket, Ruler, ShieldCheck,
  Layers, Wrench, Hammer, Cone, Shovel, Fence, Drill,
  Landmark, Building, Building2, Factory, Warehouse, Blocks, Combine,
  MapPin, Map, Route, Compass, Gauge, Cog, Settings, Shield, BadgeCheck,
  ClipboardCheck, ClipboardList, FileCheck, FileCog, Scan, ScanLine,
  Pipette, Paintbrush, PenTool, Shapes, Triangle, Hexagon,
  Mountain, TreePine, Leaf, Droplets, Zap, Bolt, Cable, Container,
  Package, Weight, Milestone, Signpost, TrafficCone,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { Service } from "@/lib/queries";

const ICON_MAP: Record<string, LucideIcon> = {
  Construction, PaintBucket, Truck, HardHat, Ruler, ShieldCheck, Layers, Wrench,
  Hammer, Cone, Shovel, Fence, Drill, TrafficCone,
  Landmark, Building, Building2, Factory, Warehouse, Blocks, Combine,
  MapPin, Map, Route, Compass, Milestone, Signpost,
  Gauge, Cog, Settings, Shield, BadgeCheck,
  ClipboardCheck, ClipboardList, FileCheck, FileCog, Scan, ScanLine,
  Pipette, Paintbrush, PenTool, Shapes, Triangle, Hexagon,
  Mountain, TreePine, Leaf, Droplets, Zap, Bolt, Cable, Container, Package, Weight,
};

function resolveIcon(name: string) {
  const Icon = ICON_MAP[name] ?? Layers;
  return <Icon className="h-6 w-6" style={{ color: "#F87171" }} />;
}

export function ServicesSection({ services }: { services: Service[] }) {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      className="relative w-full py-24 lg:py-32 font-['Space_Grotesk'] overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="absolute inset-0 transition-colors duration-500 pointer-events-none" style={{ backgroundColor: "var(--tint-subtle)" }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="font-['Space_Mono'] text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: "var(--link-text)" }}
          >
            {t("sectionLabel")}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-[1.1]" style={{ color: "var(--text-primary)" }}>
            {t("titlePrefix")} <span className="text-[#E63B2E]">{t("titleAccent")}</span> {t("titleSuffix")}
          </h2>
          <p
            className="mt-4 mx-auto max-w-lg font-['Space_Mono'] text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {t("description")}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <a href={`/services/${service.slug}`} key={service.id} className="block w-full">
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

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isMobile) {
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl cursor-pointer"
    >
      <div className="relative h-56 md:h-64 overflow-hidden rounded-xl">
        <video
          ref={videoRef}
          src={`${service.video}#t=${service.startTime ?? 0.1}`}
          muted
          autoPlay={isMobile}
          loop
          playsInline
          preload={isMobile ? "auto" : "metadata"}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
            isActive ? "scale-110" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isActive ? "bg-black/40" : "bg-black/60"
          }`}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="mb-3">{service.icon}</div>
          <h3 className="text-lg font-bold uppercase tracking-tight text-white">
            {service.title}
          </h3>
          <p
            className={`mt-1 text-sm text-white/70 transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
