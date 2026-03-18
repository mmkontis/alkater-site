const BASE = "https://alkater.gr";

const LLMS_TXT = `# ALKATER S.A. (ΑΛΚΑΤΕΡ Α.Ε.)

> ALKATER (ΑΛΚΑΤΕΡ Α.Ε.) is a Greek construction company specializing in road network construction and maintenance, asphalting, road markings, earthworks, and civil engineering infrastructure projects. The company holds ISO 9001, ISO 14001, ISO 45001, and ISO 50001 certifications.

ALKATER was founded in 1998 and is headquartered in Igoumenitsa, Thesprotia, Greece. The company operates primarily in Epirus and Western Greece, with project capability across the entire country. Over 25 years of experience, 150+ completed projects, and 500+ km of road network constructed.

## Services

- [Asphalting (Ασφαλτοστρώσεις)](${BASE}/services/asfaltostroseis): High-specification asphalting services for road networks, parking areas, and private installations.
- [Road Markings (Διαγραμμίσεις Οδών)](${BASE}/services/diagrammiseis-odon): Professional road marking for road networks, parking areas, and industrial facilities with certified materials.
- [Earthworks & Infrastructure (Χωματουργικά & Υποδομές)](${BASE}/services/chomatourgika-ypodomes): Excavations, embankments, road openings, drainage networks, and large-scale infrastructure projects.
- [Public Works (Δημόσια Έργα)](${BASE}/services/dimosia-erga): Execution of public works projects with consistency, schedule adherence, and strict quality standards.
- [Technical Studies (Τεχνικές Μελέτες)](${BASE}/services/technikes-meletes): Technical studies, topographic surveys, and infrastructure project design with modern tools and methodologies.
- [Quality Control (Ποιοτικός Έλεγχος)](${BASE}/services/poiotikos-elegchos): Strict quality control at every construction stage with certified ISO procedures and specialized laboratory equipment.

## What We Do Not Do

ALKATER does not provide:
- Architectural design or building construction
- Real estate development or property sales
- Electrical or plumbing installations
- Interior design or renovation services
- Environmental consulting (separate from construction compliance)

## Contact

- Email: alkater2024@outlook.com
- Address: Igoumenitsa, Thesprotia, Greece
- Website: ${BASE}
- Alternative domain: https://alkater.com (redirects to ${BASE})

## Key Information

- [About Us](${BASE}/about): Company history, mission, values, milestones, and leadership team
- [Certifications](${BASE}/certifications): ISO certifications and quality standards
- [Equipment](${BASE}/equipment): Modern fleet of construction machinery and vehicles
- [Team](${BASE}/team): Company departments and team structure
- [Blog / Articles](${BASE}/blog/simassia-sintirissis-odikon-diktyon): Technical articles on road construction and infrastructure
- [Careers](${BASE}/careers): Current job opportunities
- [Contact](${BASE}/contact): Contact form, map, and office details

## Certifications

- ISO 9001: Quality Management System
- ISO 14001: Environmental Management System
- ISO 45001: Occupational Health and Safety Management System
- ISO 50001: Energy Management System

## Locations

- Headquarters: Igoumenitsa, Thesprotia, Greece
- Primary service area: Epirus and Western Greece
- Extended service area: Nationwide (Greece)

## AI Discovery Files

- [LLM Information](${BASE}/llms.txt): This file — structured business summary for AI systems
- [Sitemap](${BASE}/sitemap.xml): Complete site structure with all pages
- [Robots Policy](${BASE}/robots.txt): Crawler access rules
`;

export async function GET() {
  return new Response(LLMS_TXT.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
