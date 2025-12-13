/**
 * Dynamic Project Detail Page
 * 
 * Purpose: Display detailed information about individual projects
 * including full descriptions, images, cast/crew, and related projects.
 * 
 * Features:
 * - Dynamic routing based on project slug
 * - SEO optimized with project-specific metadata
 * - Static generation for all projects at build time
 * - Structured data for search engines
 * - Related projects suggestions
 * - Back to portfolio navigation
 * 
 * Route: /portfolio/[slug]
 */

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    getAllProjectSlugs,
    getProjectBySlug,
    getAllProjects
} from "@/data/projects";
import {
    Calendar,
    Clock,
    Film,
    Theater,
    ArrowLeft,
    ArrowRight,
    Award,
    Users
} from "lucide-react";

// Generate static params for all projects
export async function generateStaticParams() {
    const slugs = getAllProjectSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

// Generate metadata for each project
export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: "Project Not Found | Ways Private Limited",
        };
    }

    return {
        title: `${project.title} | ${project.category} | Ways Private Limited`,
        description: project.fullDescription.substring(0, 160),
        keywords: project.keywords.join(", "),
        openGraph: {
            title: `${project.title} - ${project.category}`,
            description: project.shortDescription,
            url: `https://www.waysprivate.com.np/portfolio/${project.slug}`,
            siteName: "Ways Private Limited",
            images: [
                {
                    url: project.coverImage,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} - ${project.category}`,
            description: project.shortDescription,
            images: [project.coverImage],
        },
    };
}

/**
 * Project Detail Page Component
 */
export default async function ProjectPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    // Show 404 if project not found
    if (!project) {
        notFound();
    }

    // Get related projects (same category, excluding current)
    const allProjects = getAllProjects();
    const relatedProjects = allProjects
        .filter(p => p.category === project.category && p.id !== project.id)
        .slice(0, 3);

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#13131A] to-[#0A0A0F] text-white">

            {/* Background decorative elements */}
            <div className="fixed top-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="fixed bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

            {/* Back to Portfolio Link */}
            <div className="relative pt-24 pb-8 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Portfolio</span>
                    </Link>
                </div>
            </div>

            {/* Hero Section with Cover Image */}
            <section className="relative px-6 md:px-16 pb-16">
                <div className="max-w-7xl mx-auto">

                    {/* Cover Image */}
                    <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-8">
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                            <div className="max-w-4xl">
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-semibold text-white bg-blue-500/80 backdrop-blur-sm rounded-full border border-blue-400/30">
                                    {project.category === "Feature Film" ? (
                                        <Film className="w-4 h-4" />
                                    ) : (
                                        <Theater className="w-4 h-4" />
                                    )}
                                    {project.category}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    {project.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-blue-400 font-semibold mb-4">
                                    {project.tagline}
                                </p>
                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-4 text-slate-300">
                                    {project.year && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{project.year}</span>
                                        </div>
                                    )}
                                    {project.duration && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{project.duration}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Main Content */}
            <section className="relative px-6 md:px-16 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Main Column - Description */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* About the Project */}
                            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
                                <h2 className="text-3xl font-bold mb-6 text-blue-400">About the Project</h2>
                                <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                                    {project.fullDescription}
                                </p>
                            </div>

                            {/* Image Gallery */}
                            {project.images && project.images.length > 1 && (
                                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
                                    <h2 className="text-3xl font-bold mb-6 text-blue-400">Gallery</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.images.map((image, index) => (
                                            <div key={index} className="relative h-64 rounded-xl overflow-hidden group">
                                                <Image
                                                    src={image}
                                                    alt={`${project.title} - Image ${index + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Sidebar - Additional Info */}
                        <div className="space-y-6">

                            {/* Crew Information */}
                            {project.crew && Object.keys(project.crew).length > 0 && (
                                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                                    <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-blue-400">
                                        <Users className="w-5 h-5" />
                                        Crew
                                    </h3>
                                    <div className="space-y-3">
                                        {project.crew.director && (
                                            <div>
                                                <p className="text-slate-500 text-sm">Director</p>
                                                <p className="text-white font-medium">{project.crew.director}</p>
                                            </div>
                                        )}
                                        {project.crew.producer && (
                                            <div>
                                                <p className="text-slate-500 text-sm">Producer</p>
                                                <p className="text-white font-medium">{project.crew.producer}</p>
                                            </div>
                                        )}
                                        {project.crew.writer && (
                                            <div>
                                                <p className="text-slate-500 text-sm">Writer</p>
                                                <p className="text-white font-medium">{project.crew.writer}</p>
                                            </div>
                                        )}
                                        {project.crew.cinematographer && (
                                            <div>
                                                <p className="text-slate-500 text-sm">Cinematographer</p>
                                                <p className="text-white font-medium">{project.crew.cinematographer}</p>
                                            </div>
                                        )}
                                        {project.crew.editor && (
                                            <div>
                                                <p className="text-slate-500 text-sm">Editor</p>
                                                <p className="text-white font-medium">{project.crew.editor}</p>
                                            </div>
                                        )}
                                        {project.crew.musicDirector && (
                                            <div>
                                                <p className="text-slate-500 text-sm">Music Director</p>
                                                <p className="text-white font-medium">{project.crew.musicDirector}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Cast */}
                            {project.cast && project.cast.length > 0 && (
                                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                                    <h3 className="text-xl font-bold mb-4 text-blue-400">Cast</h3>
                                    <ul className="space-y-2">
                                        {project.cast.map((actor, index) => (
                                            <li key={index} className="text-slate-300">
                                                {actor}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Awards */}
                            {project.awards && project.awards.length > 0 && (
                                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                                    <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-blue-400">
                                        <Award className="w-5 h-5" />
                                        Awards & Recognition
                                    </h3>
                                    <ul className="space-y-2">
                                        {project.awards.map((award, index) => (
                                            <li key={index} className="text-slate-300 flex items-start gap-2">
                                                <span className="text-yellow-400 mt-1">★</span>
                                                <span>{award}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-400/20">
                                <h3 className="text-lg font-bold mb-2">Interested in Working With Us?</h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    {`Let's`} bring your vision to life through cinematic storytelling.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300 w-full justify-center"
                                >
                                    <span>Contact Us</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="relative px-6 md:px-16 pb-32">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12">
                            More <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400">{project.category} Productions</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedProjects.map((relatedProject) => (
                                <Link
                                    key={relatedProject.id}
                                    href={`/portfolio/${relatedProject.slug}`}
                                    className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="relative h-64">
                                        <Image
                                            src={relatedProject.coverImage}
                                            alt={relatedProject.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                                {relatedProject.title}
                                            </h3>
                                            <p className="text-slate-300 text-sm">
                                                {relatedProject.tagline}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": project.category === "Feature Film" ? "Movie" : "TheaterEvent",
                        "name": project.title,
                        "description": project.fullDescription,
                        "image": `https://www.waysprivate.com.np${project.coverImage}`,
                        "url": `https://www.waysprivate.com.np/portfolio/${project.slug}`,
                        "datePublished": project.year,
                        "genre": project.category,
                        "productionCompany": {
                            "@type": "Organization",
                            "name": "Ways Private Limited",
                            "url": "https://www.waysprivate.com.np"
                        },
                        ...(project.crew?.director && {
                            "director": {
                                "@type": "Person",
                                "name": project.crew.director
                            }
                        }),
                        ...(project.crew?.producer && {
                            "producer": {
                                "@type": "Person",
                                "name": project.crew.producer
                            }
                        })
                    })
                }}
            />
        </main>
    );
}
