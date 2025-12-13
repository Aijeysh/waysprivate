import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { uploadToR2, generateFileKey } from '@/lib/r2';

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

        // Generate unique key for R2
        const fileKey = generateFileKey(file.name, 'blogs');

        // Upload to R2
        const uploadResult = await uploadToR2(buffer, fileKey, {
            contentType: file.type,
            metadata: {
                originalName: file.name,
                uploadedAt: new Date().toISOString(),
            },
        });

        if (!uploadResult.success || !uploadResult.url) {
            return NextResponse.json(
                {
                    success: false,
                    error: uploadResult.error || 'Upload to R2 failed'
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                url: uploadResult.url,
                key: uploadResult.key,
            },
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
