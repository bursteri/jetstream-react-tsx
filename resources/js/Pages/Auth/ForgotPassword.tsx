import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

interface Props {
    status?: string;
}

const ForgotPassword: React.FC<Props> = ({ status }) => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <AuthenticationCard 
                Title="Forgot your password?" 
                Description="No problem. Just let us know your email address and we will email you a password reset link."
            >
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            type="email"
                            placeholder="m@example.com"
                            required
                            autoFocus
                            autoComplete="username"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <Button 
                        type="submit"
                        className={`w-full ${processing ? 'opacity-50' : ''}`}
                        disabled={processing}
                    >
                        {processing ? 'Sending...' : 'Email Password Reset Link'}
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                    Remember your password?{' '}
                    <Link href={route('login')} className="underline">
                        Sign in
                    </Link>
                </div>
            </AuthenticationCard>
        </>
    );
};

export default ForgotPassword;