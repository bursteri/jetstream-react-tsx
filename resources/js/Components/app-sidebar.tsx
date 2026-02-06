'use client';

import { usePage } from '@inertiajs/react';
import { Home, LayoutGrid, Settings2 } from 'lucide-react';

import { NavMain } from '@/Components/nav-main';
import { NavTeam } from '@/Components/nav-team';
import { NavUser } from '@/Components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/Components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { props: pageProps } = usePage();
    const { auth } = pageProps;
    const user = {
        name: auth.user.name || 'User',
        email: auth.user.email || '',
        avatar: (auth.user.profile_photo_url as string) || '/avatars/default.jpg',
    };

    // Get teams from the authenticated user
    const teams = auth.user.all_teams || [];
    const currentTeam = auth.user.current_team;

    // Helper function to check if a route is active using Ziggy
    const isActiveRoute = (routeName: string): boolean => {
        const currentRouteName = (route() as { current: () => string }).current();
        return currentRouteName === routeName || currentRouteName?.startsWith(routeName + '.');
    };

    const navMain = [
        {
            title: 'Dashboard',
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
                    title: 'API',
                    url: route('api-tokens.index'),
                    isActive: isActiveRoute('api-tokens.index'),
                },
                // {
                //     title: 'Billing',
                //     url: '#',
                //     isActive: false,
                // },
            ],
        },
    ];

    const navSub = [
        {
            title: 'Home',
            url: '/',
            icon: Home,
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
