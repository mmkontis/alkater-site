import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT = resolve(__dirname, "..", "reports", "wave");
mkdirSync(OUT, { recursive: true });

const BASE = process.env.A11Y_BASE_URL || "https://alkater.gr";

const PAGES = [
  { name: "home-el", url: `${BASE}/` },
  { name: "home-en", url: `${BASE}/en` },
  { name: "home-de", url: `${BASE}/de` },
  { name: "about-el", url: `${BASE}/about` },
  { name: "about-en", url: `${BASE}/en/about` },
  { name: "about-de", url: `${BASE}/de/about` },
  { name: "cert-el", url: `${BASE}/certifications` },
  { name: "cert-en", url: `${BASE}/en/certifications` },
  { name: "contact-el", url: `${BASE}/contact` },
  { name: "contact-en", url: `${BASE}/en/contact` },
  { name: "contact-de", url: `${BASE}/de/contact` },
  { name: "careers-el", url: `${BASE}/careers` },
  { name: "team-el", url: `${BASE}/team` },
  { name: "equipment-el", url: `${BASE}/equipment` },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

for (const p of PAGES) {
  const waveUrl = `https://wave.webaim.org/report#/${encodeURIComponent(p.url)}`;
  console.log(`\n→ WAVE: ${p.name}  ${p.url}`);
  const tab = await context.newPage();
  // Silence WAVE's own React hydration warnings
  tab.on("pageerror", () => {});
  tab.on("console", () => {});
  try {
    await tab.goto(waveUrl, { waitUntil: "load", timeout: 60000 });
    // Wait until WAVE finishes loading: AIM Score becomes a number, not "?"
    try {
      await tab.waitForFunction(() => {
        const text = document.body.innerText;
        return text.includes("out of 10") && !text.match(/AIM Score:\s*\?\s*out of 10/);
      }, { timeout: 45000 });
    } catch {
      console.log(`  (timeout waiting for AIM Score)`);
    }
    await tab.waitForTimeout(2500);

    // Full window screenshot
    await tab.screenshot({
      path: resolve(OUT, `${p.name}.png`),
      fullPage: false,
    });

    // Also capture just the sidebar (summary) — WAVE sidebar is typically the left ~330px
    const summary = await tab.locator("#wave5_sidebar, [class*='Summary'], .summary, .panel-summary").first();
    const sidebarBox = await tab.evaluate(() => {
      const sb = document.querySelector("#wave5_sidebar, .sidebar, [class*='sidebar']");
      if (!sb) return null;
      const r = sb.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
    if (sidebarBox && sidebarBox.width > 100) {
      await tab.screenshot({
        path: resolve(OUT, `${p.name}-summary.png`),
        clip: { x: 0, y: 0, width: Math.ceil(sidebarBox.x + sidebarBox.width + 20), height: 900 },
      });
    }

    // Extract result counts via the visible DOM
    const counts = await tab.evaluate(() => {
      const text = document.body.innerText || "";
      const get = (label) => {
        const re = new RegExp(`(\\d+)\\s+${label}`, "i");
        const m = text.match(re);
        return m ? Number(m[1]) : null;
      };
      const aim = text.match(/AIM Score:\s*([\d.]+)\s*out of 10/i);
      return {
        errors: get("Errors"),
        contrastErrors: get("Contrast Errors"),
        alerts: get("Alerts"),
        features: get("Features"),
        structure: get("Structure"),
        aria: get("ARIA"),
        aimScore: aim ? aim[1] : null,
      };
    });
    console.log(`  Errors=${counts.errors} ContrastErrors=${counts.contrastErrors} Alerts=${counts.alerts} AIM=${counts.aimScore}`);
  } catch (e) {
    console.log(`  ⚠️ ${e.message}`);
  } finally {
    await tab.close();
  }
}

await browser.close();
console.log(`\n✓ WAVE screenshots saved to ${OUT}/`);
