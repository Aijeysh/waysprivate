/**
 * Admin Login Page Component
 * 
 * Purpose: Authentication page for blog administrators to access the admin panel.
 * Handles login credentials, token storage, and redirection to admin dashboard.
 * 
 * Features:
 * - Form validation (username, password required)
 * - Loading states during authentication
 * - Error message display
 * - JWT token storage in localStorage
 * - Automatic redirect on successful login
 * - Responsive design with gradient background
 * 
 * Route: /admin/login
 * Authentication: Public (no auth required for this page)
 * Redirects to: /admin/blogs (on success)
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Admin Login Page Component
 * 
 * Client component managing login form state and authentication API calls.
 * Uses Next.js router for navigation after successful authentication.
 * 
 * @returns {JSX.Element} Login form with validation and error handling
 */
export default function AdminLoginPage() {
    // Next.js router for navigation
    const router = useRouter();

    // Form state management
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handle Login Form Submission
     * 
     * Sends credentials to /api/admin/auth endpoint.
     * On success: stores JWT token and redirects to admin dashboard.
     * On failure: displays error message.
     * 
     * @param {React.FormEvent} e - Form submission event
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Call authentication API
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Store JWT token in localStorage
                localStorage.setItem('adminToken', data.data.token);

                // Redirect to admin dashboard
                router.push('/admin/blogs');
            } else {
                // Display error message
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : `An error occured`;
            console.log(errorMessage);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4">
            {/* Login Card */}
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Admin Login
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sign in to manage blog posts
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Error Message Display */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Username Input */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                            aria-label="Username"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                            aria-label="Password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={isLoading ? 'Signing in...' : 'Sign In'}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Default Credentials Info */}
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>Default credentials: admin / admin123</p>
                    <p className="text-xs mt-1">(Change in .env.local)</p>
                </div>
            </div>
        </div>
    );
}
