import { createCookies } from '@vueuse/integrations'
import defu from 'defu'
import Vue from 'vue'
import { reactive, watch } from 'vue-demi'
import DocusUI from './components/DocusUI.vue'

const COOKIE_NAME = 'docus.ui'

export default async function ({ $docus, ssrContext }: any) {
  const useUniversalCookies = createCookies(ssrContext?.req)
  const cookies = useUniversalCookies()
  const ui = cookies.get(COOKIE_NAME) || {}

  // UI data (universal storage)
  $docus.ui = reactive(
    defu(ui, {
      slots: false,
      draft: false
    })
  )

  if (process.client) {
    // Watch drafts, refresh data once updated
    watch($docus.ui, () => cookies.set(COOKIE_NAME, $docus.ui))
    watch(
      () => $docus.ui.draft,
      () => $docus.fetchNavigation()
    )

    // Mount DocusUI widget on client-side
    const el = document.createElement('div')

    document.body.appendChild(el)

    const instanceData: any = {
      ...DocusUI,
      $docus
    }

    new Vue(instanceData).$mount(el)
  }

  // Re-fetch navigation
  if (process.server) {
    await $docus.fetchNavigation()
  }
}
