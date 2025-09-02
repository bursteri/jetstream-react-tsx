import React from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ConnectedAccountsForm from '@/Pages/Profile/Partials/ConnectedAccountsForm';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import LogoutOtherBrowserSessionsForm from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import SectionBorder from '@/Components/SectionBorder';
import SetPasswordForm from '@/Pages/Profile/Partials/SetPasswordForm';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';

interface Props {
    confirmsTwoFactorAuthentication: boolean;
    sessions: Array<any>;
}

export default function Show({ confirmsTwoFactorAuthentication, sessions }: Props) {
    const page = usePage<any>();
    const { jetstream, socialstream, auth } = page.props;

    return (
        <AppLayout
            title="Profile"
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    {jetstream?.canUpdateProfileInformation && (
                        <>
                            <UpdateProfileInformationForm user={auth.user} />
                            <SectionBorder />
                        </>
                    )}

                    {jetstream?.canUpdatePassword && socialstream?.hasPassword ? (
                        <>
                            <UpdatePasswordForm className="mt-10 sm:mt-0" />
                            <SectionBorder />
                        </>
                    ) : (
                        <>
                            <SetPasswordForm className="mt-10 sm:mt-0" />
                            <SectionBorder />
                        </>
                    )}

                    {jetstream?.canManageTwoFactorAuthentication && socialstream?.hasPassword && (
                        <>
                            <TwoFactorAuthenticationForm
                                requiresConfirmation={confirmsTwoFactorAuthentication}
                                className="mt-10 sm:mt-0"
                            />
                            <SectionBorder />
                        </>
                    )}

                    {socialstream?.show && (
                        <ConnectedAccountsForm className="mt-10 sm:mt-0" />
                    )}

                    {socialstream?.hasPassword && (
                        <>
                            <SectionBorder />
                            <LogoutOtherBrowserSessionsForm sessions={sessions} className="mt-10 sm:mt-0" />
                        </>
                    )}

                    {jetstream?.hasAccountDeletionFeatures && socialstream?.hasPassword && (
                        <>
                            <SectionBorder />
                            <DeleteUserForm className="mt-10 sm:mt-0" />
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}