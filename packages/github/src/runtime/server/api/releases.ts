import { useQuery } from 'h3'
import { fetchReleases } from '../utils/queries'
import type { GithubReleasesQuery } from '../../../module'
import * as imports from '#imports'
import { parseContent } from '#content/server'

let handler
if (process.env.NODE_ENV === 'development') {
  handler = imports.defineEventHandler
} else {
  handler = imports.defineCachedEventHandler
}

// eslint-disable-next-line import/namespace
export default handler(
  async ({ req }) => {
    const config = imports.useRuntimeConfig().github

    if (!config.releases) return []

    // Get query
    const query = useQuery(req) as any as GithubReleasesQuery

    // Fetches releases from GitHub
    let releases = await fetchReleases(query, config.releases)

    // Parse release notes when `parse` option is enabled and `@nuxt/content` is installed.
    if (config?.releases?.parse && typeof parseContent === 'function') {
      releases = await Promise.all(
        releases.map(async (release) => {
          return {
            ...release,
            ...(await parseContent(`github:${release.name}.md`, release.body)),
          }
        }),
      )
    }

    // Sort DESC by release version or date
    releases.sort((a, b) => (a.v !== b.v ? b.v - a.v : a.date - b.date))

    // In case we use `latest` option, we only fetched and return one release
    if (query.last) {
      return releases[0]
    }

    return releases
  },
  {
    maxAge: 60, // cache for one minute
  },
)
