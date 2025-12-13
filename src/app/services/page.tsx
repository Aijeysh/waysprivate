/**
 * Dedicated Services Page
 * 
 * Purpose: Comprehensive page showcasing all production services offered
 * by Ways Private Limited with detailed descriptions and SEO optimization.
 * 
 * Features:
 * - Individual service sections with detailed information
 * - SEO-optimized metadata
 * - Schema.org structured data
 * - Cinematic design matching homepage
 * - Call-to-action sections
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Film, Music, Video, FileText, Clapperboard, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * SEO Metadata for Services Page
 */
export const metadata: Metadata = {
    title: "Our Services | Film Production Services Nepal | Ways Pvt Ltd",
    description:
        "Explore our comprehensive film production services including feature films, theatre productions, and post-production services in Nepal.",
    keywords: "Film Production Services Nepal, Movie Production Nepal, Music Video Production, Documentary Filmmaking, Post Production Services Nepal, Theatre Production",

    metadataBase: new URL("https://www.waysprivate.com.np"),

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

    openGraph: {
        title: "Film Production Services Nepal | Ways Private Limited",
        description:
            "Complete film production services from concept to completion. Feature films, music videos, documentaries, and more.",
        url: "https://www.waysprivate.com.np/services",
        siteName: "Ways Private Limited",
        images: [
            {
                url: "/Ways-Private-Limited-Logo.jpeg",
                width: 1200,
                height: 630,
                alt: "Ways Private Limited - Film Production Services"
            }
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Film Production Services Nepal | Ways Private Limited",
        description:
            "Complete film production services from concept to completion.",
        images: ["/Ways-Private-Limited-Logo.jpeg"],
        creator: "@waysprivate",
    },
};

/**
 * Services JSON-LD Structured Data
 */
const servicesJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.waysprivate.com.np/services#webpage",
            "url": "https://www.waysprivate.com.np/services",
            "name": "Our Services | Film Production Services Nepal | Ways Pvt Ltd",
            "description": "Explore our comprehensive film production services including feature films, music videos, brand content, documentaries, theatre productions, and post-production services.",
            "inLanguage": "en",
            "isPartOf": { "@id": "https://www.waysprivate.com.np/#website" },
            "about": { "@id": "https://www.waysprivate.com.np/#organization" },
        },
        {
            "@type": "BreadcrumbList",
            "@id": "https://www.waysprivate.com.np/services#breadcrumb",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.waysprivate.com.np"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Services",
                    "item": "https://www.waysprivate.com.np/services"
                }
            ]
        }
    ]
};

interface ServiceDetail {
    id: string;
    title: string;
    description: string;
    icon: React.ReactElement;
    gradient: string;
    features: string[];
    fullDescription: string;
}

