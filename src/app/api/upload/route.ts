import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { verifyToken } from '@/lib/auth';

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

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, '-');
        const filename = `${timestamp}-${originalName}`;

        // Ensure upload directory exists
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'blogs');
        await mkdir(uploadDir, { recursive: true });

        // Save file
        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return public URL
        const publicUrl = `/uploads/blogs/${filename}`;

        return NextResponse.json({
            success: true,
            data: { url: publicUrl },
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
