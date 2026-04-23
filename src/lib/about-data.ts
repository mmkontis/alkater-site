/**
 * Single source of truth for "About Us" facts that appear in multiple places
 * (homepage AboutSection, /about page, OG images, JSON-LD, etc.).
 *
 * Update values here — every surface stays in sync automatically.
 */

export const FOUNDING_YEAR = 1998;

export const ABOUT_FACTS = {
  completedProjects: 150,
  roadKilometers: 500,
  staff: 50,
  coverageRegions: 15,
  machines: 30,
} as const;

export function yearsActive(now: Date = new Date()): number {
  return Math.max(0, now.getUTCFullYear() - FOUNDING_YEAR);
}

export type AboutStat = {
  value: number;
  suffix: string;
  /** Greek label */
  label: string;
  /** English label */
  label_en: string;
};

/**
 * Stats shown on the homepage AboutSection.
 * `value` is dynamic where possible (years of experience computed from
 * FOUNDING_YEAR) so we never have to come back here on a New Year.
 */
export function getAboutStats(): AboutStat[] {
  return [
    { value: yearsActive(), suffix: "+", label: "Έτη Εμπειρίας", label_en: "Years of Experience" },
    { value: ABOUT_FACTS.completedProjects, suffix: "+", label: "Ολοκληρωμένα Έργα", label_en: "Completed Projects" },
    { value: ABOUT_FACTS.coverageRegions, suffix: "", label: "Περιοχές Κάλυψης", label_en: "Regions Served" },
    { value: ABOUT_FACTS.staff, suffix: "+", label: "Εξειδικευμένο Προσωπικό", label_en: "Specialised Staff" },
  ];
}

export function getAboutSubtitle(locale: string): string {
  const since = FOUNDING_YEAR;
  if (locale === "en") {
    return `Since ${since}, ALKATER S.A. has been building infrastructure that stands the test of time. Headquartered in Igoumenitsa, our company is a benchmark in the construction sector of Epirus.`;
  }
  return `Από το ${since}, η ΑΛΚΑΤΕΡ Α.Ε. χτίζει υποδομές που αντέχουν στον χρόνο. Με έδρα την Ηγουμενίτσα, η εταιρεία μας αποτελεί σημείο αναφοράς στον κατασκευαστικό κλάδο της Ηπείρου.`;
}
