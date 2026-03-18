import { NextIntlClientProvider } from "next-intl";
import { fontVariables } from "../layout";
import messages from "../../../messages/el.json";

export default function MiscLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <body className={`${fontVariables} antialiased`}>
        <NextIntlClientProvider locale="el" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
