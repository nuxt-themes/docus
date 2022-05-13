import { withQuery } from "ufo";
import { useQuery } from "h3";
import * as imports from "#imports";
import { parseContent } from "#content/server";
export default imports.defineCachedEventHandler(async ({ req }) => {
  const { releases: releasesConfig } = imports.useRuntimeConfig().github;
  const query = useQuery(req);
  let releases = await fetchGitHubReleases(query, releasesConfig);
  if (releasesConfig.parse && typeof parseContent === "function") {
    releases = await Promise.all(releases.map(async (release) => {
      return {
        ...release
      };
    }));
  }
  releases.sort((a, b) => a.v !== b.v ? b.v - a.v : a.date - b.date);
  return releases;
}, {
  maxAge: 60
});
const normalizeReleaseName = (name) => {
  name = name.replace("Release ", "");
  if (!name.match(/^[a-zA-Z]/)) {
    name = `v${name}`;
  }
  return name;
};
export async function fetchGitHubReleases(query, { api: configApi, repo: configRepo, token: configToken }) {
  const api = query?.api || configApi;
  const token = query?.token || configToken;
  const repo = query?.repo || configRepo;
  const perPage = query?.per_page;
  const page = query?.page;
  const url = withQuery(`${api}/${repo}/releases`, { per_page: perPage, page });
  const rawReleases = await $fetch(url, {
    headers: {
      Authorization: token ? `token ${token}` : void 0
    }
  }).catch((err) => {
    console.warn(`Cannot fetch GitHub releases on ${url} [${err.response?.status}]`);
    console.info("If your repository is private, make sure to provide GITHUB_TOKEN environment in `.env`");
    if (err.response.status !== 403) {
      console.info("To disable fetching releases, set `github.releases` to `false` in `nuxt.config.ts`");
    }
    return [];
  });
  return rawReleases.filter((r) => !r.draft).map((release) => {
    return {
      name: normalizeReleaseName(release?.name || release?.tag_name),
      date: release?.published_at,
      body: release?.body,
      v: +normalizeReleaseName(release?.tag_name).substring(1, 2),
      url: release?.html_url,
      tarball: release?.tarball_url,
      zipball: release?.zipball_url,
      prerelease: release?.prerelease,
      reactions: release?.reactions,
      author: release?.author ? {
        name: release.author?.login,
        url: release.author?.html_url,
        avatar: release.author?.avatar_url
      } : false
    };
  });
}
