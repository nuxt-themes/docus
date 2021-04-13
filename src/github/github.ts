import { IncomingMessage, ServerResponse } from 'node:http'
import { $fetch, FetchOptions } from 'ohmyfetch/node'
import { DocusSettings } from '../types'
import { GithubRelease, GithubReleaseOptions } from '../types/github'

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

export async function fetch({ $content, settings }: { $content: any; settings: DocusSettings }) {
  let releases: GithubRelease[] = []

  const compile = (markdown: string) => $content.database.markdown.toJSON(markdown)
  const getMajorVersion = (r: GithubRelease): number => (r.name ? Number(r.name.substring(1, 2)) : 0)

  if (settings.github.releases && settings.github.repo) {
    const { apiUrl, repo } = settings.github
    const girhubReleases = await fetchGitHubReleases({
      apiUrl,
      repo,
      token: process.env.GITHUB_TOKE || ''
    })
    releases = await Promise.all(
      girhubReleases.map(async r => {
        return {
          ...r,
          body: await compile(r.body)
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

export function handler(_req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(cachedReleases))
}

export default {
  get,
  fetch,
  fetchGitHubReleases,
  handler
}
