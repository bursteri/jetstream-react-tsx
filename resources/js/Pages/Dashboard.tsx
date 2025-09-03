import SidebarLayout from '@/Layouts/SidebarLayout';
import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <SidebarLayout title="Dashboard" breadcrumbs={[{ label: 'Dashboard', current: true }]}>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl border border-zinc-900/5 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/50" />
                    <div className="aspect-video rounded-xl border border-zinc-900/5 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/50" />
                    <div className="aspect-video rounded-xl border border-zinc-900/5 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/50" />
                </div>
            </div>
        </SidebarLayout>
    );
};

export default Dashboard;
