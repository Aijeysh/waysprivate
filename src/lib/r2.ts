/**
 * Cloudflare R2 Client Utility
 * 
 * Purpose: Handle file uploads to Cloudflare R2 storage using S3-compatible API.
 * 
 * Features:
 * - Upload images to R2 bucket
 * - Generate public URLs for uploaded files
 * - Proper TypeScript typing (no 'any' keywords)
 * - File validation
 */

/**
 * Cloudflare R2 Storage Utility
 * 
 * Purpose: Handles file uploads and deletions to Cloudflare R2 bucket,
 * which is an S3-compatible object storage service for blog images.
 * 
 * Features:
 * - Upload files to R2 with metadata
 * - Delete files from R2
 * - Generate unique file keys with timestamps
 * - Retrieve R2 configuration from environment
 * - Initialize S3-compatible R2 client
 * 
 * Configuration Required (.env.local):
 * - R2_ACCOUNT_ID: Cloudflare account ID
 * - R2_ACCESS_KEY_ID: R2 access key
 * - R2_SECRET_ACCESS_KEY: R2 secret key
 * - R2_BUCKET_NAME: R2 bucket name
 * - R2_PUBLIC_URL: Public URL for accessing files
 * 
 * Implementation:
 * - Uses AWS SDK S3 client (R2 is S3-compatible)
 * - Generates unique keys with timestamps
 * - Returns public URLs for uploaded files
 * - Handles errors gracefully
 * 
 * @module lib/r2
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { R2Config, UploadResult, UploadOptions } from '@/types/r2';

/**
 * Get R2 configuration from environment variables
 */
function getR2Config(): R2Config {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME;
    const publicUrl = process.env.R2_PUBLIC_URL;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
        throw new Error('Missing R2 configuration. Please check environment variables.');
    }

    return {
        accountId,
        accessKeyId,
        secretAccessKey,
        bucketName,
        publicUrl,
    };
}

/**
 * Initialize R2 S3-compatible client
 */
function getR2Client(): S3Client {
    const config = getR2Config();

    return new S3Client({
        region: 'auto',
        endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
        },
    });
}

/**
 * Upload a file to R2 bucket
 * 
 * @param file - File buffer to upload
 * @param key - Unique key/path for the file in R2
 * @param options - Upload options including content type
 * @returns Upload result with public URL
 */
export async function uploadToR2(
    file: Buffer,
    key: string,
    options: UploadOptions
): Promise<UploadResult> {
    try {
        const config = getR2Config();
        const client = getR2Client();

        const command = new PutObjectCommand({
            Bucket: config.bucketName,
            Key: key,
            Body: file,
            ContentType: options.contentType,
            Metadata: options.metadata,
        });

        await client.send(command);

        // Generate public URL
        const publicUrl = `${config.publicUrl}/${key}`;

        return {
            success: true,
            url: publicUrl,
            key,
        };
    } catch (error) {
        console.error('R2 upload error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed',
        };
    }
}

/**
 * Delete a file from R2 bucket
 * 
 * @param key - Key/path of the file to delete
 * @returns Success status
 */
export async function deleteFromR2(key: string): Promise<boolean> {
    try {
        const config = getR2Config();
        const client = getR2Client();

        const command = new DeleteObjectCommand({
            Bucket: config.bucketName,
            Key: key,
        });

        await client.send(command);
        return true;
    } catch (error) {
        console.error('R2 delete error:', error);
        return false;
    }
}

/**
 * Generate a unique file key for R2 storage
 * 
 * @param originalFilename - Original filename
 * @param folder - Folder/prefix for organization
 * @returns Unique key for R2
 */
export function generateFileKey(originalFilename: string, folder: string = 'uploads'): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '-');
    return `${folder}/${timestamp}-${randomString}-${sanitizedFilename}`;
}
