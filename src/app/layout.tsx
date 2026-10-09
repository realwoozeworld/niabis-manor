import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ნიაბის მამული · Niabi's Manor",
  description: "Estate development in Georgia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}