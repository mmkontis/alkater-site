import { ImageResponse } from "next/og";
import { FOUNDING_YEAR, yearsActive } from "@/lib/about-data";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const BRAND = {
  bg: "#111111",
  surface: "#1a1a1a",
  accent: "#E63B2E",
  accentSoft: "rgba(230, 59, 46, 0.18)",
  text: "#F5F3EE",
  muted: "rgba(245, 243, 238, 0.62)",
  border: "rgba(245, 243, 238, 0.10)",
};

type RenderOptions = {
  /** Top eyebrow string (e.g. "ARTICLE", "ALKATER · CONSTRUCTION") */
  eyebrow: string;
  /** Big headline (kept under ~80 chars for legibility) */
  title: string;
  /** Optional accent — when present, rendered in brand red on its own line */
  accent?: string;
  /** Sub-headline / excerpt */
  subtitle?: string;
  /** Optional call-out chips on the bottom right */
  badges?: string[];
  /** Locale — drives the footer language */
  locale?: string;
};

/**
 * Returns an ImageResponse with a brand-styled OG card.
 *
 * Uses Edge runtime defaults — no custom font loading, so we rely on
 * Next.js' built-in fonts (Inter-like) which renders sharp at 1200×630.
 */
export function renderBrandOg(opts: RenderOptions): ImageResponse {
  const { eyebrow, title, accent, subtitle, badges, locale = "el" } = opts;
  const isEn = locale === "en";
  const since = FOUNDING_YEAR;
  const yrs = yearsActive();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BRAND.bg,
          color: BRAND.text,
          padding: "72px 80px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: `radial-gradient(circle at center, ${BRAND.accentSoft}, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -160,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at center, rgba(27,107,158,0.20), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245,243,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,238,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 44,
              height: 4,
              backgroundColor: BRAND.accent,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: BRAND.accent,
              fontWeight: 700,
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 40,
            zIndex: 1,
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -2,
              textTransform: "uppercase",
              maxWidth: 1040,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>{title}</span>
            {accent ? (
              <span style={{ display: "flex", color: BRAND.accent }}>{accent}</span>
            ) : null}
          </div>

          {subtitle ? (
            <div
              style={{
                marginTop: 28,
                fontSize: 28,
                lineHeight: 1.35,
                color: BRAND.muted,
                maxWidth: 940,
                display: "flex",
              }}
            >
              {clip(subtitle, 180)}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1,
            borderTop: `1px solid ${BRAND.border}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: -1,
              }}
            >
              <span style={{ color: BRAND.text, display: "flex" }}>ALKATER</span>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 9999,
                  backgroundColor: BRAND.accent,
                  display: "flex",
                }}
              />
              <span style={{ color: BRAND.accent, display: "flex" }}>
                {isEn ? "CONSTRUCTION" : "ΚΑΤΑΣΚΕΥΑΣΤΙΚΗ"}
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                color: BRAND.muted,
                letterSpacing: 1,
                textTransform: "uppercase",
                display: "flex",
                gap: 12,
              }}
            >
              <span style={{ display: "flex" }}>
                {isEn ? `Since ${since}` : `Από το ${since}`}
              </span>
              <span style={{ display: "flex", opacity: 0.4 }}>·</span>
              <span style={{ display: "flex" }}>
                {isEn
                  ? `${yrs}+ years · Igoumenitsa, GR`
                  : `${yrs}+ χρόνια · Ηγουμενίτσα`}
              </span>
            </div>
          </div>

          {badges && badges.length > 0 ? (
            <div style={{ display: "flex", gap: 10 }}>
              {badges.slice(0, 3).map((b) => (
                <div
                  key={b}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 9999,
                    border: `1px solid ${BRAND.border}`,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    fontSize: 18,
                    color: BRAND.text,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    display: "flex",
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { width: OG_SIZE.width, height: OG_SIZE.height }
  );
}

function clip(s: string, max: number): string {
  const trimmed = s.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max - 1).trimEnd() + "…";
}
