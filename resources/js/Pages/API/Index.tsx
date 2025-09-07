import ActionSection from '@/Components/ActionSection';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import SidebarLayout from '@/Layouts/SidebarLayout';
import type { ApiToken } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    tokens: ApiToken[];
    availablePermissions: string[];
    defaultPermissions: string[];
}

const Index: React.FC<Props> = ({ tokens, availablePermissions, defaultPermissions }) => {
    const page = usePage() as any;

    const createApiTokenForm = useForm({
        name: '',
        permissions: defaultPermissions as string[],
    });

    const updateApiTokenForm = useForm({
        permissions: [] as string[],
    });

    const deleteApiTokenForm = useForm({});

    const [displayingToken, setDisplayingToken] = useState(false);
    const [managingPermissionsFor, setManagingPermissionsFor] = useState<ApiToken | null>(null);
    const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState<ApiToken | null>(null);

    const createApiToken = () => {
        createApiTokenForm.post(route('api-tokens.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setDisplayingToken(true);
                createApiTokenForm.reset();
                toast.success('API token created successfully.');
            },
        });
    };

    const manageApiTokenPermissions = (token: ApiToken) => {
        updateApiTokenForm.setData('permissions', token.abilities);
        setManagingPermissionsFor(token);
    };

    const updateApiToken = () => {
        updateApiTokenForm.put(route('api-tokens.update', { token: managingPermissionsFor?.id }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setManagingPermissionsFor(null);
                toast.success('API token permissions updated successfully.');
            },
        });
    };

    const confirmApiTokenDeletion = (token: ApiToken) => {
        setApiTokenBeingDeleted(token);
    };

    const deleteApiToken = () => {
        deleteApiTokenForm.delete(route('api-tokens.destroy', { token: apiTokenBeingDeleted?.id }), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setApiTokenBeingDeleted(null);
                toast.success('API token deleted successfully.');
            },
        });
    };

    const handlePermissionChange = (permission: string, checked: boolean, form: 'create' | 'update') => {
        if (form === 'create') {
            const currentPermissions = createApiTokenForm.data.permissions;
            if (checked) {
                createApiTokenForm.setData('permissions', [...currentPermissions, permission]);
            } else {
                createApiTokenForm.setData(
                    'permissions',
                    currentPermissions.filter((p) => p !== permission),
                );
            }
        } else {
            const currentPermissions = updateApiTokenForm.data.permissions;
            if (checked) {
                updateApiTokenForm.setData('permissions', [...currentPermissions, permission]);
            } else {
                updateApiTokenForm.setData(
                    'permissions',
                    currentPermissions.filter((p) => p !== permission),
                );
            }
        }
    };

    return (
        <SidebarLayout
            title="API Tokens"
            breadcrumbs={[
                { label: 'Account', href: '#' },
                { label: 'API Tokens', current: true },
            ]}
        >
            <div>
                <div className="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
                    <div>
                        {/* Generate API Token */}
                        <FormSection
                            onSubmitted={createApiToken}
                            title="Create API Token"
                            description="API tokens allow third-party services to authenticate with our application on your behalf."
                            form={
                                <>
                                    <div className="col-span-6 sm:col-span-4">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={createApiTokenForm.data.name}
                                            onChange={(e) => createApiTokenForm.setData('name', e.target.value)}
                                            type="text"
                                            className="mt-1 block w-full"
                                            autoFocus
                                        />
                                        <InputError message={createApiTokenForm.errors.name} className="mt-2" />
                                    </div>

                                    {/* Token Permissions */}
                                    {availablePermissions.length > 0 && (
                                        <div className="col-span-6">
                                            <Label htmlFor="permissions">Permissions</Label>

                                            <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {availablePermissions.map((permission) => (
                                                    <div key={permission}>
                                                        <label className="flex items-center">
                                                            <Checkbox
                                                                checked={createApiTokenForm.data.permissions.includes(permission)}
                                                                onCheckedChange={(checked) =>
                                                                    handlePermissionChange(permission, checked as boolean, 'create')
                                                                }
                                                            />
                                                            <span className="ms-2 text-sm text-zinc-600 dark:text-zinc-400">{permission}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            }
                            actions={
                                <Button className={createApiTokenForm.processing ? 'opacity-25' : ''} disabled={createApiTokenForm.processing}>
                                    Create
                                </Button>
                            }
                        />

                        {tokens.length > 0 && (
                            <>
                                <SectionBorder />

                                {/* Manage API Tokens */}
                                <div className="mt-10 sm:mt-0">
                                    <ActionSection
                                        title="Manage API Tokens"
                                        description="You may delete any of your existing tokens if they are no longer needed."
                                    >
                                        {/* API Token List */}
                                        <div className="space-y-6">
                                            {tokens.map((token) => (
                                                <div key={token.id} className="flex items-center justify-between">
                                                    <div className="break-all dark:text-white">{token.name}</div>

                                                    <div className="ms-2 flex items-center">
                                                        {token.last_used_ago && (
                                                            <div className="text-sm text-zinc-400">Last used {token.last_used_ago}</div>
                                                        )}

                                                        {availablePermissions.length > 0 && (
                                                            <button
                                                                className="ms-6 cursor-pointer text-sm text-zinc-400 underline"
                                                                onClick={() => manageApiTokenPermissions(token)}
                                                            >
                                                                Permissions
                                                            </button>
                                                        )}

                                                        <button
                                                            className="ms-6 cursor-pointer text-sm text-red-500"
                                                            onClick={() => confirmApiTokenDeletion(token)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ActionSection>
                                </div>
                            </>
                        )}

                        {/* Token Value Modal */}
                        <Dialog
                            open={displayingToken}
                            onOpenChange={(open) => {
                                if (!open) setDisplayingToken(false);
                            }}
                        >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>API Token</DialogTitle>
                                    <DialogDescription>Please copy your new API token. For your security, it won't be shown again.</DialogDescription>
                                </DialogHeader>

                                {page.props.jetstream?.flash?.token && (
                                    <div className="rounded bg-zinc-100 px-4 py-2 font-mono text-sm break-all text-zinc-500 dark:bg-zinc-900">
                                        {page.props.jetstream.flash.token}
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setDisplayingToken(false)}>
                                        Close
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* API Token Permissions Modal */}
                        <Dialog
                            open={managingPermissionsFor !== null}
                            onOpenChange={(open) => {
                                if (!open) setManagingPermissionsFor(null);
                            }}
                        >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>API Token Permissions</DialogTitle>
                                </DialogHeader>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {availablePermissions.map((permission) => (
                                        <div key={permission}>
                                            <label className="flex items-center">
                                                <Checkbox
                                                    checked={updateApiTokenForm.data.permissions.includes(permission)}
                                                    onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean, 'update')}
                                                />
                                                <span className="ms-2 text-sm text-zinc-600 dark:text-zinc-400">{permission}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setManagingPermissionsFor(null)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        className={updateApiTokenForm.processing ? 'opacity-25' : ''}
                                        disabled={updateApiTokenForm.processing}
                                        onClick={updateApiToken}
                                    >
                                        Save
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Delete Token Confirmation Modal */}
                        <Dialog
                            open={apiTokenBeingDeleted !== null}
                            onOpenChange={(open) => {
                                if (!open) setApiTokenBeingDeleted(null);
                            }}
                        >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete API Token</DialogTitle>
                                    <DialogDescription>Are you sure you would like to delete this API token?</DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setApiTokenBeingDeleted(null)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className={deleteApiTokenForm.processing ? 'opacity-25' : ''}
                                        disabled={deleteApiTokenForm.processing}
                                        onClick={deleteApiToken}
                                    >
                                        Delete
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
};

export default Index;
