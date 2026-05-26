import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.A11Y_BASE_URL || "http://localhost:3333";
const PROD_HOST = process.env.A11Y_PROD_HOST || "https://alkater.gr";
const REPORT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "a11y-reports");

async function loadPagesFromSitemap() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`Failed to fetch sitemap.xml: HTTP ${res.status}`);
  const xml = await res.text();

  const urls = new Set();
  const locRe = /<loc>([^<]+)<\/loc>/g;
  const hrefRe = /hreflang="([a-z]{2})"\s+href="([^"]+)"/g;
  let m;
  while ((m = locRe.exec(xml))) urls.add(m[1]);
  while ((m = hrefRe.exec(xml))) urls.add(m[2]);

  return [...urls]
    .map((u) => u.replace(PROD_HOST, BASE))
    .filter((u) => u.startsWith(BASE))
    .sort()
    .map((url) => {
      const path = url.slice(BASE.length) || "/";
      const localeMatch = path.match(/^\/(en|de)(\/|$)/);
      const locale = localeMatch ? localeMatch[1].toUpperCase() : "EL";
      return { name: `${locale} ${path}`, url };
    });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderHtmlReport({ pages, axeVersion, startedAt, finishedAt, baseUrl }) {
  const totalViolations = pages.reduce((a, p) => a + (p.violations?.length || 0), 0);
  const failed = pages.filter((p) => (p.violations?.length || 0) > 0 || p.error).length;
  const passed = pages.length - failed;
  const ts = startedAt.toISOString();

  const pageSections = pages
    .map((p) => {
      if (p.error) {
        return `<section class="page fail"><h3>⚠️ ${escapeHtml(p.name)}</h3><p class="url">${escapeHtml(p.url)}</p><p class="error">Error: ${escapeHtml(p.error)}</p></section>`;
      }
      if (!p.violations?.length) {
        return `<section class="page pass"><h3>✅ ${escapeHtml(p.name)}</h3><p class="url">${escapeHtml(p.url)}</p><p class="result">0 violations (WCAG 2.1 AA)</p></section>`;
      }
      const items = p.violations
        .map((v) => {
          const nodes = v.nodes
            .slice(0, 5)
            .map((n) => `<li><code>${escapeHtml(n.html.slice(0, 300))}</code></li>`)
            .join("");
          const more = v.nodes.length > 5 ? `<li>… and ${v.nodes.length - 5} more</li>` : "";
          return `<div class="violation"><h4>[${escapeHtml(v.impact || "n/a")}] ${escapeHtml(v.id)}</h4><p>${escapeHtml(v.description)}</p><p><a href="${escapeHtml(v.helpUrl)}">${escapeHtml(v.helpUrl)}</a></p><ul>${nodes}${more}</ul></div>`;
        })
        .join("");
      return `<section class="page fail"><h3>❌ ${escapeHtml(p.name)} — ${p.violations.length} violation(s)</h3><p class="url">${escapeHtml(p.url)}</p>${items}</section>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Accessibility Audit Report — WCAG 2.1 AA</title>
<style>
  :root { font-family: Arial, Helvetica, sans-serif; color: #111; line-height: 1.5; }
  body { max-width: 900px; margin: 2rem auto; padding: 0 1.5rem; }
  h1 { margin-bottom: 0.25rem; }
  .meta { color: #555; font-size: 0.9rem; margin-bottom: 1.5rem; }
  .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }
  .summary div { border: 1px solid #ddd; border-radius: 6px; padding: 0.75rem 1rem; }
  .summary strong { display: block; font-size: 1.5rem; }
  .pass-color { color: #0a7d2c; }
  .fail-color { color: #b00020; }
  table.toc { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
  table.toc th, table.toc td { border: 1px solid #ddd; padding: 0.4rem 0.6rem; text-align: left; font-size: 0.9rem; }
  table.toc th { background: #f5f5f5; }
  section.page { border: 1px solid #ddd; border-radius: 6px; padding: 1rem 1.25rem; margin-bottom: 1rem; page-break-inside: avoid; }
  section.page.pass { background: #f0faf2; border-color: #b6e0c0; }
  section.page.fail { background: #fdf2f3; border-color: #f0bcc1; }
  section.page h3 { margin: 0 0 0.25rem; font-size: 1.05rem; }
  .url { font-family: ui-monospace, Menlo, monospace; font-size: 0.85rem; color: #444; margin: 0 0 0.5rem; word-break: break-all; }
  .violation { margin: 0.75rem 0; padding: 0.5rem 0.75rem; background: #fff; border-left: 3px solid #b00020; }
  .violation h4 { margin: 0 0 0.25rem; font-size: 0.95rem; }
  .violation code { font-size: 0.8rem; background: #f5f5f5; padding: 0.1rem 0.25rem; border-radius: 3px; }
  .violation ul { margin: 0.25rem 0 0 1rem; padding: 0; }
  .result { margin: 0; color: #0a7d2c; font-weight: bold; }
  .error { margin: 0; color: #b00020; }
  footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #ddd; color: #666; font-size: 0.8rem; }
  @media print {
    body { max-width: none; margin: 0; padding: 1rem; }
    section.page { box-shadow: none; }
  }
</style>
</head>
<body>
<h1>Accessibility Audit Report</h1>
<p class="meta">
  Standard: <strong>WCAG 2.1 Level AA</strong> (W3C)<br />
  Tool: <strong>axe-core ${escapeHtml(axeVersion)}</strong> via Playwright (W3C-listed evaluation tool)<br />
  Tags evaluated: wcag2a, wcag2aa, wcag21a, wcag21aa<br />
  Site under test: <strong>${escapeHtml(baseUrl)}</strong><br />
  Started: ${escapeHtml(startedAt.toLocaleString("en-GB"))} · Finished: ${escapeHtml(finishedAt.toLocaleString("en-GB"))}<br />
  Report ID: <code>${escapeHtml(ts)}</code>
</p>

<section class="summary">
  <div><span>Pages audited</span><strong>${pages.length}</strong></div>
  <div><span>Passed</span><strong class="pass-color">${passed}</strong></div>
  <div><span>Failed</span><strong class="${failed ? "fail-color" : "pass-color"}">${failed}</strong></div>
  <div><span>Total violations</span><strong class="${totalViolations ? "fail-color" : "pass-color"}">${totalViolations}</strong></div>
</section>

<h2>Pages tested</h2>
<table class="toc">
  <thead><tr><th>#</th><th>Page</th><th>URL</th><th>Result</th></tr></thead>
  <tbody>
    ${pages
      .map(
        (p, i) =>
          `<tr><td>${i + 1}</td><td>${escapeHtml(p.name)}</td><td><code>${escapeHtml(p.url)}</code></td><td>${p.error ? "⚠️ error" : (p.violations?.length || 0) === 0 ? "✅ 0" : `❌ ${p.violations.length}`}</td></tr>`
      )
      .join("\n")}
  </tbody>
</table>

<h2>Detailed results</h2>
${pageSections}

<footer>
  Generated by <code>scripts/a11y-audit-local.mjs</code>. axe-core is listed in the W3C WAI evaluation-tool registry
  (<a href="https://www.w3.org/WAI/test-evaluate/tools/list/">w3.org/WAI/test-evaluate/tools/list/</a>) and tests against
  the WCAG 2.1 success criteria at level A and AA.
</footer>
</body>
</html>`;
}

console.log(`▶ Fetching route list from ${BASE}/sitemap.xml …`);
const PAGES = await loadPagesFromSitemap();
console.log(`  Found ${PAGES.length} unique URLs.\n`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const startedAt = new Date();
let axeVersion = "unknown";

for (const page of PAGES) {
  const tab = await context.newPage();
  try {
    await tab.goto(page.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await tab.waitForTimeout(1500);

    const results = await new AxeBuilder({ page: tab })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    axeVersion = results.testEngine?.version || axeVersion;
    page.violations = results.violations;

    if (results.violations.length === 0) {
      console.log(`✅ ${page.name} — 0 violations`);
    } else {
      console.log(`❌ ${page.name} — ${results.violations.length} violations:`);
      for (const v of results.violations) {
        console.log(`   [${v.impact}] ${v.id}: ${v.description}`);
        console.log(`     ${v.helpUrl}`);
      }
    }
  } catch (e) {
    page.error = e.message;
    console.log(`⚠️  ${page.name} — failed: ${e.message}`);
  }
  await tab.close();
}

const finishedAt = new Date();
await browser.close();

const totalViolations = PAGES.reduce((a, p) => a + (p.violations?.length || 0), 0);
const failedPages = PAGES.filter((p) => (p.violations?.length || 0) > 0 || p.error).length;

console.log(`\n${"═".repeat(70)}`);
console.log(`TOTAL: ${totalViolations} violations across ${PAGES.length} pages (WCAG 2.1 AA)`);
console.log(`Pages passed: ${PAGES.length - failedPages} · failed: ${failedPages}`);
console.log(`${"═".repeat(70)}`);

await mkdir(REPORT_DIR, { recursive: true });
const stamp = startedAt.toISOString().replace(/[:.]/g, "-");
const htmlPath = join(REPORT_DIR, `a11y-report-${stamp}.html`);
const jsonPath = join(REPORT_DIR, `a11y-report-${stamp}.json`);

const html = renderHtmlReport({ pages: PAGES, axeVersion, startedAt, finishedAt, baseUrl: BASE });
await writeFile(htmlPath, html, "utf8");
await writeFile(
  jsonPath,
  JSON.stringify({ baseUrl: BASE, axeVersion, startedAt, finishedAt, totalViolations, pages: PAGES }, null, 2),
  "utf8"
);

console.log(`\n📄 HTML report: ${htmlPath}`);
console.log(`📦 JSON report: ${jsonPath}`);
console.log(`   Open the HTML file in a browser and use File → Print → "Save as PDF" for the ESPA submission packet.\n`);

process.exit(totalViolations > 0 ? 1 : 0);
