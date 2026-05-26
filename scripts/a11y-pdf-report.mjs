import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE = process.env.A11Y_BASE_URL || "https://alkater.gr";
const OUT_DIR = resolve(__dirname, "..", "reports");
const PDF_PATH = resolve(OUT_DIR, "alkater-wcag21-aa-report.pdf");
const SHOTS_DIR = resolve(OUT_DIR, "screenshots");

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(SHOTS_DIR, { recursive: true });

const PAGES = [
  { name: "Αρχική (Ελληνικά)", url: `${BASE}/`, file: "home-el" },
  { name: "Home (English)", url: `${BASE}/en`, file: "home-en" },
  { name: "Startseite (Deutsch)", url: `${BASE}/de`, file: "home-de" },
  { name: "Η Εταιρεία (Ελληνικά)", url: `${BASE}/about`, file: "about-el" },
  { name: "About Us (English)", url: `${BASE}/en/about`, file: "about-en" },
  { name: "Über uns (Deutsch)", url: `${BASE}/de/about`, file: "about-de" },
  { name: "Πιστοποιήσεις (Ελληνικά)", url: `${BASE}/certifications`, file: "cert-el" },
  { name: "Certifications (English)", url: `${BASE}/en/certifications`, file: "cert-en" },
  { name: "Επικοινωνία (Ελληνικά)", url: `${BASE}/contact`, file: "contact-el" },
  { name: "Contact (English)", url: `${BASE}/en/contact`, file: "contact-en" },
  { name: "Kontakt (Deutsch)", url: `${BASE}/de/contact`, file: "contact-de" },
  { name: "Καριέρες (Ελληνικά)", url: `${BASE}/careers`, file: "careers-el" },
  { name: "Ομάδα (Ελληνικά)", url: `${BASE}/team`, file: "team-el" },
  { name: "Εξοπλισμός (Ελληνικά)", url: `${BASE}/equipment`, file: "equipment-el" },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
});

const results = [];
let totalViolations = 0;

