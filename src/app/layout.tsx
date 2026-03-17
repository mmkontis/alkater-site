import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Space_Mono, DM_Serif_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "ΑΛΚΑΤΕΡ | Τεχνική Εταιρεία - Οδοποιία, Ασφαλτοστρώσεις, Τεχνικά Έργα",
  description:
    "Η ΑΛΚΑΤΕΡ είναι μια σύγχρονη τεχνική εταιρεία εξειδικευμένη στην κατασκευή και συντήρηση οδικών δικτύων, ασφαλτοστρώσεις, διαγραμμίσεις και τεχνικά έργα υποδομών σε ολόκληρη την Ελλάδα.",
  keywords: [
    "τεχνική εταιρεία",
    "οδοποιία",
    "ασφαλτοστρώσεις",
    "τεχνικά έργα",
    "κατασκευές",
    "Ελλάδα",
    "ΑΛΚΑΤΕΡ",
    "alkater",
    "διαγραμμίσεις",
    "χωματουργικά",
    "υδραυλικά έργα",
  ],
  openGraph: {
    title: "ΑΛΚΑΤΕΡ | Τεχνική Εταιρεία",
    description: "Χτίζουμε Υποδομές που Αντέχουν στον Χρόνο. Οδοποιία, ασφαλτοστρώσεις, τεχνικά έργα.",
    type: "website",
    locale: "el_GR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${dmSerifDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
