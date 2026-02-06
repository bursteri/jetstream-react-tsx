import { AppSidebar } from '@/Components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/Components/ui/breadcrumb';
import { Separator } from '@/Components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import { useFlashMessages } from '@/hooks/useFlashMessages';
import { Head } from '@inertiajs/react';
import React from 'react';
import { Toaster } from 'sonner';

interface BreadcrumbData {
    label: string;
    href?: string;
    current?: boolean;
}

interface SidebarLayoutProps {
    title?: string;
    breadcrumbs?: BreadcrumbData[];
    children: React.ReactNode;
    header?: React.ReactNode;
    headerActions?: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ title, breadcrumbs, children, header, headerActions }) => {
    // Initialize flash message handling
    useFlashMessages();

    return (
        <div className="flex h-screen flex-col">
            {title && <Head title={title} />}

            <Toaster position="top-right" />

            <SidebarProvider className="flex flex-1 overflow-hidden">
                <AppSidebar />

                <SidebarInset className="flex flex-col overflow-hidden">
                    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-900/10 transition-[width,height] ease-linear dark:border-zinc-800">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <div className="mx-2 flex h-6">
                                <Separator orientation="vertical" />
                            </div>

                            {/* Breadcrumbs */}
                            {breadcrumbs && breadcrumbs.length > 0 && (
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        {breadcrumbs.map((breadcrumb, index) => (
                                            <React.Fragment key={index}>
                                                <BreadcrumbItem className={index < breadcrumbs.length - 1 ? 'hidden md:block' : ''}>
                                                    {!breadcrumb.current && breadcrumb.href ? (
                                                        <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                                                    ) : (
                                                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                                    )}
                                                </BreadcrumbItem>
                                                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
                                            </React.Fragment>
                                        ))}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            )}

                            {/* Custom header actions */}
                            {headerActions}
                        </div>
                    </header>

                    {/* Page Content - Scrollable Container */}
                    <div className="flex-1 overflow-auto">{children}</div>
                </SidebarInset>
            </SidebarProvider>

            {/* SSR Indicator */}
        </div>
    );
};

export default SidebarLayout;