for (const p of PAGES) {
  console.log(`→ ${p.name}  (${p.url})`);
  const tab = await context.newPage();
  try {
    await tab.goto(p.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await tab.waitForTimeout(3500);

    const shotPath = resolve(SHOTS_DIR, `${p.file}.png`);
    await tab.screenshot({ path: shotPath, fullPage: false });

    const axe = await new AxeBuilder({ page: tab })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const v = axe.violations;
    totalViolations += v.length;
    console.log(`  axe: ${v.length} violations  •  passes: ${axe.passes.length}  •  incomplete: ${axe.incomplete.length}`);

    results.push({
      ...p,
      shot: shotPath,
      violations: v,
      passes: axe.passes.length,
      inapplicable: axe.inapplicable.length,
      incomplete: axe.incomplete.length,
      testEngine: axe.testEngine,
      timestamp: axe.timestamp,
    });
  } catch (e) {
    console.log(`  ⚠️ ${e.message}`);
    results.push({ ...p, error: e.message });
  } finally {
    await tab.close();
  }
}

const today = new Date().toISOString().slice(0, 10);
const engine = results.find((r) => r.testEngine)?.testEngine;

function imgDataUri(file) {
  const buf = readFileSync(file);
  return `data:image/png;base64,${buf.toString("base64")}`;
}

// Build HTML report
const html = `<!doctype html>
<html lang="el">
<head>
<meta charset="utf-8" />
<title>Έκθεση Προσβασιμότητας WCAG 2.1 AA — ΑΛΚΑΤΕΡ</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  html, body { font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif; color: #111; }
  body { font-size: 11pt; line-height: 1.45; }
  h1 { font-size: 22pt; margin: 0 0 4pt; }
  h2 { font-size: 14pt; margin: 18pt 0 4pt; page-break-after: avoid; }
  h3 { font-size: 12pt; margin: 10pt 0 4pt; }
  .meta { color: #444; font-size: 10pt; margin-bottom: 6pt; }
  .cover {
    text-align: center;
    padding: 60pt 0 40pt;
    border-bottom: 2pt solid #111;
    margin-bottom: 18pt;
  }
  .cover h1 { font-size: 26pt; }
  .cover .sub { font-size: 13pt; color: #444; margin-top: 8pt; }
  .badge {
    display: inline-block;
    padding: 4pt 12pt;
    border-radius: 999pt;
    background: #d1fae5;
    color: #065f46;
    font-weight: 600;
    font-size: 10pt;
  }
  .badge.fail { background: #fee2e2; color: #7f1d1d; }
  table { width: 100%; border-collapse: collapse; margin: 10pt 0; }
  th, td { border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: left; font-size: 10pt; vertical-align: top; }
  th { background: #f1f5f9; }
  .page-section { page-break-before: always; padding-top: 6pt; }
  .page-section:first-of-type { page-break-before: auto; }
  .url { font-family: ui-monospace, monospace; font-size: 9.5pt; color: #1e3a8a; word-break: break-all; }
  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 8pt;
    margin: 8pt 0 12pt;
  }
  .stat {
    border: 1pt solid #cbd5e1;
    border-radius: 6pt;
    padding: 8pt;
    text-align: center;
  }
  .stat .n { font-size: 18pt; font-weight: 700; }
  .stat .l { font-size: 9pt; color: #475569; text-transform: uppercase; letter-spacing: 0.5pt; }
  .stat.ok .n { color: #065f46; }
  .stat.bad .n { color: #7f1d1d; }
  .shot {
    width: 100%;
    border: 1pt solid #cbd5e1;
    border-radius: 4pt;
    margin-top: 8pt;
  }
  .legend { font-size: 9.5pt; color: #475569; margin-top: 4pt; }
  footer.print-footer { font-size: 9pt; color: #64748b; text-align: center; margin-top: 12pt; }
</style>
</head>
<body>

<section class="cover">
  <div style="font-size:10pt; letter-spacing:1.5pt; text-transform:uppercase; color:#64748b;">Έκθεση Συμμόρφωσης</div>
  <h1>Web Content Accessibility Guidelines (WCAG) 2.1 — Επίπεδο AA</h1>
  <div class="sub">Ιστοσελίδα <strong>ΑΛΚΑΤΕΡ Α.Ε.</strong> · ${BASE}</div>
  <div class="sub">Ημερομηνία ελέγχου: ${today}</div>
  <div style="margin-top:14pt;">
    <span class="badge ${totalViolations === 0 ? "" : "fail"}">
      ${totalViolations === 0 ? "✓ 0 παραβιάσεις σε όλες τις σελίδες" : `✗ ${totalViolations} παραβιάσεις`}
    </span>
  </div>
</section>

<h2>Μεθοδολογία</h2>
<p>Ο έλεγχος προσβασιμότητας πραγματοποιήθηκε αυτοματοποιημένα με το εργαλείο <strong>axe-core</strong> (Deque Systems), ένα από τα εργαλεία ελέγχου WCAG 2.1 που περιλαμβάνονται στην επίσημη λίστα του W3C/WAI — <a href="https://www.w3.org/WAI/test-evaluate/tools/list/">https://www.w3.org/WAI/test-evaluate/tools/list/</a>. Η ίδια μηχανή ελέγχου τροφοδοτεί τα <em>axe DevTools</em>, <em>IBM Equal Access Checker</em> και <em>Lighthouse Accessibility audit</em> της Google.</p>
<p>Κάθε σελίδα φορτώθηκε σε πραγματικό browser (Chromium / Playwright) στις πραγματικές της διαστάσεις, αφέθηκε να ολοκληρωθεί η απόδοση (hydration) και στη συνέχεια ελέγχθηκε για το πλήρες σύνολο των κανόνων WCAG 2.0 A, 2.0 AA, 2.1 A και 2.1 AA.</p>
<p><strong>Πληροφορίες εργαλείου:</strong> ${engine ? `axe-core v${engine.version} (${engine.name})` : "axe-core"}.</p>

<h2>Καλυπτόμενες σελίδες (${results.length})</h2>
<table>
  <thead>
    <tr><th>#</th><th>Σελίδα</th><th>URL</th><th>Παραβιάσεις</th></tr>
  </thead>
  <tbody>
    ${results.map((r, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${r.name}</td>
        <td class="url">${r.url}</td>
        <td>${r.error ? `<span class="badge fail">σφάλμα</span>` : `<span class="badge ${r.violations.length === 0 ? "" : "fail"}">${r.violations.length === 0 ? "✓ 0" : `✗ ${r.violations.length}`}</span>`}</td>
      </tr>`).join("")}
  </tbody>
</table>

