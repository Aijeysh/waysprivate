/**
 * Latest Blogs Section - Cinematic Design
 * 
 * Purpose: Showcase recent blog posts in a premium card layout
 * matching the website's cinematic aesthetic.
 * 
 * Features:
 * - Server-side data fetching from MongoDB
 * - Glassmorphism cards
 * - Gradient overlays on images
 * - Smooth hover effects
 * - Reading time estimates
 * 
 * Used in: Homepage (/)
 */

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { BlogDocument } from '@/types/blog';


export const dynamic = 'force-dynamic';
/**
 * Fetch Latest Blogs from Database
 */
async function getLatestBlogs(): Promise<BlogDocument[]> {
  try {
    await dbConnect();

    const blogs = await Blog.find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(3)
      .lean();

    return blogs.map(blog => ({
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      publishedAt: blog.publishedAt,
    })) as BlogDocument[];
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    return [];
  }
}

/**
 * LatestBlogs Component
 * 
 * Displays 3 most recent published blog posts
 * with cinematic styling and smooth animations.
 * 
 * @returns {JSX.Element} Latest blogs section
 */
export default async function LatestBlogs() {
  const blogs = await getLatestBlogs();

  // Calculate reading time
  const getReadingTime = (wordCount: number = 500) => {
    const wordsPerMinute = 200;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Format date
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'No date';
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (blogs.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <section className="section-padding relative bg-gradient-to-b from-[#13131A] to-[#0A0A0F] overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-16">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-pink-400 bg-pink-400/10 rounded-full border border-pink-400/20">
            Latest Insights
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            From Our <span className="text-gradient">Blog</span>
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Behind-the-scenes stories, industry insights, and creative inspiration from our cinematic journey.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              className="group hover-lift"
            >
              <Link href={`/blog/${blog.slug}`}>
                <div className="glass relative rounded-3xl overflow-hidden h-full flex flex-col hover:bg-white/10 transition-all duration-300">

                  {/* Blog Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={blog.featuredImage || '/Ways-Private-Limited-Logo.jpeg'}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{getReadingTime(blog.wordCount)} min read</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {blog.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full border-2 border-purple-400 hover:bg-purple-400 transition-all duration-300"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
