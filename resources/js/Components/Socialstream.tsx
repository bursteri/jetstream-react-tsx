import React from 'react';

// Import components - adjust paths as needed
import InputError from '@/Components/InputError';
import ProviderIcon from '@/Components/SocialstreamIcons/ProviderIcon';
import { Button } from '@/Components/ui/button';

interface Provider {
    id: string;
    name: string;
    buttonLabel?: string;
}

interface SocialLoginProps {
    prompt?: string;
    error?: string | null;
    providers?: Provider[];
    labels?: Record<string, string>;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ prompt = 'Or Login Via', error = null, providers = [], labels }) => {
    const handleProviderClick = (providerId: string) => {
        // Adjust this based on your routing solution
        // This assumes you have a similar route helper available
        window.location.href = (window as any).route('oauth.redirect', { provider: providerId });
    };

    if (!providers || providers.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 mb-2 space-y-6">
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>

            {error && (
                <div className="text-center">
                    <InputError message={error} />
                </div>
            )}

            <div className="grid gap-4">
                {providers.map((provider) => (
                    <Button key={provider.id} variant="outline" onClick={() => handleProviderClick(provider.id)} className="flex items-center">
                        <ProviderIcon provider={provider} classes="h-6 w-6" />
                        <span className="text-sm font-medium">{provider.buttonLabel || provider.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default SocialLogin;
