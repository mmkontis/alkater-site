import { chromium } from "playwright";

const TARGET = process.argv[2] || "https://alkater.gr/";
const WAVE_URL = `https://wave.webaim.org/report#/${encodeURIComponent(TARGET)}`;

console.log(`\n→ Opening WAVE for: ${TARGET}`);
console.log(`→ URL: ${WAVE_URL}\n`);

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

page.on("console", (msg) => {
  const type = msg.type();
  if (type === "error" || type === "warning") {
    console.log(`  [console.${type}] ${msg.text().slice(0, 300)}`);
  }
});
page.on("pageerror", (err) => {
  console.log(`  [pageerror] ${err.message.slice(0, 300)}`);
});

try {
  await page.goto(WAVE_URL, { waitUntil: "load", timeout: 60000 });
} catch (e) {
  console.log(`  ⚠️ goto: ${e.message}`);
}

await page.waitForTimeout(8000);

const frames = page.frames();
console.log(`\n→ Frames found: ${frames.length}`);
for (const f of frames) {
  console.log(`   - ${f.url() || "(blank)"} ${f === page.mainFrame() ? "[MAIN]" : ""}`);
}

const targetFrame = frames.find((f) => f.url().startsWith(TARGET.replace(/\/$/, "")));

if (targetFrame) {
  console.log(`\n→ Inspecting the target site as loaded inside the WAVE iframe:`);
  const info = await targetFrame.evaluate(() => {
    const html = document.documentElement;
    return {
      htmlLang: html.lang || null,
      htmlOuterStart: html.outerHTML.slice(0, 250),
      hasH1: !!document.querySelector("h1"),
      h1Texts: Array.from(document.querySelectorAll("h1")).map((h) => h.textContent?.trim().slice(0, 80)),
      hasMain: !!document.querySelector("main"),
      hasNav: !!document.querySelector("nav"),
      hasHeader: !!document.querySelector("header"),
      hasFooter: !!document.querySelector("footer"),
      landmarks: {
        main: document.querySelectorAll("main").length,
        nav: document.querySelectorAll("nav").length,
        header: document.querySelectorAll("header").length,
        footer: document.querySelectorAll("footer").length,
        bannerRole: document.querySelectorAll('[role="banner"]').length,
        regionRole: document.querySelectorAll('[role="region"]').length,
      },
      title: document.title,
    };
  });
  console.log(JSON.stringify(info, null, 2));
} else {
  console.log(`\n→ Target site iframe NOT found inside WAVE — WAVE may have failed to load it.`);
  const mainInfo = await page.evaluate(() => ({
    title: document.title,
    bodyText: document.body.innerText.slice(0, 500),
  }));
  console.log(`\n   WAVE host page state:`);
  console.log(JSON.stringify(mainInfo, null, 2));
}

await browser.close();
