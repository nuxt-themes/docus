import { computed } from '@nuxtjs/composition-api'
import { DocusAddonContext } from 'src/types'
import { joinURL, withoutTrailingSlash } from 'ufo'

export const useDocusGithub = ({ state }: DocusAddonContext) => {
  const previewUrl = computed(() => withoutTrailingSlash(state.settings.url) + '/preview.png')

  const repoUrl = computed(() => joinURL(state.settings.github.url, state.settings.github.repo))

  return {
    previewUrl,
    repoUrl
  }
}
