import { cn } from '@/lib/utils';
import React from 'react';

interface ActionMessageProps {
    on: boolean;
    className?: string;
    children: React.ReactNode;
}

const ActionMessage: React.FC<ActionMessageProps> = ({ on, className, children }) => {
    if (!on) return null;

    return <div className={cn('text-sm text-zinc-600 transition-opacity duration-200', className)}>{children}</div>;
};

export default ActionMessage;
