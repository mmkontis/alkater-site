import { OG_SIZE, OG_CONTENT_TYPE, renderBrandOg } from "@/lib/og/shell";

export const runtime = "nodejs";
export const alt = "ALKATER — Κατασκευαστική Εταιρεία";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderBrandOg({
    locale: "el",
    eyebrow: "Κατασκευες · Υποδομες",
    title: "Χτιζουμε υποδομες",
    accent: "που αντεχουν.",
    subtitle:
      "Οδοποιία, ασφαλτοστρώσεις και μεγάλα τεχνικά έργα σε όλη την Ήπειρο και τη Δυτική Ελλάδα.",
    badges: ["ISO 9001", "ISO 14001", "ISO 45001"],
  });
}
