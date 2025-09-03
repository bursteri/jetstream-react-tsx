'use client';

import { usePage } from '@inertiajs/react';
import { CodeXml, LayoutGrid, Settings2 } from 'lucide-react';

import { NavMain } from '@/Components/nav-main';
import { NavTeam } from '@/Components/nav-team';
import { NavUser } from '@/Components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/Components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const page = usePage();
    const { auth } = page.props as any;
    const user = {
        name: auth?.user?.name || 'User',
        email: auth?.user?.email || '',
        avatar: auth?.user?.profile_photo_url || '/avatars/default.jpg',
    };

    // Get teams from the authenticated user
    const teams = auth?.user?.all_teams || [];
    const currentTeam = auth?.user?.current_team;

    // Helper function to check if a route is active using Ziggy
    const isActiveRoute = (routeName: string): boolean => {
        // Access the current route name from Ziggy
        const currentRouteName = (window as any).route().current();
        return currentRouteName === routeName || currentRouteName?.startsWith(routeName + '.');
    };

    const navMain = [
        {
            title: 'Playground',
            url: route('dashboard'),
            icon: LayoutGrid,
            isActive: isActiveRoute('dashboard'),
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: route('profile.show'),
                    isActive: isActiveRoute('profile.show'),
                },
                {
                    title: 'Team',
                    url: currentTeam ? route('teams.show', { team: currentTeam.id }) : '#',
                    isActive: isActiveRoute('teams.show'),
                },
                {
                    title: 'Billing',
                    url: '#',
                    isActive: false,
                },
            ],
        },
    ];

    const navSub = [
        {
            title: 'API',
            url: route('api-tokens.index'),
            icon: CodeXml,
            isActive: isActiveRoute('api-tokens.index'),
        },
        {
            title: 'Home',
            url: '/',
            icon: CodeXml,
            isActive: isActiveRoute('welcome'),
        },
    ];

    return (
        <Sidebar collapsible="icon" {...props} variant="inset">
            <SidebarHeader>
                <NavTeam teams={teams} currentTeam={currentTeam} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} label="Platform" />
                <NavMain items={navSub} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
