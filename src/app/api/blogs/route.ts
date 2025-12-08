import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { verifyToken } from '@/lib/auth';

// GET /api/blogs - Fetch all blogs (published only for public, all for admin)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

        // Check if admin token is provided
        const token = request.headers.get('authorization')?.replace('Bearer ', '');
        const isAdmin = token ? verifyToken(token) !== null : false;

        const skip = (page - 1) * limit;

        // Build query
        const query: { published?: boolean } = {};
        if (!includeUnpublished || !isAdmin) {
            query.published = true;
        }

        const blogs = await Blog.find(query)
            .sort({ publishedAt: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Blog.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: blogs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
    );
}
}

// POST /api/blogs - Create a new blog (admin only)
export async function POST(request: NextRequest) {
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

        const body = await request.json();

        // If published, set publishedAt date
        if (body.published && !body.publishedAt) {
            body.publishedAt = new Date();
        }

        const blog = await Blog.create(body);

        return NextResponse.json(
            { success: true, data: blog },
            { status: 201 }
        );
    }  catch (error) {
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
