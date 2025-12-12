/**
 * Blog List Page - Cinematic Design
 * 
 * Purpose: Showcase all published blog posts in a premium grid layout
 * matching the website's cinematic aesthetic.
 * 
 * Features:
 * - Server-side data fetching
 * - Glassmorphism cards
 * - Gradient hero section
 * - Search/filter capability
 * - Empty state handling
 * 
 * Route: /blog
 */

import { Metadata } from 'next';
import BlogCard from '@/components/Blog/BlogCard';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { BlogDocument } from '@/types/blog';
import { FileText } from 'lucide-react';

/**
 * Blog Page SEO Metadata
 */
export const metadata: Metadata = {
    title: 'Blog | Ways Private Limited - Film Production Insights & Stories',
    description: 'Explore our blog for behind-the-scenes stories, industry insights, filmmaking tips, and creative inspiration from Nepal\'s premier production company.',
    keywords: [
        'Nepali movie blog',
        'film production insights',
        'Ways Private Limited blog',
        'filmmaking tips Nepal',
        'cinema stories',
        'production behind the scenes',
    ],
    metadataBase: new URL("https://www.waysprivate.com.np"),
    openGraph: {
        title: 'Blog | Ways Private Limited',
        description: 'Behind-the-scenes stories, industry insights, and creative inspiration from Nepal\'s premier production company.',
        url: 'https://www.waysprivate.com.np/blog',
        siteName: 'Ways Private Limited',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | Ways Private Limited',
        description: 'Insights and stories about Nepali movie production.',
        images: ['/og-image.png'],
        creator: '@waysprivate',
    },
};
export const dynamic = 'force-dynamic';

/**
 * Fetch Published Blogs from Database
 */


/// this is a blog page


async function getBlogs(): Promise<BlogDocument[]> {
    try {
        await dbConnect();

        const blogs = await Blog.find({ published: true })
            .sort({ publishedAt: -1, createdAt: -1 })
            .lean();

        return blogs.map(blog => ({
            ...blog,
            _id: blog._id.toString(),
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            publishedAt: blog.publishedAt,
        })) as BlogDocument[];
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}

/**
 * Blog List Page Component
 */
export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#13131A] to-[#0A0A0F]">

            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 gradient-animate" />

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

                <div className="relative max-w-5xl mx-auto px-6 md:px-16 text-center py-20">
                    <span className="inline-block px-5 py-2 mb-6 text-sm font-semibold text-pink-400 bg-pink-400/10 rounded-full border border-pink-400/20">
                        Insights & Stories
                    </span>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                        Our <span className="text-gradient bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent gradient-animate">
                            Blog
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Behind-the-scenes stories, industry insights, and creative inspiration from our cinematic journey.
                    </p>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="section-padding relative">
                <div className="max-w-7xl mx-auto px-6 md:px-16">

                    {blogs.length === 0 ? (
                        // Empty State
                        <div className="text-center py-20">
                            <div className="glass inline-flex items-center justify-center w-24 h-24 rounded-full mb-6">
                                <FileText className="w-12 h-12 text-slate-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                No Posts Yet
                            </h2>
                            <p className="text-slate-400 text-lg">
                                Check back soon for exciting stories and insights from our productions.
                            </p>
                        </div>
                    ) : (
                        // Blog Grid
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Decorative bottom gradient */}
            <div className="h-32 bg-gradient-to-t from-black to-transparent" />
        </main>
    );
}
