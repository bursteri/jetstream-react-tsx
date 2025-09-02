import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const TwoFactorChallenge: React.FC = () => {
    const [recovery, setRecovery] = useState(false);
    const recoveryCodeInput = useRef<HTMLInputElement>(null);
    const codeInput = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        code: '',
        recovery_code: '',
    });

    const toggleRecovery = async () => {
        setRecovery(!recovery);

        await new Promise(resolve => setTimeout(resolve, 0)); // nextTick equivalent

        if (!recovery) {
            recoveryCodeInput.current?.focus();
            setData('code', '');
        } else {
            codeInput.current?.focus();
            setData('recovery_code', '');
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('two-factor.login'));
    };

    return (
        <>
            <Head title="Two-factor Confirmation" />

            <AuthenticationCard 
                Title={recovery ? 'Two-factor recovery' : 'Two-factor authentication'}
                Description={
                    recovery 
                        ? 'Please confirm access to your account by entering one of your emergency recovery codes.' 
                        : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'
                }
            >
                <form onSubmit={submit} className="grid gap-4">
                    {!recovery ? (
                        <div className="grid gap-2">
                            <Label htmlFor="code">Authentication Code</Label>
                            <Input
                                id="code"
                                ref={codeInput}
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                type="text"
                                inputMode="numeric"
                                placeholder="000000"
                                autoFocus
                                autoComplete="one-time-code"
                            />
                            <InputError message={errors.code} />
                        </div>
                    ) : (
                        <div className="grid gap-2">
                            <Label htmlFor="recovery_code">Recovery Code</Label>
                            <Input
                                id="recovery_code"
                                ref={recoveryCodeInput}
                                value={data.recovery_code}
                                onChange={(e) => setData('recovery_code', e.target.value)}
                                type="text"
                                placeholder="xxxxx-xxxxx"
                                autoComplete="one-time-code"
                            />
                            <InputError message={errors.recovery_code} />
                        </div>
                    )}

                    <Button 
                        type="submit"
                        className={`w-full ${processing ? 'opacity-50' : ''}`}
                        disabled={processing}
                    >
                        {processing ? 'Verifying...' : 'Log in'}
                    </Button>

                    <button 
                        type="button" 
                        className="text-sm text-center underline hover:no-underline" 
                        onClick={toggleRecovery}
                    >
                        {recovery ? 'Use an authentication code' : 'Use a recovery code'}
                    </button>
                </form>
            </AuthenticationCard>
        </>
    );
};

export default TwoFactorChallenge;