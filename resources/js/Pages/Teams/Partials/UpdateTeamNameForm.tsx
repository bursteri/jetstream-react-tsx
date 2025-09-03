import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useForm } from '@inertiajs/react';
import React from 'react';

interface UpdateTeamNameFormProps {
    team: any;
    permissions: any;
}

interface FormData {
    name: string;
}

const UpdateTeamNameForm: React.FC<UpdateTeamNameFormProps> = ({ team, permissions }) => {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm<FormData>({
        name: team.name,
    });

    const updateTeamName = () => {
        put(route('teams.update', team), {
            errorBag: 'updateTeamName',
            preserveScroll: true,
        });
    };

    return (
        <FormSection
            onSubmitted={updateTeamName}
            title="Team Name"
            description="The team's name and owner information."
            form={
                <>
                    <div className="col-span-6">
                        <Label>Team Owner</Label>

                        <div className="mt-2 flex items-center">
                            <img className="size-12 rounded-full object-cover" src={team.owner.profile_photo_url} alt={team.owner.name} />

                            <div className="ms-4 leading-tight">
                                <div className="text-zinc-900">{team.owner.name}</div>
                                <div className="text-sm text-zinc-700">{team.owner.email}</div>
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
                        {recentlySuccessful && <span className="me-3 text-sm text-zinc-600">Saved.</span>}

                        <Button type="submit" disabled={processing} className={processing ? 'opacity-25' : ''}>
                            Save
                        </Button>
                    </>
                ) : undefined
            }
        />
    );
};

export default UpdateTeamNameForm;
