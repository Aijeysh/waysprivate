import Hero from "@/components/Hero/page";
import LatestBlogs from "@/components/LatestBlogs/page";
import Portfolio from "@/components/Portfolio/page";
import Services from "@/components/Services/page";
import Statistics from "@/components/Statistics/page";
import Testimonials from "@/components/Testimonials/page";
import WorkWithUs from "@/components/WorkWithUs/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nepali Movie Production | Ways Private Limited",
  description:
    "Ways Private Limited is Nepal’s leading movie production company creating Nepali movies, music videos, and cinematic content for global audiences.",
  keywords: [
    "Nepali Movie",
    "New Nepali Movie",
    "Movie Making Nepal",
    "Ways",
    "Ways Private",
    "Ways Private Limited",
  ],
  metadataBase: new URL("https://waysprivate.com.np"),
  openGraph: {
    title: "Nepali Movie Production | Ways Private Limited",
    description:
      "Full-service Nepali movie production company creating films, music videos, and cinematic content worldwide.",
    url: "https://waysprivate.com.np",
    siteName: "Ways Private Limited",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepali Movie Production | Ways Private Limited",
    description:
      "Creating films, music videos, and cinematic content for brands and artists worldwide.",
    images: ["/og-image.png"],
    creator: "@waysprivate",
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
};

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />
      <Portfolio />
      <Services />
      <Statistics />
      <LatestBlogs />
      <Testimonials />
      <WorkWithUs />
    </div>
  );
}
