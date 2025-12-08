import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export interface AdminUser {
    username: string;
    isAdmin: boolean;
}

/**
 * Verify admin credentials
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
 * Generate JWT token for admin
 */
export function generateAdminToken(username: string): string {
    const payload: AdminUser = {
        username,
        isAdmin: true,
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d',
    });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): AdminUser | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AdminUser;
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

/**
 * Compare password with hash
 */
export async function comparePassword(
    password: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}
