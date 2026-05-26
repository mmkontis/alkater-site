import type { Metadata } from "next";
import { getAlternates, getOgLocale, getSiteName, pickByLocale } from "@/lib/seo";
import CareersPageClient from "./careers-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = pickByLocale(locale, "Καριέρα", "Careers", "Karriere");
  const description = pickByLocale(
    locale,
    "Ευκαιρίες καριέρας στην ΑΛΚΑΤΕΡ. Γίνε μέρος της ομάδας μας.",
    "Career opportunities at ALKATER. Join our team.",
    "Karrieremöglichkeiten bei ALKATER. Werden Sie Teil unseres Teams.",
  );
  return {
    title,
    description,
    alternates: getAlternates("/careers"),
    openGraph: {
      title,
      description,
      locale: getOgLocale(locale),
      siteName: getSiteName(locale),
    },
  };
}

export default function CareersPage() {
  return <CareersPageClient />;
}
