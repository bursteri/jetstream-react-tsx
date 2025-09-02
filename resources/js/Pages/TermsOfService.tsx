import React from 'react';
import { Head } from '@inertiajs/react';

interface TermsOfServiceProps {
    terms: string;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ terms }) => {
    return (
        <>
            <Head title="Terms of Service" />

            <div className="font-sans text-zinc-900 antialiased dark:text-zinc-100">
                <div className="bg-zinc-100 pt-4 dark:bg-zinc-900">
                    <div className="flex min-h-screen flex-col items-center pt-6 sm:pt-0">
                        <div
                            className="prose dark:prose-invert mt-6 w-full overflow-hidden bg-white p-6 shadow-md sm:max-w-2xl sm:rounded-lg dark:bg-zinc-800"
                            dangerouslySetInnerHTML={{ __html: terms }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsOfService;