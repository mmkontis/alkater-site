"use client";

import { motion } from "framer-motion";
import { InnerPageLayout, PageHero, SectionHeading } from "@/components/landing/InnerPageLayout";
import { Target, Eye, Heart, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { AboutPageContent, TeamMember } from "@/lib/queries";

const ICON_MAP: Record<string, LucideIcon> = { Target, Eye, Heart };

const sectionDivider = (
  <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, var(--tint-divider), transparent)" }} />
);

function AccentTitle({ title, accent }: { title: string; accent: string }) {
  if (!accent) return <>{title}</>;
  const idx = title.indexOf(accent);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-[#E63B2E]">{accent}</span>
      {title.slice(idx + accent.length)}
    </>
  );
}

export default function AboutPageClient({ content: c, teamMembers }: { content: AboutPageContent; teamMembers: TeamMember[] }) {
  return (
    <InnerPageLayout>
      <PageHero
        label={c.hero.label}
        title={<AccentTitle title={c.hero.title} accent={c.hero.title_accent} />}
        subtitle={c.hero.subtitle}
        image={c.hero.image}
      />

      {/* Stats */}
      {sectionDivider}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, var(--tint-8), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ columnGap: 0 }}>
            {c.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="py-12 md:py-16 px-6 md:px-8 text-center"
                style={{ borderRight: i < 3 ? "1px solid var(--tint-border-12)" : "none" }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "var(--link-color, var(--accent))" }}>{stat.value}</div>
                <div className="font-['Space_Mono'] text-xs md:text-sm text-[#E8E4DD]/60 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      {sectionDivider}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(#F5F3EE_1px,transparent_1px),linear-gradient(90deg,#F5F3EE_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 80% 40%, var(--tint-10), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading label={c.mission.label} title={<AccentTitle title={c.mission.title} accent={c.mission.title_accent} />} />
              <div className="prose prose-invert prose-lg font-['Space_Mono'] text-[#E8E4DD]/70 max-w-none">
                {c.mission.paragraphs.map((p, i) => (
                  <p key={i} className={i < c.mission.paragraphs.length - 1 ? "mb-6" : ""}>{p}</p>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={c.mission.image} alt="Εργο ΑΛΚΑΤΕΡ" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
              <div className="absolute inset-0 opacity-20" style={{ background: "linear-gradient(135deg, var(--tint-30), transparent)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      {sectionDivider}
      <section className="py-24 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 10% 80%, var(--tint-10), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 90% 20%, var(--tint-6), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <SectionHeading label={c.values.label} title={<AccentTitle title={c.values.title} accent={c.values.title_accent} />} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.values.items.map((v, i) => {
              const Icon = ICON_MAP[v.icon] ?? Target;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="p-8 group transition-colors duration-500 rounded-lg"
                  style={{ backgroundColor: "var(--bg-tint-85)", border: "1px solid var(--tint-border-15)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--tint-border-40)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--tint-border-15)")}
                >
                  <Icon className="w-10 h-10 mb-6" style={{ color: "var(--link-color, var(--accent))" }} />
                  <h3 className="text-2xl font-bold uppercase mb-4">{v.title}</h3>
                  <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Members */}
      {teamMembers.length > 0 && (
        <>
          {sectionDivider}
          <section className="py-24 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 60%, var(--tint-8), transparent)" }} />
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
              <SectionHeading label="Ομαδα" title={<>Η Ομάδα <span className="text-[#E63B2E]">Μας.</span></>} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group rounded-lg overflow-hidden"
                    style={{ backgroundColor: "var(--bg-tint-85)", border: "1px solid var(--tint-border-15)" }}
                  >
                    {m.photo_url && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={m.photo_url} alt={`${m.first_name} ${m.last_name}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold uppercase mb-1">{m.first_name} {m.last_name}</h3>
                      <p className="font-['Space_Mono'] text-xs uppercase tracking-widest mb-4" style={{ color: "var(--link-color, var(--accent))" }}>{m.job_title}</p>
                      {m.bio && <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm leading-relaxed">{m.bio}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Timeline */}
      {sectionDivider}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 90% 20%, var(--tint-8), transparent)" }} />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <SectionHeading label={c.milestones.label} title={<AccentTitle title={c.milestones.title} accent={c.milestones.title_accent} />} />
          <div className="space-y-0">
            {c.milestones.items.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-8 py-8"
                style={{ borderBottom: "1px solid var(--tint-border-12)" }}
              >
                <div className="text-3xl md:text-4xl font-bold shrink-0 w-24" style={{ color: "var(--link-color, var(--accent))" }}>{m.year}</div>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/80 text-base md:text-lg pt-2">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
