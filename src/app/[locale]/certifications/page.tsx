import type { Metadata } from "next";
import { getAlternates, getSiteName } from "@/lib/seo";
import CertificationsPageClient from "./certifications-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "el" ? "Πιστοποιήσεις" : "Certifications";
  const description =
    locale === "el"
      ? "Οι πιστοποιήσεις ISO και μέλη μας. ΑΛΚΑΤΕΡ - πιστοποιημένη ποιότητα στα κατασκευαστικά έργα."
      : "Our ISO certifications and memberships. ALKATER - certified quality in construction projects.";
  return {
    title,
    description,
    alternates: getAlternates("/certifications"),
    openGraph: {
      title,
      description,
      locale: locale === "el" ? "el_GR" : "en_US",
      siteName: getSiteName(locale),
    },
  };
}

export default function CertificationsPage() {
  return <CertificationsPageClient />;
}
