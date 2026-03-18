import type { Metadata } from "next";
import { getAlternates, getSiteName } from "@/lib/seo";
import TeamPageClient from "./team-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "el" ? "Η Ομάδα Μας" : "Our Team";
  const description =
    locale === "el"
      ? "Γνωρίστε την ομάδα της ΑΛΚΑΤΕΡ - εξειδικευμένο προσωπικό με εμπειρία στα κατασκευαστικά έργα."
      : "Meet the ALKATER team - experienced professionals in construction projects.";
  return {
    title,
    description,
    alternates: getAlternates("/team"),
    openGraph: {
      title,
      description,
      locale: locale === "el" ? "el_GR" : "en_US",
      siteName: getSiteName(locale),
    },
  };
}

export default function TeamPage() {
  return <TeamPageClient />;
}
