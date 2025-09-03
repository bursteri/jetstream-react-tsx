import React, { ReactNode } from 'react';
import SectionTitle from './SectionTitle';

interface FormSectionProps {
  title?: ReactNode;
  description?: ReactNode;
  form?: ReactNode;
  actions?: ReactNode;
  onSubmitted?: () => void;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  description, 
  form,
  actions,
  onSubmitted,
  className = ''
}) => {
  const hasActions = !!actions;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitted?.();
  };

  return (
    <div className={`md:grid md:grid-cols-3 md:gap-6 ${className}`}>
      <SectionTitle 
        title={title}
        description={description}
      />

      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit}>
          <div
            className={`border border-zinc-900/10 bg-white px-4 py-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/50 ${
              hasActions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'
            }`}
          >
            <div className="grid grid-cols-6 gap-6">
              {form}
            </div>
          </div>

          {hasActions && (
            <div className="flex items-center justify-end border-x border-b border-zinc-900/10 bg-zinc-50 px-4 py-3 text-end sm:rounded-br-md sm:rounded-bl-md sm:px-6 dark:border-zinc-800 dark:bg-zinc-950">
              {actions}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormSection;