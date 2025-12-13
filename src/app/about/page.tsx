/**
 * About Page - Cinematic Design
 * 
 * Purpose: Tell the story of Ways Private Limited with compelling
 * content and premium visual design.
 * 
 * Sections:
 * - Hero: Dramatic opening with company mission
 * - Stats: Key achievements and metrics
 * - Story: Company journey and productions
 * - Values: What drives us
 * - Team: Meet the creative minds
 * 
 * Route: /about
 */

import Image from "next/image";
import TeamCard from "@/components/About/TeamCard";
import { Metadata } from "next";
import { Film, Award, Users, Sparkles } from "lucide-react";

/**
 * About Page SEO Metadata
 */
export const metadata: Metadata = {
  title: "About Us | Ways Private Limited - Nepal's Premier Production Company",
  description:
    "Discover the story of Ways Private Limited - Since 2007, crafting cinematic masterpieces, theatrical productions, and compelling brand stories in Nepal.",
  keywords: [
    "Ways Private Limited",
    "Nepal Movie Production",
    "Film Studio Nepal",
    "Theatre Production Nepal",
    "Nepali Filmmakers",
  ],
  metadataBase: new URL("https://www.waysprivate.com.np"),
  openGraph: {
    title: "About Ways Private Limited - Nepal's Premier Production Company",
    description:
      "Since 2007, Ways Private Limited has been crafting cinematic experiences that move audiences. Learn about our journey, values, and team.",
    url: "https://www.waysprivate.com.np/about",
    siteName: "Ways Private Limited",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ways Private Limited",
    description:
      "Discover Nepal's premier production company - crafting cinematic masterpieces since 2007.",
    images: ["/og-image.png"],
    creator: "@waysprivate",
  },
};

/**
 * Team Member Data
 * 
 * ✏️ EDIT THIS ARRAY to add/remove/modify team members
 */
const team = [
  {
    name: "Aashant Sharma",
    role: "Founder & Creative Director",
    bio: "With 17+ years of mastery in theatre and film direction, Aashant transforms stories into unforgettable cinematic experiences. Director of the feature film 'Taraharu' and numerous acclaimed theatrical productions, he brings visionary leadership to every project.",
    facebook: "https://www.facebook.com/aashant.sharma",
    linkedin: "https://www.linkedin.com/in/aashant-sharma-49096b104/",
    email: "wayskrisaashant@gmail.com",
    photo: "/Aashant-Sharma.jpg",
  },
  {
    name: "Aijeysh Sharma",
    role: "Website Manager & Digital Marketing",
    bio: "Bridging creativity with technology, Aijeysh ensures our productions reach global audiences through strategic digital marketing and innovative brand storytelling. His expertise connects compelling content with the right viewers.",
    facebook: "https://www.facebook.com/SharmaAijeysh",
    linkedin: "https://www.linkedin.com/in/sharmaaijeysh/",
    email: "sharmaaijeysh@gmail.com",
    photo: "/Aijeysh-Sharma.png",
  },
];

/**
 * About Page Component
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#13131A] to-[#0A0A0F]">

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 gradient-animate" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-16 text-center py-24">
          <span className="inline-block px-5 py-2 mb-6 text-sm font-semibold text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20">
            Since 2007
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Crafting Stories That
            <br />
            <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent gradient-animate">
              Move Audiences
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {`Ways Private Limited stands as Nepal's beacon of cinematic excellence—where passion meets craft, and visions transform into unforgettable experiences.`}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Film, label: "Years of Excellence", value: "17+" },
              { icon: Award, label: "Productions Delivered", value: "50+" },
              { icon: Users, label: "Happy Clients", value: "40+" },
              { icon: Sparkles, label: "Creative Projects", value: "100+" },
            ].map((stat, index) => (
              <div key={index} className="text-center glass p-8 rounded-2xl hover-lift">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/Taraharu.jpeg"
                alt="Ways Private Limited Productions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-amber-400 bg-amber-400/10 rounded-full border border-amber-400/20">
                Our Journey
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                From Theatre Stages to
                <span className="text-gradient-accent"> Cinema Screens</span>
              </h2>

              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>
                  Founded in <strong className="text-white">2007</strong>, Ways Private Limited emerged from a passion for storytelling that transcends boundaries. What began as a theatrical endeavor has evolved into {`Nepal's`} premier production powerhouse.
                </p>

                <p>
                  Our portfolio spans <strong className="text-white">acclaimed theatre productions</strong> including <em>Daraudi ko Paani</em>, <em>Dhalkeko Saalaijo</em>, <em>Bullet and the Buddha</em>, <em>Katha Express</em>, and <em>Lig Picnic</em>. {`We've`} proudly transitioned to cinema with our feature film <strong className="text-white">{`Taraharu`}</strong>.
                </p>

                <p>
                  Today, we specialize in <strong className="text-white">feature films, music videos, brand content, documentaries,</strong> and <strong className="text-white">post-production services</strong>—serving clients across Nepal and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-green-400 bg-green-400/10 rounded-full border border-green-400/20">
              Why Choose Us
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Sets Us <span className="text-gradient">Apart</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "🎬 End-to-End Production",
                description: "From initial concept to final delivery, we handle every aspect of production with meticulous care and creative excellence.",
              },
              {
                title: "🎭 Theatre Heritage",
                description: "Our roots in theatrical storytelling bring depth, emotion, and powerful narrative techniques to every cinematic project.",
              },
              {
                title: "🌟 Award-Winning Quality",
                description: "Recognized for artistic excellence, our productions consistently exceed industry standards and audience expectations.",
              },
              {
                title: "🤝 Collaborative Approach",
                description: "We work as your creative partner, valuing your vision while bringing our expertise to elevate every aspect of the project.",
              },
            ].map((item, index) => (
              <div key={index} className="glass p-8 rounded-2xl hover-lift">
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="section-padding relative bg-gradient-to-b from-[#0A0A0F] to-[#13131A]">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">
              Our Process
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How We Work
            </h2>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A proven process that ensures creative excellence at every stage of production.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your vision, goals, and audience" },
              { step: "02", title: "Creative Development", desc: "Crafting scripts, storyboards, and production plans" },
              { step: "03", title: "Production", desc: "Professional filming with state-of-the-art equipment" },
              { step: "04", title: "Post-Production", desc: "Editing, VFX, sound design, and final delivery" },
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl font-bold shadow-lg glow">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                <p className="text-slate-400 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative bg-gradient-to-b from-[#13131A] to-[#0A0A0F]">
        <div className="max-w-6xl mx-auto px-6 md:px-16 text-center">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-purple-400 bg-purple-400/10 rounded-full border border-purple-400/20">
            What Drives Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Creative Excellence",
                description: "Every frame, every scene, every story crafted with meticulous attention to artistic detail and narrative power.",
              },
              {
                title: "Authentic Storytelling",
                description: "We believe in stories that resonate, inspire, and reflect the genuine human experience.",
              },
              {
                title: "Client Partnership",
                description: "Your vision is our mission. We collaborate closely to bring your dreams to cinematic reality.",
              },
            ].map((value, index) => (
              <div key={index} className="glass p-8 rounded-2xl hover-lift">
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-slate-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20">
              The Creative Minds
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our <span className="text-gradient">Team</span>
            </h2>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              The passionate professionals behind every production, committed to excellence in every frame.
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Decorative bottom gradient */}
      <div className="h-32 bg-gradient-to-t from-black to-transparent" />
    </main>
  );
}
