"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type ThemeMode = "dark" | "light";

export interface ColorScheme {
  accent: string;
  tint: string; // blue color from logo mode, used for subtle bg/overlay tints
  logoLeft: string;  // color for the left part of the logo (ΑΛΚ)
  logoRight: string; // color for the right part of the logo (ΑΤΕΡ)
}

const DEFAULT_SCHEME: ColorScheme = { accent: "#E63B2E", tint: "#1B6B9E", logoLeft: "#1B6B9E", logoRight: "#E63B2E" };

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

  const cssVars = {
    "--bg-primary": colors.bgPrimary,
    "--bg-surface": hasTint
      ? `color-mix(in srgb, ${colors.bgSurface} 94%, ${scheme.tint})`
      : colors.bgSurface,
    "--text-primary": colors.textPrimary,
    "--text-secondary": colors.textSecondary,
    "--text-muted": colors.textMuted,
    "--accent": scheme.accent,
    "--tint": scheme.tint,
    "--border-color": hasTint
      ? `color-mix(in srgb, ${colors.borderColor} 80%, ${scheme.tint})`
      : colors.borderColor,
    "--border-hover": hasTint
      ? `color-mix(in srgb, ${colors.borderHover} 80%, ${scheme.tint})`
      : colors.borderHover,
    "--input-bg": colors.inputBg,
    "--overlay-bg": hasTint
      ? `color-mix(in srgb, ${colors.overlayBg} 85%, ${scheme.tint})`
      : colors.overlayBg,
    "--card-bg": colors.cardBg,
    "--logo-bg": colors.logoBg,
    "--logo-left": scheme.logoLeft === "var(--text-primary)" ? colors.textPrimary : scheme.logoLeft,
    "--logo-right": scheme.logoRight,
    "--tint-subtle": hasTint
      ? `color-mix(in srgb, ${scheme.tint} 8%, transparent)`
      : "transparent",
    "--link-color": hasTint ? scheme.tint : scheme.accent,
  } as React.CSSProperties;

  // Global CSS overrides that remap all hardcoded Tailwind #E63B2E classes to var(--accent)
  const accentOverrides = `
    .text-\\[\\#E63B2E\\] { color: var(--accent) !important; transition: color 0.5s; }
    .bg-\\[\\#E63B2E\\] { background-color: var(--accent) !important; transition: background-color 0.5s; }
    .bg-\\[\\#E63B2E\\]\\/5 { background-color: color-mix(in srgb, var(--accent) 5%, transparent) !important; }
    .bg-\\[\\#E63B2E\\]\\/10 { background-color: color-mix(in srgb, var(--accent) 10%, transparent) !important; }
    .bg-\\[\\#E63B2E\\]\\/15 { background-color: color-mix(in srgb, var(--accent) 15%, transparent) !important; }
    .bg-\\[\\#E63B2E\\]\\/20 { background-color: color-mix(in srgb, var(--accent) 20%, transparent) !important; }
    .bg-\\[\\#E63B2E\\]\\/25 { background-color: color-mix(in srgb, var(--accent) 25%, transparent) !important; }
    .border-\\[\\#E63B2E\\] { border-color: var(--accent) !important; }
    .border-\\[\\#E63B2E\\]\\/20 { border-color: color-mix(in srgb, var(--accent) 20%, transparent) !important; }
    .border-\\[\\#E63B2E\\]\\/50 { border-color: color-mix(in srgb, var(--accent) 50%, transparent) !important; }
    .selection\\:bg-\\[\\#E63B2E\\]::selection,
    .selection\\:bg-\\[\\#E63B2E\\] ::selection { background-color: var(--accent) !important; }
    .hover\\:text-\\[\\#E63B2E\\]:hover { color: var(--accent) !important; }
    .hover\\:border-\\[\\#E63B2E\\]\\/30:hover { border-color: color-mix(in srgb, var(--accent) 30%, transparent) !important; }
    .hover\\:border-\\[\\#E63B2E\\]\\/50:hover { border-color: color-mix(in srgb, var(--accent) 50%, transparent) !important; }
    .border-\\[\\#E63B2E\\]\\/30 { border-color: color-mix(in srgb, var(--accent) 30%, transparent) !important; }
    .group:hover .group-hover\\:text-\\[\\#E63B2E\\]\\/20 { color: color-mix(in srgb, var(--accent) 20%, transparent) !important; }
    .group:hover .group-hover\\:bg-\\[\\#E63B2E\\]\\/20 { background-color: color-mix(in srgb, var(--accent) 20%, transparent) !important; }
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
