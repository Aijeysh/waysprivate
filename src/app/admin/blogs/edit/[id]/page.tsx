'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { JSONContent } from '@tiptap/react';
import { slugify } from '@/lib/slugify';
import { Save, Eye } from 'lucide-react';
import { BlogDocument } from '@/types/blog';

const TiptapEditor = dynamic(() => import('@/components/Admin/TiptapEditor'), {
    ssr: false,
});

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [blogId, setBlogId] = useState<string>('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState<JSONContent>({ type: 'doc', content: [] });
    const [featuredImage, setFeaturedImage] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('Admin');
    const [readTime, setReadTime] = useState(5);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [published, setPublished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadBlog() {
            const resolvedParams = await params;
            setBlogId(resolvedParams.id);

            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`/api/blogs/${resolvedParams.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (data.success) {
                    const blog: BlogDocument = data.data;
                    setTitle(blog.title);
                    setSlug(blog.slug);
                    setExcerpt(blog.excerpt);
                    setContent(blog.content);
                    setFeaturedImage(blog.featuredImage || '');
                    setCategory(blog.metadata.category || '');
                    setTags(blog.metadata.tags?.join(', ') || '');
                    setAuthor(blog.metadata.author);
                    setReadTime(blog.metadata.readTime || 5);
                    setMetaTitle(blog.seo.metaTitle || '');
                    setMetaDescription(blog.seo.metaDescription || '');
                    setKeywords(blog.seo.keywords?.join(', ') || '');
                    setPublished(blog.published);
                } else {
                    setError('Failed to load blog');
                }
            } catch (err) {
                setError('Failed to load blog');
            } finally {
                setIsLoading(false);
            }
        }

        loadBlog();
    }, [params]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setFeaturedImage(data.data.url);
            }
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    const handleSubmit = async (shouldPublish: boolean) => {
        setError('');
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('adminToken');

            const blogData = {
                title,
                slug,
                excerpt,
                content,
                featuredImage,
                metadata: {
                    author,
                    category,
                    tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
                    readTime,
                },
                seo: {
                    metaTitle: metaTitle || title,
                    metaDescription: metaDescription || excerpt,
                    keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
                    ogImage: featuredImage,
                },
                published: shouldPublish,
                publishedAt: shouldPublish && !published ? new Date() : undefined,
            };

            const response = await fetch(`/api/blogs/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(blogData),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/admin/blogs');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to update blog post');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error && isLoading) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Edit Blog Post
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Update your blog post
                </p>
            </div>

            {error && !isLoading && (
                <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-2xl font-bold"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        URL Slug *
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">/blog/</span>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(slugify(e.target.value))}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Excerpt *
                    </label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        rows={3}
                        maxLength={300}
                        required
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {excerpt.length}/300 characters
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Featured Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    {featuredImage && (
                        <img
                            src={featuredImage}
                            alt="Featured"
                            className="mt-3 max-w-xs rounded-lg shadow-md"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Content *
                    </label>
                    <TiptapEditor content={content} onChange={setContent} />
                </div>

                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Metadata
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Author
                            </label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Read Time (minutes)
                            </label>
                            <input
                                type="number"
                                value={readTime}
                                onChange={(e) => setReadTime(parseInt(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                min="1"
                            />
                        </div>
                    </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        SEO Settings
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                rows={2}
                                maxLength={160}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Keywords (comma separated)
                            </label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 justify-end pt-6 border-t border-gray-300 dark:border-gray-600">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSubmit(false)}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                        disabled={isSubmitting}
                    >
                        <Save size={18} />
                        Save as Draft
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSubmit(true)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
                        disabled={isSubmitting}
                    >
                        <Eye size={18} />
                        {isSubmitting ? 'Updating...' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
}
