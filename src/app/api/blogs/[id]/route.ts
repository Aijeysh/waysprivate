import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { verifyToken } from '@/lib/auth';

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
        const errorMessage = error instanceof Error ? error.message: 'An error Occured';
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
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An error Occured';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}
