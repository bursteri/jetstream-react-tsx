import React, { useRef, useState } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

interface Props {
    user: any;
}

export default function UpdateProfileInformationForm({ user }: Props) {
    const page = usePage<any>();
    const form = useForm({
        _method: 'PUT',
        name: user.name,
        email: user.email,
        photo: null as File | null,
    });

    const [verificationLinkSent, setVerificationLinkSent] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoInput = useRef<HTMLInputElement>(null);

    const updateProfileInformation = () => {
        if (photoInput.current?.files?.[0]) {
            form.setData('photo', photoInput.current.files[0]);
        }

        form.post(route('user-profile-information.update'), {
            errorBag: 'updateProfileInformation',
            preserveScroll: true,
            onSuccess: () => clearPhotoFileInput(),
        });
    };

    const sendEmailVerification = () => {
        setVerificationLinkSent(true);
    };

    const selectNewPhoto = () => {
        photoInput.current?.click();
    };

    const updatePhotoPreview = () => {
        const photo = photoInput.current?.files?.[0];

        if (!photo) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            setPhotoPreview(e.target?.result as string);
        };

        reader.readAsDataURL(photo);
    };

    const deletePhoto = () => {
        router.delete(route('current-user-photo.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
            },
        });
    };

    const clearPhotoFileInput = () => {
        if (photoInput.current?.value) {
            photoInput.current.value = '';
        }
    };

    return (
        <FormSection
            onSubmit={updateProfileInformation}
            title="Profile Information"
            description="Update your account's profile information and email address."
            form={
                <>
                    {/* Profile Photo */}
                    {page.props.jetstream?.managesProfilePhotos && (
                        <div className="col-span-6 sm:col-span-4">
                            {/* Profile Photo File Input */}
                            <input
                                id="photo"
                                ref={photoInput}
                                type="file"
                                className="hidden"
                                onChange={updatePhotoPreview}
                            />

                            <Label htmlFor="photo">Photo</Label>

                            {/* Current Profile Photo */}
                            {!photoPreview && (
                                <div className="mt-2">
                                    <img 
                                        src={user.profile_photo_url} 
                                        alt={user.name} 
                                        className="rounded-full size-20 object-cover" 
                                    />
                                </div>
                            )}

                            {/* New Profile Photo Preview */}
                            {photoPreview && (
                                <div className="mt-2">
                                    <span
                                        className="block rounded-full size-20 bg-cover bg-no-repeat bg-center"
                                        style={{ backgroundImage: `url('${photoPreview}')` }}
                                    />
                                </div>
                            )}

                            <Button
                                type="button"
                                variant="secondary"
                                className="mt-2 me-2"
                                onClick={selectNewPhoto}
                            >
                                Select A New Photo
                            </Button>

                            {user.profile_photo_path && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="mt-2"
                                    onClick={deletePhoto}
                                >
                                    Remove Photo
                                </Button>
                            )}

                            <InputError message={form.errors.photo} className="mt-2" />
                        </div>
                    )}

                    {/* Name */}
                    <div className="col-span-6 sm:col-span-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            className="mt-1 block w-full"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            required
                            autoComplete="name"
                        />
                        <InputError message={form.errors.name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div className="col-span-6 sm:col-span-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError message={form.errors.email} className="mt-2" />

                        {page.props.jetstream?.hasEmailVerification && user.email_verified_at === null && (
                            <div>
                                <p className="text-sm mt-2">
                                    Your email address is unverified.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-1"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            sendEmailVerification();
                                        }}
                                    >
                                        Click here to re-send the verification email.
                                    </Link>
                                </p>

                                {verificationLinkSent && (
                                    <div className="mt-2 font-medium text-sm text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            }
            actions={
                <>
                    <ActionMessage on={form.recentlySuccessful} className="me-3">
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