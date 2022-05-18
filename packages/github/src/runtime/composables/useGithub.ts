import { withQuery } from 'ufo'

export const useGithub = () => {
  const fetchRepository = async () => {
    const url = '/api/_github/repository'

    return $fetch(url)
  }

  const fetchReleases = async (query: Partial<any>) => {
    const url = withQuery('/api/_github/releases', query as any)

    return $fetch(url)
  }

  const fetchLastRelease = async (query: Partial<any>) => {
    const url = withQuery('/api/_github/releases', { ...query, last: true } as any)

    return $fetch(url)
  }

  const fetchContributors = async (query: any) => {
    const url = withQuery('/api/_github/contributors', query as any)

    return $fetch(url)
  }

  const fetchFileContributors = async (source = '', query: any) => {
    const url = withQuery(`/api/_github/contributors/file`, { ...query, source } as any)

    return $fetch(url)
  }

  return {
    fetchRepository,
    fetchReleases,
    fetchLastRelease,
    fetchContributors,
    fetchFileContributors,
  }
}
