import type { Metadata } from "next";
import { getAlternates, getOgLocale, getSiteName, pickByLocale } from "@/lib/seo";
import EquipmentPageClient from "./equipment-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = pickByLocale(locale, "Εξοπλισμός", "Equipment", "Ausrüstung");
  const description = pickByLocale(
    locale,
    "Ο σύγχρονος εξοπλισμός της ΑΛΚΑΤΕΡ για τεχνικά έργα και ασφαλτοστρώσεις.",
    "ALKATER's modern equipment for construction and asphalting projects.",
    "Die moderne Ausrüstung von ALKATER für Bau- und Asphaltierungsprojekte.",
  );
  return {
    title,
    description,
    alternates: getAlternates("/equipment"),
    openGraph: {
      title,
      description,
      locale: getOgLocale(locale),
      siteName: getSiteName(locale),
    },
  };
}

export default function EquipmentPage() {
  return <EquipmentPageClient />;
}
