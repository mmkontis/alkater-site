import type { Metadata } from "next";
import { getAlternates, getSiteName } from "@/lib/seo";
import EquipmentPageClient from "./equipment-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "el" ? "Εξοπλισμός" : "Equipment";
  const description =
    locale === "el"
      ? "Ο σύγχρονος εξοπλισμός της ΑΛΚΑΤΕΡ για τεχνικά έργα και ασφαλτοστρώσεις."
      : "ALKATER's modern equipment for construction and asphalting projects.";
  return {
    title,
    description,
    alternates: getAlternates("/equipment"),
    openGraph: {
      title,
      description,
      locale: locale === "el" ? "el_GR" : "en_US",
      siteName: getSiteName(locale),
    },
  };
}

export default function EquipmentPage() {
  return <EquipmentPageClient />;
}
