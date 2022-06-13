import { withQuery } from 'ufo'

export const useGithub = () => {
  const fetchRepository = async () => $fetch('/api/_github/repository', { responseType: 'json' })

  const fetchLastRelease = async () => $fetch('/api/_github/releases/last', { responseType: 'json' })

  const fetchReleases = async (query: any) => {
    const url = withQuery('/api/_github/releases', query as any)
    return $fetch(url, { responseType: 'json' })
  }

  const fetchContributors = async (query: any) => {
    const url = withQuery('/api/_github/contributors', query as any)
    return $fetch(url, { responseType: 'json' })
  }

  const fetchFileContributors = async (source = '', query: any) => {
    const url = withQuery(`/api/_github/contributors/file`, { ...query, source } as any)
    return $fetch(url, { responseType: 'json' })
  }

  return {
    fetchRepository,
    fetchReleases,
    fetchLastRelease,
    fetchContributors,
    fetchFileContributors,
  }
}
