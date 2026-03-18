"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { InnerPageLayout, PageHero, SectionHeading } from "@/components/landing/InnerPageLayout";
import { ShieldCheck, Award, FileCheck2, BadgeCheck, Zap, ExternalLink } from "lucide-react";

export default function CertificationsPageClient() {
  const t = useTranslations("certPage");

  const CERTIFICATIONS = [
    {
      icon: ShieldCheck,
      title: "ISO 9001:2015",
      org: t("iso9001Org"),
      desc: t("iso9001Desc"),
      year: "2025",
      certNo: "0474/QM/2025/GR",
      validUntil: "23-02-2028",
      certBody: "BQV",
      pdfUrl: "/certifications/iso-9001.pdf",
    },
    {
      icon: Award,
      title: "ISO 14001:2015",
      org: t("iso14001Org"),
      desc: t("iso14001Desc"),
      year: "2025",
      certNo: "0343/EM/2025/GR",
      validUntil: "23-02-2028",
      certBody: "BQV",
      pdfUrl: "/certifications/iso-14001.pdf",
    },
    {
      icon: FileCheck2,
      title: "ISO 45001:2018",
      org: t("iso45001Org"),
      desc: t("iso45001Desc"),
      year: "2025",
      certNo: "0213/OHSM/2025/GR",
      validUntil: "23-02-2028",
      certBody: "BQV",
      pdfUrl: "/certifications/iso-45001.pdf",
    },
    {
      icon: Zap,
      title: "ISO 50001:2018",
      org: t("iso50001Org"),
      desc: t("iso50001Desc"),
      year: "2025",
      certNo: "00.14.0236",
      validUntil: "03-07-2028",
      certBody: "EUROCERT",
      pdfUrl: "/certifications/iso-50001.pdf",
    },
    {
      icon: BadgeCheck,
      title: "ΕΣΥΔ / Μ.Ε.ΕΠ.",
      org: t("meepOrg"),
      desc: t("meepDesc"),
      year: "1998",
      pdfUrl: null,
    },
  ];

  const MEMBERSHIPS = [
    t("tee"),
    t("peede"),
    t("steat"),
    t("chamber"),
  ];
  return (
    <InnerPageLayout>
      <PageHero
        label={t("heroLabel")}
        title={<>{t("heroTitle")}<br /><span className="text-[#F0473D]">{t("heroTitleAccent")}</span></>}
        subtitle={t("heroSubtitle")}
        image="/HighRes/image-1772752827339.png"
      />

      {/* Certifications Grid */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading label={t("standardsLabel")} title={<>{t("standardsTitle")} <span className="text-[#F0473D]">{t("standardsTitleAccent")}</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CERTIFICATIONS.map((cert, i) => {
              const Wrapper = cert.pdfUrl ? "a" : "div";
              const wrapperProps = cert.pdfUrl
                ? { href: cert.pdfUrl, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className={`block bg-[#1A1A1A] p-8 md:p-10 border border-white/5 group hover:border-[#E63B2E]/30 transition-colors relative overflow-hidden ${cert.pdfUrl ? "cursor-pointer" : ""}`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E63B2E]/5 rounded-full blur-3xl group-hover:bg-[#E63B2E]/10 transition-colors duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <cert.icon className="w-12 h-12 text-[#E63B2E]" />
                        <div className="flex items-center gap-3">
                          <span className="font-['Space_Mono'] text-[#F0473D] text-sm">{cert.year}</span>
                          {cert.pdfUrl && <ExternalLink className="w-4 h-4 text-[#E8E4DD]/40 group-hover:text-[#E63B2E] transition-colors" />}
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">{cert.title}</h3>
                      <p className="font-['Space_Mono'] text-[#F0473D] text-xs uppercase tracking-widest mb-4">{cert.org}</p>
                      <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm leading-relaxed">{cert.desc}</p>
                      {"certBody" in cert && cert.certBody && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="font-['Space_Mono'] text-[#E8E4DD]/40 text-xs">{t("certBodyLabel", { body: cert.certBody })}</span>
                          <span className="font-['Space_Mono'] text-[#E8E4DD]/40 text-xs">{t("validUntilLabel", { date: cert.validUntil })}</span>
                        </div>
                      )}
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading label={t("membersLabel")} title={<>{t("membersTitle")} <span className="text-[#F0473D]">{t("membersTitleAccent")}</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEMBERSHIPS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-6 py-6 px-8 border border-white/5 bg-[#111111] hover:border-[#E63B2E]/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#E63B2E]/10 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5 text-[#E63B2E]" />
                </div>
                <p className="font-['Space_Mono'] text-sm md:text-base">{m}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
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
              <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#F0473D]">{t("commitmentLabel")}</span>
              <span className="w-8 h-[2px] bg-[#E63B2E]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-8 leading-[1.1]">
              {t("commitmentTitle")}<br /><span className="text-[#F0473D]">{t("commitmentTitleAccent")}</span>
            </h2>
            <p className="font-['Space_Mono'] text-[#E8E4DD]/60 text-sm md:text-base leading-relaxed">
              {t("commitmentDesc")}
            </p>
          </motion.div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
