import { $fetch, FetchOptions } from 'ohmyfetch/node'
import { GithubRelease, GithubReleaseOptions } from '../types/github'
import { useMarkdownParser } from '../core/parser'

interface GithubRawRelease {
  draft: boolean
  name: string
  // eslint-disable-next-line camelcase
  tag_name: string
  body: string
  // eslint-disable-next-line camelcase
  published_at: number
}

let cachedReleases: GithubRelease[] = []

export function get(): GithubRelease[] {
  return cachedReleases
}

export async function fetch(settings: GithubReleaseOptions) {
  let releases: GithubRelease[] = []

  const parser = useMarkdownParser()
  const getMajorVersion = (r: GithubRelease): number => (r.name ? Number(r.name.substring(1, 2)) : 0)

  if (settings.releases && settings.repo) {
    const { apiUrl, repo } = settings
    const girhubReleases = await fetchGitHubReleases({
      apiUrl,
      repo,
      token: process.env.GITHUB_TOKEN || ''
    })
    releases = await Promise.all(
      girhubReleases.map(async r => {
        return {
          ...r,
          body: (await parser.parse(r.body)).body
        }
      })
    )
  }

  releases.sort((a, b) => {
    const aMajorVersion = getMajorVersion(a)
    const bMajorVersion = getMajorVersion(b)
    if (aMajorVersion !== bMajorVersion) {
      return bMajorVersion - aMajorVersion
    }
    return a.date - b.date
  })

  cachedReleases = releases
  return releases
}

export async function fetchGitHubReleases({ apiUrl, repo, token }: GithubReleaseOptions) {
  const options: FetchOptions = {}
  if (token) {
    options.headers = { Authorization: `token ${token}` }
  }
  const url = `${apiUrl}/${repo}/releases`
  const rawReleases: GithubRawRelease[] = await $fetch(url, options).catch(err => {
    // eslint-disable-next-line no-console
    console.warn(`Cannot fetch GitHub releases on ${url} [${err.response.status}]`)
    // eslint-disable-next-line no-console
    console.info('Make sure to provide GITHUB_TOKEN environment in `.env`')
    if (err.response.status !== 403) {
      // eslint-disable-next-line no-console
      console.info('To disable fetching releases, set `github.releases` to `false` in `content/settings.json`')
    }
    return []
  })
  const releases = rawReleases
    .filter((r: any) => !r.draft)
    .map(release => {
      return {
        name: (release.name || release.tag_name).replace('Release ', ''),
        date: release.published_at,
        body: release.body
      }
    })

  return releases
}

export default {
  get,
  fetch,
  fetchGitHubReleases
}
