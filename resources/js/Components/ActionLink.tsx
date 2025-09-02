import React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface ActionLinkProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

export default function ActionLink({ href, className, children }: ActionLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition",
                className
            )}
        >
            {children}
        </Link>
    );
}