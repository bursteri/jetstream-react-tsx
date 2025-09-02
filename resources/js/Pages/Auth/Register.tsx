import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import React from 'react';

// Import components - adjust paths as needed
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import Socialstream from '@/Components/Socialstream';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

// Type definitions for page props
interface SocialstreamProvider {
    id: string;
    name: string;
    buttonLabel?: string;
}

interface SocialstreamProps {
    show?: boolean;
    providers?: SocialstreamProvider[];
    prompt?: string;
    labels?: Record<string, string>;
}

interface PageProps extends InertiaPageProps {
    socialstream?: SocialstreamProps;
    errors?: {
        socialstream?: string;
        [key: string]: string | undefined;
    };
}

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    terms: boolean;
}

const Register: React.FC = () => {
    const page = usePage<PageProps>();

    const { data, setData, post, processing, errors, reset } = useForm<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Directly update password_confirmation before posting
        data.password_confirmation = data.password;
        
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            <AuthenticationCard
                Title="Create an account"
                Description="Enter your information below to create your account"
                footer={
                    <div className="mt-8 max-w-xs text-center text-xs text-balance text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                        By clicking continue, you agree to our <a href={route('terms.show')}>Terms of Service</a> and{' '}
                        <a href={route('policy.show')}>Privacy Policy</a>.
                    </div>
                }
            >
                <form onSubmit={submit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoFocus
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            autoComplete="username"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <Button type="submit" className={`w-full ${processing ? 'opacity-50' : ''}`} disabled={processing}>
                        {processing ? 'Creating account...' : 'Create account'}
                    </Button>
                </form>

                {page.props.socialstream?.show && page.props.socialstream?.providers?.length && (
                    <Socialstream
                        error={page.props?.errors?.socialstream}
                        prompt={page.props.socialstream?.prompt || 'Or Login Via'}
                        labels={page.props.socialstream?.labels || {}}
                        providers={page.props.socialstream?.providers || []}
                    />
                )}

                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link href={route('login')} className="underline">
                        Sign in
                    </Link>
                </div>
            </AuthenticationCard>
        </>
    );
};

export default Register;
