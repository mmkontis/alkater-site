// Compute contrast issues ourselves the way WAVE does:
// for every visible text node, find the first opaque ancestor background, compute WCAG ratio,
// flag elements whose ratio < 4.5 (normal text) or < 3.0 (large text).
import { chromium } from "playwright";

const URL = process.argv[2] || "https://alkater.gr/";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const tab = await ctx.newPage();

console.log(`→ scanning ${URL}`);
await tab.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
await tab.waitForTimeout(3500);

const result = await tab.evaluate(() => {
  // sRGB → relative luminance
  function lum(rgb) {
    const channels = rgb.map((c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }
  function ratio(fg, bg) {
    const L1 = Math.max(lum(fg), lum(bg));
    const L2 = Math.min(lum(fg), lum(bg));
    return (L1 + 0.05) / (L2 + 0.05);
  }
  function parseRGB(str) {
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
    return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] === undefined ? 1 : parts[3] };
  }
  function blend(top, bottom) {
    const a = top.a;
    return {
      r: top.r * a + bottom.r * (1 - a),
      g: top.g * a + bottom.g * (1 - a),
      b: top.b * a + bottom.b * (1 - a),
      a: 1,
    };
  }
  // Find first opaque-ish background by walking up
  function effectiveBg(el) {
    let cur = el;
    let acc = { r: 255, g: 255, b: 255, a: 1 }; // body default
    const stack = [];
    while (cur && cur.nodeType === 1) {
      const cs = getComputedStyle(cur);
      const bg = parseRGB(cs.backgroundColor);
      if (bg && bg.a > 0) stack.push(bg);
      cur = cur.parentElement;
    }
    // Blend from bottom (deepest opaque) up to topmost child
    let composed = acc;
    for (let i = stack.length - 1; i >= 0; i--) {
      composed = blend(stack[i], composed);
    }
    return composed;
  }
  function pathOf(el) {
    const parts = [];
    let c = el;
    while (c && c.tagName !== "BODY" && parts.length < 6) {
      let s = c.tagName.toLowerCase();
      if (c.id) s += "#" + c.id;
      else if (c.className && typeof c.className === "string") {
        const cls = c.className.toString().split(/\s+/).filter(Boolean).slice(0, 2).join(".");
        if (cls) s += "." + cls.slice(0, 50);
      }
      parts.unshift(s);
      c = c.parentElement;
    }
    return parts.join(" > ");
  }
  function isLargeText(cs) {
    const px = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight, 10) >= 700 || /bold/i.test(cs.fontWeight);
    return (bold && px >= 18.66) || px >= 24;
  }

  const failing = [];
  const all = document.querySelectorAll("*");
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) continue;
    // Has direct text?
    const ownText = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join("")
      .trim();
    if (!ownText) continue;
    const fg = parseRGB(cs.color);
    if (!fg) continue;
    const bg = effectiveBg(el);
    const r = ratio([fg.r, fg.g, fg.b], [bg.r, bg.g, bg.b]);
    const threshold = isLargeText(cs) ? 3.0 : 4.5;
    if (r < threshold) {
      failing.push({
        path: pathOf(el),
        text: ownText.slice(0, 80),
        color: cs.color,
        bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
        ratio: Number(r.toFixed(2)),
        threshold,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
      });
    }
  }
  return failing;
});

console.log(`\nfound ${result.length} contrast failures:`);
result.forEach((it, i) => {
  console.log(`\n  [${i + 1}] ratio=${it.ratio} (needs ≥${it.threshold})`);
  console.log(`    path:  ${it.path}`);
  console.log(`    text:  "${it.text}"`);
  console.log(`    fg=${it.color}  bg=${it.bg}  size=${it.fontSize} w=${it.fontWeight}`);
});

await browser.close();
