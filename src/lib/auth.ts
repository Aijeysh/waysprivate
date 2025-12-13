/**
 * Authentication Utility Module
 * 
 * Purpose: Handles admin authentication, JWT token generation/verification,
 * and password hashing for the blog administration system.
 * 
 * Features:
 * - Admin credential verification
 * - JWT token generation with 7-day expiration
 * - Token verification and validation
 * - Password hashing with bcrypt
 * - Password comparison
 * 
 * Security Notes:
 * - Uses JWT for stateless authentication
 * - Bcrypt for password hashing (10 rounds)
 * - Environment variables for sensitive data
 * 
 * @module lib/auth
 */

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ;
if (!ADMIN_USERNAME) {
    throw new Error('ADMIN_USERNAME is not defined');
}
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ;
if (!ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD is not defined');
}

/**
 * Admin User Interface
 * 
 * Represents an authenticated admin user with JWT payload structure
 */
export interface AdminUser {
    /** Admin username */
    username: string;
    /** Always true for admin users */
    isAdmin: boolean;
}

/**
 * Verify Admin Credentials
 * 
 * Authenticates an admin user by comparing provided credentials
 * against environment variables. In production, passwords should
 * be hashed.
 * 
 * @param {string} username - Username to verify
 * @param {string} password - Plain text password to verify
 * @returns {Promise<boolean>} True if credentials are valid, false otherwise
 * 
 * @example
 * ```typescript
 * const isValid = await verifyAdminCredentials('admin', 'password123');
 * if (isValid) {
 *   // Generate token
 * }
 * ```
 * 
 * @security Password comparison is currently plain text. Should use bcrypt in production.
 */
export async function verifyAdminCredentials(
    username: string,
    password: string
): Promise<boolean> {
    if (username !== ADMIN_USERNAME) {
        return false;
    }

    // In production, you should hash the password in .env
    // For now, we'll do a simple comparison
    return password === ADMIN_PASSWORD;
}

/**
 * Generate Admin JWT Token
 * 
 * Creates a signed JWT token for authenticated admin users.
 * Token expires after 7 days and contains user info in payload.
 * 
 * @param {string} username - Username to include in token payload
 * @returns {string} Signed JWT token string
 * 
 * @example
 * ```typescript
 * const token = generateAdminToken('admin');
 * // Store token in localStorage or cookie
 * localStorage.setItem('adminToken', token);
 * ```
 * 
 * @security Token is signed with NEXTAUTH_SECRET environment variable
 */
export function generateAdminToken(username: string): string {
    const payload: AdminUser = {
        username,
        isAdmin: true,
    };

    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn: '7d',
    });
}

/**
 * Verify JWT Token
 * 
 * Validates and decodes a JWT token to extract admin user information.
 * Returns null if token is invalid, expired, or malformed.
 * 
 * @param {string} token - JWT token to verify
 * @returns {AdminUser | null} Decoded admin user object or null if invalid
 * 
 * @example
 * ```typescript
 * const admin = verifyToken(token);
 * if (admin && admin.isAdmin) {
 *   // User is authenticated
 * } else {
 *   // Invalid token, redirect to login
 * }
 * ```
 * 
 * @throws Does not throw - catches errors and returns null
 */
export function verifyToken(token: string): AdminUser | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET!) as unknown as AdminUser;
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Hash Password
 * 
 * Hashes a plain text password using bcrypt with 10 salt rounds.
 * Use this to hash passwords before storing in database.
 * 
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} Hashed password string
 * 
 * @example
 * ```typescript
 * const hashedPassword = await hashPassword('mySecurePassword123');
 * // Store hashedPassword in database
 * ```
 * 
 * @security Uses bcrypt with 10 rounds for secure hashing
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

/**
 * Compare Password with Hash
 * 
 * Safely compares a plain text password with a bcrypt hash.
 * Used during login to verify user passwords.
 * 
 * @param {string} password - Plain text password to check
 * @param {string} hash - Bcrypt hash to compare against
 * @returns {Promise<boolean>} True if password matches hash, false otherwise
 * 
 * @example
 * ```typescript
 * const isValid = await comparePassword(inputPassword, storedHash);
 * if (isValid) {
 *   // Password is correct, authenticate user
 * }
 * ```
 * 
 * @security Uses constant-time comparison to prevent timing attacks
 */
export async function comparePassword(
    password: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}
