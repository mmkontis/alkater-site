import type { Metadata } from "next";
import { getAlternates, getOgLocale, getSiteName, pickByLocale } from "@/lib/seo";
import ContactPageClient from "./contact-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = pickByLocale(locale, "Επικοινωνία", "Contact", "Kontakt");
  const description = pickByLocale(
    locale,
    "Επικοινωνήστε μαζί μας για κάθε κατασκευαστικό σας έργο. ΑΛΚΑΤΕΡ - Ηγουμενίτσα, Θεσπρωτία.",
    "Get in touch with us for your construction project. ALKATER - Igoumenitsa, Thesprotia.",
    "Kontaktieren Sie uns für Ihr Bauprojekt. ALKATER - Igoumenitsa, Thesprotia.",
  );
  return {
    title,
    description,
    alternates: getAlternates("/contact"),
    openGraph: {
      title,
      description,
      locale: getOgLocale(locale),
      siteName: getSiteName(locale),
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
