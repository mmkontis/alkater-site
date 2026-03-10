#!/usr/bin/env node
/**
 * enhance-photos-v2.mjs
 *
 * Full pipeline for Alkater construction photos:
 *   1. Gemini Flash analysis → detect subject, horizon tilt, sky presence
 *   2. Auto-rotation fix (horizon alignment)
 *   3. Sky replacement with Igoumenitsa blue + clouds
 *   4. 4K output (3840×2160) with enhanced framing
 *   5. Panoramic 3:1 ultra-wide (2700×900)
 *   6. VR 360° equirectangular (4096×2048)
 *   7. AI-driven rename based on subject description
 *
 * All processing runs in parallel.
 *
 * Usage:
 *   node scripts/enhance-photos-v2.mjs
 */

import { GoogleGenAI } from '@google/genai';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const execAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const API_KEY = 'AIzaSyCbXWqqkreUMKaybvt6czHirc3xu6BGTgk';
const GEMINI_MODEL = 'gemini-2.5-pro-preview-03-25';

const CONCURRENCY = 40;         // parallel photo pipelines
const GEMINI_CONCURRENCY = 40;

const PHOTOS_DIR   = path.join(__dirname, '..', 'public', 'Photos');
const SOURCE_MAIN  = PHOTOS_DIR;
const SOURCE_VIBER = path.join(PHOTOS_DIR, 'Photos απο έργα');

const OUT_BASE = path.join(PHOTOS_DIR, 'enhanced');
const OUT_4K   = path.join(OUT_BASE, '4k');
const OUT_PANO = path.join(OUT_BASE, 'panoramic');
const OUT_VR   = path.join(OUT_BASE, 'vr');

const WIDE_4K_W = 3840, WIDE_4K_H = 2160;
const PANO_W = 2700, PANO_H = 900;
const VR_W = 4096, VR_H = 2048;

// Suppress GEMINI_API_KEY env warning
const savedKey = process.env.GEMINI_API_KEY;
delete process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });
if (savedKey) process.env.GEMINI_API_KEY = savedKey;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function magick(...args) {
  try {
    const result = await execAsync('magick', args, { maxBuffer: 200 * 1024 * 1024 });
    return result;
  } catch (err) {
    throw new Error(`magick error: ${(err.stderr || err.message || '').slice(0, 500)}`);
  }
}

async function getDimensions(file) {
  const { stdout } = await execAsync('magick', ['identify', '-format', '%wx%h', `${file}[0]`]);
  const [w, h] = stdout.trim().split('x').map(Number);
  return { w, h };
}

