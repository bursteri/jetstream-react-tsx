import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import { PageProps as AppPageProps } from "./";

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;

    var Ziggy: ZiggyType;

    interface ImportMetaEnv {
        VITE_APP_NAME: string;
    }

    interface ImportMeta {
        env: ImportMetaEnv;
        glob: (pattern: string) => Record<string, () => Promise<any>>;
    }
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
