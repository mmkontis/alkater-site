import type { Metadata } from "next";
import { getAlternates, getOgLocale, getSiteName, pickByLocale } from "@/lib/seo";
import CertificationsPageClient from "./certifications-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = pickByLocale(locale, "Πιστοποιήσεις", "Certifications", "Zertifizierungen");
  const description = pickByLocale(
    locale,
    "Οι πιστοποιήσεις ISO και μέλη μας. ΑΛΚΑΤΕΡ - πιστοποιημένη ποιότητα στα κατασκευαστικά έργα.",
    "Our ISO certifications and memberships. ALKATER - certified quality in construction projects.",
    "Unsere ISO-Zertifizierungen und Mitgliedschaften. ALKATER - zertifizierte Qualität bei Bauprojekten.",
  );
  return {
    title,
    description,
    alternates: getAlternates("/certifications"),
    openGraph: {
      title,
      description,
      locale: getOgLocale(locale),
      siteName: getSiteName(locale),
    },
  };
}

export default function CertificationsPage() {
  return <CertificationsPageClient />;
}
