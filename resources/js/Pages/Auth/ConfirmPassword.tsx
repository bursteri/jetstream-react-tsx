import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import React, { useRef } from 'react';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const ConfirmPassword: React.FC = () => {
    const passwordInput = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => {
                reset();
                passwordInput.current?.focus();
            },
        });
    };

    return (
        <>
            <Head title="Secure Area" />

            <AuthenticationCard 
                Title="Confirm Password" 
                Description="This is a secure area of the application. Please confirm your password before continuing."
            >
                <form onSubmit={submit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            required
                            autoComplete="current-password"
                            autoFocus
                        />
                        <InputError message={errors.password} />
                    </div>

                    <Button 
                        type="submit"
                        className={`w-full ${processing ? 'opacity-50' : ''}`}
                        disabled={processing}
                    >
                        {processing ? 'Confirming...' : 'Confirm'}
                    </Button>
                </form>
            </AuthenticationCard>
        </>
    );
};

export default ConfirmPassword;