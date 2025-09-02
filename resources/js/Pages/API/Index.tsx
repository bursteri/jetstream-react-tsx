import React from 'react';
import ApiTokenManager from './Partials/ApiTokenManager';
import SidebarLayout from '@/Layouts/SidebarLayout';
import type { ApiToken } from '@/types';

interface Props {
    tokens: ApiToken[];
    availablePermissions: string[];
    defaultPermissions: string[];
}

const Index: React.FC<Props> = ({ tokens, availablePermissions, defaultPermissions }) => {
    return (
        <SidebarLayout 
            title="API Tokens"
            breadcrumbs={[
                { label: 'Account', href: '#' },
                { label: 'API Tokens', current: true }
            ]}
        >
            <div className="p-4">
                <div className="max-w-7xl mx-auto">
                    <ApiTokenManager
                        tokens={tokens}
                        availablePermissions={availablePermissions}
                        defaultPermissions={defaultPermissions}
                    />
                </div>
            </div>
        </SidebarLayout>
    );
};

export default Index;