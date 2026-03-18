import type { Metadata } from "next";
import { getAlternates, getSiteName } from "@/lib/seo";
import ContactPageClient from "./contact-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "el" ? "Επικοινωνία" : "Contact";
  const description =
    locale === "el"
      ? "Επικοινωνήστε μαζί μας για κάθε κατασκευαστικό σας έργο. ΑΛΚΑΤΕΡ - Ηγουμενίτσα, Θεσπρωτία."
      : "Get in touch with us for your construction project. ALKATER - Igoumenitsa, Thesprotia.";
  return {
    title,
    description,
    alternates: getAlternates("/contact"),
    openGraph: {
      title,
      description,
      locale: locale === "el" ? "el_GR" : "en_US",
      siteName: getSiteName(locale),
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
