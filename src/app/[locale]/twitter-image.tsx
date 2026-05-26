import { OG_SIZE, OG_CONTENT_TYPE, renderBrandOg } from "@/lib/og/shell";

export const runtime = "nodejs";
export const alt = "ALKATER — Construction · Road works · Infrastructure";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function TwitterImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy =
    locale === "de"
      ? {
          eyebrow: "Bau · Infrastruktur",
          title: "Wir bauen Infrastruktur,",
          accent: "die bleibt.",
          subtitle:
            "Straßenbau, Asphaltierung und große Tiefbauprojekte in Epirus und Westgriechenland.",
        }
      : locale === "en"
        ? {
            eyebrow: "Construction · Infrastructure",
            title: "Building infrastructure",
            accent: "that lasts.",
            subtitle:
              "Road works, asphalting and major civil engineering projects across Epirus and Western Greece.",
          }
        : {
            eyebrow: "Κατασκευες · Υποδομες",
            title: "Χτιζουμε υποδομες",
            accent: "που αντεχουν.",
            subtitle:
              "Οδοποιία, ασφαλτοστρώσεις και μεγάλα τεχνικά έργα σε όλη την Ήπειρο και τη Δυτική Ελλάδα.",
          };

  return renderBrandOg({
    locale,
    ...copy,
    badges: ["ISO 9001", "ISO 14001", "ISO 45001"],
  });
}
