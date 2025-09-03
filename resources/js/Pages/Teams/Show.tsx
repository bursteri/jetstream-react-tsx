import SectionBorder from '@/Components/SectionBorder';
import SidebarLayout from '@/Layouts/SidebarLayout';
import DeleteTeamForm from '@/Pages/Teams/Partials/DeleteTeamForm';
import TeamMemberManager from '@/Pages/Teams/Partials/TeamMemberManager';
import UpdateTeamNameForm from '@/Pages/Teams/Partials/UpdateTeamNameForm';
import React from 'react';

interface ShowProps {
    team: any;
    availableRoles: any[];
    permissions: any;
}

const Show: React.FC<ShowProps> = ({ team, availableRoles, permissions }) => {
    return (
        <SidebarLayout title="Team Settings" header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Team Settings</h2>}>
            <div>
                <div className="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
                    <UpdateTeamNameForm team={team} permissions={permissions} />

                    <TeamMemberManager className="mt-10 sm:mt-0" team={team} availableRoles={availableRoles} userPermissions={permissions} />

                    {permissions.canDeleteTeam && !team.personal_team && (
                        <>
                            <SectionBorder />
                            <DeleteTeamForm className="mt-10 sm:mt-0" team={team} />
                        </>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
};

export default Show;
