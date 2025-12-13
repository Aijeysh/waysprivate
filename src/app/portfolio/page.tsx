/**
 * Portfolio Page
 * 
 * Purpose: Main portfolio page displaying all projects in a responsive grid
 * with hover effects and filtering capabilities.
 * 
 * Features:
 * - Responsive grid layout (1→2→3 columns)
 * - Hover effects revealing full project details
 * - SEO optimized with metadata and structured data
 * - Scales well with many projects
 * - Links to individual project detail pages
 * 
 * Route: /portfolio
 */

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/data/projects";
import { Film, Theater, ArrowRight } from "lucide-react";

// SEO Metadata
export const metadata: Metadata = {
    title: "Portfolio | Film & Theatre Productions | Ways Private Limited",
    description: "Explore our portfolio of award-winning Nepali films and theatre productions. From feature films like Taraharu to theatrical masterpieces like Kaancho Dhaago, discover our work in cinematic storytelling.",
    keywords: "Nepali movie portfolio, film production portfolio Nepal, theatre productions Nepal, Ways Private Limited projects, Nepali cinema, Nepal theatre shows",
    openGraph: {
        title: "Portfolio | Ways Private Limited",
        description: "Award-winning Nepali films and theatre productions showcasing cinematic excellence",
        url: "https://www.waysprivate.com.np/portfolio",
        siteName: "Ways Private Limited",
        images: [
            {
                url: "/Taraharu.jpeg",
                width: 1200,
                height: 630,
                alt: "Ways Private Limited Portfolio"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Portfolio | Ways Private Limited",
        description: "Award-winning Nepali films and theatre productions",
        images: ["/Taraharu.jpeg"],
    },
};

/**
 * Portfolio Page Component
 */
export default function PortfolioPage() {
    const projects = getAllProjects();

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#13131A] to-[#0A0A0F] text-white">

            {/* Background decorative elements */}
            <div className="fixed top-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="fixed bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-16">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20">
                        Our Portfolio
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Our <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">Creative Work</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        From groundbreaking feature films to captivating theatrical performances, explore our portfolio of productions that have touched hearts and inspired minds across Nepal and beyond.
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="relative px-6 md:px-16 pb-32">
                <div className="max-w-7xl mx-auto">

                    {/* Grid Container - Responsive and Scalable */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/portfolio/${project.slug}`}
                                className="group relative flex flex-col bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
                            >
                                {/* Project Image */}
                                <div className="relative h-72 overflow-hidden flex-shrink-0">
                                    <Image
                                        src={project.coverImage}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />

                                    {/* Gradient Overlay - Darkens on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-blue-500/80 backdrop-blur-sm rounded-full border border-blue-400/30">
                                            {project.category === "Feature Film" ? (
                                                <Film className="w-3 h-3" />
                                            ) : (
                                                <Theater className="w-3 h-3" />
                                            )}
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Quick Info - Always Visible */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-300 text-sm mb-2 line-clamp-2">
                                            {project.tagline}
                                        </p>
                                        {project.year && (
                                            <p className="text-slate-400 text-sm">
                                                {project.year}
                                                {project.duration && ` • ${project.duration}`}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Card Content Area - Flex-grow to fill remaining space */}
                                <div className="p-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm flex-grow flex flex-col">
                                    {/* Short Description - Always Visible */}
                                    <p className="text-slate-300 text-sm leading-relaxed mb-4 min-h-[3rem]">
                                        {project.shortDescription}
                                    </p>

                                    {/* Full Description - Appears on Hover with Fixed Height */}
                                    <div className="h-0 opacity-0 group-hover:h-28 group-hover:opacity-100 overflow-hidden transition-all duration-500 mb-2">
                                        <div className="border-t border-slate-700/50 pt-4 h-full ">
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                {project.fullDescription}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Learn More Button - Pushed to bottom */}
                                    <div className="flex items-center gap-2 text-blue-400 font-medium transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 mt-auto">
                                        <span className="text-sm">Learn More</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>

                    {/* Empty State Message (if no projects) */}
                    {projects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">No projects available at the moment.</p>
                        </div>
                    )}

                </div>
            </section>

            {/* CTA Section */}
            <section className="relative px-6 md:px-16 pb-32">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl p-12 border border-blue-400/20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Have a Project in Mind?
                    </h2>
                    <p className="text-slate-300 text-lg mb-8">
                        {`Let's`} collaborate to bring your vision to life through the power of cinematic storytelling.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                    >
                        <span>Get in Touch</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Portfolio - Ways Private Limited",
                        "description": "Portfolio of film and theatre productions by Ways Private Limited",
                        "url": "https://www.waysprivate.com.np/portfolio",
                        "mainEntity": {
                            "@type": "ItemList",
                            "itemListElement": projects.map((project, index) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "item": {
                                    "@type": "CreativeWork",
                                    "name": project.title,
                                    "description": project.shortDescription,
                                    "url": `https://www.waysprivate.com.np/portfolio/${project.slug}`,
                                    "image": `https://www.waysprivate.com.np${project.coverImage}`,
                                    "genre": project.category,
                                    "datePublished": project.year,
                                }
                            }))
                        }
                    })
                }}
            />
        </main>
    );
}
