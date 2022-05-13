import * as _nuxt_schema from '@nuxt/schema';

interface ModuleOptions {
    repo: string;
    releases: false | {
        api: string;
        repo: string;
        token: string;
        /**
         * Parse release notes markdown and return AST tree
         *
         * Note: This option is only available when you have `@nuxt/content` installed in your project.
         *
         * @default true
         */
        parse: boolean;
    };
}
interface GithubQuery {
    repo: string;
    per_page: string;
    page: string;
    token: string;
    api: string;
}
interface GithubRawRelease {
    draft: boolean;
    name: string;
    tag_name: string;
    body: string;
    published_at: number;
}
interface GithubReleasesOptions {
    api: string;
    repo: string;
    token: string;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

export { GithubQuery, GithubRawRelease, GithubReleasesOptions, ModuleOptions, _default as default };
