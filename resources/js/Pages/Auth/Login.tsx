import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import Socialstream from '@/Components/Socialstream';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

interface Props {
    canResetPassword?: boolean;
    status?: string;
    errors?: {
        email?: string;
        password?: string;
        socialstream?: string;
    };
    socialstream?: {
        show?: boolean;
        providers?: any[];
        prompt?: string;
        labels?: Record<string, string>;
    };
}

interface FormData {
    email: string;
    password: string;
    remember: boolean;
}

const Login: React.FC<Props> = ({ canResetPassword, status, errors = {}, socialstream }) => {
    const [form, setForm] = useState<FormData>({
        email: '',
        password: '',
        remember: true,
    });
    const [processing, setProcessing] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        try {
            // Transform data similar to Inertia's form.transform()
            const transformedData = {
                ...form,
                remember: form.remember ? 'on' : '',
            };

            // Replace with your form submission logic
            // This would typically be an Inertia post request or similar
            await fetch(route('login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(transformedData),
            });

            // Reset password field on finish
            setForm((prev) => ({ ...prev, password: '' }));
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <Head title="Log in" />

            <AuthenticationCard Title="Log in to your account" Description="Enter your email and password below to log in">
                {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={form.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            type="email"
                            placeholder="m@example.com"
                            required
                            autoFocus
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <a href={route('password.request')} className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </a>
                            )}
                        </div>
                        <Input
                            id="password"
                            value={form.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            type="password"
                            autoComplete="current-password"
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <Button type="submit" className={`w-full ${processing ? 'opacity-50' : ''}`} disabled={processing}>
                        {processing ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                {socialstream?.show && socialstream?.providers?.length && (
                    <Socialstream
                        error={errors?.socialstream}
                        prompt={socialstream?.prompt || 'Or Login Via'}
                        labels={socialstream?.labels || {}}
                        providers={socialstream?.providers || []}
                    />
                )}

                <div className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <a href="/register" className="underline">
                        Sign up
                    </a>
                </div>
            </AuthenticationCard>
        </>
    );
};

export default Login;
