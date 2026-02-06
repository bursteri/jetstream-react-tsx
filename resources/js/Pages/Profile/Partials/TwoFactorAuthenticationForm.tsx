import ActionSection from '@/Components/ActionSection';
import ConfirmsPassword from '@/Components/ConfirmsPassword';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Props {
    requiresConfirmation: boolean;
    className?: string;
}

export default function TwoFactorAuthenticationForm({ requiresConfirmation, className }: Props) {
    const page = usePage();
    const [enabling, setEnabling] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [disabling, setDisabling] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [setupKey, setSetupKey] = useState<string | null>(null);
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

    const confirmationForm = useForm({
        code: '',
    });

    const twoFactorEnabled = !enabling && page.props.auth.user?.two_factor_enabled;

    useEffect(() => {
        if (!twoFactorEnabled) {
            confirmationForm.reset();
            confirmationForm.clearErrors();
        }
    }, [twoFactorEnabled]);

    const enableTwoFactorAuthentication = () => {
        setEnabling(true);

        router.post(
            route('two-factor.enable'),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    Promise.all([showQrCode(), showSetupKey(), showRecoveryCodes()]).catch(() => {});
                },
                onFinish: () => {
                    setEnabling(false);
                    setConfirming(requiresConfirmation);
                },
            },
        );
    };

    const showQrCode = () => {
        return new Promise((resolve) => {
            router.get(route('two-factor.qr-code'), {}, {
                onSuccess: (page) => {
                    setQrCode(page.props.svg as string);
                    resolve(page);
                },
                preserveState: true,
                preserveScroll: true,
            });
        });
    };

    const showSetupKey = () => {
        return new Promise((resolve) => {
            router.get(route('two-factor.secret-key'), {}, {
                onSuccess: (page) => {
                    setSetupKey(page.props.secretKey as string);
                    resolve(page);
                },
                preserveState: true,
                preserveScroll: true,
            });
        });
    };

    const showRecoveryCodes = () => {
        return new Promise((resolve) => {
            router.get(route('two-factor.recovery-codes'), {}, {
                onSuccess: (page) => {
                    setRecoveryCodes((page.props.recoveryCodes as string[]) || []);
                    resolve(page);
                },
                preserveState: true,
                preserveScroll: true,
            });
        });
    };

    const confirmTwoFactorAuthentication = () => {
        confirmationForm.post(route('two-factor.confirm'), {
            errorBag: 'confirmTwoFactorAuthentication',
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setConfirming(false);
                setQrCode(null);
                setSetupKey(null);
            },
        });
    };

    const regenerateRecoveryCodes = () => {
        router.post(route('two-factor.recovery-codes'), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => showRecoveryCodes(),
        });
    };

    const disableTwoFactorAuthentication = () => {
        setDisabling(true);

        router.delete(route('two-factor.disable'), {
            preserveScroll: true,
            onSuccess: () => {
                setDisabling(false);
                setConfirming(false);
            },
        });
    };

    return (
        <ActionSection title="Two Factor Authentication" description="Add additional security to your account using two factor authentication." className={className}>
            {twoFactorEnabled && !confirming ? (
                <h3 className="text-lg font-medium text-zinc-900">You have enabled two factor authentication.</h3>
            ) : twoFactorEnabled && confirming ? (
                <h3 className="text-lg font-medium text-zinc-900">Finish enabling two factor authentication.</h3>
            ) : (
                <h3 className="text-lg font-medium text-zinc-900">You have not enabled two factor authentication.</h3>
            )}

            <div className="mt-3 max-w-xl text-sm text-zinc-600">
                <p>
                    When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve
                    this token from your phone's Google Authenticator application.
                </p>
            </div>

            {twoFactorEnabled && (
                <div>
                    {qrCode && (
                        <div>
                            <div className="mt-4 max-w-xl text-sm text-zinc-600">
                                {confirming ? (
                                    <p className="font-semibold">
                                        To finish enabling two factor authentication, scan the following QR code using your phone's authenticator
                                        application or enter the setup key and provide the generated OTP code.
                                    </p>
                                ) : (
                                    <p>
                                        Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator
                                        application or enter the setup key.
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 inline-block bg-white p-2" dangerouslySetInnerHTML={{ __html: qrCode }} />

                            {setupKey && (
                                <div className="mt-4 max-w-xl text-sm text-zinc-600">
                                    <p className="font-semibold">
                                        Setup Key: <span dangerouslySetInnerHTML={{ __html: setupKey }} />
                                    </p>
                                </div>
                            )}

                            {confirming && (
                                <div className="mt-4">
                                    <Label htmlFor="code">Code</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        name="code"
                                        className="mt-1 block w-1/2"
                                        inputMode="numeric"
                                        autoFocus
                                        autoComplete="one-time-code"
                                        value={confirmationForm.data.code}
                                        onChange={(e) => confirmationForm.setData('code', e.target.value)}
                                        onKeyUp={(e) => {
                                            if (e.key === 'Enter') {
                                                confirmTwoFactorAuthentication();
                                            }
                                        }}
                                    />
                                    <InputError message={confirmationForm.errors.code} className="mt-2" />
                                </div>
                            )}
                        </div>
                    )}

                    {recoveryCodes.length > 0 && !confirming && (
                        <div>
                            <div className="mt-4 max-w-xl text-sm text-zinc-600">
                                <p className="font-semibold">
                                    Store these recovery codes in a secure password manager. They can be used to recover access to your account if
                                    your two factor authentication device is lost.
                                </p>
                            </div>

                            <div className="mt-4 grid max-w-xl gap-1 rounded-lg bg-zinc-100 px-4 py-4 font-mono text-sm">
                                {recoveryCodes.map((code) => (
                                    <div key={code}>{code}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-5">
                {!twoFactorEnabled ? (
                    <ConfirmsPassword onConfirmed={enableTwoFactorAuthentication}>
                        <Button type="button" disabled={enabling} className={enabling ? 'opacity-25' : ''}>
                            Enable
                        </Button>
                    </ConfirmsPassword>
                ) : (
                    <div className="flex items-center gap-3">
                        {confirming && (
                            <ConfirmsPassword onConfirmed={confirmTwoFactorAuthentication}>
                                <Button
                                    type="button"
                                    disabled={enabling || confirmationForm.processing}
                                    className={enabling || confirmationForm.processing ? 'opacity-25' : ''}
                                >
                                    Confirm
                                </Button>
                            </ConfirmsPassword>
                        )}

                        {recoveryCodes.length > 0 && !confirming && (
                            <ConfirmsPassword onConfirmed={regenerateRecoveryCodes}>
                                <Button variant="secondary">Regenerate Recovery Codes</Button>
                            </ConfirmsPassword>
                        )}

                        {recoveryCodes.length === 0 && !confirming && (
                            <ConfirmsPassword onConfirmed={showRecoveryCodes}>
                                <Button variant="secondary">Show Recovery Codes</Button>
                            </ConfirmsPassword>
                        )}

                        {confirming ? (
                            <ConfirmsPassword onConfirmed={disableTwoFactorAuthentication}>
                                <Button variant="secondary" disabled={disabling} className={disabling ? 'opacity-25' : ''}>
                                    Cancel
                                </Button>
                            </ConfirmsPassword>
                        ) : (
                            <ConfirmsPassword onConfirmed={disableTwoFactorAuthentication}>
                                <Button variant="destructive" disabled={disabling} className={disabling ? 'opacity-25' : ''}>
                                    Disable
                                </Button>
                            </ConfirmsPassword>
                        )}
                    </div>
                )}
            </div>
        </ActionSection>
    );
}
