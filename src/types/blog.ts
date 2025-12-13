/**
 * Blog Type Definitions
 * 
 * Purpose: TypeScript interfaces for blog post data structures used
 * throughout the blogging system for type safety and consistency.
 * 
 * @module types/blog
 */

import { JSONContent } from '@tiptap/react';

/**
 * Blog Metadata Interface
 * 
 * Contains non-content metadata about the blog post including
 * author, categorization, and reading time estimate.
 */
export interface BlogMetadata {
    /** Author name */
    author: string;
    /** Blog post category (e.g., 'Technology', 'Tutorial') */
    category?: string;
    /** Tags for categorization and search */
    tags?: string[];
    /** Estimated read time in minutes */
    readTime?: number;
}

/**
 * Blog SEO Interface
 * 
 * SEO-specific fields for optimizing blog posts for search engines.
 * Used for meta tags, Open Graph, and Twitter Cards.
 */
export interface BlogSEO {
    /** SEO optimized title (defaults to blog title if not set) */
    metaTitle?: string;
    /** Meta description for search results */
    metaDescription?: string;
    /** Target keywords for SEO */
    keywords?: string[];
    /** Open Graph image URL */
    ogImage?: string;
}

/**
 * Blog Document Interface
 * 
 * Complete blog post document as stored in MongoDB. Includes all
 * content, metadata, SEO fields, and timestamps.
 */
export interface BlogDocument {
    /** MongoDB document ID */
    _id?: string;
    /** Blog post title */
    title: string;
    /** URL-friendly slug */
    slug: string;
    /** Brief excerpt/summary */
    excerpt: string;
    /** TipTap JSON content */
    content: JSONContent;
    /** Featured image URL */
    featuredImage?: string;
    /** Post metadata */
    metadata: BlogMetadata;
    /** SEO optimization fields */
    seo: BlogSEO;
    /** Whether post is published */
    published: boolean;
    /** Publication date */
    publishedAt?: Date;
    /** Word count for read time calculation */
    wordCount?: number;
    /** Document creation timestamp */
    createdAt?: Date;
    /** Last update timestamp */
    updatedAt?: Date;
}

/**
 * Create Blog Input Interface
 * 
 * Data required to create a new blog post via the API.
 * Does not include MongoDB auto-generated fields.
 */
export interface CreateBlogInput {
    title: string;
    slug: string;
    excerpt: string;
    content: JSONContent;
    featuredImage?: string;
    metadata: BlogMetadata;
    seo: BlogSEO;
    published: boolean;
    publishedAt?: Date;
}

/**
 * Update Blog Input Interface
 * 
 * Data for updating an existing blog post. All fields except _id are optional.
 */
export interface UpdateBlogInput extends Partial<CreateBlogInput> {
    /** MongoDB document ID of blog to update */
    _id: string;
}
