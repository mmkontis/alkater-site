import type { Metadata } from "next";
import { getAlternates, getOgLocale, getSiteName, pickByLocale } from "@/lib/seo";
import TeamPageClient from "./team-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = pickByLocale(locale, "Η Ομάδα Μας", "Our Team", "Unser Team");
  const description = pickByLocale(
    locale,
    "Γνωρίστε την ομάδα της ΑΛΚΑΤΕΡ - εξειδικευμένο προσωπικό με εμπειρία στα κατασκευαστικά έργα.",
    "Meet the ALKATER team - experienced professionals in construction projects.",
    "Lernen Sie das ALKATER-Team kennen - erfahrene Fachleute für Bauprojekte.",
  );
  return {
    title,
    description,
    alternates: getAlternates("/team"),
    openGraph: {
      title,
      description,
      locale: getOgLocale(locale),
      siteName: getSiteName(locale),
    },
  };
}

export default function TeamPage() {
  return <TeamPageClient />;
}
