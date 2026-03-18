const SITE_URL = "https://alkater.gr";
const SITE_NAME_EL = "ΑΛΚΑΤΕΡ Κατασκευαστική";
const SITE_NAME_EN = "ALKATER Construction";

export function getBaseUrl() {
  return SITE_URL;
}

export function getAbsoluteUrl(path: string, locale: string = "el") {
  const prefix = locale === "el" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export function getAlternates(path: string) {
  return {
    canonical: getAbsoluteUrl(path, "el"),
    languages: {
      el: getAbsoluteUrl(path, "el"),
      en: getAbsoluteUrl(path, "en"),
      "x-default": getAbsoluteUrl(path, "el"),
    },
  };
}

export function getSiteName(locale: string) {
  return locale === "el" ? SITE_NAME_EL : SITE_NAME_EN;
}

// ── JSON-LD Generators ──

export function organizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "el" ? "ΑΛΚΑΤΕΡ Α.Ε." : "ALKATER S.A.",
    alternateName: ["ALKATER", "ΑΛΚΑΤΕΡ"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      locale === "el"
        ? "Τεχνική εταιρεία εξειδικευμένη στην κατασκευή και συντήρηση οδικών δικτύων, ασφαλτοστρώσεις και τεχνικά έργα υποδομών."
        : "Construction company specializing in road network construction and maintenance, asphalting and infrastructure projects.",
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "el" ? "Ηγουμενίτσα" : "Igoumenitsa",
      addressRegion: locale === "el" ? "Θεσπρωτία" : "Thesprotia",
      addressCountry: "GR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "alkater2024@outlook.com",
      contactType: "customer service",
      availableLanguage: ["Greek", "English"],
    },
    sameAs: ["https://alkater.com"],
  };
}

export function localBusinessJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: locale === "el" ? "ΑΛΚΑΤΕΡ Α.Ε." : "ALKATER S.A.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description:
      locale === "el"
        ? "Κατασκευαστική εταιρεία - Οδοποιία, Ασφαλτοστρώσεις, Τεχνικά Έργα"
        : "Construction Company - Road Works, Asphalting, Civil Engineering",
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "el" ? "Ηγουμενίτσα" : "Igoumenitsa",
      addressRegion: locale === "el" ? "Θεσπρωτία" : "Thesprotia",
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
      name: locale === "el" ? "Ελλάδα" : "Greece",
    },
  };
}

export function webSiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getSiteName(locale),
    url: SITE_URL,
    inLanguage: locale === "el" ? "el-GR" : "en",
    publisher: {
      "@type": "Organization",
      name: locale === "el" ? "ΑΛΚΑΤΕΡ Α.Ε." : "ALKATER S.A.",
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
    inLanguage: opts.locale === "el" ? "el-GR" : "en",
    author: {
      "@type": "Organization",
      name: opts.locale === "el" ? "ΑΛΚΑΤΕΡ Α.Ε." : "ALKATER S.A.",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: opts.locale === "el" ? "ΑΛΚΑΤΕΡ Α.Ε." : "ALKATER S.A.",
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
      name: opts.locale === "el" ? "ΑΛΚΑΤΕΡ Α.Ε." : "ALKATER S.A.",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: opts.locale === "el" ? "Ελλάδα" : "Greece",
    },
  };
}
