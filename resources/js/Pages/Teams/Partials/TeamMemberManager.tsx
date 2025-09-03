import ActionSection from '@/Components/ActionSection';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { cn } from '@/lib/utils';
import { router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

interface TeamMemberManagerProps {
    team: any;
    availableRoles: any[];
    userPermissions: any;
    className?: string;
}

const TeamMemberManager: React.FC<TeamMemberManagerProps> = ({ team, availableRoles, userPermissions, className }) => {
    const page: any = usePage();

    const addTeamMemberForm = useForm({
        email: '',
        role: null as string | null,
    });

    const updateRoleForm = useForm({
        role: null as string | null,
    });

    const leaveTeamForm = useForm({});
    const removeTeamMemberForm = useForm({});

    const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false);
    const [managingRoleFor, setManagingRoleFor] = useState<any>(null);
    const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false);
    const [teamMemberBeingRemoved, setTeamMemberBeingRemoved] = useState<any>(null);

    const addTeamMember = () => {
        addTeamMemberForm.post(route('team-members.store', team), {
            errorBag: 'addTeamMember',
            preserveScroll: true,
            onSuccess: () => addTeamMemberForm.reset(),
        });
    };

    const cancelTeamInvitation = (invitation: any) => {
        router.delete(route('team-invitations.destroy', invitation), {
            preserveScroll: true,
        });
    };

    const manageRole = (teamMember: any) => {
        setManagingRoleFor(teamMember);
        updateRoleForm.setData('role', teamMember.membership.role);
        setCurrentlyManagingRole(true);
    };

    const updateRole = () => {
        updateRoleForm.put(route('team-members.update', [team, managingRoleFor]), {
            preserveScroll: true,
            onSuccess: () => setCurrentlyManagingRole(false),
        });
    };

    const confirmLeavingTeam = () => {
        setConfirmingLeavingTeam(true);
    };

    const leaveTeam = () => {
        leaveTeamForm.delete(route('team-members.destroy', [team, page.props.auth.user]));
    };

    const confirmTeamMemberRemoval = (teamMember: any) => {
        setTeamMemberBeingRemoved(teamMember);
    };

    const removeTeamMember = () => {
        removeTeamMemberForm.delete(route('team-members.destroy', [team, teamMemberBeingRemoved]), {
            errorBag: 'removeTeamMember',
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setTeamMemberBeingRemoved(null),
        });
    };

    const displayableRole = (role: string) => {
        return availableRoles.find((r) => r.key === role)?.name || role;
    };

    return (
        <div className={className}>
            {userPermissions.canAddTeamMembers && (
                <>
                    <SectionBorder />

                    <FormSection
                        onSubmitted={addTeamMember}
                        title="Add Team Member"
                        description="Add a new team member to your team, allowing them to collaborate with you."
                        form={
                            <>
                                <div className="col-span-6">
                                    <div className="max-w-xl text-sm text-zinc-600">
                                        Please provide the email address of the person you would like to add to this team.
                                    </div>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={addTeamMemberForm.data.email}
                                        onChange={(e) => addTeamMemberForm.setData('email', e.target.value)}
                                        type="email"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={addTeamMemberForm.errors.email} className="mt-2" />
                                </div>

                                {availableRoles.length > 0 && (
                                    <div className="col-span-6 lg:col-span-4">
                                        <Label htmlFor="roles">Role</Label>
                                        <InputError message={addTeamMemberForm.errors.role} className="mt-2" />

                                        <div className="relative z-0 mt-1 cursor-pointer rounded-lg border border-zinc-200">
                                            {availableRoles.map((role, i) => (
                                                <button
                                                    key={role.key}
                                                    type="button"
                                                    className={cn(
                                                        'relative inline-flex w-full rounded-lg px-4 py-3 focus:z-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden',
                                                        i > 0 && 'rounded-t-none border-t border-zinc-200 focus:border-none',
                                                        i !== availableRoles.length - 1 && 'rounded-b-none',
                                                    )}
                                                    onClick={() => addTeamMemberForm.setData('role', role.key)}
                                                >
                                                    <div
                                                        className={
                                                            addTeamMemberForm.data.role && addTeamMemberForm.data.role !== role.key
                                                                ? 'opacity-50'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="flex items-center">
                                                            <div
                                                                className={cn(
                                                                    'text-sm text-zinc-600',
                                                                    addTeamMemberForm.data.role === role.key && 'font-semibold',
                                                                )}
                                                            >
                                                                {role.name}
                                                            </div>

                                                            {addTeamMemberForm.data.role === role.key && (
                                                                <svg
                                                                    className="ms-2 size-5 text-green-400"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="1.5"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>

                                                        <div className="mt-2 text-start text-xs text-zinc-600">{role.description}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        }
                        actions={
                            <>
                                {addTeamMemberForm.recentlySuccessful && <span className="me-3 text-sm text-zinc-600">Added.</span>}
                                <Button
                                    type="submit"
                                    disabled={addTeamMemberForm.processing}
                                    className={addTeamMemberForm.processing ? 'opacity-25' : ''}
                                >
                                    Add
                                </Button>
                            </>
                        }
                    />
                </>
            )}

            {team.team_invitations?.length > 0 && userPermissions.canAddTeamMembers && (
                <>
                    <SectionBorder />

                    <ActionSection
                        title="Pending Team Invitations"
                        description="These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation."
                        content={
                            <div className="space-y-6">
                                {team.team_invitations.map((invitation: any) => (
                                    <div key={invitation.id} className="flex items-center justify-between">
                                        <div className="text-zinc-600">{invitation.email}</div>

                                        <div className="flex items-center">
                                            {userPermissions.canRemoveTeamMembers && (
                                                <button
                                                    className="ms-6 cursor-pointer text-sm text-red-500 focus:outline-hidden"
                                                    onClick={() => cancelTeamInvitation(invitation)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                </>
            )}

            {team.users?.length > 0 && (
                <>
                    <SectionBorder />

                    <ActionSection
                        title="Team Members"
                        description="All of the people that are part of this team."
                        content={
                            <div className="space-y-6">
                                {team.users.map((user: any) => (
                                    <div key={user.id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img className="size-8 rounded-full object-cover" src={user.profile_photo_url} alt={user.name} />
                                            <div className="ms-4">{user.name}</div>
                                        </div>

                                        <div className="flex items-center">
                                            {userPermissions.canUpdateTeamMembers && availableRoles.length ? (
                                                <button className="ms-2 text-sm text-zinc-400 underline" onClick={() => manageRole(user)}>
                                                    {displayableRole(user.membership.role)}
                                                </button>
                                            ) : availableRoles.length ? (
                                                <div className="ms-2 text-sm text-zinc-400">{displayableRole(user.membership.role)}</div>
                                            ) : null}

                                            {page.props.auth.user.id === user.id ? (
                                                <button className="ms-6 cursor-pointer text-sm text-red-500" onClick={confirmLeavingTeam}>
                                                    Leave
                                                </button>
                                            ) : userPermissions.canRemoveTeamMembers ? (
                                                <button
                                                    className="ms-6 cursor-pointer text-sm text-red-500"
                                                    onClick={() => confirmTeamMemberRemoval(user)}
                                                >
                                                    Remove
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                </>
            )}

            {/* Role Management Modal */}
            <Dialog open={currentlyManagingRole} onOpenChange={setCurrentlyManagingRole}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Manage Role</DialogTitle>
                    </DialogHeader>

                    {managingRoleFor && (
                        <div className="relative z-0 mt-1 cursor-pointer rounded-lg border border-zinc-200">
                            {availableRoles.map((role, i) => (
                                <button
                                    key={role.key}
                                    type="button"
                                    className={cn(
                                        'relative inline-flex w-full rounded-lg px-4 py-3 focus:z-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden',
                                        i > 0 && 'rounded-t-none border-t border-zinc-200 focus:border-none',
                                        i !== availableRoles.length - 1 && 'rounded-b-none',
                                    )}
                                    onClick={() => updateRoleForm.setData('role', role.key)}
                                >
                                    <div className={updateRoleForm.data.role && updateRoleForm.data.role !== role.key ? 'opacity-50' : ''}>
                                        <div className="flex items-center">
                                            <div className={cn('text-sm text-zinc-600', updateRoleForm.data.role === role.key && 'font-semibold')}>
                                                {role.name}
                                            </div>

                                            {updateRoleForm.data.role === role.key && (
                                                <svg
                                                    className="ms-2 size-5 text-green-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            )}
                                        </div>

                                        <div className="mt-2 text-xs text-zinc-600">{role.description}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setCurrentlyManagingRole(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={updateRole}
                            disabled={updateRoleForm.processing}
                            className={cn('ms-3', updateRoleForm.processing && 'opacity-25')}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Leave Team Confirmation Modal */}
            <Dialog open={confirmingLeavingTeam} onOpenChange={setConfirmingLeavingTeam}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Leave Team</DialogTitle>
                        <DialogDescription>Are you sure you would like to leave this team?</DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmingLeavingTeam(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={leaveTeam}
                            disabled={leaveTeamForm.processing}
                            className={cn('ms-3', leaveTeamForm.processing && 'opacity-25')}
                        >
                            Leave
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Remove Team Member Confirmation Modal */}
            <Dialog open={!!teamMemberBeingRemoved} onOpenChange={(open) => !open && setTeamMemberBeingRemoved(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Team Member</DialogTitle>
                        <DialogDescription>Are you sure you would like to remove this person from the team?</DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setTeamMemberBeingRemoved(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={removeTeamMember}
                            disabled={removeTeamMemberForm.processing}
                            className={cn('ms-3', removeTeamMemberForm.processing && 'opacity-25')}
                        >
                            Remove
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TeamMemberManager;