function tmpFile(ext = '.png') {
  return path.join(os.tmpdir(), `alkv2-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
}

function cleanup(...files) {
  for (const f of files) { try { fs.unlinkSync(f); } catch {} }
}

function sanitizeFilename(str) {
  return str
    .toLowerCase()
    .replace(/[άα]/g, 'a').replace(/[έε]/g, 'e').replace(/[ήη]/g, 'i')
    .replace(/[ίι]/g, 'i').replace(/[όο]/g, 'o').replace(/[ύυ]/g, 'y')
    .replace(/[ώω]/g, 'o').replace(/[σς]/g, 's').replace(/[θ]/g, 'th')
    .replace(/[φ]/g, 'f').replace(/[χ]/g, 'ch').replace(/[ψ]/g, 'ps')
    .replace(/[ξ]/g, 'x').replace(/[μ]/g, 'm').replace(/[ν]/g, 'n')
    .replace(/[λ]/g, 'l').replace(/[ρ]/g, 'r').replace(/[τ]/g, 't')
    .replace(/[π]/g, 'p').replace(/[κ]/g, 'k').replace(/[δ]/g, 'd')
    .replace(/[γ]/g, 'g').replace(/[β]/g, 'v').replace(/[ζ]/g, 'z')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

// ---------------------------------------------------------------------------
// Gather source files
// ---------------------------------------------------------------------------

function gatherSources() {
  const files = [];
  for (const f of fs.readdirSync(SOURCE_MAIN).sort()) {
    if (/^project-\d+\.jpe?g$/i.test(f)) files.push(path.join(SOURCE_MAIN, f));
  }
  if (fs.existsSync(SOURCE_VIBER)) {
    for (const f of fs.readdirSync(SOURCE_VIBER).sort()) {
      if (/\.jpe?g$/i.test(f)) files.push(path.join(SOURCE_VIBER, f));
    }
  }
  return files;
}

// ---------------------------------------------------------------------------
// Gemini Flash: analyze image → subject name, tilt angle, has sky
// ---------------------------------------------------------------------------

async function analyzeWithGemini(imagePath) {
  const imageBytes = fs.readFileSync(imagePath);
  const base64 = imageBytes.toString('base64');

  const prompt = `You are analyzing a construction/road works photo from Igoumenitsa, Epirus, Greece (ALKATER construction company).

Analyze this image and respond with ONLY valid JSON (no markdown, no backticks):

{
  "subject": "short descriptive name in English for the main subject, 2-5 words, suitable as a filename, e.g. 'asphalt-paving-highway', 'excavator-road-construction', 'road-marking-crosswalk', 'concrete-culvert-drainage', 'dump-truck-loading-asphalt'",
  "tilt_degrees": <number: clockwise rotation needed to level the horizon, 0 if already level, positive = rotate clockwise, negative = rotate counter-clockwise, range -15 to 15, use 0 if no clear horizon or already straight>,
  "has_sky": <boolean: true if sky/upper portion is visible and could be enhanced>,
  "sky_percentage": <number: rough percentage of the image that is sky, 0-100>,
  "sky_is_grey": <boolean: true if the sky looks grey, overcast, or washed out and would benefit from replacement with blue sky. false if the sky is already a nice blue with natural clouds>,
  "description": "one sentence describing what's in the photo for alt text"
}`;

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64 } },
            { text: prompt },
          ],
        }],
        config: {
          maxOutputTokens: 500,
          temperature: 0.1,
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      let text = '';
      for (const part of parts) {
        if (part.text) text += part.text;
      }
      text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      return JSON.parse(text);
    } catch (err) {
      if (attempt === maxRetries) {
        console.warn(`    Gemini failed for ${path.basename(imagePath)}: ${err.message}`);
      return {
        subject: path.basename(imagePath, path.extname(imagePath)),
        tilt_degrees: 0,
        has_sky: false,
        sky_percentage: 0,
        sky_is_grey: false,
        description: 'Construction site photo',
      };
      }
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
}

// ---------------------------------------------------------------------------
// Sky replacement: Igoumenitsa blue with clouds
// Creates a gradient sky canvas and composites it onto the top portion
// ---------------------------------------------------------------------------

async function generateSkyGradient(width, height) {
  const skyFile = tmpFile('.png');

  // Igoumenitsa Mediterranean sky: deep blue top → lighter horizon
  // With cloud-like noise pattern overlaid
  const skyH = Math.round(height);

  const tGrad = tmpFile('.png');
  const tClouds = tmpFile('.png');

  try {
    // Base gradient: deep Aegean blue → lighter horizon blue
    await magick(
      '-size', `${width}x${skyH}`,
      'gradient:#1a5fb4-#87ceeb',
      tGrad,
    );

    // Cloud texture: plasma noise, thresholded to white wisps
    await magick(
      '-size', `${width}x${skyH}`,
      'plasma:#ffffff-#87ceeb',
      '-blur', '0x12',
      '-level', '55%,75%',
      '-blur', '0x4',
      '-alpha', 'set',
      '-channel', 'A',
      '-evaluate', 'multiply', '0.45',
      '+channel',
      tClouds,
    );

    // Composite clouds onto gradient
    await magick(
      tGrad,
      tClouds,
      '-composite',
      // Add a subtle warm tint for Igoumenitsa golden light
      '-modulate', '100,85,97',
      skyFile,
    );
  } finally {
    cleanup(tGrad, tClouds);
  }

  return skyFile;
}

async function replaceSky(srcFile, destFile, skyPercentage) {
  const { w, h } = await getDimensions(srcFile);
  const skyH = Math.round(h * (skyPercentage / 100));

  if (skyH < 30) {
    // Too little sky to replace — just copy
    await magick(`${srcFile}[0]`, destFile);
    return;
  }

  const tSky = await generateSkyGradient(w, skyH);
  const tMask = tmpFile('.png');

  try {
    // Create a gradient mask for blending sky → ground
    // White at top (full sky replacement), fading to black at bottom of sky zone
    const blendZone = Math.round(skyH * 0.35); // 35% of sky height is blend zone
    await magick(
      '-size', `${w}x${skyH}`,
      'gradient:white-black',
      // Make the top 65% fully white, only bottom 35% is the gradient
      '-sigmoidal-contrast', '6x50%',
      tMask,
    );

    // Composite: replace sky region with gradient sky, blended through mask
    await magick(
      `${srcFile}[0]`,
      // Sky layer positioned at top
      tSky,
      '-gravity', 'North',
      '-geometry', `${w}x${skyH}+0+0`,
      tMask,
      '-composite',
      destFile,
    );
  } finally {
    cleanup(tSky, tMask);
  }
}

// ---------------------------------------------------------------------------
// Rotation fix
// ---------------------------------------------------------------------------

async function fixRotation(srcFile, destFile, tiltDegrees) {
  if (Math.abs(tiltDegrees) < 0.3) {
    await magick(`${srcFile}[0]`, destFile);
    return;
  }

  // Rotate by the correction amount, then auto-crop the resulting canvas
  await magick(
    `${srcFile}[0]`,
    '-background', 'transparent',
    '-rotate', String(-tiltDegrees),
    '-gravity', 'Center',
    '-extent', '100%x100%',
    '+repage',
    // Trim transparent edges
    '-fuzz', '2%',
    '-trim',
    '+repage',
    destFile,
  );
}

// ---------------------------------------------------------------------------
// 4K Wide (3840×2160)
// Professional camera look (Nikon D850 reference):
//   - 2-step Lanczos upscale with inter-pass sharpening
//   - Deep blacks via levels + sigmoidal contrast
//   - Rich but natural saturation
//   - Micro-contrast via unsharp mask at fine radius
//   - Subtle vignette (darker corners)
// ---------------------------------------------------------------------------

async function make4K(srcFile, destFile) {
  const { w, h } = await getDimensions(srcFile);
  const ar = WIDE_4K_W / WIDE_4K_H;
  let cw = w, ch = Math.round(w / ar);
  if (ch > h) { ch = h; cw = Math.round(h * ar); }
  const ox = Math.round((w - cw) / 2);

  let oy;
  if (h > w * 1.15) {
    oy = Math.round((h - ch) * 0.25);
  } else {
    oy = Math.round((h - ch) / 2);
  }
  oy = Math.max(0, Math.min(oy, h - ch));

  // Step 1: crop, upscale to 2× intermediate, sharpen (preserves edge detail)
  const midW = Math.min(WIDE_4K_W, Math.round(cw * 2));
  const midH = Math.min(WIDE_4K_H, Math.round(ch * 2));

  const tMid = tmpFile('.jpg');

  try {
    await magick(
      `${srcFile}[0]`,
      '-crop', `${cw}x${ch}+${ox}+${oy}`, '+repage',
      // Lanczos upscale to intermediate size
      '-filter', 'Lanczos', '-resize', `${midW}x${midH}!`,
      // First sharpening pass — recover edges lost during upscale
      '-unsharp', '0x0.8+1.0+0.02',
      '-quality', '95',
      tMid,
    );

    // Step 2: upscale to final 4K, apply pro camera processing
    await magick(
      tMid,
      '-filter', 'Lanczos', '-resize', `${WIDE_4K_W}x${WIDE_4K_H}!`,
      // ── Nikon-style tone curve ──
      // Deepen blacks: lift black point from 0 to 8, crush highlights slightly
      '-level', '2%,98%',
      // S-curve contrast (sigmoidal — no clipping, natural)
      '-sigmoidal-contrast', '4x50%',
      // ── Micro-contrast / clarity (simulates Nikon's Active D-Lighting) ──
      '-unsharp', '0x1.5+0.8+0.03',    // radius 1.5px, strength 80%
      '-unsharp', '0x0.4+0.5+0.01',    // fine detail pass — crisp textures
      // ── Color: rich but natural (Nikon VIVID profile) ──
      '-modulate', '100,118,100',        // +18% saturation
      '-brightness-contrast', '2x3',     // slight lift
      // ── Vignette: subtle dark corners (characteristic of pro lenses) ──
      '-vignette', '0x80',
      '-quality', '92',
      destFile,
    );
  } finally {
    cleanup(tMid);
  }
}

// ---------------------------------------------------------------------------
// Panoramic 3:1 (2700×900)
// ---------------------------------------------------------------------------

async function makePanoramic(srcFile, destFile) {
  const { w, h } = await getDimensions(srcFile);
  const centreW = Math.round((w / h) * PANO_H);
  const sideW = Math.round((PANO_W - centreW) / 2);

  // For portrait photos, use North gravity to keep the interesting upper part
  const isPortrait = h > w * 1.15;
  const gravity = isPortrait ? 'North' : 'Center';

  const tCentre = tmpFile();
  const tLeft = tmpFile();
  const tRight = tmpFile();

  try {
    await magick(
      `${srcFile}[0]`,
      '-resize', `x${PANO_H}`,
      '-gravity', gravity,
      '-extent', `${centreW}x${PANO_H}`,
      '-contrast-stretch', '0.5%x0.5%',
      tCentre,
    );

    await magick(
      `${srcFile}[0]`,
      '-gravity', 'West',
      '-crop', `${Math.max(1, Math.round(w * 0.3))}x${h}+0+0`,
      '+repage', '-flop',
      '-resize', `${sideW}x${PANO_H}!`,
      '-blur', '0x10',
      '-brightness-contrast', '-15x-20',
      tLeft,
    );

    await magick(
      `${srcFile}[0]`,
      '-gravity', 'East',
      '-crop', `${Math.max(1, Math.round(w * 0.3))}x${h}+0+0`,
      '+repage', '-flop',
      '-resize', `${sideW}x${PANO_H}!`,
      '-blur', '0x10',
      '-brightness-contrast', '-15x-20',
      tRight,
    );

    await magick(
      tLeft, tCentre, tRight,
      '+append',
      '-gravity', 'Center',
      '-extent', `${PANO_W}x${PANO_H}`,
      '-unsharp', '0x0.8+0.4+0.02',
      '-quality', '92',
      destFile,
    );
  } finally {
    cleanup(tCentre, tLeft, tRight);
  }
}

// ---------------------------------------------------------------------------
// VR 360° equirectangular (4096×2048)
//
// Builds a proper 360° environment — NO repeated tiles. Layout:
//   FRONT  (~120°): the actual source photo, barrel-warped
//   LEFT   (~60°):  left edge of source, perspective-warped, blurred
//   RIGHT  (~60°):  right edge of source, perspective-warped, blurred
//   BACK   (~120°): generated environment (ground texture + sky)
//   Everything cross-fades via alpha feathering at panel borders.
// ---------------------------------------------------------------------------

async function makeVR(srcFile, destFile, analysis) {
  const { w, h } = await getDimensions(srcFile);

  const frontW = Math.round(VR_W * (120 / 360));  // ~1365px
  const sideW  = Math.round(VR_W * (60 / 360));   // ~683px
  const isPortrait = h > w * 1.15;
  const gravity = isPortrait ? 'North' : 'Center';

  // JPEG for opaque temps (~1MB), PNG only for alpha layers (~8MB)
  // Aggressively free intermediate files to stay within tight disk limits
  const allTemps = [];
  const tj = () => { const f = tmpFile('.jpg'); allTemps.push(f); return f; };
  const tp = () => { const f = tmpFile('.png'); allTemps.push(f); return f; };

  try {
    const { stdout: groundHex } = await execAsync('magick', [
      `${srcFile}[0]`, '-gravity', 'South',
      '-crop', `${w}x${Math.round(h * 0.3)}+0+0`, '+repage',
      '-resize', '1x1!', '-format', '%[hex:u.p{0,0}]', 'info:',
    ]);
    const groundColor = `#${(groundHex.trim().slice(0, 6)) || '4a4a4a'}`;

    const { stdout: skyHex } = await execAsync('magick', [
      `${srcFile}[0]`, '-gravity', 'North',
      '-crop', `${w}x${Math.round(h * 0.2)}+0+0`, '+repage',
      '-resize', '1x1!', '-format', '%[hex:u.p{0,0}]', 'info:',
    ]);
    const skyColor = `#${(skyHex.trim().slice(0, 6)) || '87CEEB'}`;

    const horizonY = Math.round(VR_H * 0.40);

    // ── 1. Sky band ──
    const tSkyGrad = tj();
    await magick('-size', `${VR_W}x${horizonY}`, `gradient:#1a5fb4-${skyColor}`, '-quality', '85', tSkyGrad);

    const tClouds = tp();
    await magick(
      '-seed', String(Math.floor(Math.random() * 10000)),
      '-size', `${VR_W}x${horizonY}`, 'plasma:white-#87ceeb',
      '-blur', '0x16', '-level', '52%,72%', '-blur', '0x6',
      '-alpha', 'set', '-channel', 'A', '-evaluate', 'multiply', '0.4', '+channel',
      tClouds,
    );

    const tSky = tj();
    await magick(tSkyGrad, tClouds, '-composite', '-modulate', '100,80,98', '-quality', '85', tSky);
    cleanup(tSkyGrad, tClouds);

    // ── 2. Ground band ──
    const tGround = tj();
    await magick(
      '-size', `${VR_W}x${VR_H - horizonY}`, `gradient:${groundColor}-#1a1a1a`,
      '-attenuate', '0.12', '+noise', 'Gaussian', '-blur', '0x1',
      '-quality', '85', tGround,
    );

    // ── 3. Environment canvas ──
    const tEnv = tj();
    await magick(tSky, tGround, '-append', '-resize', `${VR_W}x${VR_H}!`, '-quality', '85', tEnv);
    cleanup(tSky, tGround);

    // ── 4. Front panel ──
    const tFront = tj();
    await magick(
      `${srcFile}[0]`, '-resize', `${frontW}x${VR_H}^`,
      '-gravity', gravity, '-extent', `${frontW}x${VR_H}`,
      '-virtual-pixel', 'Edge', '-distort', 'Barrel', '0.06 0 0 1.0',
      '-brightness-contrast', '3x8', '-quality', '90', tFront,
    );

    // ── 5. Left panel ──
    const cropW = Math.max(1, Math.round(w * 0.35));
    const tLeft = tj();
    await magick(
      `${srcFile}[0]`, '-gravity', 'West',
      '-crop', `${cropW}x${h}+0+0`, '+repage',
      '-resize', `${sideW}x${VR_H}^`, '-gravity', gravity,
      '-extent', `${sideW}x${VR_H}`,
      '-virtual-pixel', 'Edge',
      '-distort', 'Perspective',
        `0,0 ${Math.round(sideW * 0.15)},${Math.round(VR_H * 0.08)} ` +
        `${sideW},0 ${sideW},0 ` +
        `${sideW},${VR_H} ${sideW},${VR_H} ` +
        `0,${VR_H} ${Math.round(sideW * 0.15)},${Math.round(VR_H * 0.92)}`,
      '-blur', '0x6', '-brightness-contrast', '-10x-15', '-quality', '85', tLeft,
    );

    // ── 6. Right panel ──
    const tRight = tj();
    await magick(
      `${srcFile}[0]`, '-gravity', 'East',
      '-crop', `${cropW}x${h}+0+0`, '+repage',
      '-resize', `${sideW}x${VR_H}^`, '-gravity', gravity,
      '-extent', `${sideW}x${VR_H}`,
      '-virtual-pixel', 'Edge',
      '-distort', 'Perspective',
        `0,0 0,0 ` +
        `${sideW},0 ${Math.round(sideW * 0.85)},${Math.round(VR_H * 0.08)} ` +
        `${sideW},${VR_H} ${Math.round(sideW * 0.85)},${Math.round(VR_H * 0.92)} ` +
        `0,${VR_H} 0,${VR_H}`,
      '-blur', '0x6', '-brightness-contrast', '-10x-15', '-quality', '85', tRight,
    );

    // ── 7. Feather masks (small grayscale) ──
    const featherW = Math.round(frontW * 0.1);
    const tFL = tj(); await magick('-size', `${featherW}x${VR_H}`, 'gradient:', '-rotate', '90', '-quality', '85', tFL);
    const tFR = tj(); await magick('-size', `${featherW}x${VR_H}`, 'gradient:', '-rotate', '-90', '-quality', '85', tFR);

    // ── 8. Front panel → feathered alpha ──
    const tFrontMask = tj();
    await magick('-size', `${frontW}x${VR_H}`, 'xc:white', tFL, '-gravity', 'West', '-composite', tFR, '-gravity', 'East', '-composite', '-quality', '85', tFrontMask);
    cleanup(tFL, tFR);

    const tFrontA = tp();
    await magick(tFront, tFrontMask, '-alpha', 'off', '-compose', 'CopyOpacity', '-composite', tFrontA);
    cleanup(tFront, tFrontMask);

    // ── 9. Side panels → feathered alpha ──
    const sf = Math.round(sideW * 0.2);
    const tSFL = tj(); await magick('-size', `${sf}x${VR_H}`, 'gradient:', '-rotate', '90', '-quality', '85', tSFL);
    const tSFR = tj(); await magick('-size', `${sf}x${VR_H}`, 'gradient:', '-rotate', '-90', '-quality', '85', tSFR);

    const tLM = tj();
    await magick('-size', `${sideW}x${VR_H}`, 'xc:white', tSFL, '-gravity', 'West', '-composite', tSFR, '-gravity', 'East', '-composite', '-quality', '85', tLM);
    const tLA = tp();
    await magick(tLeft, tLM, '-alpha', 'off', '-compose', 'CopyOpacity', '-composite', tLA);
    cleanup(tLeft, tLM);

    const tRM = tj();
    await magick('-size', `${sideW}x${VR_H}`, 'xc:white', tSFL, '-gravity', 'West', '-composite', tSFR, '-gravity', 'East', '-composite', '-quality', '85', tRM);
    cleanup(tSFL, tSFR);
    const tRA = tp();
    await magick(tRight, tRM, '-alpha', 'off', '-compose', 'CopyOpacity', '-composite', tRA);
    cleanup(tRight, tRM);

    // ── 10. Composite panels onto environment ──
    const frontX = sideW;
    const rightX = sideW + frontW;

    const tC1 = tj();
    await magick(tEnv, tLA, '-gravity', 'NorthWest', '-geometry', '+0+0', '-composite', '-quality', '85', tC1);
    cleanup(tEnv, tLA);

    const tC2 = tj();
    await magick(tC1, tFrontA, '-gravity', 'NorthWest', '-geometry', `+${frontX}+0`, '-composite', '-quality', '85', tC2);
    cleanup(tC1, tFrontA);

    const tC3 = tj();
    await magick(tC2, tRA, '-gravity', 'NorthWest', '-geometry', `+${rightX}+0`, '-composite', '-quality', '85', tC3);
    cleanup(tC2, tRA);

    // ── 11. Zenith/nadir + finalize ──
    const tZ = tj(); await magick('-size', `${VR_W}x${Math.round(VR_H * 0.15)}`, 'gradient:#00000066-#00000000', tZ);
    const tN = tj(); await magick('-size', `${VR_W}x${Math.round(VR_H * 0.18)}`, 'gradient:#00000000-#00000088', tN);

    await magick(
      tC3, tZ, '-gravity', 'North', '-composite',
      tN, '-gravity', 'South', '-composite',
      '-unsharp', '0x0.8+0.4+0.02', '-quality', '92', destFile,
    );
    cleanup(tC3, tZ, tN);

  } finally {
    cleanup(...allTemps);
  }
}

