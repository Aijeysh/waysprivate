import { JSONContent } from '@tiptap/react';

export interface BlogMetadata {
    author: string;
    category?: string;
    tags?: string[];
    readTime?: number;
}

export interface BlogSEO {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
}

export interface BlogDocument {
    _id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: JSONContent;
    featuredImage?: string;
    metadata: BlogMetadata;
    seo: BlogSEO;
    published: boolean;
    publishedAt?: Date;
    wordCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

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

export interface UpdateBlogInput extends Partial<CreateBlogInput> {
    _id: string;
}
