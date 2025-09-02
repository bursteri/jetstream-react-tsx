export interface Ziggy {
    url: string;
    port: number | null;
    defaults: Record<string, any>;
    routes: Record<string, any>;
}

export type RouteName = string;

export interface RouteParams {
    [key: string]: any;
}

declare module '../../vendor/tightenco/ziggy/dist/index.esm.js' {
    export function route(
        name?: RouteName,
        params?: RouteParams,
        absolute?: boolean,
        config?: Ziggy
    ): string;
}

declare module '../ziggy.js' {
    export const Ziggy: Ziggy;
}