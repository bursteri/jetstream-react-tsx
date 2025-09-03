import React from 'react';

// Import icon components - adjust paths as needed
// import BitbucketIcon from '@/Components/SocialstreamIcons/BitbucketIcon';
// import FacebookIcon from '@/Components/SocialstreamIcons/FacebookIcon';
// import GithubIcon from '@/Components/SocialstreamIcons/GithubIcon';
// import GitLabIcon from '@/Components/SocialstreamIcons/GitLabIcon';
import GoogleIcon from '@/Components/SocialstreamIcons/GoogleIcon';
// import LinkedInIcon from '@/Components/SocialstreamIcons/LinkedInIcon';
// import SlackIcon from '@/Components/SocialstreamIcons/SlackIcon';
// import TwitterIcon from '@/Components/SocialstreamIcons/TwitterIcon';

interface Provider {
    id: string;
    name?: string;
}

interface ProviderIconProps {
    provider: Provider;
    classes?: string;
    className?: string; // Alternative prop name for React convention
}

const ProviderIcon: React.FC<ProviderIconProps> = ({ 
    provider, 
    classes, 
    className 
}) => {
    // Use className if provided, otherwise fall back to classes for compatibility
    const iconClasses = className || classes;

    const renderIcon = () => {
        switch (provider.id) {
            // case 'bitbucket':
            //     return <BitbucketIcon className={iconClasses} />;
            // case 'facebook':
            //     return <FacebookIcon className={iconClasses} />;
            // case 'github':
            //     return <GithubIcon className={iconClasses} />;
            // case 'gitlab':
            //     return <GitLabIcon className={iconClasses} />;
            case 'google':
                return <GoogleIcon className={iconClasses} />;
            // case 'linkedin':
            // case 'linkedin-openid':
            //     return <LinkedInIcon className={iconClasses} />;
            // case 'slack':
            //     return <SlackIcon className={iconClasses} />;
            // case 'twitter':
            // case 'twitter-oauth-2':
            //     return <TwitterIcon className={iconClasses} />;
            default:
                return null;
        }
    };

    return (
        <div className="text-zinc-900">
            {renderIcon()}
        </div>
    );
};

export default ProviderIcon;