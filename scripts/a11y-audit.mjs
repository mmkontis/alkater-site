import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  { name: "Home (GR)", url: "https://alkater.gr/" },
  { name: "Home (EN)", url: "https://alkater.gr/en" },
  { name: "About", url: "https://alkater.gr/about" },
  { name: "Certifications", url: "https://alkater.gr/certifications" },
  { name: "Contact", url: "https://alkater.gr/contact" },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
let totalViolations = 0;

for (const page of PAGES) {
  const tab = await context.newPage();
  await tab.goto(page.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await tab.waitForTimeout(3000);

  const results = await new AxeBuilder({ page: tab }).analyze();
  const violations = results.violations;

  if (violations.length === 0) {
    console.log(`\n✅ ${page.name} (${page.url}) — 0 violations`);
  } else {
    totalViolations += violations.length;
    console.log(`\n❌ ${page.name} (${page.url}) — ${violations.length} violations:`);
    for (const v of violations) {
      console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
      console.log(`    Help: ${v.helpUrl}`);
      for (const node of v.nodes.slice(0, 3)) {
        console.log(`    → ${node.html.slice(0, 150)}`);
      }
      if (v.nodes.length > 3) {
        console.log(`    ... and ${v.nodes.length - 3} more`);
      }
    }
  }
  await tab.close();
}

await browser.close();

console.log(`\n${"═".repeat(60)}`);
console.log(`TOTAL: ${totalViolations} violations across ${PAGES.length} pages`);
console.log(`${"═".repeat(60)}`);
process.exit(totalViolations > 0 ? 1 : 0);
