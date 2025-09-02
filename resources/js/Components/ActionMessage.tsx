import React from 'react';
import { cn } from '@/lib/utils';

interface ActionMessageProps {
    on: boolean;
    className?: string;
    children: React.ReactNode;
}

const ActionMessage: React.FC<ActionMessageProps> = ({ on, className, children }) => {
    if (!on) return null;
    
    return (
        <div className={cn("text-sm text-gray-600 transition-opacity duration-200", className)}>
            {children}
        </div>
    );
};

export default ActionMessage;