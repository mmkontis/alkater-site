"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type ThemeMode = "dark" | "light";

export interface ColorScheme {
  accent: string;
  tint: string; // blue color from logo mode, used for subtle bg/overlay tints
  logoLeft: string;  // color for the left part of the logo (ΑΛΚ)
  logoRight: string; // color for the right part of the logo (ΑΤΕΡ)
}

const DEFAULT_SCHEME: ColorScheme = { accent: "#F04438", tint: "#063D64", logoLeft: "#063D64", logoRight: "#F04438" };

// Pre-compute color-mix() in JS so the CSS output is plain hex/rgba
// (WAVE and some tools crash on CSS color-mix())
function parseColor(c: string): [number, number, number, number] {
  if (c === "transparent") return [0, 0, 0, 0];
  if (c.startsWith("#")) {
    const h = c.slice(1);
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1];
  }
  const m = c.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (m) return [+m[1], +m[2], +m[3], m[4] !== undefined ? +m[4] : 1];
  return [0, 0, 0, 1];
}

function mixSrgb(colorA: string, pctA: number, colorB: string): string {
  const [r1, g1, b1, a1] = parseColor(colorA);
  const [r2, g2, b2, a2] = parseColor(colorB);
  const p = pctA / 100, q = 1 - p;
  const r = Math.round(r1 * p + r2 * q);
  const g = Math.round(g1 * p + g2 * q);
  const b = Math.round(b1 * p + b2 * q);
  const a = +(a1 * p + a2 * q).toFixed(4);
  if (a >= 0.999) return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  return `rgba(${r},${g},${b},${a})`;
}

