// frontend/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
    }

    if (!user) {
        return null; // Should redirect, but good to have a fallback
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Welcome, {user.name} ({user.role})!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    This is your {user.role} dashboard.
                    {user.role === 'Admin' && " Here you can manage users, content, or other administrative tasks."}
                    {user.role === 'User' && " You can view your personal information and activities here."}
                </p>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}