import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

interface Props {
    className?: string;
}

export default function SetPasswordForm({ className }: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);

    const form = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const setPassword = () => {
        form.post(route('user-password.set'), {
            errorBag: 'setPassword',
            preserveScroll: true,
            onSuccess: () => form.reset(),
            onError: () => {
                if (form.errors.password) {
                    form.reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
            },
        });
    };

    return (
        <FormSection
            onSubmitted={setPassword}
            title="Set Password"
            description="Ensure your account is using a long, random password to stay secure."
            className={className}
            form={
                <>
                    <div className="col-span-6 sm:col-span-4">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            ref={passwordInput}
                            type="password"
                            className="mt-1 block w-full"
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            autoComplete="new-password"
                        />
                        <InputError message={form.errors.password} className="mt-2" />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            value={form.data.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                            autoComplete="new-password"
                        />
                        <InputError message={form.errors.password_confirmation} className="mt-2" />
                    </div>
                </>
            }
            actions={
                <>
                    <ActionMessage on={form.recentlySuccessful} className="mr-3">
                        Saved.
                    </ActionMessage>

                    <Button 
                        type="submit"
                        disabled={form.processing}
                        className={form.processing ? 'opacity-25' : ''}
                    >
                        Save
                    </Button>
                </>
            }
        />
    );
}