const services: ServiceDetail[] = [
    {
        id: "feature-films",
        title: "Feature Films",
        description: "Full-scale movie production from script to screen with cinematic excellence",
        icon: <Film className="w-8 h-8" />,
        gradient: "from-blue-500 to-purple-500",
        fullDescription: "From concept development to final distribution, we handle every aspect of feature film production. Our experienced team brings stories to life with professional cinematography, direction, and post-production expertise.",
        features: [
            "Script development and screenplay consultation",
            "Professional casting and talent management",
            "Location scouting and production design",
            "Cinematography with high-end equipment",
            "Full post-production and color grading",
            "Distribution and marketing support"
        ]
    },
    {
        id: "music-videos",
        title: "Music Videos",
        description: "Creative music video production that captures the soul of your sound",
        icon: <Music className="w-8 h-8" />,
        gradient: "from-purple-500 to-pink-500",
        fullDescription: "Transform your music into stunning visual experiences. We create music videos that resonate with audiences and enhance your artistic vision through creative storytelling and cutting-edge production techniques.",
        features: [
            "Concept development and storyboarding",
            "Creative direction and choreography",
            "Professional lighting and camera work",
            "Dynamic editing and visual effects",
            "Color correction and grading",
            "YouTube and social media optimization"
        ]
    },
    {
        id: "brand-content",
        title: "Brand Content & Commercials",
        description: "Compelling brand videos and commercials that tell your story",
        icon: <Video className="w-8 h-8" />,
        gradient: "from-pink-500 to-red-500",
        fullDescription: "Elevate your brand with professionally crafted video content. From corporate videos to TV commercials, we create compelling narratives that connect with your target audience and drive results.",
        features: [
            "Brand story development",
            "Corporate video production",
            "TV and digital commercials",
            "Product showcase videos",
            "Testimonial and case study videos",
            "Social media content creation"
        ]
    },
    {
        id: "theatre-productions",
        title: "Theatre Productions",
        description: "Theatrical masterpieces from concept to stage performance",
        icon: <Clapperboard className="w-8 h-8" />,
        gradient: "from-amber-500 to-orange-500",
        fullDescription: "Bring your theatrical vision to life with our comprehensive theatre production services. We handle everything from script adaptation to live performance, ensuring memorable experiences for your audience.",
        features: [
            "Script writing and adaptation",
            "Stage design and set construction",
            "Lighting and sound design",
            "Actor direction and rehearsals",
            "Costume and makeup design",
            "Live performance management"
        ]
    },
    {
        id: "documentaries",
        title: "Documentaries",
        description: "Authentic storytelling capturing real-life narratives with impact",
        icon: <FileText className="w-8 h-8" />,
        gradient: "from-green-500 to-teal-500",
        fullDescription: "Tell powerful true stories that matter. Our documentary production services help you capture authentic moments, conduct compelling interviews, and craft narratives that educate, inspire, and create social impact.",
        features: [
            "Research and story development",
            "Interview setup and facilitation",
            "Observational and vérité filming",
            "Archival footage integration",
            "Narrative structuring and editing",
            "Film festival submission support"
        ]
    },
    {
        id: "post-production",
        title: "Post Production",
        description: "Expert editing, VFX, sound design, and color grading services",
        icon: <Sparkles className="w-8 h-8" />,
        gradient: "from-cyan-500 to-blue-500",
        fullDescription: "Perfect your project in post-production. Our state-of-the-art facilities and skilled editors provide comprehensive post-production services including editing, visual effects, sound design, and color grading.",
        features: [
            "Professional video editing",
            "Visual effects (VFX) and CGI",
            "Sound design and mixing",
            "Color correction and grading",
            "Motion graphics and animation",
            "Final mastering and delivery"
        ]
    },
];

/**
 * Services Page Component
 */
export default function ServicesPage() {
    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
            />

            <div className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#13131A] to-[#0A0A0F]">

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 md:px-16 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

                    <div className="relative max-w-7xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20">
                            Our Services
                        </span>

                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                            <span className="block text-white mb-2">Complete Production</span>
                            <span className="block text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Services
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                            From concept to completion, we provide comprehensive film production services
                            that bring your creative vision to life with professional excellence.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="pb-20 px-6 md:px-16">
                    <div className="max-w-7xl mx-auto space-y-24">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Service Content */}
                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                                        <div className="text-white">
                                            {service.icon}
                                        </div>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                        {service.title}
                                    </h2>

                                    <p className="text-lg text-slate-300 mb-6">
                                        {service.fullDescription}
                                    </p>

                                    <div className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Service Visual */}
                                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                    <div className={`relative glass p-12 rounded-3xl bg-gradient-to-br ${service.gradient} bg-opacity-10`}>
                                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-10 blur-2xl`} />
                                        <div className="relative flex items-center justify-center h-64">
                                            <div className={`text-white/20`} style={{ transform: 'scale(3)' }}>
                                                {service.icon}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-24 px-6 md:px-16 overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20" />

                    <div className="relative max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Ready to Start Your Project?
                        </h2>

                        <p className="text-xl text-slate-300 mb-10">
                            {`Let's`} bring your vision to life. Contact us today to discuss your production needs
                            and get a customized quote for your project.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/contact"
                                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>

                            <Link
                                href="/about"
                                className="px-10 py-4 border-2 border-blue-400 text-blue-400 text-lg font-semibold rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300"
                            >
                                Learn More About Us
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-24 px-6 md:px-16 bg-[#13131A]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Our <span className="text-gradient-accent">Production Process</span>
                            </h2>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                A proven workflow that ensures quality results from start to finish
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { step: "01", title: "Consultation", desc: "Understanding your vision and requirements" },
                                { step: "02", title: "Pre-Production", desc: "Planning, scripting, and preparation" },
                                { step: "03", title: "Production", desc: "Professional filming and recording" },
                                { step: "04", title: "Post-Production", desc: "Editing, effects, and final delivery" },
                            ].map((phase, index) => (
                                <div key={index} className="relative glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                                    <div className="text-6xl font-bold text-blue-400/20 mb-4 group-hover:text-blue-400/30 transition-colors">
                                        {phase.step}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                                    <p className="text-slate-400">{phase.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}
