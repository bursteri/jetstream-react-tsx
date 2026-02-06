import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import Socialstream from '@/Components/Socialstream';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

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

const Login: React.FC<Props> = ({ canResetPassword, status, errors = {}, socialstream }) => {
    const form = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.transform((data) => ({
            ...data,
            remember: data.remember ? 'on' : '',
        }));
        
        form.post(route('login'), {
            onFinish: () => form.reset('password'),
        });
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
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            type="email"
                            placeholder="m@example.com"
                            required
                            autoFocus
                        />
                        <InputError message={form.errors.email} />
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
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            type="password"
                            autoComplete="current-password"
                            required
                        />
                        <InputError message={form.errors.password} />
                    </div>

                    <Button type="submit" className={`w-full ${form.processing ? 'opacity-50' : ''}`} disabled={form.processing}>
                        {form.processing ? 'Logging in...' : 'Login'}
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
