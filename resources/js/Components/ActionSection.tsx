import React from 'react';
import SectionTitle from './SectionTitle';

interface ActionSectionProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    content?: React.ReactNode;
    children?: React.ReactNode;
}

const ActionSection: React.FC<ActionSectionProps> = ({ title, description, content, children }) => {
    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <SectionTitle title={title} description={description} />
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-4 py-5 sm:p-6 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                    {content || children}
                </div>
            </div>
        </div>
    );
};

export default ActionSection;