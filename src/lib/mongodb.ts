/**
 * MongoDB Connection Utility
 * 
 * Purpose: Manages MongoDB database connections using Mongoose with
 * connection caching to prevent connection pool exhaustion in serverless
 * environments like Next.js API routes.
 * 
 * Features:
 * - Connection pooling and caching
 * - Hot reload support in development
 * - Automatic reconnection handling
 * - Environment variable configuration
 * 
 * Implementation Details:
 * - Uses global cache to persist connection across hot reloads
 * - Prevents connection growth in development mode
 * - Reuses existing connections when available
 * - Throws error if MONGODB_URI not configured
 * 
 * @module lib/mongodb
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    //*eslint disable next line novar
    var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * Database Connection Function
 * 
 * Establishes and maintains a connection to MongoDB Atlas using Mongoose.
 * Implements connection caching to prevent multiple connections in 
 * serverless environments.
 * 
 * Flow:
 * 1. Check if cached connection exists - return if yes
 * 2. If no pending connection, create new connection promise
 * 3. Wait for connection to establish
 * 4. Cache connection for reuse
 * 5. Return established connection
 * 
 * @returns {Promise<typeof mongoose>} Mongoose instance with active connection
 * @throws {Error} If MongoDB connection fails or MONGODB_URI not set
 * 
 * @example
 * ```typescript
 * import dbConnect from '@/lib/mongodb';
 * 
 * export async function GET() {
 *   await dbConnect();
 *   const data = await Model.find();
 *   return Response.json(data);
 * }
 * ```
 * 
 * @performance Connection is cached globally to avoid reconnecting on each API call
 */
async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
