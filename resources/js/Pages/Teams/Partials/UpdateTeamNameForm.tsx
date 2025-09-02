import React from 'react';
import { useForm } from '@inertiajs/react';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import route from 'ziggy-js';

interface UpdateTeamNameFormProps {
    team: any;
    permissions: any;
}

const UpdateTeamNameForm: React.FC<UpdateTeamNameFormProps> = ({ team, permissions }) => {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: team.name,
    });

    const updateTeamName = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('teams.update', team), {
            errorBag: 'updateTeamName',
            preserveScroll: true,
        });
    };

    return (
        <FormSection
            onSubmit={updateTeamName}
            title="Team Name"
            description="The team's name and owner information."
            form={
                <>
                    <div className="col-span-6">
                        <Label>Team Owner</Label>

                        <div className="flex items-center mt-2">
                            <img 
                                className="size-12 rounded-full object-cover" 
                                src={team.owner.profile_photo_url} 
                                alt={team.owner.name}
                            />

                            <div className="ms-4 leading-tight">
                                <div className="text-gray-900">{team.owner.name}</div>
                                <div className="text-gray-700 text-sm">
                                    {team.owner.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                        <Label htmlFor="name">Team Name</Label>

                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            disabled={!permissions.canUpdateTeam}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                </>
            }
            actions={
                permissions.canUpdateTeam ? (
                    <>
                        {recentlySuccessful && (
                            <span className="me-3 text-sm text-gray-600">Saved.</span>
                        )}

                        <Button 
                            type="submit"
                            disabled={processing}
                            className={processing ? 'opacity-25' : ''}
                        >
                            Save
                        </Button>
                    </>
                ) : undefined
            }
        />
    );
};

export default UpdateTeamNameForm;