import { reactive, Ref, toRefs } from '@nuxtjs/composition-api'
import type { DefaultThemeSettings } from '../../defaultTheme'
import { DocusSettings, PermissiveContext, DocusState, DocusAddonContext, DocusNavigation } from '../../types'
import { useDocusApi } from './composables/api'
import { useDocusNavigation } from './composables/navigation'
import { clientAsyncData, docusInit } from './composables/helpers'
import { useDocusGithub } from './composables/github'
import { useDocusReleases } from './composables/releases'
import { useDocusStyle } from './composables/style'
import { useDocusAddons } from './composables/addons'

export type DocusRuntimeInstance<T = DefaultThemeSettings> = {
  settings: Ref<Omit<DocusSettings, 'theme'>>
  navigation: Ref<DocusNavigation>
  theme: Ref<T>
  [key: string]: any
} & ReturnType<typeof useDocusApi>

let docusInstance: DocusRuntimeInstance

/**
 * Create the $docus runtime injection instance.
 */
export const createDocus = async (
  context: PermissiveContext,
  settings: DocusSettings,
  createQuery: any
): Promise<DocusRuntimeInstance<typeof settings['theme']>> => {
  // Nuxt instance proxy
  let $nuxt: any

  // State
  const state = reactive({
    settings: null,
    theme: null
  }) as DocusState

  // Split theme & user settings
  const { theme, ...userSettings } = settings
  state.settings = userSettings
  state.theme = theme

  // Create API helpers
  const api = useDocusApi(createQuery)

  // Create Docus Addons context
  const docusAddonContext: DocusAddonContext = {
    $nuxt,
    context,
    state,
    settings,
    createQuery,
    api
  }

  // Docus default addons
  const docusAddons = [useDocusStyle, useDocusNavigation, useDocusReleases, useDocusGithub]

  // Addons manager
  const { setupAddons, addonsContext } = useDocusAddons(docusAddonContext, docusAddons)

  // Setup addons
  await setupAddons()

  // Init Docus for every context
  await docusInit(docusAddonContext, fetch)

  // Workaround for async data
  clientAsyncData(context.app, $nuxt)

  docusInstance = {
    ...toRefs(state),
    ...api,
    ...addonsContext
  }

  return docusInstance
}

export const useDocus = () => {
  if (!docusInstance) throw new Error('Docus not yet initialized! useDocus has to be used in a living Vue instance.')

  return docusInstance
}
