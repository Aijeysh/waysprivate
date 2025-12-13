/**
 * Homepage Component
 * 
 * Purpose: Main landing page for Ways Private Limited website showcasing 
 * company services, portfolio, testimonials, and call-to-action sections.
 * 
 * Sections:
 * - Hero: Main headline with animated visuals and primary CTA
 * - Portfolio: Showcase of recent movies and projects
 * - Services: Overview of production services offered
 * - LatestBlogs: Recent blog posts and updates
 * - Testimonials: Client reviews and feedback
 * - WorkWithUs: Contact and collaboration CTA
 * 
 * SEO: Optimized for "Nepali Film Production" and related keywords
 */

import Hero from "@/components/Hero/page";
import LatestBlogs from "@/components/LatestBlogs/page";
import Portfolio from "@/components/Portfolio/page";
import Services from "@/components/Services/page";
import Testimonials from "@/components/Testimonials/page";
import WorkWithUs from "@/components/WorkWithUs/page";
import type { Metadata } from "next";

/**
 * SEO Metadata Configuration
 * 
 * Includes:
 * - Primary title and description for search engines
 * - Keywords targeting Nepali movie production industry
 * - Open Graph tags for social media sharing (Facebook, LinkedIn)
 * - Twitter Card configuration for Twitter sharing
 * - Canonical URL for SEO
 * - Robots meta for search engine crawling
 */
export const metadata: Metadata = {
  // Primary SEO meta tags
  title: "Film Production Company | Nepali Movies | Ways Pvt Ltd",
  description:
    "Ways Private Limited is Nepal's leading film production company specializing in cinematic storytelling for global audiences.",

  // Keywords for search engine optimization
  keywords: "Film Production Company Nepal, Nepali Movie Production, Movie Company Nepal, Nepali Film Production, Video Production Nepal, Ways Private Limited",

  // Base URL for all relative paths
  metadataBase: new URL("https://www.waysprivate.com.np"),

  // Robots meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph metadata for social media sharing
  openGraph: {
    title: "Nepali Movie Production | Ways Private Limited",
    description:
      "Full-service Nepali movie production company creating films, music videos, and cinematic content worldwide.",
    url: "https://www.waysprivate.com.np",
    siteName: "Ways Private Limited",
    images: [
      {
        url: "/Ways-Private-Limited-Logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Ways Private Limited - Nepali Movie Production Company"
      }
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Nepali Movie Production | Ways Private Limited",
    description:
      "Creating films, music videos, and cinematic content for brands and artists worldwide.",
    images: ["/Ways-Private-Limited-Logo.jpeg"],
    creator: "@waysprivate",
  },
};

/**
 * Homepage-Specific JSON-LD Structured Data
 * 
 * This complements the site-wide JSON-LD in layout.tsx by providing
 * page-specific information for the homepage. This includes:
 * - Specific WebPage schema for the homepage
 * - Homepage breadcrumb navigation
 * 
 * The site-wide schemas (Organization, LocalBusiness, WebSite, Service, FAQPage)
 * are defined in layout.tsx and apply to all pages.
 */
const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Homepage-Specific WebPage Schema
    {
      "@type": "WebPage",
      "@id": "https://www.waysprivate.com.np/#homepage",
      "url": "https://www.waysprivate.com.np",
      "name": "Film Production Company | Nepali Movies | Ways Pvt Ltd",
      "description": "Ways Private Limited is Nepal's leading film production company specializing in Nepali movie production, music videos, brand films, documentaries, and cinematic storytelling for global audiences.",
      "inLanguage": "en",
      "isPartOf": { "@id": "https://www.waysprivate.com.np/#website" },
      "about": { "@id": "https://www.waysprivate.com.np/#organization" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.waysprivate.com.np/Ways-Private-Limited-Logo.jpeg",
        "width": 1200,
        "height": 630
      }
    },

    // Homepage Breadcrumb
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.waysprivate.com.np/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.waysprivate.com.np"
        }
      ]
    }
  ]
};

/**
 * Home Component
 * 
 * Renders the complete homepage with all sections in order.
 * Each section is a separate component for better code organization
 * and maintainability.
 * 
 * @returns {JSX.Element} Complete homepage layout
 */
export default function Home() {
  return (
    <>
      {/* Homepage-Specific JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />

      <div className="flex flex-col overflow-hidden">
        {/* Hero section with main headline and CTA */}
        <Hero />

        {/* Portfolio showcase of recent projects */}
        <Portfolio />

        {/* Services offered by the company */}
        <Services />

        {/* Latest blog posts and updates */}
        <LatestBlogs />

        {/* Client testimonials and reviews */}
        <Testimonials />

        {/* Final CTA section for collaboration */}
        <WorkWithUs />
      </div>
    </>
  );
}