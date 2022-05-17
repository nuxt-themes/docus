import { fetchRepository } from '../utils/queries'
import * as imports from '#imports'

let handler
if (process.env.NODE_ENV === 'development') {
  handler = imports.defineEventHandler
} else {
  handler = imports.defineCachedEventHandler
}

// eslint-disable-next-line import/namespace
export default handler(
  async () => {
    const config = imports.useRuntimeConfig().github

    // Fetches releases from GitHub
    const repository = await fetchRepository(config)

    return repository
  },
  {
    maxAge: 60, // cache for one minute
  },
)
