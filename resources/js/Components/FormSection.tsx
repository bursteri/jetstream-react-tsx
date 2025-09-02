import React from 'react';
import SectionTitle from './SectionTitle';
import { cn } from '@/lib/utils';

interface FormSectionProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    form?: React.ReactNode;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    onSubmit?: (e: React.FormEvent) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ 
    title, 
    description, 
    form, 
    actions, 
    children,
    onSubmit 
}) => {
    const hasActions = !!actions;

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <SectionTitle title={title} description={description} />
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit?.(e);
                }}>
                    <div
                        className={cn(
                            "px-4 py-5 bg-white dark:bg-gray-800 sm:p-6 shadow-sm",
                            hasActions ? "sm:rounded-tl-md sm:rounded-tr-md" : "sm:rounded-md"
                        )}
                    >
                        <div className="grid grid-cols-6 gap-6">
                            {form || children}
                        </div>
                    </div>

                    {hasActions && (
                        <div className="flex items-center justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 shadow-sm sm:rounded-bl-md sm:rounded-br-md">
                            {actions}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default FormSection;