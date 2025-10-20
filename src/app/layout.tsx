// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nepali Movie Production | Ways Private Limited",
  description: "Ways Private Limited is a full-service Nepali movie production company creating films, music videos, and cinematic content for brands and artists worldwide.",
  keywords: ["Nepali movie", "movie production", "Nepal films", "music video production", "Ways Private Limited"],
  metadataBase: new URL("https://waysprivate.com.np"),
  openGraph: {
    title: "Nepali Movie Production | Ways Private Limited",
    description: "Full-service Nepali movie production company creating films, music videos, and cinematic content worldwide.",
    url: "https://waysprivate.com.np",
    siteName: "Ways Private Limited",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepali Movie Production | Ways Private Limited",
    description: "Creating films, music videos, and cinematic content for brands and artists worldwide.",
    images: ["/og-image.png"],
    creator: "@waysprivate",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
