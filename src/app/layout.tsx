import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import WeatherWidget from "@/components/WeatherWidget";

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

        {/* Weather — fixed top-center, on every page */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[80] pointer-events-auto">
          <WeatherWidget />
        </div>

        {children}
      </body>
    </html>
  );
}