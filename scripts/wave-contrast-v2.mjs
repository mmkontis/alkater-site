import { chromium } from "playwright";

const BASE = process.env.A11Y_BASE_URL || "https://alkater.gr";
const TARGET = process.argv[2] || `${BASE}/`;
const waveUrl = `https://wave.webaim.org/report#/${encodeURIComponent(TARGET)}`;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1200 } });
const tab = await ctx.newPage();
tab.on("pageerror", () => {});
tab.on("console", () => {});

console.log(`→ ${TARGET}`);
await tab.goto(waveUrl, { waitUntil: "load", timeout: 60000 });
await tab.waitForFunction(() => /AIM Score:\s*[\d.]+\s*out of 10/.test(document.body.innerText), { timeout: 45000 });
await tab.waitForTimeout(2000);

// Click the Contrast tab — it's in the WAVE top-tabs area
await tab.evaluate(() => {
  const tabs = document.querySelectorAll('[role="tab"], button, a, li');
  for (const t of tabs) {
    if ((t.textContent || "").trim() === "Contrast") { t.click(); return true; }
  }
  return false;
});
await tab.waitForTimeout(1500);

// Now look in the WAVE-loaded iframe at the actual injected icons in the rendered page
const frames = tab.frames();
const proxiedFrame = frames.find((f) => /getpage\.php|alkater\.gr/i.test(f.url()));
if (!proxiedFrame) {
  console.log("⚠️ proxied frame missing");
  await browser.close();
  process.exit(1);
}

// WAVE injects icons inline. The icons have alt/title attributes like "Very low contrast"
const flagged = await proxiedFrame.evaluate(() => {
  function visibleAncestor(el) {
    // Walk up until we find a real content element (not WAVE's icon wrapper)
    let cur = el;
    while (cur) {
      const cls = (cur.className || "").toString();
      if (!cls.includes("wave5") && cur.tagName !== "WAVE5_ICON") {
        return cur;
      }
      cur = cur.parentElement;
    }
    return null;
  }
  function describe(el) {
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      cls: (el.className || "").toString().slice(0, 200),
      text: (el.textContent || "").trim().slice(0, 100),
      color: cs.color,
      bg: cs.backgroundColor,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      opacity: cs.opacity,
      // Show the path
      path: (() => {
        const parts = [];
        let c = el;
        while (c && c.tagName !== "BODY" && parts.length < 6) {
          let s = c.tagName.toLowerCase();
          if (c.id) s += "#" + c.id;
          else if (c.className && typeof c.className === "string") {
            const firstCls = c.className.toString().split(/\s+/)[0];
            if (firstCls) s += "." + firstCls.slice(0, 30);
          }
          parts.unshift(s);
          c = c.parentElement;
        }
        return parts.join(" > ");
      })(),
    };
  }

  const results = [];
  // WAVE 5 typically uses imgs with src containing 'icon' and titles describing the issue,
  // OR custom elements like <wave5_icon>.
  const allIcons = Array.from(document.querySelectorAll("img, [title], wave5_icon, [data-wave5-info]"));
  for (const ic of allIcons) {
    const title = ic.getAttribute("title") || ic.getAttribute("aria-label") || ic.getAttribute("alt") || "";
    if (!/contrast/i.test(title)) continue;
    const tgt = visibleAncestor(ic.parentElement || ic);
    results.push({ icon_title: title.slice(0, 80), target: describe(tgt) });
  }
  // Also try WAVE's data-wave5-info on body annotations
  return results;
});

console.log(`\n→ found ${flagged.length} contrast-flagged elements`);
flagged.forEach((f, i) => {
  console.log(`\n  [${i + 1}] "${f.icon_title}"`);
  if (!f.target) { console.log("    (target not found)"); return; }
  console.log(`    path:   ${f.target.path}`);
  console.log(`    text:   "${f.target.text}"`);
  console.log(`    color:  ${f.target.color}   bg: ${f.target.bg}`);
  console.log(`    size:   ${f.target.fontSize} weight ${f.target.fontWeight} opacity ${f.target.opacity}`);
});

await browser.close();
