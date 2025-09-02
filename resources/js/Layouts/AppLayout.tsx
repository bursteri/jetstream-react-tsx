import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';
import { useFlashMessages } from '@/hooks/useFlashMessages';

interface AppLayoutProps {
    title?: string;
    children: React.ReactNode;
    header?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
    title, 
    children, 
    header 
}) => {
    // Initialize flash message handling
    useFlashMessages();

    return (
        <div className="min-h-screen bg-gray-100">
            {title && <Head title={title} />}
            
            <Toaster position="top-right" />
            
            {/* Page Header */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
};

export default AppLayout;