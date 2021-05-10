import { Context, Plugin } from '@nuxt/types'
import { createCookies } from '@vueuse/integrations'
import defu from 'defu'
import Vue from 'vue'
import { reactive, watch } from 'vue-demi'
import { DocusRuntimeInstance } from '../../index.d'
import DocusUI from './DocusUI.vue'

const COOKIE_NAME = 'docus.ui'

export default <Plugin>async function ({ ssrContext, $docus }: Context & { $docus: DocusRuntimeInstance }) {
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

    // Watch draft and fetch nav
    watch(
      () => $docus.ui.draft,
      () => $docus?.fetchNavigation?.()
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

  // Re-fetch categories
  if (process.server) await $docus?.fetchNavigation?.()
}