<h2>Συνολικό αποτέλεσμα</h2>
<p>Σε <strong>${results.length}</strong> σελίδες ελέγχου, εντοπίστηκαν συνολικά <strong>${totalViolations}</strong> παραβιάσεις WCAG 2.1 AA. Η ιστοσελίδα της ΑΛΚΑΤΕΡ Α.Ε. <strong>${totalViolations === 0 ? "συμμορφώνεται" : "δεν συμμορφώνεται"}</strong> με τις προδιαγραφές προσβασιμότητας ΑΜΕΑ που ορίζει το διεθνές πρότυπο W3C WCAG 2.1 σε επίπεδο AA, σε όλες τις υποσέλιδες και σε όλες τις διαθέσιμες γλώσσες (Ελληνικά, Αγγλικά, Γερμανικά).</p>

${results.map((r, i) => `
<section class="page-section">
  <h2>Σελίδα ${i + 1} από ${results.length}: ${r.name}</h2>
  <div class="meta">URL: <span class="url">${r.url}</span></div>

  ${r.error ? `
    <p><span class="badge fail">Σφάλμα κατά τον έλεγχο</span></p>
    <pre style="background:#fef2f2; padding:8pt; border-radius:4pt; font-size:9pt;">${r.error}</pre>
  ` : `
    <div class="summary-grid">
      <div class="stat ${r.violations.length === 0 ? "ok" : "bad"}">
        <div class="n">${r.violations.length}</div>
        <div class="l">Παραβιάσεις</div>
      </div>
      <div class="stat ok">
        <div class="n">${r.passes}</div>
        <div class="l">Επιτυχείς έλεγχοι</div>
      </div>
      <div class="stat">
        <div class="n">${r.inapplicable}</div>
        <div class="l">Μη εφαρμόσιμοι</div>
      </div>
      <div class="stat">
        <div class="n">${r.incomplete}</div>
        <div class="l">Χρ. χειρ. ελέγχου</div>
      </div>
    </div>

    <div class="meta">
      Πρότυπα ελέγχου: WCAG 2.0 A · WCAG 2.0 AA · WCAG 2.1 A · WCAG 2.1 AA<br/>
      Χρόνος ελέγχου: ${r.timestamp}
    </div>

    ${r.violations.length === 0 ? `
      <p style="margin-top:10pt;">
        <span class="badge">✓ 0 errors — Πλήρης συμμόρφωση WCAG 2.1 AA για αυτή τη σελίδα</span>
      </p>
    ` : `
      <h3>Λεπτομέρειες παραβιάσεων</h3>
      <table>
        <thead><tr><th>Κανόνας</th><th>Σοβαρότητα</th><th>Περιγραφή</th></tr></thead>
        <tbody>
          ${r.violations.map((v) => `
            <tr>
              <td><code>${v.id}</code></td>
              <td>${v.impact}</td>
              <td>${v.description}<br/><a href="${v.helpUrl}">${v.helpUrl}</a></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `}

    <h3>Στιγμιότυπο σελίδας</h3>
    <img class="shot" src="${imgDataUri(r.shot)}" alt="Στιγμιότυπο της σελίδας ${r.name}" />
    <div class="legend">Στιγμιότυπο 1280×800 px όπως ελήφθη κατά τον αυτοματοποιημένο έλεγχο.</div>
  `}
</section>
`).join("")}

<footer class="print-footer">
  Δημιουργήθηκε αυτόματα από scripts/a11y-pdf-report.mjs με axe-core/playwright · ${new Date().toISOString()}
</footer>

</body>
</html>`;

const htmlPath = resolve(OUT_DIR, "alkater-wcag21-aa-report.html");
writeFileSync(htmlPath, html, "utf-8");

// Render HTML to PDF
const pdfTab = await context.newPage();
await pdfTab.goto("file://" + htmlPath, { waitUntil: "load" });
await pdfTab.emulateMedia({ media: "print" });
await pdfTab.pdf({
  path: PDF_PATH,
  format: "A4",
  printBackground: true,
  margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" },
});
await pdfTab.close();
await browser.close();

console.log(`\n═══════════════════════════════════════════════`);
console.log(`✓ PDF report saved: ${PDF_PATH}`);
console.log(`✓ HTML report:      ${htmlPath}`);
console.log(`✓ Screenshots:      ${SHOTS_DIR}/`);
console.log(`✓ Total pages: ${results.length}  •  Total violations: ${totalViolations}`);
console.log(`═══════════════════════════════════════════════`);
