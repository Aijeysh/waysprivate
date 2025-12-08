import mongoose, { Schema, Model } from 'mongoose';
import { BlogDocument } from '@/types/blog';

const BlogSchema = new Schema<BlogDocument>(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title for this blog post'],
            maxlength: [200, 'Title cannot be more than 200 characters'],
        },
        slug: {
            type: String,
            required: [true, 'Please provide a slug for this blog post'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        excerpt: {
            type: String,
            required: [true, 'Please provide an excerpt'],
            maxlength: [300, 'Excerpt cannot be more than 300 characters'],
        },
        content: {
            type: Schema.Types.Mixed,
            required: [true, 'Please provide content for this blog post'],
        },
        featuredImage: {
            type: String,
            default: '',
        },
        metadata: {
            author: {
                type: String,
                required: true,
                default: 'Admin',
            },
            category: {
                type: String,
                default: '',
            },
            tags: {
                type: [String],
                default: [],
            },
            readTime: {
                type: Number,
                default: 5,
            },
        },
        seo: {
            metaTitle: {
                type: String,
                default: '',
            },
            metaDescription: {
                type: String,
                default: '',
            },
            keywords: {
                type: [String],
                default: [],
            },
            ogImage: {
                type: String,
                default: '',
            },
        },
        published: {
            type: Boolean,
            default: false,
        },
        publishedAt: {
            type: Date,
            default: null,
        },
        wordCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const Blog: Model<BlogDocument> =
    mongoose.models.Blog || mongoose.model<BlogDocument>('Blog', BlogSchema);

export default Blog;
