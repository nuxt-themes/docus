import { withQuery } from 'ufo'

export const useGithub = () => {
  const fetchRepository = async () => {
    const url = '/api/_github/repository'

    return $fetch(url, { responseType: 'json' })
  }

  const fetchReleases = async (query: any) => {
    const url = withQuery('/api/_github/releases', query as any)

    return $fetch(url, { responseType: 'json' })
  }

  const fetchLastRelease = async (query: any) => {
    const url = withQuery('/api/_github/releases', { ...query, last: true } as any)

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
