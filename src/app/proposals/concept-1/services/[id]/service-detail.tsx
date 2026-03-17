"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { InnerPageLayout, PageHero } from "@/components/landing/InnerPageLayout";
import { ContactSection } from "@/components/landing/ContactSection";

interface ServiceData {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string | null;
  video_url: string | null;
  video_start_time: number;
}

interface ProjectData {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  description: string;
  image_url: string | null;
  sort_order: number;
}

export default function ServiceDetailClient({
  service,
  projects,
}: {
  service: ServiceData;
  projects: ProjectData[];
}) {
  return (
    <InnerPageLayout>
      <PageHero
        label="Υπηρεσια"
        title={
          <>
            {service.name.split(" ").slice(0, 2).join(" ")}
            {service.name.split(" ").length > 2 && (
              <>
                <br />
                <span className="text-[#E63B2E]">{service.name.split(" ").slice(2).join(" ")}.</span>
              </>
            )}
            {service.name.split(" ").length <= 2 && <span className="text-[#E63B2E]">.</span>}
          </>
        }
        subtitle={service.description}
        image={service.image_url ?? undefined}
      />

      {/* Video preview */}
      {service.video_url && (
        <section className="relative border-t border-white/5">
          <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <video
                src={`${service.video_url}#t=${service.video_start_time || 0.1}`}
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </section>
      )}

      {/* Projects grid */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[linear-gradient(#F5F3EE_1px,transparent_1px),linear-gradient(90deg,#F5F3EE_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-[#E63B2E]" />
              <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">
                Εργα
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-[1.1]">
              Σχετικα <span className="text-[#E63B2E]">Εργα.</span>
            </h2>
            <p className="font-['Space_Mono'] text-sm md:text-base mt-4 max-w-2xl text-[#E8E4DD]/60 leading-relaxed">
              Δείτε τα έργα μας που σχετίζονται με την υπηρεσία «{service.name}».
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="py-20 text-center border border-white/5 rounded-lg">
              <p className="font-['Space_Mono'] text-[#E8E4DD]/40 text-sm uppercase tracking-widest">
                Δεν υπάρχουν έργα ακόμα για αυτή την υπηρεσία.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-[#1A1A1A]"
                >
                  <Link href={`/proposals/concept-1/projects/${project.slug}`} className="absolute inset-0 z-30" />
                  <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

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

                  {project.image_url && (
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-all duration-1000 group-hover:scale-105 filter grayscale-[0.3] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-16 md:mt-24 text-center">
            <a
              href="mailto:alkater2024@outlook.com?subject=Ενδιαφέρον για υπηρεσία - ${service.name}"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-['Space_Mono'] uppercase tracking-widest transition-colors duration-300 border border-white/20 text-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ζητηστε Προσφορα <ChevronRight className="w-4 h-4" />
              </span>
              <span className="absolute inset-0 bg-[#E63B2E] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </a>
          </div>
        </div>
      </section>

      <div id="contact">
        <ContactSection />
      </div>
    </InnerPageLayout>
  );
}
