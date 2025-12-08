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
 * - Statistics: Company achievements and metrics
 * - LatestBlogs: Recent blog posts and updates
 * - Testimonials: Client reviews and feedback
 * - WorkWithUs: Contact and collaboration CTA
 * 
 * SEO: Optimized for "Nepali Movie Production" and related keywords
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
 * - Base URL for canonical links
 */
export const metadata: Metadata = {
  // Primary SEO meta tags
  title: "Nepali Movie Production | Ways Private Limited",
  description:
    "Ways Private Limited is Nepal's leading movie production company creating Nepali movies, music videos, and cinematic content for global audiences.",

  // Keywords for search engine optimization
  keywords: [
    "Nepali Movie",
    "New Nepali Movie",
    "Movie Making Nepal",
    "Ways",
    "Ways Private",
    "Ways Private Limited",
  ],

  // Base URL for all relative paths
  metadataBase: new URL("https://www.waysprivate.com.np"),

  // Open Graph metadata for social media sharing
  openGraph: {
    title: "Nepali Movie Production | Ways Private Limited",
    description:
      "Full-service Nepali movie production company creating films, music videos, and cinematic content worldwide.",
    url: "https://www.waysprivate.com.np",
    siteName: "Ways Private Limited",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Nepali Movie Production | Ways Private Limited",
    description:
      "Creating films, music videos, and cinematic content for brands and artists worldwide.",
    images: ["/og-image.png"],
    creator: "@waysprivate",
  },
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
  );
}
