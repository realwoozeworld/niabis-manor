import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import SearchButton from "@/components/SearchButton";
import SocialButtons from "@/components/SocialButtons";

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
      <body className="min-h-screen antialiased">
        <LoadingScreen />
        <SearchButton />
        
        {children}

        {/* 📱 ეს ღილაკები ყველა გვერდზე გამოჩნდება მობილურზე */}
        <SocialButtons />
      </body>
    </html>
  );
}