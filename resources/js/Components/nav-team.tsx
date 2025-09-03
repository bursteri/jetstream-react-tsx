'use client';

import { router } from '@inertiajs/react';
import { ChevronsUpDown, Plus, Users } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/Components/ui/sidebar';

export function NavTeam({ teams, currentTeam }: { teams: any[]; currentTeam: any }) {
    const { isMobile } = useSidebar();

    // Use the current team or fallback to first team
    const activeTeam = currentTeam || teams[0];

    if (!teams || teams.length === 0) {
        return null;
    }

    const switchToTeam = (team: any) => {
        router.put(
            route('current-team.update'),
            {
                team_id: team.id,
            },
            {
                preserveState: false,
            },
        );
    };

    const getTeamInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {activeTeam?.profile_photo_url ? (
                                    <img src={activeTeam.profile_photo_url} alt={activeTeam.name} className="size-8 rounded-lg" />
                                ) : (
                                    <span className="text-xs font-medium">{getTeamInitials(activeTeam?.name || 'T')}</span>
                                )}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{activeTeam?.name}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {activeTeam?.owner?.name ? `Owner: ${activeTeam.owner.name}` : 'Team'}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
                        {teams.map((team, index) => (
                            <DropdownMenuItem
                                key={team.id}
                                onClick={() => switchToTeam(team)}
                                className="gap-2 p-2"
                                disabled={team.id === activeTeam?.id}
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border">
                                    {team.profile_photo_url ? (
                                        <img src={team.profile_photo_url} alt={team.name} className="size-6 rounded-md" />
                                    ) : (
                                        <Users className="size-3.5 shrink-0" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{team.name}</div>
                                    {team.owner?.name && <div className="text-xs text-muted-foreground">Owner: {team.owner.name}</div>}
                                </div>
                                {team.id === activeTeam?.id && <span className="text-xs text-muted-foreground">Current</span>}
                                {index < 9 && <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2" onClick={() => router.get((window as any).route('teams.create'))}>
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">Create new team</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
