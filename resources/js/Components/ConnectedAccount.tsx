import React from 'react';
import ProviderIcon from '@/Components/SocialstreamIcons/ProviderIcon';

interface ConnectedAccountProps {
    provider: {
        id: string;
        name: string;
    };
    createdAt?: string | null;
    action?: React.ReactNode;
}

export default function ConnectedAccount({ provider, createdAt, action }: ConnectedAccountProps) {
    return (
        <div>
            <div className="px-3 flex items-center justify-between">
                <div className="flex items-center">
                    <ProviderIcon provider={provider} classes="h-6 w-6 me-2" />

                    <div className="ml-2">
                        <div className="text-sm font-semibold text-gray-600">
                            {provider.name}
                        </div>

                        {createdAt !== null ? (
                            <div className="text-xs text-gray-500">
                                Connected {createdAt}
                            </div>
                        ) : (
                            <div className="text-xs text-gray-500">
                                Not connected.
                            </div>
                        )}
                    </div>
                </div>

                {action}
            </div>
        </div>
    );
}