import type { Metadata } from "next";
import { getPageContent, getTeamMembers, type AboutPageContent, type TeamMember } from "@/lib/queries";
import { getTranslations, getLocale } from "next-intl/server";
import { getAlternates, getOgLocale, getSiteName, organizationJsonLd, breadcrumbJsonLd, getAbsoluteUrl, pickByLocale } from "@/lib/seo";
import AboutPageClient from "./about-client";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = pickByLocale(locale, "Η Εταιρεία", "About Us", "Über uns");
  const description = pickByLocale(
    locale,
    "Γνωρίστε την ΑΛΚΑΤΕΡ - τεχνική εταιρεία με εξειδίκευση στην οδοποιία και τα τεχνικά έργα υποδομών.",
    "Discover ALKATER - a construction company specializing in road works and infrastructure projects.",
    "Lernen Sie ALKATER kennen - ein Bauunternehmen mit Spezialisierung auf Straßenbau und Infrastrukturprojekte.",
  );
  return {
    title,
    description,
    alternates: getAlternates("/about"),
    openGraph: {
      title,
      description,
      locale: getOgLocale(locale),
      siteName: getSiteName(locale),
    },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const locale = await getLocale();

  const FALLBACK: AboutPageContent = {
    hero: {
      label: t("heroLabel"),
      title: t("heroTitle"),
      title_accent: t("heroTitleAccent"),
      subtitle: t("heroSubtitle"),
      image: "/HighRes/image-1772752810544.png",
    },
    stats: [
      { value: "10+", label: "Χρόνια Εμπειρίας" },
      { value: "5+", label: "Ολοκληρωμένα Έργα" },
      { value: "500+", label: "Χιλιόμετρα Οδικού Δικτύου" },
      { value: "15+", label: "Εξειδικευμένο Προσωπικό" },
    ],
    mission: {
      label: "Αποστολη",
      title: "Δεσμευση Στην Ποιοτητα",
      title_accent: "Ποιοτητα",
      paragraphs: [
        "Η ΑΛΚΑΤΕΡ Α.Ε. ιδρύθηκε με όραμα να προσφέρει κατασκευαστικές υπηρεσίες υψηλών προδιαγραφών στην Ήπειρο και τη Δυτική Ελλάδα. Με πάνω από 25 χρόνια εμπειρίας, έχουμε εξελιχθεί σε μία από τις πιο αξιόπιστες κατασκευαστικές εταιρείες της περιοχής.",
        "Η φιλοσοφία μας βασίζεται στην αρχή ότι κάθε έργο — ανεξαρτήτως μεγέθους — αξίζει τον ίδιο βαθμό αφοσίωσης και τεχνικής αρτιότητας. Αυτή η αρχή μας οδηγεί σε κάθε απόφαση.",
      ],
      image: "/HighRes/image-1772752827339.png",
    },
    values: {
      label: "Αξιες",
      title: "Τι Μας Οριζει",
      title_accent: "Οριζει",
      items: [
        { icon: "Target", title: "Ακρίβεια", desc: "Κάθε έργο εκτελείται με μαθηματική ακρίβεια, τηρώντας αυστηρά τις τεχνικές προδιαγραφές και τα χρονοδιαγράμματα." },
        { icon: "Eye", title: "Διαφάνεια", desc: "Πλήρης ενημέρωση και ανοιχτή επικοινωνία με τους πελάτες μας σε κάθε φάση του έργου." },
        { icon: "Heart", title: "Αφοσίωση", desc: "Η δέσμευσή μας στην ποιότητα και την ασφάλεια δεν είναι διαπραγματεύσιμη — είναι η ταυτότητά μας." },
      ],
    },
    milestones: {
      label: "Χρονολογιο",
      title: "Η Πορεια Μας",
      title_accent: "Μας",
      items: [
        { year: "1998", text: "Ίδρυση της ΑΛΚΑΤΕΡ Α.Ε. στην Ηγουμενίτσα" },
        { year: "2005", text: "Ολοκλήρωση του πρώτου μεγάλου δημόσιου έργου" },
        { year: "2010", text: "Επέκταση στόλου μηχανημάτων — απόκτηση σύγχρονου εξοπλισμού ασφαλτόστρωσης" },
        { year: "2015", text: "Ανάληψη έργων σε όλη την Ήπειρο και τη Δυτική Ελλάδα" },
        { year: "2025", text: "Πιστοποιήσεις ISO 9001, ISO 14001, ISO 45001 & ISO 50001" },
        { year: "2025", text: "150+ ολοκληρωμένα έργα και συνεχής ανάπτυξη" },
      ],
    },
  };

  const [content, teamMembers] = await Promise.all([
    getPageContent("about", locale),
    getTeamMembers(locale),
  ]);

  const homeLabel = pickByLocale(locale, "Αρχική", "Home", "Startseite");
  const aboutLabel = pickByLocale(locale, "Η Εταιρεία", "About Us", "Über uns");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          organizationJsonLd(locale),
          breadcrumbJsonLd([
            { name: homeLabel, url: getAbsoluteUrl("", locale) },
            { name: aboutLabel, url: getAbsoluteUrl("/about", locale) },
          ]),
        ]) }}
      />
      <AboutPageClient content={content ?? FALLBACK} teamMembers={teamMembers} />
    </>
  );
}
