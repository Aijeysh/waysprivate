import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blogs/slug/[slug] - Fetch a single blog by slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await dbConnect();

        const { slug } = await params;
        const blog = await Blog.findOne({ slug }).lean();

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        // Only return published blogs for public access
        if (!blog.published) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: blog });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
