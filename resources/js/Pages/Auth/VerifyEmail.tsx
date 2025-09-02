import AuthenticationCard from '@/Components/AuthenticationCard';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useMemo } from 'react';

import { Button } from '@/Components/ui/button';

interface Props {
    status?: string;
}

const VerifyEmail: React.FC<Props> = ({ status }) => {
    const { post, processing } = useForm({});

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    const verificationLinkSent = useMemo(() => status === 'verification-link-sent', [status]);

    return (
        <>
            <Head title="Email Verification" />

            <AuthenticationCard 
                Title="Verify your email" 
                Description="Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."
            >
                {verificationLinkSent && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        A new verification link has been sent to the email address you provided in your profile settings.
                    </div>
                )}

                <form onSubmit={submit} className="grid gap-4">
                    <Button 
                        type="submit"
                        className={`w-full ${processing ? 'opacity-50' : ''}`}
                        disabled={processing}
                    >
                        {processing ? 'Sending...' : 'Resend Verification Email'}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-sm">
                        <Link
                            href={route('profile.show')}
                            className="underline hover:no-underline"
                        >
                            Edit Profile
                        </Link>
                        <span className="text-muted-foreground">or</span>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="underline hover:no-underline"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
};

export default VerifyEmail;