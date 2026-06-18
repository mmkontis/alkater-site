// The root layout (src/app/layout.tsx) provides <html>/<body>; this layout
// just scopes the admin section.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
