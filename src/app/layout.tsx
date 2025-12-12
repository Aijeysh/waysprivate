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
   // Canonical URL
  alternates: {
    canonical: "https://www.waysprivate.com.np",
  },
  
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
 * Site-Wide JSON-LD Structured Data
 * 
 * Provides search engines with site-wide information about
 * Ways Private Limited. Page-specific schemas (WebPage, BreadcrumbList)
 * are added in individual page.tsx files.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization Schema - Site-wide company information
    {
      "@type": "Organization",
      "@id": "https://www.waysprivate.com.np/#organization",
      "name": "Ways Private Limited",
      "alternateName": "Ways",
      "url": "https://www.waysprivate.com.np",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.waysprivate.com.np/Ways_Private_Limited_Logo.jpeg"
      },
      "description": "Full-service Nepali movie production company creating films, music videos, brand commercials, documentaries, theatre shows, and cinematic content.",
      "foundingDate": "2007",
      "sameAs": [
        "https://www.facebook.com/waysprivate",
        "https://www.instagram.com/waysprivate"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+977-9803008298",
        "contactType": "Customer Service",
        "email": "waysprivateltd@gmail.com",
        "areaServed": "NP",
        "availableLanguage": ["en", "ne"]
      }
    },

    // LocalBusiness Schema - Physical location and contact info
    {
      "@type": "LocalBusiness",
      "@id": "https://www.waysprivate.com.np/#localbusiness",
      "name": "Ways Private Limited",
      "image": "https://www.waysprivate.com.np/Ways_Private_Limited_Logo.jpeg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kathmandu",
        "addressLocality": "Kathmandu",
        "addressRegion": "Bagmati",
        "addressCountry": "NP"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 27.7172,
        "longitude": 85.3240
      },
      "telephone": "+977-9803008298",
      "email": "waysprivateltd@gmail.com",
      "priceRange": "$$",
      "openingHours": "Mo-Su",
      "url": "https://www.waysprivate.com.np"
    },

    // WebSite Schema - Site-wide search functionality
    {
      "@type": "WebSite",
      "@id": "https://www.waysprivate.com.np/#website",
      "url": "https://www.waysprivate.com.np",
      "name": "Ways Private Limited",
      "publisher": { "@id": "https://www.waysprivate.com.np/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.waysprivate.com.np/?s={search_term}",
        "query-input": "required name=search_term"
      }
    },

    // Service Catalog Schema - All services offered
    {
      "@type": "Service",
      "@id": "https://www.waysprivate.com.np/#services",
      "serviceType": "Film & Video Production Services",
      "provider": { "@id": "https://www.waysprivate.com.np/#localbusiness" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Production Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Feature Film Production",
              "description": "End-to-end Nepali movie & feature film production from script to screen."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Music Video Production",
              "description": "Cinematic music video production for artists and labels."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Brand Videos & Commercials",
              "description": "High-end brand commercials and promotional videos for businesses."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Documentary Production",
              "description": "Impactful documentary filmmaking across Nepal."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Post-Production Studio",
              "description": "Editing, color grading, sound design, VFX & motion graphics."
            }
          }
        ]
      }
    },

    // FAQ Schema - Site-wide frequently asked questions
    {
      "@type": "FAQPage",
      "@id": "https://www.waysprivate.com.np/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Ways Private Limited offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer feature film production, music videos, brand commercials, documentaries, theatre productions and full post-production services."
          }
        },
        {
          "@type": "Question",
          "name": "Do you produce Nepali movies and feature films?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we specialise in producing Nepali feature films with complete production workflow."
          }
        },
        {
          "@type": "Question",
          "name": "Can brands hire you for commercial videos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We create high-quality commercials, corporate films & promotional videos."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer post-production services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We offer editing, color grading, VFX, motion graphics, and sound design."
          }
        },
        {
          "@type": "Question",
          "name": "Where are you located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are located in Kathmandu and operate all across Nepal including Pokhara, Lalitpur, Mustang, Bhaktapur and Chitwan."
          }
        }
      ]
    }
  ]
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Site-Wide JSON-LD Structured Data */}
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