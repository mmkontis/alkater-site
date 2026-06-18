import { Geist, Geist_Mono, Space_Grotesk, Space_Mono, DM_Serif_Display } from "next/font/google";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});

export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${dmSerifDisplay.variable}`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The root layout sits above the [locale] segment, so the locale isn't available
  // as a param here. proxy.ts stamps the resolved locale on a request header —
  // "x-app-locale" for already-prefixed routes (/en, /de), and next-intl's own
  // "x-next-intl-locale" for rewritten ones (the default locale at "/") — which we
  // read to put the correct lang on <html>.
  const requestHeaders = await headers();
  const headerLocale =
    requestHeaders.get("x-app-locale") ?? requestHeaders.get("x-next-intl-locale");
  const locale = routing.locales.includes(headerLocale as (typeof routing.locales)[number])
    ? (headerLocale as string)
    : routing.defaultLocale;

  return (
    <html lang={locale}>
      <body className={`${fontVariables} antialiased`}>{children}</body>
    </html>
  );
}
