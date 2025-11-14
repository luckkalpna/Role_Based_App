// frontend/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
                Welcome to the Role-Based Application
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Sign up or log in to access your personalized dashboard.
            </p>
            <div className="space-x-4">
                <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
                    Login
                </Link>
                <Link href="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}