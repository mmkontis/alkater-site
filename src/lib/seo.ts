const SITE_URL = "https://alkater.gr";
const SITE_NAME_EL = "ΑΛΚΑΤΕΡ Κατασκευαστική";
const SITE_NAME_EN = "ALKATER Construction";
const SITE_NAME_DE = "ALKATER Bauunternehmen";

const isEl = (l: string) => l === "el";

export function getBaseUrl() {
  return SITE_URL;
}

export function getAbsoluteUrl(path: string, locale: string = "el") {
  const prefix = isEl(locale) ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export function getAlternates(path: string) {
  return {
    canonical: getAbsoluteUrl(path, "el"),
    languages: {
      el: getAbsoluteUrl(path, "el"),
      en: getAbsoluteUrl(path, "en"),
      de: getAbsoluteUrl(path, "de"),
      "x-default": getAbsoluteUrl(path, "el"),
    },
  };
}

export function getSiteName(locale: string) {
  if (locale === "de") return SITE_NAME_DE;
  if (locale === "en") return SITE_NAME_EN;
  return SITE_NAME_EL;
}

export function getOgLocale(locale: string) {
  if (locale === "de") return "de_DE";
  if (locale === "en") return "en_US";
  return "el_GR";
}

export function getInLanguage(locale: string) {
  if (locale === "de") return "de-DE";
  if (locale === "en") return "en";
  return "el-GR";
}

export function pickByLocale<T>(locale: string, el: T, en: T, de: T): T {
  if (locale === "de") return de;
  if (locale === "en") return en;
  return el;
}

function legalName(locale: string) {
  // The legal entity name is "ALKATER S.A." in Latin scripts (en, de); Greek uses "ΑΛΚΑΤΕΡ Α.Ε."
  return isEl(locale) ? "ΑΛΚΑΤΕΡ Α.Ε." : "ALKATER S.A.";
}

function city(locale: string) {
  return isEl(locale) ? "Ηγουμενίτσα" : "Igoumenitsa";
}

function region(locale: string) {
  return isEl(locale) ? "Θεσπρωτία" : "Thesprotia";
}

function country(locale: string) {
  if (locale === "de") return "Griechenland";
  if (locale === "en") return "Greece";
  return "Ελλάδα";
}

function orgDescription(locale: string) {
  if (locale === "de") {
    return "Bauunternehmen mit Spezialisierung auf den Bau und die Instandhaltung von Straßennetzen, Asphaltierung und Infrastrukturprojekte.";
  }
  if (locale === "en") {
    return "Construction company specializing in road network construction and maintenance, asphalting and infrastructure projects.";
  }
  return "Τεχνική εταιρεία εξειδικευμένη στην κατασκευή και συντήρηση οδικών δικτύων, ασφαλτοστρώσεις και τεχνικά έργα υποδομών.";
}

function businessDescription(locale: string) {
  if (locale === "de") {
    return "Bauunternehmen - Straßenbau, Asphaltierung, Tiefbau";
  }
  if (locale === "en") {
    return "Construction Company - Road Works, Asphalting, Civil Engineering";
  }
  return "Κατασκευαστική εταιρεία - Οδοποιία, Ασφαλτοστρώσεις, Τεχνικά Έργα";
}

// ── JSON-LD Generators ──

export function organizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: legalName(locale),
    alternateName: ["ALKATER", "ΑΛΚΑΤΕΡ"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: orgDescription(locale),
    address: {
      "@type": "PostalAddress",
      addressLocality: city(locale),
      addressRegion: region(locale),
      addressCountry: "GR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "alkater2024@outlook.com",
      contactType: "customer service",
      availableLanguage: ["Greek", "English", "German"],
    },
    sameAs: ["https://alkater.com"],
  };
}

export function localBusinessJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: legalName(locale),
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description: businessDescription(locale),
    address: {
      "@type": "PostalAddress",
      addressLocality: city(locale),
      addressRegion: region(locale),
      addressCountry: "GR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.5042,
      longitude: 20.2654,
    },
    email: "alkater2024@outlook.com",
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: country(locale),
    },
  };
}

export function webSiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getSiteName(locale),
    url: SITE_URL,
    inLanguage: getInLanguage(locale),
    publisher: {
      "@type": "Organization",
      name: legalName(locale),
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    image: opts.image ? `${SITE_URL}${opts.image}` : undefined,
    datePublished: opts.datePublished,
    inLanguage: getInLanguage(opts.locale),
    author: {
      "@type": "Organization",
      name: legalName(opts.locale),
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: legalName(opts.locale),
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  image?: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    image: opts.image ? `${SITE_URL}${opts.image}` : undefined,
    provider: {
      "@type": "Organization",
      name: legalName(opts.locale),
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: country(opts.locale),
    },
  };
}
