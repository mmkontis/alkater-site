import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ΑΛΚΑΤΕΡ Κατασκευαστική",
    short_name: "ALKATER",
    description:
      "Τεχνική εταιρεία εξειδικευμένη στην κατασκευή και συντήρηση οδικών δικτύων, ασφαλτοστρώσεις και τεχνικά έργα υποδομών.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#E63B2E",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
