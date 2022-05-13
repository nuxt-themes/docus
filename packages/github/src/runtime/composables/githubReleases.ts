import { withQuery } from 'ufo'
import type { GithubQuery } from '../../module'

export const githubReleases = (query: Partial<GithubQuery> = {}) => {
  const url = withQuery('/api/_github/releases', query)

  return $fetch(url)
}
