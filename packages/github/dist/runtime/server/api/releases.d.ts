import type { GithubQuery, GithubReleasesOptions } from '../../../module';
declare const _default: any;
export default _default;
export declare function fetchGitHubReleases(query: GithubQuery, { api: configApi, repo: configRepo, token: configToken }: GithubReleasesOptions): Promise<{
    name: string;
    date: any;
    body: any;
    v: number;
    url: any;
    tarball: any;
    zipball: any;
    prerelease: any;
    reactions: any;
    author: boolean | {
        name: any;
        url: any;
        avatar: any;
    };
}[]>;
