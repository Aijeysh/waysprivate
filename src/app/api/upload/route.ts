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
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        if (typeof file === 'string') {
            return NextResponse.json(
                { success: false, error: 'Invalid file type - received string' },
                { status: 400 }
            );
        }

        // Validate file type - ONLY JPG, JPEG, and PNG
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Invalid file type. Only JPG, JPEG, and PNG images are allowed.' 
                },
                { status: 400 }
            );
        }

        // Additional validation: check file extension
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const validExtensions = ['jpg', 'jpeg', 'png'];
        
        if (!fileExtension || !validExtensions.includes(fileExtension)) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Invalid file extension. Only .jpg, .jpeg, and .png are allowed.' 
                },
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
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Upload failed' 
            },
            { status: 500 }
        );
    }
}