import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates, getOgLocale, getSiteName, getAbsoluteUrl } from "@/lib/seo";
import EspaPageClient from "./espa-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "espaPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates("/espa"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: getOgLocale(locale),
      siteName: getSiteName(locale),
      url: getAbsoluteUrl("/espa", locale),
    },
  };
}

export default function EspaPage() {
  return <EspaPageClient />;
}
