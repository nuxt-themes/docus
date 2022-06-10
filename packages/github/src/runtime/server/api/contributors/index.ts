import { useQuery } from 'h3'
import type { GithubContributorsQuery } from '../../../../module'
import { fetchRepositoryContributors } from '../../utils/queries'
import * as imports from '#imports'

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

    // Get query
    const query = useQuery(req) as any as GithubContributorsQuery

    // Fetches releases from GitHub
    const contributors = await fetchRepositoryContributors(query, config.contributors)

    return contributors
  },
  {
    maxAge: 60, // cache for one minute
  },
)
