import { reactive, toRefs } from '@nuxtjs/composition-api'
import { DocusSettings, PermissiveContext, DocusState, DocusAddonContext } from '../../../types'
import { useDocusApi } from './api'
import { useDocusNavigation } from './navigation'
import { clientAsyncData, docusInit } from './helpers'
import { useDocusGithub } from './github'
import { useDocusReleases } from './releases'

export const createDocus = async (context: PermissiveContext, settings: DocusSettings, createQuery: any) => {
  // Local instance let
  let $nuxt: any

  /**
   * State
   */
  const state = reactive({
    page: {},
    categories: {},
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
  const docusAddonData: DocusAddonContext = {
    $nuxt,
    context,
    state,
    settings,
    createQuery,
    api
  }

  // Create `navigation` key
  const navigation = useDocusNavigation(docusAddonData)

  // Create `releases` key
  const releases = useDocusReleases(docusAddonData)

  // Create `github` key
  const github = useDocusGithub(docusAddonData)

  // Init Docus for every context
  await docusInit(docusAddonData, fetch)

  // Workaround for async data
  clientAsyncData(context.app, $nuxt)

  return {
    ...toRefs(state),
    ...api,
    ...navigation,
    ...github,
    ...releases
  }
}
