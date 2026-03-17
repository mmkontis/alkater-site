#!/usr/bin/env node
/**
 * enhance-photos.mjs
 *
 * Processes all project photos in parallel and outputs:
 *   1. wide/      — 16:9 wide framing (1920×1080), contrast + clarity boost
 *   2. panoramic/ — 3:1 ultra-wide panoramic (2700×900), mirrored edge fill
 *   3. vr/        — 2:1 equirectangular 360° VR (4096×2048), cylindrical warp
 *
 * Uses ImageMagick 7 (magick) which must be installed.
 *
 * Usage:
 *   node scripts/enhance-photos.mjs
 *
 * Output:
 *   public/Photos/enhanced/wide/
 *   public/Photos/enhanced/panoramic/
 *   public/Photos/enhanced/vr/
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const exec = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const CONCURRENCY = 6; // parallel photo batches

const PHOTOS_DIR    = path.join(__dirname, '..', 'public', 'Photos');
const SOURCE_MAIN   = PHOTOS_DIR;                                       // project-N.jpg
const SOURCE_VIBER  = path.join(PHOTOS_DIR, 'Photos απο έργα');

const OUT_BASE = path.join(PHOTOS_DIR, 'enhanced');
const OUT_WIDE = path.join(OUT_BASE, 'wide');
const OUT_PANO = path.join(OUT_BASE, 'panoramic');
const OUT_VR   = path.join(OUT_BASE, 'vr');

const WIDE_W = 1920, WIDE_H = 1080;   // 16:9
const PANO_W = 2700, PANO_H = 900;    // 3:1
const VR_W   = 4096, VR_H   = 2048;   // 2:1 equirectangular

// ---------------------------------------------------------------------------
// Gather source files
// ---------------------------------------------------------------------------

function gatherSources() {
  const files = [];
  for (const f of fs.readdirSync(SOURCE_MAIN)) {
    if (/^project-\d+\.jpe?g$/i.test(f)) files.push(path.join(SOURCE_MAIN, f));
  }
  if (fs.existsSync(SOURCE_VIBER)) {
    for (const f of fs.readdirSync(SOURCE_VIBER)) {
      if (/\.jpe?g$/i.test(f)) files.push(path.join(SOURCE_VIBER, f));
    }
  }
  return files;
}

// ---------------------------------------------------------------------------
// ImageMagick helper
// ---------------------------------------------------------------------------

async function magick(...args) {
  try {
    await exec('magick', args, { maxBuffer: 100 * 1024 * 1024 });
  } catch (err) {
    throw new Error(`magick error: ${(err.stderr || err.message || '').slice(0, 400)}`);
  }
}

async function getDimensions(file) {
  const { stdout } = await exec('magick', ['identify', '-format', '%wx%h', `${file}[0]`]);
  const [w, h] = stdout.trim().split('x').map(Number);
  return { w, h };
}

function tmpFile(suffix = '.png') {
  return path.join(os.tmpdir(), `alkater-${Date.now()}-${Math.random().toString(36).slice(2)}${suffix}`);
}

function cleanup(...files) {
  for (const f of files) { try { fs.unlinkSync(f); } catch {} }
}

// ---------------------------------------------------------------------------
// Transform 1: Wide 16:9 (1920×1080)
// Centre-crop to 16:9, resize, contrast-stretch + clarity
// ---------------------------------------------------------------------------

async function makeWide(src, dest) {
  const { w, h } = await getDimensions(src);
  const ar = WIDE_W / WIDE_H;
  let cw = w, ch = Math.round(w / ar);
  if (ch > h) { ch = h; cw = Math.round(h * ar); }
  const ox = Math.round((w - cw) / 2);
  const oy = Math.round((h - ch) / 2);

  await magick(
    `${src}[0]`,
    '-gravity', 'Center',
    '-crop', `${cw}x${ch}+${ox}+${oy}`,
    '+repage',
    '-resize', `${WIDE_W}x${WIDE_H}!`,
    '-contrast-stretch', '1%x1%',
    '-unsharp', '0x1+0.5+0.05',
    '-modulate', '100,110,100',
    '-quality', '92',
    dest,
  );
}

// ---------------------------------------------------------------------------
// Transform 2: Panoramic 3:1 (2700×900)
// Steps:
//   a) Scale source to pano height keeping aspect (centre panel)
//   b) Scale flipped source to fill remaining width on each side (blurred)
//   c) Composite: [blurred-left] [centre] [blurred-right] all at PANO_H
//   d) Trim/crop to exact 2700×900 and enhance
// ---------------------------------------------------------------------------

async function makePanoramic(src, dest) {
  const { w, h } = await getDimensions(src);

  // Centre panel: keep aspect ratio, height = PANO_H
  const centreW = Math.round((w / h) * PANO_H);   // e.g. 675 for portrait 1350×1800
  const sideW   = Math.round((PANO_W - centreW) / 2);  // fill each side

  const tCentre = tmpFile();
  const tLeft   = tmpFile();
  const tRight  = tmpFile();

  try {
    // Centre panel — scale to PANO_H, contrast-stretch
    await magick(
      `${src}[0]`,
      '-resize', `x${PANO_H}`,   // height = PANO_H, keep AR
      '-gravity', 'Center',
      '-extent', `${centreW}x${PANO_H}`,
      '-contrast-stretch', '0.5%x0.5%',
      tCentre,
    );

    // Left fill — flipped left-edge column of source, blurred, darkened
    await magick(
      `${src}[0]`,
      '-gravity', 'West',
      '-crop', `${Math.max(1, Math.round(w * 0.3))}x${h}+0+0`,
      '+repage',
      '-flop',
      '-resize', `${sideW}x${PANO_H}!`,
      '-blur', '0x10',
      '-brightness-contrast', '-15x-20',
      tLeft,
    );

    // Right fill — flipped right-edge column of source, blurred, darkened
    await magick(
      `${src}[0]`,
      '-gravity', 'East',
      '-crop', `${Math.max(1, Math.round(w * 0.3))}x${h}+0+0`,
      '+repage',
      '-flop',
      '-resize', `${sideW}x${PANO_H}!`,
      '-blur', '0x10',
      '-brightness-contrast', '-15x-20',
      tRight,
    );

    // Stitch: left + centre + right side-by-side, then exact crop to 2700×900
    await magick(
      tLeft, tCentre, tRight,
      '+append',
      '-gravity', 'Center',
      '-extent', `${PANO_W}x${PANO_H}`,
      '-unsharp', '0x0.8+0.4+0.02',
      '-quality', '92',
      dest,
    );
  } finally {
    cleanup(tCentre, tLeft, tRight);
  }
}

// ---------------------------------------------------------------------------
// Transform 3: VR / 360° equirectangular (4096×2048)
// Strategy:
//   a) Create a barrel-distorted tile (spherical warp) at tileW × VR_H
//   b) Mirror-append to get 4 tiles wide → full 360° horizontal span
//   c) Apply top/bottom gradient fade for natural zenith/nadir blending
// ---------------------------------------------------------------------------

async function makeVR(src, dest) {
  const tileW = Math.round(VR_W / 4);   // 1024px per tile × 4 = 4096

  const tTile  = tmpFile();
  const tFull  = tmpFile();
  const tMirr  = tmpFile();

  try {
    // Step 1 — distorted tile: scale to tile size, barrel-warp
    await magick(
      `${src}[0]`,
      '-resize', `${tileW}x${VR_H}^`,
      '-gravity', 'Center',
      '-extent', `${tileW}x${VR_H}`,
      '-virtual-pixel', 'Mirror',
      '-distort', 'Barrel', '0.25 0 -0.05 1.0',
      '-brightness-contrast', '5x10',
      '-modulate', '100,115,100',
      tTile,
    );

    // Step 2 — mirrored copy of the tile
    await magick(tTile, '-flop', tMirr);

    // Step 3 — stitch 4 tiles: [tile][mirror][tile][mirror]
    await magick(
      tTile, tMirr, tTile, tMirr,
      '+append',
      '-resize', `${VR_W}x${VR_H}!`,
      tFull,
    );

    // Step 4 — add top/bottom polar gradient fades, final quality pass
    await magick(
      tFull,
      // Top fade
      '(',
        '-size', `${VR_W}x${Math.round(VR_H * 0.22)}`,
        'gradient:#00000099-#00000000',
      ')',
      '-gravity', 'North', '-composite',
      // Bottom fade
      '(',
        '-size', `${VR_W}x${Math.round(VR_H * 0.22)}`,
        'gradient:#00000000-#00000099',
      ')',
      '-gravity', 'South', '-composite',
      '-unsharp', '0x1+0.6+0.03',
      '-quality', '90',
      dest,
    );
  } finally {
    cleanup(tTile, tMirr, tFull);
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
// Process one photo (all 3 transforms in parallel)
// ---------------------------------------------------------------------------

async function processPhoto(src, idx, total) {
  const base     = path.basename(src, path.extname(src));
  const safeName = base.replace(/[^\x00-\x7F]/g, (c) => `u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);
  const label    = `[${idx + 1}/${total}] ${path.basename(src)}`;

  const wDest = path.join(OUT_WIDE, `${safeName}_wide.jpg`);
  const pDest = path.join(OUT_PANO, `${safeName}_panoramic.jpg`);
  const vDest = path.join(OUT_VR,   `${safeName}_vr.jpg`);

  const errors = [];

  await Promise.all([
    makeWide(src, wDest)
      .then(() => console.log(`  ✓ wide       ${label}`))
      .catch((e) => { errors.push(`wide: ${e.message}`); console.error(`  ✗ wide       ${label}: ${e.message}`); }),

    makePanoramic(src, pDest)
      .then(() => console.log(`  ✓ panoramic  ${label}`))
      .catch((e) => { errors.push(`panoramic: ${e.message}`); console.error(`  ✗ panoramic  ${label}: ${e.message}`); }),

    makeVR(src, vDest)
      .then(() => console.log(`  ✓ vr         ${label}`))
      .catch((e) => { errors.push(`vr: ${e.message}`); console.error(`  ✗ vr         ${label}: ${e.message}`); }),
  ]);

  return { src, errors };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  for (const d of [OUT_WIDE, OUT_PANO, OUT_VR]) fs.mkdirSync(d, { recursive: true });

  const sources = gatherSources();
  if (!sources.length) {
    console.error('No source photos found in', PHOTOS_DIR);
    process.exit(1);
  }

  console.log(`\n${'='.repeat(64)}`);
  console.log('  ALKATER PHOTO ENHANCER');
  console.log(`  Sources : ${sources.length} photos`);
  console.log(`  Outputs : wide (1920×1080) · panoramic (2700×900) · VR (4096×2048)`);
  console.log(`  Workers : ${CONCURRENCY} parallel batches (3 transforms each)`);
  console.log(`${'='.repeat(64)}\n`);

  const start = Date.now();

  const results = await pMap(
    sources,
    (src, idx) => processPhoto(src, idx, sources.length),
    CONCURRENCY,
  );

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const failed  = results.filter((r) => r.errors.length > 0);

  console.log(`\n${'='.repeat(64)}`);
  console.log(`  DONE in ${elapsed}s`);
  console.log(`  ${sources.length - failed.length}/${sources.length} photos fully processed`);
  if (failed.length) {
    console.log(`  ${failed.length} failures:`);
    for (const r of failed) console.log(`    - ${path.basename(r.src)}: ${r.errors.join(' | ')}`);
  }
  console.log(`\n  Output:`);
  console.log(`    ${OUT_WIDE}`);
  console.log(`    ${OUT_PANO}`);
  console.log(`    ${OUT_VR}`);
  console.log(`${'='.repeat(64)}\n`);
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
