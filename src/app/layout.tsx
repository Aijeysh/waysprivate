// src/app/layout.tsx
import type { ReactNode } from "react";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata : Metadata ={
 icons: {
  icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
    manifest: "/site.webmanifest",
  other: {
    "google-site-verification": "k-WGKR7IdxrNB3lqGwB0-NPVfNU2xuN5rjP3Qied7-E",
  },
} 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Global Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LS2EGD51NJ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LS2EGD51NJ', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
