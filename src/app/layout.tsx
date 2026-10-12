import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "ნიაბის მამული · Niabi's Manor",
  description: "Estate development in Georgia — vineyards, orchards, and countryside living",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <body className="min-h-screen antialiased">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}