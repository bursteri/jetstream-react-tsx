import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import route from 'ziggy-js';

const CreateTeamForm: React.FC = () => {
    const { auth }: any = usePage().props;
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const createTeam = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('teams.store'), {
            errorBag: 'createTeam',
            preserveScroll: true,
        });
    };

    return (
        <FormSection
            onSubmit={createTeam}
            title="Team Details"
            description="Create a new team to collaborate with others on projects."
            form={
                <>
                    <div className="col-span-6">
                        <Label>Team Owner</Label>

                        <div className="flex items-center mt-2">
                            <img 
                                className="object-cover size-12 rounded-full" 
                                src={auth.user.profile_photo_url} 
                                alt={auth.user.name}
                            />

                            <div className="ms-4 leading-tight">
                                <div className="text-gray-900">{auth.user.name}</div>
                                <div className="text-sm text-gray-700">
                                    {auth.user.email}
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
                            className="block w-full mt-1"
                            autoFocus
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                </>
            }
            actions={
                <Button 
                    type="submit"
                    disabled={processing}
                    className={processing ? 'opacity-25' : ''}
                >
                    Create
                </Button>
            }
        />
    );
};

export default CreateTeamForm;