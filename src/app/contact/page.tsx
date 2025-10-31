// src/app/contact/page.tsx
import { Metadata } from "next";
import ContactForm from "./ContactForm";


export const metadata: Metadata = {
  title: "Contact Ways Private Limited | Nepali Movie Production",
  description:
    "Get in touch with Ways Private Limited, Nepal’s leading movie production company for films, music videos, and cinematic content.",
  keywords: [
    "Ways Private Limited",
    "Contact Ways",
    "Nepali Movie Production",
    "Film Production Nepal",
  ],
  metadataBase: new URL("https://waysprivate.com.np"),
  openGraph: {
    title: "Contact Ways Private Limited | Nepali Movie Production",
    description:
      "Contact Ways Private Limited, Nepal’s leading movie production company for films, music videos, and cinematic content.",
    url: "https://waysprivate.com.np/contact",
    siteName: "Ways Private Limited",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Ways Private Limited | Nepali Movie Production",
    description:
      "Reach out to Ways Private Limited for Nepali movie production, music videos, and cinematic content.",
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

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b0b0f] via-[#13131a] to-[#0b0b0f] text-slate-100 py-24 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Let’s Connect
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            Whether you’re a production company, foreign movie producer, artist,
            or creator — we’d love to hear from you. Share your vision, and let’s
            make something remarkable together.
          </p>
        </div>

        {/* Contact Details + Form */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                Contact Information
              </h2>
              <p className="text-slate-300 max-w-md">
                You can reach us anytime. Our team usually replies within 24
                hours.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-indigo-400">📍 Location</h3>
                <p className="text-slate-200">Kathmandu, Nepal</p>
              </div>
              <div>
                <h3 className="font-medium text-indigo-400">📞 Phone</h3>
                <a
                  href="tel:+9779803008298"
                  className="text-slate-100 hover:text-indigo-300 transition-colors"
                >
                  +977 9803008298
                </a>
              </div>
              <div>
                <h3 className="font-medium text-indigo-400">✉️ Email</h3>
                <a
                  href="mailto:waysprivateltd@gmail.com"
                  className="text-slate-100 hover:text-indigo-300 transition-colors"
                >
                  waysprivateltd@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <p className="text-slate-300 text-sm">
                Business Hours: <br />
                <span className="text-slate-100">
                  Sunday – Saturday: Anytime
                </span>
              </p>
            </div>
          </div>

          {/* Right - Validated Contact Form */}
          <ContactForm />
        </div>
      </div>

      {/* Decorative gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
