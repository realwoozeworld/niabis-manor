import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import SearchButton from "@/components/SearchButton";
import SocialButtons from "@/components/SocialButtons";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://niabiestate.ge"),
  title: {
    default: "ნიაბის მამული · Niabi's Manor",
    template: "%s · ნიაბის მამული",
  },
  description:
    "უნიკალური საცხოვრებელი და აგრო-ტურისტული კომპლექსი საქართველოში — ვენახები, ქვის არქიტექტურა და ეკოლოგიური მეურნეობა.",
  keywords: [
    "ნიაბის მამული",
    "ნიაბი",
    "მიწის ნაკვეთები ნიაბში",
    "მიწა კასპში",
    "სააგარაკე ნაკვეთები",
    "Niabi's Manor",
    "Niabi Estate",
    "land for sale Georgia",
  ],
  icons: {
    icon: "/images/icon.png", // ან "/images/favicon.png"
    apple: "/images/icon.png", // iPhone-ზე Home Screen-ზე დამატებისას
  },
    openGraph: {
    title: "ნიაბის მამული · Niabi's Manor",
    description: "საცხოვრებელი და აგრო-ტურისტული კომპლექსი საქართველოში",
    url: "https://niabiestate.ge",
    siteName: "Niabi's Manor",
    images: ["/images/overview.jpg"],
    locale: "ka_GE",
    type: "website",
  },
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}