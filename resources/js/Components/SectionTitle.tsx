import React from 'react';

interface SectionTitleProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, description }) => {
    return (
        <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
                {title && (
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SectionTitle;