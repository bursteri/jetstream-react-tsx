import ActionSection from '@/Components/ActionSection';
import DialogModal from '@/Components/DialogModal';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

interface Props {
    className?: string;
}

export default function DeleteUserForm({ className }: Props) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const form = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
        setTimeout(() => passwordInput.current?.focus(), 250);
    };

    const deleteUser = () => {
        form.delete(route('current-user.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => form.reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        form.reset();
    };

    return (
        <ActionSection title="Delete Account" description="Permanently delete your account." className={className}>
            <div className="max-w-xl text-sm text-zinc-600">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download
                any data or information that you wish to retain.
            </div>

            <div className="mt-5">
                <Button variant="destructive" onClick={confirmUserDeletion}>
                    Delete Account
                </Button>
            </div>

            {/* Delete Account Confirmation Modal */}
            <DialogModal
                show={confirmingUserDeletion}
                onClose={closeModal}
                title="Delete Account"
                content={
                    <>
                        <p>
                            Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be
                            permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                        </p>
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
                                        deleteUser();
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
                        <Button variant="destructive" className="ms-3" onClick={deleteUser} disabled={form.processing}>
                            Delete Account
                        </Button>
                    </>
                }
            />
        </ActionSection>
    );
}
