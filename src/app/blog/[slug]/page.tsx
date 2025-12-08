/**
 * Blog Post Page Component (Dynamic Route)
 * 
 * Purpose: Displays individual blog post with full content, metadata, images,
 * and structured data for SEO. Generates static pages for all published blogs.
 * 
 * Features:
 * - Dynamic metadata generation based on blog SEO settings
 * - JSON-LD structured data for search engines
 * - Featured image with Next.js Image optimization
 * - Category badge, author info, read time
 * - Tags display
 * - Static generation for performance
 * 
 * Route: /blog/[slug]
 * 
 * IMPROVEMENTS MADE:
 * - Fixed branding in JSON-LD from "WaysPrivate" to "Ways Private Limited"
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BlogContent from '@/components/Blog/BlogContent';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { BlogDocument } from '@/types/blog';
import { CalendarDays, Clock, User, Tag } from 'lucide-react';

/**
 * Page Props Interface
 * 
 * Defines the props structure for dynamic blog post pages.
 * Params are wrapped in Promise for Next.js 15+ async params.
 */
interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Fetch Single Blog Post by Slug
 * 
 * Retrieves a published blog from MongoDB database by its URL slug.
 * Returns null if blog doesn't exist or isn't published.
 * 
 * @param {string} slug - URL-friendly blog identifier
 * @returns {Promise<BlogDocument | null>} Blog document or null
 */
async function getBlog(slug: string): Promise<BlogDocument | null> {
    try {
        await dbConnect();

        // Find published blog by slug
        const blog = await Blog.findOne({ slug, published: true, }).lean();

        if (!blog) return null;

        // Convert MongoDB types to serializable format
        return {
            ...blog,
            _id: blog._id.toString(),
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            publishedAt: blog.publishedAt,
        } as BlogDocument;
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

/**
 * Generate Dynamic SEO Metadata
 * 
 * Creates page-specific metadata using blog's SEO settings.
 * Falls back to blog title/excerpt if SEO fields aren't set.
 * Includes Open Graph and Twitter Card data.
 * 
 * @param {BlogPostPageProps} params - Page params with slug
 * @returns {Promise<Metadata>} Next.js metadata object
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);

    // 404 case
    if (!blog) {
        return {
            title: 'Blog Not Found',
        };
    }

    // Generate metadata from blog data
    return {
        title: blog.seo.metaTitle || blog.title,
        description: blog.seo.metaDescription || blog.excerpt,
        keywords: blog.seo.keywords,
        openGraph: {
            title: blog.seo.metaTitle || blog.title,
            description: blog.seo.metaDescription || blog.excerpt,
            type: 'article',
            publishedTime: blog.publishedAt?.toISOString(),
            authors: [blog.metadata.author],
            images: [
                {
                    url: blog.seo.ogImage || blog.featuredImage || '/default-og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.seo.metaTitle || blog.title,
            description: blog.seo.metaDescription || blog.excerpt,
            images: [blog.seo.ogImage || blog.featuredImage || '/default-og-image.jpg'],
        },
    };
}

/**
 * Generate Static Params for Build Time
 * 
 * Pre-generates all blog post pages during build for optimal performance.
 * Next.js will create static HTML for each blog slug.
 * 
 * @returns {Promise<Array>} Array of slug params for static generation
 */
export async function generateStaticParams() {
    try {
        await dbConnect();
        const blogs = await Blog.find({ published: true }).select('slug').lean();
        return blogs.map((blog) => ({
            slug: blog.slug,
        }));
    } catch (error) {
        const errorMessage = error instanceof Error? error.message : 'An Error Occured';
        console.log(errorMessage);
        return [];
    }
}

/**
 * Blog Post Page Component
 * 
 * Server component that renders a complete blog post article.
 * Includes JSON-LD structured data for SEO.
 * 
 * @param {BlogPostPageProps} params - Page params containing slug
 * @returns {Promise<JSX.Element>} Complete blog post page
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    // Handle 404
    if (!blog) {
        notFound();
    }

    // Format publication date for display
    const formattedDate = blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '';

    /**
     * JSON-LD Structured Data for SEO
     * 
     * Schema.org BlogPosting markup helps search engines understand
     * the article structure, author, dates, and organization.
     * 
     * IMPROVEMENT: Fixed publisher name from "WaysPrivate" to "Ways Private Limited"
     */
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.excerpt,
        image: blog.featuredImage,
        datePublished: blog.publishedAt?.toISOString(),
        dateModified: blog.updatedAt?.toISOString(),
        author: {
            '@type': 'Person',
            name: blog.metadata.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Ways Private Limited', // FIXED: Was "WaysPrivate"
            logo: {
                '@type': 'ImageObject',
                url: '/logo.png',
            },
        },
    };

    return (
        <>
            {/* Inject JSON-LD structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <article className="max-w-4xl mx-auto px-4 pt-32 pb-20">

                    {/* Category Badge */}
                    {blog.metadata.category && (
                        <div className="mb-4">
                            <span className="inline-block px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                                {blog.metadata.category}
                            </span>
                        </div>
                    )}

                    {/* Article Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                        {blog.title}
                    </h1>

                    {/* Meta Information: Author, Date, Read Time */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6">
                        {/* Author */}
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            <span>{blog.metadata.author}</span>
                        </div>

                        {/* Publication Date */}
                        <div className="flex items-center gap-2">
                            <CalendarDays size={18} />
                            <time dateTime={blog.publishedAt?.toISOString()}>
                                {formattedDate}
                            </time>
                        </div>

                        {/* Read Time */}
                        {blog.metadata.readTime && (
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>{blog.metadata.readTime} min read</span>
                            </div>
                        )}
                    </div>

                    {/* Featured Image */}
                    {blog.featuredImage && (
                        <div className="mb-12 relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={blog.featuredImage}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            />
                        </div>
                    )}

                    {/* Excerpt/Summary */}
                    <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
                        <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                            {blog.excerpt}
                        </p>
                    </div>

                    {/* Main Blog Content (Tiptap Rich Text) */}
                    <div className="mb-12">
                        <BlogContent content={blog.content} />
                    </div>

                    {/* Tags Section */}
                    {blog.metadata.tags && blog.metadata.tags.length > 0 && (
                        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                <Tag size={20} />
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {blog.metadata.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>
        </>
    );
}
