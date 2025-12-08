import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, generateAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: 'Username and password are required' },
                { status: 400 }
            );
        }

        const isValid = await verifyAdminCredentials(username, password);

        if (!isValid) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = generateAdminToken(username);

        return NextResponse.json({
            success: true,
            data: { token, username },
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
