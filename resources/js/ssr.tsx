import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { RouteName, route } from '../../vendor/tightenco/ziggy';
import { TooltipProvider } from '@/Components/ui/tooltip';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const pages = import.meta.glob<{ default: ResolvedComponent }>('./Pages/**/*.tsx');

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, pages).then((page) => page.default),
        setup: ({ App, props }) => {
            (globalThis as any).route = (name: RouteName, params: any, absolute: boolean) =>
                route(name, params, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });

            return (
                <TooltipProvider>
                    <App {...props} />
                </TooltipProvider>
            );
        },
    }),
);
