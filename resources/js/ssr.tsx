// import ReactDOMServer from 'react-dom/server';
// import { createInertiaApp } from '@inertiajs/react';
// import createServer from '@inertiajs/react/server';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createServer((page) =>
//     createInertiaApp({
//         page,
//         render: ReactDOMServer.renderToString,
//         title: (title) => `${title} - ${appName}`,
//         resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
//         setup: ({ App, props }) => <App {...props} />,
//     })
// );

import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { RouteName, route } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob('./Pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => {
            // @ts-expect-error - Ziggy SSR global route setup
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });

            return <App {...props} />;
        },
    }),
);
