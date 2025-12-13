import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { verifyToken } from '@/lib/auth';
import { deleteFromR2 } from '@/lib/r2';
import { BlogDocument } from '@/types/blog';

// GET /api/blogs/[id] - Fetch a single blog by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { id } = await params;
        const blog = await Blog.findById(id).lean();

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: blog });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error Occured';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}

// PUT /api/blogs/[id] - Update a blog by ID (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Verify admin token
        const token = request.headers.get('authorization')?.replace('Bearer ', '');
        const admin = verifyToken(token || '');

        if (!admin) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { id } = await params;
        const body = await request.json();

        // If changing to published and no publishedAt date, set it
        if (body.published && !body.publishedAt) {
            const existingBlog = await Blog.findById(id);
            if (existingBlog && !existingBlog.published) {
                body.publishedAt = new Date();
            }
        }

        const blog = await Blog.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: blog });
    } catch (error) {
        // Check for MongoDB duplicate key error
        if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'A blog with this slug already exists' },
                { status: 400 }
            );
        }

        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}

/**
 * Extract R2 image keys from blog content
 * @param blog - The blog document
 * @returns Array of R2 file keys to delete
 */
function extractR2Keys(blog: BlogDocument): string[] {
    const keys: string[] = [];
    const r2PublicUrl = process.env.R2_PUBLIC_URL || '';

    // Extract from featured image
    if (blog.featuredImage && blog.featuredImage.includes(r2PublicUrl)) {
        const url = new URL(blog.featuredImage);
        const key = url.pathname.substring(1); // Remove leading slash
        keys.push(key);
    }

    // Extract from content (TipTap JSON content may contain images)
    if (blog.content && typeof blog.content === 'object') {
        const extractImagesFromContent = (content: Record<string, unknown>): void => {
            if (Array.isArray(content)) {
                content.forEach((item) => extractImagesFromContent(item as Record<string, unknown>));
            } else if (typeof content === 'object' && content !== null) {
                // Check if this is an image node
                if (content.type === 'image' && typeof content.attrs === 'object' && content.attrs !== null) {
                    const attrs = content.attrs as Record<string, unknown>;
                    const src = attrs.src as string;
                    if (src && src.includes(r2PublicUrl)) {
                        const url = new URL(src);
                        const key = url.pathname.substring(1);
                        keys.push(key);
                    }
                }

                // Recursively check content array
                if (Array.isArray(content.content)) {
                    content.content.forEach((item) => extractImagesFromContent(item as Record<string, unknown>));
                }
            }
        };

        extractImagesFromContent(blog.content as Record<string, unknown>);
    }

    return keys;
}

// DELETE /api/blogs/[id] - Delete a blog by ID (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Verify admin token
        const token = request.headers.get('authorization')?.replace('Bearer ', '');
        const admin = verifyToken(token || '');

        if (!admin) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const { id } = await params;

        // First, fetch the blog to get image references
        const blog = await Blog.findById(id).lean() as BlogDocument | null;

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        // Extract R2 image keys from the blog
        const r2Keys = extractR2Keys(blog);

        // Delete images from R2
        if (r2Keys.length > 0) {
            await Promise.all(
                r2Keys.map(async (key) => {
                    try {
                        await deleteFromR2(key);
                        console.log(`Deleted R2 image: ${key}`);
                    } catch (error) {
                        console.error(`Failed to delete R2 image ${key}:`, error);
                        // Continue with blog deletion even if image deletion fails
                    }
                })
            );
        }

        // Delete the blog document
        await Blog.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            data: {
                deletedImages: r2Keys.length
            }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error Occured';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}
