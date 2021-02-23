import Vue from 'vue'
import { reactive, watch } from 'vue-demi'
import { createCookies } from '@vueuse/integrations'
import defu from 'defu'
import DocusUI from '../components/dev-templates/DocusUI'

const COOKIE_NAME = 'docus.ui'

export default function ({ $docus, ssrContext }) {
  const useUniversalCookies = createCookies(ssrContext?.req)
  const cookies = useUniversalCookies()
  const ui = cookies.get(COOKIE_NAME) || {}

  // UI data (universal storage)
  $docus.ui = reactive(defu(ui, {
    slots: false
  }))
  watch($docus.ui, () => cookies.set(COOKIE_NAME, $docus.ui))

  // Mount DocusUI widget on client-side
  if (process.client) {
    const el = document.createElement('div')
    document.body.appendChild(el)
    new Vue({
      ...DocusUI,
      $docus
    }).$mount(el)
  }
}
