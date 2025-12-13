/**
 * Cloudflare R2 Type Definitions
 * 
 * Purpose: Type definitions for R2 storage operations ensuring type safety
 * across the application when interacting with Cloudflare R2 bucket.
 * 
 * @module types/r2
 */

/**
 * R2 Configuration Interface
 * 
 * Contains all necessary credentials and configuration for connecting
 * to Cloudflare R2 storage.
 */
export interface R2Config {
    /** Cloudflare account ID */
    accountId: string;
    /** R2 access key ID for authentication */
    accessKeyId: string;
    /** R2 secret access key for authentication */
    secretAccessKey: string;
    /** Name of the R2 bucket */
    bucketName: string;
    /** Public URL base for accessing uploaded files */
    publicUrl: string;
}

/**
 * Upload Result from R2
 * 
 * Response object returned from uploadToR2 function containing
 * success status and either URL/key or error message.
 */
export interface UploadResult {
    /** Whether upload was successful */
    success: boolean;
    /** Public URL of uploaded file (if successful) */
    url?: string;
    /** R2 storage key/path (if successful) */
    key?: string;
    /** Error message (if failed) */
    error?: string;
}

/**
 * Image Upload Response from API
 * 
 * API response format from /api/upload endpoint for image uploads.
 */
export interface ImageUploadResponse {
    /** Whether upload succeeded */
    success: boolean;
    /** Upload data containing URL and key */
    data?: {
        /** Public URL of the uploaded image */
        url: string;
        /** R2 storage key for the image */
        key: string;
    };
    /** Error message if upload failed */
    error?: string;
}

/**
 * File Upload Options
 * 
 * Options passed to uploadToR2 function for customizing upload behavior.
 */
export interface UploadOptions {
    /** MIME type of the file being uploaded */
    contentType: string;
    /** Optional metadata tags for the uploaded file */
    metadata?: Record<string, string>;
}
