// frontend/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState<string | null>(null);
    const { login, user } = useAuth();
    const router = useRouter();

    if (user) { // Redirect if already logged in
        router.push('/dashboard');
        return null;
    }

    const onSubmit = async (data: any) => {
        try {
            setError(null);
            const res = await axios.post('http://localhost:5000/api/auth/signup', data);
            login(res.data.token, res.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{String(errors.password.message)}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            id="role"
                            {...register('role', { required: 'Role is required' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-xs mt-1">{String(errors.role.message)}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign Up
                        </button>
                        <Link href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Already have an account? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}