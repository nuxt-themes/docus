import { withQuery } from 'ufo'
import { useQuery } from 'h3'
import type { GithubQuery, GithubReleasesOptions, GithubRawRelease } from '../../../module'
import * as imports from '#imports'

// eslint-disable-next-line import/namespace
export default imports.defineCachedEventHandler(async ({ req }) => {
  const { releases: releasesConfig } = imports.useRuntimeConfig().github

  // Get query
  const query = useQuery(req) as any as GithubQuery

  // Fetches releases from GitHub
  let releases = await fetchGitHubReleases(query, releasesConfig)

  // Parse release notes when `parse` option is enabled and `@nuxt/content` is installed.
  // eslint-disable-next-line import/namespace
  if (releasesConfig.parse && typeof imports.contentParse === 'function') {
    releases = await Promise.all(
      releases.map(async release => ({
        ...release,
        // eslint-disable-next-line import/namespace
        ...(await imports.contentParse(`${release.name}.md`, release.body))
      }))
    )
  }

  // Sort DESC by release version or date
  releases.sort((a, b) => a.v !== b.v ? b.v - a.v : a.date - b.date)

  return releases
}, {
  maxAge: 60 // cache for one minute
})

const normalizeReleaseName = (name: string) => {
  // remove "Release " prefix from release name
  name = name.replace('Release ', '')

  // make sure release name starts with an alphabetical character
  if (!name.match(/^[a-zA-Z]/)) {
    name = `v${name}`
  }
  return name
}

export async function fetchGitHubReleases (query: GithubQuery, { api: configApi, repo: configRepo, token: configToken }: GithubReleasesOptions) {
  const api = query?.api || configApi
  const token = query?.token || configToken
  const repo = query?.repo || configRepo
  const perPage = query?.per_page
  const page = query?.page

  const url = withQuery(`${api}/${repo}/releases`, { per_page: perPage, page })

  const rawReleases = await $fetch<Array<GithubRawRelease>>(url, {
    headers: {
      Authorization: token ? `token ${token}` : undefined
    }
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.warn(`Cannot fetch GitHub releases on ${url} [${err.response?.status}]`)

    // eslint-disable-next-line no-console
    console.info('If your repository is private, make sure to provide GITHUB_TOKEN environment in `.env`')

    if (err.response.status !== 403) {
      // eslint-disable-next-line no-console
      console.info('To disable fetching releases, set `github.releases` to `false` in `nuxt.config.ts`')
    }

    return []
  })

  return rawReleases
    .filter((r: any) => !r.draft)
    .map((release) => {
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
        author: release?.author
          ? {
              name: release.author?.login,
              url: release.author?.html_url,
              avatar: release.author?.avatar_url
            }
          : false
      }
    })
}
