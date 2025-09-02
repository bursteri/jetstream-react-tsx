import React, { useState, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import ActionLink from '@/Components/ActionLink';
import ActionSection from '@/Components/ActionSection';
import ConnectedAccount from '@/Components/ConnectedAccount';
import DialogModal from '@/Components/DialogModal';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

interface Props {
    className?: string;
}

export default function ConnectedAccountsForm({ className }: Props) {
    const page = usePage<any>();
    const [accountId, setAccountId] = useState<number | null>(null);
    const [confirmingRemoveAccount, setConfirmingRemoveAccount] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const form = useForm({
        password: '',
    });

    const getAccountForProvider = (provider: any) => {
        return page.props.socialstream?.connectedAccounts
            ?.filter((account: any) => account.provider === provider.id)
            .shift();
    };

    const setProfilePhoto = (id: number) => {
        form.put(route('user-profile-photo.set', { id }), {
            preserveScroll: true
        });
    };

    const confirmRemoveAccount = (id: number) => {
        setAccountId(id);
        setConfirmingRemoveAccount(true);
        setTimeout(() => passwordInput.current?.focus(), 250);
    };

    const removeAccount = () => {
        form.delete(route('connected-accounts.destroy', { id: accountId }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => form.reset(),
        });
    };

    const closeModal = () => {
        setConfirmingRemoveAccount(false);
        form.reset();
    };

    return (
        <ActionSection
            title="Connected Accounts"
            description="Connect your social media accounts to enable Sign In with OAuth."
            className={className}
        >
            <div className="p-4 bg-red-500/10 text-red-500 border-l-4 border-red-600 rounded-sm font-medium text-sm">
                If you feel any of your connected accounts have been compromised, you should disconnect them
                immediately and change your password.
            </div>

            <div className="space-y-6 mt-6">
                {page.props.socialstream?.providers?.map((provider: any) => {
                    const account = getAccountForProvider(provider);
                    
                    return (
                        <ConnectedAccount
                            key={provider.id}
                            provider={provider}
                            createdAt={account?.created_at}
                            action={
                                account ? (
                                    <div className="flex items-center space-x-6">
                                        {page.props.jetstream?.managesProfilePhotos && account.avatar_path && (
                                            <button
                                                onClick={() => setProfilePhoto(account.id)}
                                                className="cursor-pointer ms-6 text-sm text-gray-500 hover:text-gray-700 focus:outline-hidden"
                                            >
                                                Use Avatar as Profile Photo
                                            </button>
                                        )}

                                        {(page.props.socialstream?.connectedAccounts?.length > 1 || page.props.socialstream?.hasPassword) && (
                                            <Button
                                                variant="destructive"
                                                onClick={() => confirmRemoveAccount(account.id)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <ActionLink href={route('oauth.redirect', { provider: provider.id })}>
                                        Connect
                                    </ActionLink>
                                )
                            }
                        />
                    );
                })}
            </div>

            {/* Confirmation Modal */}
            <DialogModal
                show={confirmingRemoveAccount}
                onClose={closeModal}
                title="Are you sure you want to remove this account?"
                content={
                    <>
                        <p>Please enter your password to confirm you would like to remove this account.</p>
                        <div className="mt-4">
                            <Input
                                ref={passwordInput}
                                type="password"
                                className="mt-1 block w-3/4"
                                placeholder="Password"
                                autoComplete="current-password"
                                value={form.data.password}
                                onChange={(e) => form.setData('password', e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        removeAccount();
                                    }
                                }}
                            />
                            <InputError message={form.errors.password} className="mt-2" />
                        </div>
                    </>
                }
                footer={
                    <>
                        <Button variant="outline" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button
                            className="ml-2"
                            onClick={removeAccount}
                            disabled={form.processing}
                        >
                            Remove Account
                        </Button>
                    </>
                }
            />
        </ActionSection>
    );
}