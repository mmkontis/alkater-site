import { fontVariables } from "../layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <body className={`${fontVariables} antialiased`}>{children}</body>
    </html>
  );
}
