"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/queries";
import { PROJECTS as DEFAULT_PROJECTS } from "@/lib/projects";

export function ProjectsSection({ projects: projectsProp }: { projects?: Project[] }) {
  const t = useTranslations("projects");
  const projectItems = projectsProp?.length
    ? projectsProp.map((p) => ({
        id: p.sort_order,
        slug: p.slug,
        title: p.title,
        location: p.location,
        category: p.category,
        image: p.image_url,
      }))
    : DEFAULT_PROJECTS;
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden font-['Space_Grotesk'] transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(#F5F3EE_1px,transparent_1px),linear-gradient(90deg,#F5F3EE_1px,transparent_1px)] bg-[size:100px_100px] opacity-[0.02] pointer-events-none"></div>
      <div className="absolute inset-0 transition-colors duration-500 pointer-events-none" style={{ backgroundColor: "var(--tint-subtle)" }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <span className="w-8 h-[2px]" style={{ backgroundColor: "var(--text-muted)" }}></span>
            <span className="font-['Space_Mono'] uppercase tracking-widest text-sm" style={{ color: "var(--text-muted)" }}>{t("sectionLabel")}</span>
            <span className="w-8 h-[2px]" style={{ backgroundColor: "var(--text-muted)" }}></span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mx-auto max-w-3xl leading-[1.1]" style={{ color: "var(--text-primary)" }}>
            {t("titleMain")} <span className="text-[#E63B2E]">{t("titleAccent")}</span>
          </h2>
          <p className="font-['Space_Mono'] text-sm md:text-base mt-6 max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          style={mounted ? { y } : {}}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {projectItems.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        <div className="mt-16 md:mt-24 text-center">
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-['Space_Mono'] uppercase tracking-widest transition-colors duration-300 border"
            style={{ borderColor: "var(--border-hover)", color: "var(--text-primary)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("cta")} <ChevronRight className="w-4 h-4" />
            </span>
            <span className="absolute inset-0 bg-[#E63B2E] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: { id: number; slug: string; title: string; location: string; category: string; image: string; }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      <Link href={`/projects/${project.slug}`} aria-label={project.title} className="absolute inset-0 z-30" />
      <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

      <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 pointer-events-none">
        <div className="flex justify-between items-start">
          <span className="bg-[#E63B2E] text-white font-['Space_Mono'] text-[10px] uppercase tracking-widest py-1.5 px-3 rounded-full inline-block backdrop-blur-md">
            {project.category}
          </span>
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-white uppercase tracking-tight mb-2 drop-shadow-md">
            {project.title}
          </h3>
          <p className="font-['Space_Mono'] text-[#E8E4DD]/90 text-xs md:text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-md">
            {project.location}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
          className="object-cover transition-all duration-1000 group-hover:scale-105 filter grayscale-[0.3] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10"></div>
      </div>
    </motion.div>
  );
}
