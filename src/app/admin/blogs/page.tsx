/**
 * Admin Dashboard - Blog Management Page
 * 
 * Purpose: Central dashboard for managing all blog posts (published and drafts).
 * Displays a table of all blogs with edit and delete actions.
 * 
 * Features:
 * - Lists all blog posts (including unpublished drafts)
 * - Published/Draft status indicators with icons
 * - Edit and delete actions for each post
 * - "Create New Blog" button
 * - Loading and error states
 * - Confirmation dialog before deletion
 * - Responsive table design
 * 
 * Route: /admin/blogs
 * Authentication: Required (protected by admin layout)
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { BlogDocument } from '@/types/blog';

/**
 * Admin Blogs Dashboard Component
 * 
 * Client component managing blog list state and CRUD operations.
 * Fetches all blogs (including unpublished) on mount.
 * 
 * @returns {JSX.Element} Blog management dashboard with table
 */
export default function AdminBlogsPage() {
    // State management
    const [blogs, setBlogs] = useState<BlogDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    /**
     * Fetch All Blogs from API
     * 
     * Retrieves all blog posts including unpublished drafts.
     * Requires admin authentication token.
     */
    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/blogs?includeUnpublished=true', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.success) {
                setBlogs(data.data);
            } else {
                setError(data.error);
            }
        } catch (error) {
            const errorMessage = error instanceof Error? error.message : 'Failed to fetch Blog';
            console.log(errorMessage);
            setError('Failed to fetch blogs');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle Blog Deletion
     * 
     * Deletes a blog post after user confirmation.
     * Updates UI by removing the deleted blog from state.
     * 
     * @param {string} id - Blog post ID to delete
     */
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.success) {
                // Remove deleted blog from state
                setBlogs(blogs.filter((blog) => blog._id !== id));
            } else {
                alert(data.error);
            }
        } catch (error) {
            const errorMessage = error instanceof Error? error.message : 'Failed to delete blog';
            console.log(errorMessage);
            alert('Failed to delete blog');
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div>
            {/* Header with Create button */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    All Blog Posts
                </h1>
                <Link
                    href="/admin/blogs/new"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                    Create New Blog
                </Link>
            </div>

            {/* Empty state */}
            {blogs.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                        No blog posts yet
                    </p>
                    <Link
                        href="/admin/blogs/new"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Create your first blog post
                    </Link>
                </div>
            ) : (
                /* Blogs table */
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Table header */}
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Published
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        {/* Table body */}
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    {/* Title and slug */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {blog.title}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            /{blog.slug}
                                        </div>
                                    </td>

                                    {/* Published/Draft status badge */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.published
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                                }`}
                                        >
                                            {blog.published ? (
                                                <>
                                                    <Eye size={12} /> Published
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff size={12} /> Draft
                                                </>
                                            )}
                                        </span>
                                    </td>

                                    {/* Publication date */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {blog.publishedAt
                                            ? new Date(blog.publishedAt).toLocaleDateString()
                                            : '-'}
                                    </td>

                                    {/* Edit and Delete actions */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            {/* Edit button */}
                                            <Link
                                                href={`/admin/blogs/edit/${blog._id}`}
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                                                title="Edit"
                                                aria-label={`Edit ${blog.title}`}
                                            >
                                                <Edit size={18} />
                                            </Link>

                                            {/* Delete button */}
                                            <button
                                                onClick={() => handleDelete(blog._id!)}
                                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                                title="Delete"
                                                aria-label={`Delete ${blog.title}`}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
