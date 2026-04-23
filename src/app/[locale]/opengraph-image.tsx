import { OG_SIZE, OG_CONTENT_TYPE, renderBrandOg } from "@/lib/og/shell";

export const runtime = "nodejs";
export const alt = "ALKATER — Construction · Road works · Infrastructure";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  return renderBrandOg({
    locale,
    eyebrow: isEn ? "Construction · Infrastructure" : "Κατασκευες · Υποδομες",
    title: isEn ? "Building infrastructure" : "Χτιζουμε υποδομες",
    accent: isEn ? "that lasts." : "που αντεχουν.",
    subtitle: isEn
      ? "Road works, asphalting and major civil engineering projects across Epirus and Western Greece."
      : "Οδοποιία, ασφαλτοστρώσεις και μεγάλα τεχνικά έργα σε όλη την Ήπειρο και τη Δυτική Ελλάδα.",
    badges: ["ISO 9001", "ISO 14001", "ISO 45001"],
  });
}
