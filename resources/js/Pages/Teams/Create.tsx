import SidebarLayout from '@/Layouts/SidebarLayout';
import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm';
import React from 'react';

const Create: React.FC = () => {
    return (
        <SidebarLayout title="Create Team" header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Create Team</h2>}>
            <div>
                <div className="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
                    <CreateTeamForm />
                </div>
            </div>
        </SidebarLayout>
    );
};

export default Create;
