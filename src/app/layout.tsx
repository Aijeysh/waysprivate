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

export const metadata: Metadata = {
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

/**
 * JSON-LD Structured Data
 * 
 * Provides search engines with detailed information about
 * Ways Private Limited as an organization and local business.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Organization Schema
    {
      '@type': 'Organization',
      '@id': 'https://www.waysprivate.com.np/#organization',
      name: 'Ways Private Limited',
      alternateName: 'Ways',
      url: 'https://www.waysprivate.com.np',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.waysprivate.com.np/Ways_Private_Limited_Logo.jpeg',
      },
      description: 'Full-service Nepali movie production company creating films, music videos, and cinematic content for global audiences.',
      foundingDate: '2007',
      sameAs: [
        'https://www.facebook.com/waysprivate',
        'https://www.instagram.com/waysprivate',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+977-9803008298',
        contactType: 'Customer Service',
        email: 'waysprivateltd@gmail.com',
        areaServed: 'NP',
        availableLanguage: ['en', 'ne'],
      },
    },
    // LocalBusiness Schema
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.waysprivate.com.np/#localbusiness',
      name: 'Ways Private Limited',
      image: 'https://www.waysprivate.com.np/Ways_Private_Limited_Logo.jpeg',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 27.7172,
        longitude: 85.3240,
      },
      telephone: '+977-9803008298',
      email: 'waysprivateltd@gmail.com',
      priceRange: '$$',
      openingHours: 'Mo-Su',
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

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
