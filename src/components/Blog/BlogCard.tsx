import { BlogDocument } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock, Tag } from 'lucide-react';

interface BlogCardProps {
    blog: BlogDocument;
}

export default function BlogCard({ blog }: BlogCardProps) {
    const formattedDate = blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Draft';

    return (
        <Link href={`/blog/${blog.slug}`} className="group">
            <article className="h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {blog.featuredImage && (
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}

                <div className="p-6">
                    {/* Category Badge */}
                    {blog.metadata.category && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                            {blog.metadata.category}
                        </span>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {blog.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <CalendarDays size={16} />
                            <span>{formattedDate}</span>
                        </div>

                        {blog.metadata.readTime && (
                            <div className="flex items-center gap-1">
                                <Clock size={16} />
                                <span>{blog.metadata.readTime} min read</span>
                            </div>
                        )}

                        {blog.metadata.author && (
                            <div className="flex items-center gap-1">
                                <span>By {blog.metadata.author}</span>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {blog.metadata.tags && blog.metadata.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {blog.metadata.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded"
                                >
                                    <Tag size={12} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}
