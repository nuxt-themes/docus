import { createCookies } from '@vueuse/integrations'
import defu from 'defu'
import Vue from 'vue'
import { reactive, watch } from 'vue-demi'
import DocusUI from '../../packages/theme/components/dev/DocusUI'

const COOKIE_NAME = 'docus.ui'

export default async function ({ $docus, ssrContext }) {
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
    watch($docus.ui, () => cookies.set(COOKIE_NAME, $docus.ui))
    watch(
      () => $docus.ui.draft,
      () => $docus.fetchCategories()
    )
    watch(
      () => $docus.ui.draft,
      () => $docus.fetchNavigation()
    )
  }

  // Mount DocusUI widget on client-side
  if (process.client) {
    const el = document.createElement('div')
    document.body.appendChild(el)
    new Vue({
      ...DocusUI,
      $docus
    }).$mount(el)
  }

  // Re-fetch categories
  if (process.server) {
    await $docus.fetchCategories()
    await $docus.fetchNavigation()
  }
}
