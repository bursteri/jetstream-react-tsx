import { Link } from '@inertiajs/react';
import { ChevronRight, Dot, type LucideIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/Components/ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/Components/ui/sidebar';

interface NavItem {
    title?: string;
    name?: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
        isActive?: boolean;
    }[];
}

interface NavMainProps {
    items: NavItem[];
    label?: string;
}

export function NavMain({ items, label }: NavMainProps) {
    const { state } = useSidebar();

    const shouldParentBeActive = (item: NavItem): boolean => {
        if (state === 'collapsed' && item.items?.some((subItem) => subItem.isActive)) {
            return true;
        }
        return false;
    };
    return (
        <SidebarGroup>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarMenu>
                {items.map((item) => {
                    const itemTitle = item.title || item.name || '';
                    const itemKey = itemTitle;

                    if (item.items && item.items.length > 0) {
                        if (state === 'collapsed') {
                            return (
                                <SidebarMenuItem key={itemKey}>
                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuButton tooltip={itemTitle} isActive={shouldParentBeActive(item)}>
                                                {item.icon && <item.icon />}
                                                <span>{itemTitle}</span>
                                            </SidebarMenuButton>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-48">
                                            <DropdownMenuLabel className="-mb-1 text-xs text-muted-foreground">{itemTitle}</DropdownMenuLabel>
                                            {item.items.map((subItem) => (
                                                <DropdownMenuItem key={subItem.title} asChild>
                                                    <Link href={subItem.url} className={subItem.isActive ? 'font-semibold' : ''}>
                                                        {subItem.isActive && <Dot className="-mx-1 text-foreground" strokeWidth={5} />}
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            );
                        } else {
                            return (
                                <Collapsible
                                    key={itemKey}
                                    asChild
                                    defaultOpen={item.items.some((subItem) => subItem.isActive)}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={itemTitle} isActive={false}>
                                                {item.icon && <item.icon />}
                                                <span>{itemTitle}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                                                            <Link href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            );
                        }
                    } else {
                        return (
                            <SidebarMenuItem key={itemKey}>
                                <SidebarMenuButton asChild tooltip={itemTitle} isActive={item.isActive}>
                                    <Link href={item.url}>
                                        {item.icon && <item.icon />}
                                        <span>{itemTitle}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    }
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
