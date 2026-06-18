"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ExternalLink, Target, Wrench, TrendingUp } from "lucide-react";
import { InnerPageLayout } from "@/components/landing/InnerPageLayout";
import { getAbsoluteUrl, breadcrumbJsonLd, pickByLocale } from "@/lib/seo";

export default function EspaPageClient() {
  const t = useTranslations("espaPage");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const homeLabel = pickByLocale(locale, "Αρχική", "Home", "Startseite");

  // ESPA signage stays Greek by law on the EL site; EN & DE show the official English logos.
  const en = locale !== "el";
  const euSrc = en ? "/espa/eu-flag-en.png" : "/espa/eu-flag.png";
  const espaSrc = en ? "/espa/espa-2021-2027-en.png" : "/espa/espa-2021-2027.png";
  const competitivenessSrc = en ? "/espa/antagonistikotita-en.png" : "/espa/antagonistikotita.jpg";
  const breadcrumb = breadcrumbJsonLd([
    { name: homeLabel, url: getAbsoluteUrl("", locale) },
    { name: t("breadcrumb"), url: getAbsoluteUrl("/espa", locale) },
  ]);

  const aims = [t("aim1"), t("aim2"), t("aim3")];
  const funded = [t("funded1"), t("funded2"), t("funded3")];
  const results = [t("result1"), t("result2"), t("result3")];

  const sources = [
    { label: t("source1Label"), href: "https://www.espa.gr/el/Documents/odigos%20epikoinonias_landscape_v6.pdf" },
    { label: t("source2Label"), href: "https://21-27.antagonistikotita.gr/odigies-provolis-epikoinonias/" },
    { label: t("source3Label"), href: "https://21-27.antagonistikotita.gr/wp-content/uploads/2023/07/CELEX-32021R1060-EL-TXT-1.pdf" },
  ];

  return (
    <InnerPageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="font-['Space_Grotesk']" style={{ backgroundColor: "var(--surface-tinted)", color: "var(--text-primary)" }}>
        <section className="pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-muted)" }}>
              {t("eyebrow")}
            </p>
            <h1 className="text-3xl md:text-5xl leading-tight font-semibold mb-6">{t("title")}</h1>
            <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: "var(--text-secondary)" }}>
              {t("intro")}
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14" aria-label={t("compositeAria")}>
          <div className="container mx-auto px-6 max-w-5xl">
            <div
              className="rounded-xl bg-white p-6 md:p-10 flex flex-col items-center gap-8"
              style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
                <Image src={euSrc} alt={tf("euAlt")} width={640} height={288} className="h-20 md:h-32 w-auto object-contain" />
                <Image src={espaSrc} alt={tf("espaAlt")} width={560} height={288} className="h-20 md:h-32 w-auto object-contain" />
                <Image src={competitivenessSrc} alt={tf("competitivenessAlt")} width={640} height={288} className="h-20 md:h-32 w-auto object-contain" />
              </div>
              <p className="font-bold font-['Arial',Calibri,Tahoma,sans-serif] text-xs md:text-sm text-center text-gray-700 max-w-2xl">
                {t("officialPhrase")}
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-3 gap-4">
            <div className="rounded-lg p-5" style={{ backgroundColor: "var(--link-bg-30)" }}>
              <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>{t("operationLabel")}</p>
              <p className="text-base font-medium leading-snug">{t("operationName")}</p>
            </div>
            <div className="rounded-lg p-5" style={{ backgroundColor: "var(--link-bg-30)" }}>
              <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>{t("programmeLabel")}</p>
              <p className="text-base font-medium leading-snug">{t("programmeName")}</p>
            </div>
            <div className="rounded-lg p-5" style={{ backgroundColor: "var(--link-bg-30)" }}>
              <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>{t("fundingLabel")}</p>
              <p className="text-base font-medium leading-snug">{t("fundingValue")}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-3 gap-8 md:gap-10">
            <article>
              <div className="flex items-center gap-3 mb-5">
                <Target className="w-5 h-5" aria-hidden="true" style={{ color: "var(--accent)" }} />
                <h2 className="text-xl font-semibold">{t("aimsHeading")}</h2>
              </div>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {aims.map((item, i) => (
                  <li key={i} className="flex gap-2"><span aria-hidden="true">·</span><span>{item}</span></li>
                ))}
              </ul>
            </article>
            <article>
              <div className="flex items-center gap-3 mb-5">
                <Wrench className="w-5 h-5" aria-hidden="true" style={{ color: "var(--accent)" }} />
                <h2 className="text-xl font-semibold">{t("fundedHeading")}</h2>
              </div>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {funded.map((item, i) => (
                  <li key={i} className="flex gap-2"><span aria-hidden="true">·</span><span>{item}</span></li>
                ))}
              </ul>
            </article>
            <article>
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp className="w-5 h-5" aria-hidden="true" style={{ color: "var(--accent)" }} />
                <h2 className="text-xl font-semibold">{t("resultsHeading")}</h2>
              </div>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {results.map((item, i) => (
                  <li key={i} className="flex gap-2"><span aria-hidden="true">·</span><span>{item}</span></li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="py-12 md:py-16" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-xl font-semibold mb-6">{t("sourcesHeading")}</h2>
            <ul className="space-y-3">
              {sources.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm hover:text-[#E63B2E] transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </InnerPageLayout>
  );
}
