import type { Metadata } from "next";
import { getAlternates, getSiteName } from "@/lib/seo";
import CareersPageClient from "./careers-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "el" ? "Καριέρα" : "Careers";
  const description =
    locale === "el"
      ? "Ευκαιρίες καριέρας στην ΑΛΚΑΤΕΡ. Γίνε μέρος της ομάδας μας."
      : "Career opportunities at ALKATER. Join our team.";
  return {
    title,
    description,
    alternates: getAlternates("/careers"),
    openGraph: {
      title,
      description,
      locale: locale === "el" ? "el_GR" : "en_US",
      siteName: getSiteName(locale),
    },
  };
}

export default function CareersPage() {
  return <CareersPageClient />;
}
