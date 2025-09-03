import React, { ReactNode } from 'react';
import SectionTitle from './SectionTitle';

interface ActionSectionProps {
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const ActionSection: React.FC<ActionSectionProps> = ({ 
  title, 
  description, 
  content,
  className = '',
  children
}) => {
  return (
    <div className={`md:grid md:grid-cols-3 md:gap-6 ${className}`}>
      <SectionTitle 
        title={title}
        description={description}
      />

      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="border border-zinc-900/10 bg-white px-4 py-5 sm:rounded-lg sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          {content || children}
        </div>
      </div>
    </div>
  );
};

export default ActionSection;