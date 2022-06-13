import { useQuery } from 'h3'
import { fetchReleases, parseRelease } from '../../utils/queries'
import type { GithubRawRelease } from '../../../../module'
import * as imports from '#imports'

let handler
if (process.env.NODE_ENV === 'development') {
  handler = imports.defineEventHandler
} else {
  handler = imports.defineCachedEventHandler
}

export default handler(
  async () => {
    const config = imports.useRuntimeConfig().github

    if (!config.releases) return []

    // Fetches releases from GitHub
    let release = await fetchReleases({ last: true }, config.releases)

    if (config?.releases?.parse) {
      release = await parseRelease(release as GithubRawRelease)
    }

    return release
  },
  {
    maxAge: 60, // cache for one minute
  },
)
