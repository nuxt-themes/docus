import { DocusAddonContext } from '../../../types'

export const useDocusReleases = ({ api, state }: DocusAddonContext) => {
  async function fetchReleases() {
    return (await api.data('github-releases'))?.releases || []
  }

  async function fetchLastRelease() {
    if (process.dev === false && state.lastRelease) return

    const [lastRelease] = await fetchReleases()

    if (lastRelease) state.lastRelease = lastRelease.name
  }

  return {
    fetchReleases,
    fetchLastRelease,
    init: fetchLastRelease
  }
}
