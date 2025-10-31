// src/app/about/page.tsx
import Image from "next/image";
import TeamCard from "@/components/About/TeamCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ways Private Limited | Nepali Movie Makers",
  description:
    "Ways Private Limited is a full-service Nepali movie production company specializing in storytelling, music videos, and cinematic creations.",
  keywords: [
    "Ways Private Limited",
    "Nepali Movie Makers",
    "Movie Production Nepal",
    "Film Studio Nepal",
  ],
  metadataBase: new URL("https://waysprivate.com.np"),
  openGraph: {
    title: "About Ways Private Limited | Nepali Movie Makers",
    description:
      "Learn about Ways Private Limited, a Nepali movie production company creating films, music videos, and cinematic content for global audiences.",
    url: "https://waysprivate.com.np/about",
    siteName: "Ways Private Limited",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ways Private Limited | Nepali Movie Makers",
    description:
      "Learn about Ways Private Limited, a Nepali movie production company creating films, music videos, and cinematic content.",
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


const team = [
  {
    name: "Aashant Sharma",
    role: "Founder & Creative Director",
    bio: "Aashant brings over 15 years of experience in theatre and film direction, scriptwriting, and lyrics creation. Directed 'Taraharu' and multiple acclaimed plays.",
    facebook: "https://www.facebook.com/aashant.sharma",
    linkedin: "https://www.linkedin.com/in/aashant-sharma-49096b104/",
    email: "wayskrisaashant@gmail.com",
    photo: "/Ways_Private_Limited_Logo.jpeg", // your current photo
  },
  {
    name: "Aijeysh Sharma",
    role: "Head of Marketing",
    bio: "Aijeysh leads marketing, outreach, and brand collaborations. Ensures our productions reach the right audience.",
    facebook: "https://www.facebook.com/SharmaAijeysh",
    linkedin: "https://www.linkedin.com/in/sharmaaijeysh/",
    email: "sharmaaijeysh@gmail.com",
    photo: "/kkk.jpg", // your current photo
  },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b0b0f] via-[#13131a] to-[#0b0b0f] text-slate-100 py-24 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            About Ways Private Limited
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-3xl mx-auto">
            Established in 2007, Ways Private Limited has been at the forefront of Nepal’s theatre and film industry. Our mission is to craft cinematic experiences and theatrical performances that resonate with audiences.
          </p>
        </div>

        {/* Company Story */}
        <div className="space-y-8">
          <div className="relative w-full h-80 md:h-[450px] rounded-xl shadow-xl overflow-hidden">
            <Image src="/Ways_Private_Limited_Logo.jpeg" alt="Ways Private Limited" fill className="object-cover" />
          </div>
          <h2 className="text-3xl font-semibold text-white">Our Journey</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            We have produced acclaimed theatre plays such as <strong>Daraudi ko Paani</strong>, <strong>Dhalkeko Saalaijo</strong>, <strong>Bullet and the Buddha</strong>, <strong>Katha Express</strong>, and <strong>Lig Picnic</strong>. Recently, we released our own film <strong>Taraharu</strong>.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
            Our productions span theatre, movie, music videos, brand videos, and advertising content. While primarily operating in Kathmandu, we serve clients throughout Nepal.
          </p>
        </div>

        {/* Team Section */}
        <div className="space-y-12">
          <h2 className="text-3xl font-semibold text-white text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
