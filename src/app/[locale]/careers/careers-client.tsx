"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { InnerPageLayout, PageHero, SectionHeading } from "@/components/landing/InnerPageLayout";
import { Briefcase, MapPin, ArrowUpRight, HardHat, Wrench, Truck, FileCheck } from "lucide-react";

export default function CareersPageClient() {
  const t = useTranslations("careers");

  const JOB_OPENINGS = [
    {
      title: t("job1Title"),
      type: t("fullTime"),
      location: "Ηγουμενίτσα / Ήπειρος",
      desc: t("job1Desc"),
      icon: HardHat,
    },
    {
      title: t("job2Title"),
      type: t("fullTime"),
      location: "Ηγουμενίτσα / Ήπειρος",
      desc: t("job2Desc"),
      icon: Truck,
    },
    {
      title: t("job3Title"),
      type: t("fullTime"),
      location: "Ηγουμενίτσα",
      desc: t("job3Desc"),
      icon: Wrench,
    },
    {
      title: t("job4Title"),
      type: t("fullTime"),
      location: "Ηγουμενίτσα",
      desc: t("job4Desc"),
      icon: FileCheck,
    },
  ];

  const BENEFITS = [
    { title: t("benefit1Title"), desc: t("benefit1Desc") },
    { title: t("benefit2Title"), desc: t("benefit2Desc") },
    { title: t("benefit3Title"), desc: t("benefit3Desc") },
    { title: t("benefit4Title"), desc: t("benefit4Desc") },
    { title: t("benefit5Title"), desc: t("benefit5Desc") },
    { title: t("benefit6Title"), desc: t("benefit6Desc") },
  ];
  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={<>{t("heroTitle")}<br /><span className="text-[#E63B2E]">{t("heroTitleAccent")}</span></>}
        subtitle={t("heroSubtitle")}
        image="/HighRes/image-1772752818829.png"
      />

      {/* Why Work With Us */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading label={t("benefitsLabel")} title={<>{t("benefitsTitle")} <span className="text-[#E63B2E]">{t("benefitsTitleAccent")}</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#1A1A1A] p-8 border border-white/5 hover:border-[#E63B2E]/20 transition-colors"
              >
                <div className="text-3xl font-bold text-[#E63B2E] mb-2">0{i + 1}</div>
                <h3 className="text-xl font-bold uppercase mb-3">{b.title}</h3>
                <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading label={t("positionsLabel")} title={<>{t("positionsTitle")} <span className="text-[#E63B2E]">{t("positionsTitleAccent")}</span></>} />
          <div className="space-y-6">
            {JOB_OPENINGS.map((job, i) => (
              <motion.a
                key={i}
                href={`mailto:alkater2024@outlook.com?subject=Αίτηση για θέση: ${job.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group block bg-[#111111] border border-white/5 p-8 hover:border-[#E63B2E]/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#E63B2E]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E63B2E]/20 transition-colors">
                    <job.icon className="w-7 h-7 text-[#E63B2E]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-[#E63B2E] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-3">
                      <span className="font-['Space_Mono'] text-xs uppercase tracking-widest text-[#E8E4DD]/50 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" /> {job.type}
                      </span>
                      <span className="font-['Space_Mono'] text-xs uppercase tracking-widest text-[#E8E4DD]/50 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                    </div>
                    <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm leading-relaxed">{job.desc}</p>
                  </div>
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E63B2E] group-hover:bg-[#E63B2E] transition-colors">
                      <ArrowUpRight className="w-5 h-5 text-[#E8E4DD]/40 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-[#E63B2E]" />
              <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">{t("ctaLabel")}</span>
              <span className="w-8 h-[2px] bg-[#E63B2E]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-8 leading-[1.1]">
              {t("ctaTitle")}<br /><span className="text-[#E63B2E]">{t("ctaTitleAccent")}</span>
            </h2>
            <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm md:text-base leading-relaxed mb-10">
              {t("ctaDesc")}
            </p>
            <a
              href="mailto:alkater2024@outlook.com?subject=Αυθόρμητη αίτηση εργασίας"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-[#E63B2E] px-10 py-5 text-sm font-['Space_Mono'] uppercase tracking-widest text-white hover:scale-[1.02] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t("ctaButton")}
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 mix-blend-difference" />
            </a>
          </motion.div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