// ---------------------------------------------------------------------------
// Concurrency pool
// ---------------------------------------------------------------------------

async function pMap(items, fn, concurrency) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

// ---------------------------------------------------------------------------
// Process one photo through full pipeline
// ---------------------------------------------------------------------------

async function processPhoto(src, idx, total, analysis) {
  const label = `[${idx + 1}/${total}] ${path.basename(src)}`;
  const errors = [];

  // Step 1: Generate descriptive filename from Gemini analysis
  const subjectSlug = sanitizeFilename(analysis.subject) || `project-${idx + 1}`;
  const newName = `${String(idx + 1).padStart(2, '0')}-${subjectSlug}`;

  // Skip if all 3 outputs already exist
  const dest4KCheck   = path.join(OUT_4K,   `${newName}_4k.jpg`);
  const destPanoCheck = path.join(OUT_PANO, `${newName}_panoramic.jpg`);
  const destVRCheck   = path.join(OUT_VR,   `${newName}_vr.jpg`);
  if (fs.existsSync(dest4KCheck) && fs.existsSync(destPanoCheck) && fs.existsSync(destVRCheck)) {
    console.log(`  ⏭  skipped   ${label} (already done)`);
    return { src, newName, subject: analysis.subject, description: analysis.description, tilt: analysis.tilt_degrees, skyPct: analysis.sky_percentage, errors };
  }

  console.log(`  🔍 ${label} → "${analysis.subject}" (tilt: ${analysis.tilt_degrees}°, sky: ${analysis.sky_percentage}%)`);

  // Step 2: Fix rotation if needed
  const tRotated = tmpFile('.jpg');
  try {
    await fixRotation(src, tRotated, analysis.tilt_degrees);
  } catch (e) {
    errors.push(`rotation: ${e.message}`);
    console.error(`  ✗ rotation   ${label}: ${e.message}`);
    // Fall back to original
    fs.copyFileSync(src, tRotated);
  }

  // Step 3: Replace sky if there's enough sky visible
  const tSkyFixed = tmpFile('.jpg');
  try {
    if (analysis.has_sky && analysis.sky_percentage >= 8 && analysis.sky_is_grey) {
      await replaceSky(tRotated, tSkyFixed, analysis.sky_percentage);
      console.log(`  ☁️  sky       ${label} — replaced ${analysis.sky_percentage}% grey sky → blue`);
    } else {
      fs.copyFileSync(tRotated, tSkyFixed);
    }
  } catch (e) {
    errors.push(`sky: ${e.message}`);
    console.error(`  ✗ sky        ${label}: ${e.message}`);
    fs.copyFileSync(tRotated, tSkyFixed);
  }

  // Step 4: Generate all 3 output formats in parallel from the corrected image
  const dest4K   = path.join(OUT_4K,   `${newName}_4k.jpg`);
  const destPano = path.join(OUT_PANO, `${newName}_panoramic.jpg`);
  const destVR   = path.join(OUT_VR,   `${newName}_vr.jpg`);

  await Promise.all([
    make4K(tSkyFixed, dest4K)
      .then(() => console.log(`  ✓ 4k         ${label}`))
      .catch(e => { errors.push(`4k: ${e.message}`); console.error(`  ✗ 4k         ${label}: ${e.message}`); }),

    makePanoramic(tSkyFixed, destPano)
      .then(() => console.log(`  ✓ panoramic  ${label}`))
      .catch(e => { errors.push(`pano: ${e.message}`); console.error(`  ✗ panoramic  ${label}: ${e.message}`); }),

    makeVR(tSkyFixed, destVR, analysis)
      .then(() => console.log(`  ✓ vr         ${label}`))
      .catch(e => { errors.push(`vr: ${e.message}`); console.error(`  ✗ vr         ${label}: ${e.message}`); }),
  ]);

  cleanup(tRotated, tSkyFixed);

  return {
    src,
    newName,
    subject: analysis.subject,
    description: analysis.description,
    tilt: analysis.tilt_degrees,
    skyPct: analysis.sky_percentage,
    errors,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  for (const d of [OUT_4K, OUT_PANO, OUT_VR]) fs.mkdirSync(d, { recursive: true });

  const sources = gatherSources();
  if (!sources.length) {
    console.error('No source photos found.');
    process.exit(1);
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log('  ALKATER PHOTO ENHANCER v2');
  console.log(`  Sources    : ${sources.length} photos`);
  console.log(`  Pipeline   : Gemini analysis → rotation fix → sky replace → outputs`);
  console.log(`  Outputs    : 4K (3840×2160) · panoramic (2700×900) · VR (4096×2048)`);
  console.log(`  Sky style  : Igoumenitsa Mediterranean blue with clouds`);
  console.log(`  AI model   : ${GEMINI_MODEL}`);
  console.log(`  Concurrency: ${GEMINI_CONCURRENCY} Gemini calls, ${CONCURRENCY} image pipelines`);
  console.log(`${'='.repeat(70)}\n`);

  // -----------------------------------------------------------------------
  // Phase 1: Analyze ALL photos with Gemini in parallel
  // -----------------------------------------------------------------------
  console.log('--- Phase 1: Gemini Flash image analysis ---\n');
  const analysisStart = Date.now();

  const analyses = await pMap(sources, async (src, idx) => {
    const label = `[${idx + 1}/${sources.length}] ${path.basename(src)}`;
    try {
      const result = await analyzeWithGemini(src);
      console.log(`  ✓ analyzed  ${label} → "${result.subject}"`);
      return result;
    } catch (e) {
      console.error(`  ✗ analyze   ${label}: ${e.message}`);
      return {
        subject: path.basename(src, path.extname(src)),
        tilt_degrees: 0,
        has_sky: false,
        sky_percentage: 0,
        sky_is_grey: false,
        description: 'Construction photo',
      };
    }
  }, GEMINI_CONCURRENCY);

  const analysisTime = ((Date.now() - analysisStart) / 1000).toFixed(1);
  console.log(`\n  Analysis complete in ${analysisTime}s\n`);

  // -----------------------------------------------------------------------
  // Phase 2: Process all photos in parallel (rotation, sky, outputs)
  // -----------------------------------------------------------------------
  console.log('--- Phase 2: Image processing pipeline ---\n');
  const processStart = Date.now();

  const results = await pMap(
    sources,
    (src, idx) => processPhoto(src, idx, sources.length, analyses[idx]),
    CONCURRENCY,
  );

  const processTime = ((Date.now() - processStart) / 1000).toFixed(1);
  const totalTime = ((Date.now() - analysisStart) / 1000).toFixed(1);
  const failed = results.filter(r => r.errors.length > 0);

  // -----------------------------------------------------------------------
  // Write manifest
  // -----------------------------------------------------------------------
  const manifest = results.map((r, i) => ({
    index: i + 1,
    originalFile: path.basename(r.src),
    newName: r.newName,
    subject: r.subject,
    description: r.description,
    tiltCorrected: r.tilt,
    skyReplaced: r.skyPct,
    errors: r.errors,
  }));
  fs.writeFileSync(path.join(OUT_BASE, 'manifest.json'), JSON.stringify(manifest, null, 2));

  // -----------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------
  console.log(`\n${'='.repeat(70)}`);
  console.log('  COMPLETE');
  console.log(`  Analysis: ${analysisTime}s | Processing: ${processTime}s | Total: ${totalTime}s`);
  console.log(`  ${sources.length - failed.length}/${sources.length} photos fully processed`);
  if (failed.length) {
    console.log(`  ${failed.length} with errors:`);
    for (const r of failed) console.log(`    - ${path.basename(r.src)}: ${r.errors.join(' | ')}`);
  }
  console.log(`\n  Output directories:`);
  console.log(`    4K (3840×2160):         ${OUT_4K}`);
  console.log(`    Panoramic (2700×900):   ${OUT_PANO}`);
  console.log(`    VR/360° (4096×2048):    ${OUT_VR}`);
  console.log(`    Manifest:               ${path.join(OUT_BASE, 'manifest.json')}`);

  console.log(`\n  Rename mapping:`);
  for (const r of results) {
    console.log(`    ${path.basename(r.src).padEnd(55)} → ${r.newName}`);
  }
  console.log(`${'='.repeat(70)}\n`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
