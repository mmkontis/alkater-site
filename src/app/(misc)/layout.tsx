import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/el.json";

// The root layout (src/app/layout.tsx) provides <html>/<body>; this layout
// only sets up the Greek i18n context for the standalone (misc) pages.
export default function MiscLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale="el" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