function accentAlpha(hex: string, alpha: number): string {
  const [r, g, b] = parseColor(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

export interface ThemeColors {
  bgPrimary: string;
  bgSurface: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderColor: string;
  borderHover: string;
  inputBg: string;
  overlayBg: string;
  cardBg: string;
  logoBg: string;
}

const darkTheme: ThemeColors = {
  bgPrimary: "#111111",
  bgSurface: "#1A1A1A",
  textPrimary: "#F5F3EE",
  textSecondary: "rgba(232,228,221,0.8)",
  textMuted: "rgba(232,228,221,0.6)",
  borderColor: "rgba(255,255,255,0.05)",
  borderHover: "rgba(255,255,255,0.1)",
  inputBg: "#1A1A1A",
  overlayBg: "rgba(0,0,0,0.6)",
  cardBg: "rgba(26,26,26,0.9)",
  logoBg: "rgba(0,0,0,0.60)",
};

const lightTheme: ThemeColors = {
  bgPrimary: "#F5F3EE",
  bgSurface: "#ffffff",
  textPrimary: "#111111",
  textSecondary: "rgba(17,17,17,0.8)",
  textMuted: "rgba(17,17,17,0.5)",
  borderColor: "rgba(17,17,17,0.1)",
  borderHover: "rgba(17,17,17,0.2)",
  inputBg: "#ffffff",
  overlayBg: "rgba(255,255,255,0.6)",
  cardBg: "rgba(255,255,255,0.9)",
  logoBg: "rgba(255,255,255,0.60)",
};

interface ThemeContextValue {
  mode: ThemeMode;
  colors: ThemeColors;
  scheme: ColorScheme;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  colors: darkTheme,
  scheme: DEFAULT_SCHEME,
  toggleMode: () => {},
  setMode: () => {},
  setColorScheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [scheme, setSchemeState] = useState<ColorScheme>(DEFAULT_SCHEME);

  const colors = mode === "dark" ? darkTheme : lightTheme;

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
  }, []);

  const setColorScheme = useCallback((s: ColorScheme) => {
    setSchemeState(s);
  }, []);

  const hasTint = scheme.tint !== "transparent" && scheme.tint !== "#ffffff" && scheme.tint !== "#111111";

  const linkColor = hasTint ? scheme.tint : scheme.accent;
  const bgSurface = hasTint ? mixSrgb(colors.bgSurface, 94, scheme.tint) : colors.bgSurface;
  const borderColor = hasTint ? mixSrgb(colors.borderColor, 80, scheme.tint) : colors.borderColor;
  const borderHover = hasTint ? mixSrgb(colors.borderHover, 80, scheme.tint) : colors.borderHover;
  const overlayBg = hasTint ? mixSrgb(colors.overlayBg, 85, scheme.tint) : colors.overlayBg;

  const cssVars = {
    "--bg-primary": colors.bgPrimary,
    "--bg-surface": bgSurface,
    "--text-primary": colors.textPrimary,
    "--text-secondary": colors.textSecondary,
    "--text-muted": colors.textMuted,
    "--accent": scheme.accent,
    "--accent-bg": mixSrgb(scheme.accent, 85, "#000000"),
    "--tint": scheme.tint,
    "--border-color": borderColor,
    "--border-hover": borderHover,
    "--input-bg": colors.inputBg,
    "--overlay-bg": overlayBg,
    "--card-bg": colors.cardBg,
    "--logo-bg": colors.logoBg,
    "--logo-left": scheme.logoLeft === "var(--text-primary)" ? colors.textPrimary : scheme.logoLeft,
    "--logo-right": scheme.logoRight,
    "--tint-subtle": hasTint ? mixSrgb(scheme.tint, 8, "transparent") : "transparent",
    "--link-color": linkColor,
    // Tint opacity variants (tint mixed with transparent)
    "--tint-6": mixSrgb(scheme.tint, 6, "transparent"),
    "--tint-8": mixSrgb(scheme.tint, 8, "transparent"),
    "--tint-10": mixSrgb(scheme.tint, 10, "transparent"),
    "--tint-12": mixSrgb(scheme.tint, 12, "transparent"),
    "--tint-15": mixSrgb(scheme.tint, 15, "transparent"),
    "--tint-20": mixSrgb(scheme.tint, 20, "transparent"),
    "--tint-25": mixSrgb(scheme.tint, 25, "transparent"),
    "--tint-30": mixSrgb(scheme.tint, 30, "transparent"),
    "--tint-35": mixSrgb(scheme.tint, 35, "transparent"),
    // Accent opacity variants
    "--accent-8": mixSrgb(scheme.accent, 8, "transparent"),
    "--accent-10": mixSrgb(scheme.accent, 10, "transparent"),
    "--accent-30": mixSrgb(scheme.accent, 30, "transparent"),
    // Background + tint mixes
    "--bg-tint-65": mixSrgb(colors.bgPrimary, 65, scheme.tint),
    "--bg-tint-70": mixSrgb(colors.bgPrimary, 70, scheme.tint),
    "--bg-tint-80": mixSrgb(colors.bgPrimary, 80, scheme.tint),
    "--bg-tint-85": mixSrgb(colors.bgPrimary, 85, scheme.tint),
    "--bg-tint-88": mixSrgb(colors.bgPrimary, 88, scheme.tint),
    "--bg-tint-90": mixSrgb(colors.bgPrimary, 90, scheme.tint),
    "--bg-tint-95": mixSrgb(colors.bgPrimary, 95, "transparent"),
    "--bg-tint-97": mixSrgb(colors.bgPrimary, 97, scheme.tint),
    // Link-color + bg mixes
    "--link-bg-12": mixSrgb(linkColor, 12, colors.bgPrimary),
    "--link-bg-15": mixSrgb(linkColor, 15, colors.bgPrimary),
    "--link-bg-30": mixSrgb(linkColor, 30, colors.bgPrimary),
    // Border mixes (tint + white/alpha)
    "--tint-border-15": mixSrgb(scheme.tint, 15, "rgba(255,255,255,0.05)"),
    "--tint-border-20": mixSrgb(scheme.tint, 20, borderColor),
    "--tint-divider": mixSrgb(scheme.tint, 25, "rgba(255,255,255,0.06)"),
    "--tint-border-40": mixSrgb(scheme.tint, 40, "rgba(255,255,255,0.1)"),
    "--tint-border-12": mixSrgb(scheme.tint, 12, "rgba(255,255,255,0.04)"),
    "--accent-border-20": mixSrgb(scheme.accent, 20, borderColor),
    // Nested: nav & contact card backgrounds
    "--nav-bg": mixSrgb(mixSrgb(colors.bgPrimary, 85, linkColor), 92, "transparent"),
    "--contact-card-bg": mixSrgb(mixSrgb(colors.bgPrimary, 85, linkColor), 75, "transparent"),
    // Hero & overlay variants
    "--hero-overlay-tint": mixSrgb(scheme.tint, 20, "rgba(0,0,0,0.45)"),
    "--overlay-70": mixSrgb(overlayBg, 70, "transparent"),
    // Surface tinted (same as --bg-surface, for explicit use)
    "--surface-tinted": bgSurface,
    // Form variants
    "--form-bg": mixSrgb(colors.bgPrimary, 80, scheme.tint),
    "--form-border": mixSrgb(scheme.tint, 20, borderHover),
    "--form-success": mixSrgb("#22c55e", 15, colors.bgPrimary),
    // Blog section
    "--blog-card-bg": mixSrgb(colors.bgSurface ?? "#1A1A1A", 92, scheme.tint),
    "--blog-card-border": mixSrgb(scheme.tint, 20, borderColor),
  } as React.CSSProperties;

  const a = scheme.accent;
  const accentOverrides = `
    .text-\\[\\#E63B2E\\] { color: var(--accent) !important; transition: color 0.5s; }
    .bg-\\[\\#E63B2E\\] { background-color: var(--accent-bg) !important; transition: background-color 0.5s; }
    .bg-\\[\\#E63B2E\\]\\/5 { background-color: ${accentAlpha(a, 0.05)} !important; }
    .bg-\\[\\#E63B2E\\]\\/10 { background-color: ${accentAlpha(a, 0.1)} !important; }
    .bg-\\[\\#E63B2E\\]\\/15 { background-color: ${accentAlpha(a, 0.15)} !important; }
    .bg-\\[\\#E63B2E\\]\\/20 { background-color: ${accentAlpha(a, 0.2)} !important; }
    .bg-\\[\\#E63B2E\\]\\/25 { background-color: ${accentAlpha(a, 0.25)} !important; }
    .border-\\[\\#E63B2E\\] { border-color: var(--accent) !important; }
    .border-\\[\\#E63B2E\\]\\/20 { border-color: ${accentAlpha(a, 0.2)} !important; }
    .border-\\[\\#E63B2E\\]\\/50 { border-color: ${accentAlpha(a, 0.5)} !important; }
    .selection\\:bg-\\[\\#E63B2E\\]::selection,
    .selection\\:bg-\\[\\#E63B2E\\] ::selection { background-color: var(--accent) !important; }
    .hover\\:text-\\[\\#E63B2E\\]:hover { color: var(--accent) !important; }
    .hover\\:border-\\[\\#E63B2E\\]\\/30:hover { border-color: ${accentAlpha(a, 0.3)} !important; }
    .hover\\:border-\\[\\#E63B2E\\]\\/50:hover { border-color: ${accentAlpha(a, 0.5)} !important; }
    .border-\\[\\#E63B2E\\]\\/30 { border-color: ${accentAlpha(a, 0.3)} !important; }
    .group:hover .group-hover\\:text-\\[\\#E63B2E\\]\\/20 { color: ${accentAlpha(a, 0.2)} !important; }
    .group:hover .group-hover\\:bg-\\[\\#E63B2E\\]\\/20 { background-color: ${accentAlpha(a, 0.2)} !important; }
    .group:hover .group-hover\\:bg-\\[\\#E63B2E\\] { background-color: var(--accent) !important; }
    .focus\\:border-\\[\\#E63B2E\\]:focus { border-color: var(--accent) !important; }
    .from-\\[\\#E63B2E\\] { --tw-gradient-from: var(--accent) !important; }
  `;

  return (
    <ThemeContext.Provider value={{ mode, colors, scheme, toggleMode, setMode, setColorScheme }}>
      <div style={cssVars} className="transition-colors duration-500">
        <style dangerouslySetInnerHTML={{ __html: accentOverrides }} />
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
