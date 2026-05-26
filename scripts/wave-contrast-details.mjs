import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const BASE = "https://alkater.gr";
const PAGES = [
  { name: "home-el", url: `${BASE}/` },
  { name: "about-el", url: `${BASE}/about` },
  { name: "contact-el", url: `${BASE}/contact` },
  { name: "cert-el", url: `${BASE}/certifications` },
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const allReports = {};

for (const p of PAGES) {
  const waveUrl = `https://wave.webaim.org/report#/${encodeURIComponent(p.url)}`;
  console.log(`\n=== ${p.name}  ${p.url}`);
  const tab = await ctx.newPage();
  tab.on("pageerror", () => {});
  tab.on("console", () => {});
  try {
    await tab.goto(waveUrl, { waitUntil: "load", timeout: 60000 });
    await tab.waitForFunction(() => {
      return /AIM Score:\s*[\d.]+\s*out of 10/.test(document.body.innerText);
    }, { timeout: 45000 });
    await tab.waitForTimeout(2500);

    // Click the "Contrast" tab in the WAVE sidebar to populate contrast details
    const tabClicked = await tab.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll("button, [role='tab'], a"));
      const ct = tabs.find((el) => /contrast/i.test(el.textContent || ""));
      if (ct) { ct.click(); return true; }
      return false;
    });
    if (tabClicked) await tab.waitForTimeout(1200);

    // The iframe containing the rendered target page (proxied through WAVE)
    const frames = tab.frames();
    const proxiedFrame = frames.find((f) => /getpage\.php|alkater\.gr/i.test(f.url()));

    if (!proxiedFrame) {
      console.log("  ⚠️ no proxied frame found");
      continue;
    }

    // Extract every WAVE-injected icon that represents a contrast error.
    // WAVE icons have wrappers with data-wave-id or specific classes ending in _contrast.
    const items = await proxiedFrame.evaluate(() => {
      const out = [];
      // WAVE injects <wave5_icon> tags or img/icons with classes like wave5_contrast.
      const icons = Array.from(document.querySelectorAll(
        '[class*="contrast"], [data-wave5-type*="contrast"], img[src*="contrast"]'
      ));
      for (const ic of icons) {
        // The target element WAVE references is usually the next sibling or the element with same id
        const targetId = ic.getAttribute("data-wave5-target") || ic.getAttribute("data-target");
        let el = null;
        if (targetId) el = document.getElementById(targetId);
        if (!el) {
          // Heuristic: find nearest element that has visible text
          let cur = ic.parentElement;
          while (cur && cur.tagName !== "BODY") {
            const txt = (cur.textContent || "").trim();
            if (txt && txt.length < 100) { el = cur; break; }
            cur = cur.parentElement;
          }
        }
        if (!el) continue;
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        out.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          cls: (el.className || "").toString().slice(0, 200),
          text: (el.textContent || "").trim().slice(0, 80),
          color: cs.color,
          background: cs.backgroundColor,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          opacity: cs.opacity,
          rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        });
      }
      return out;
    });

    console.log(`  contrast targets found: ${items.length}`);
    items.forEach((it, i) => {
      console.log(`  [${i + 1}] <${it.tag}${it.id ? "#" + it.id : ""}> "${it.text}"`);
      console.log(`        color=${it.color}  bg=${it.background}  size=${it.fontSize}  weight=${it.fontWeight}  opacity=${it.opacity}`);
      console.log(`        cls="${it.cls.slice(0, 120)}"`);
    });
    allReports[p.name] = items;
  } catch (e) {
    console.log(`  ⚠️ ${e.message}`);
  } finally {
    await tab.close();
  }
}

await browser.close();
writeFileSync("/tmp/wave-contrast-details.json", JSON.stringify(allReports, null, 2));
console.log(`\n→ saved details to /tmp/wave-contrast-details.json`);
