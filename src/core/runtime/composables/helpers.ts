import Vue from 'vue'
import { DocusAddonContext } from '../../../types'

export const docusInit = async ({ context, state }: DocusAddonContext, fetch: any) => {
  // HotReload on development
  if (process.client && process.dev) window.onNuxtReady(() => window.$nuxt.$on('content:update', fetch))

  // Fetch on server
  if (process.server) {
    await fetch()

    context.beforeNuxtRender(({ nuxtState }) => (nuxtState.docus = state))
  }

  // SPA Fallback
  if (process.client && !state.settings) await fetch()
}

export const clientAsyncData = (app, $nuxt: any) => {
  if (process.client) {
    window.onNuxtReady((nuxt: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      $nuxt = nuxt

      // Workaround since in full static mode, asyncData is not called anymore
      app.router.beforeEach((_: any, __: any, next: any) => {
        const payload = nuxt._pagePayload || {}

        payload.data = payload.data || []

        if (payload.data[0]?.page?.template && typeof Vue.component(payload.data[0].page.template) === 'function') {
          // Preload the component on client-side navigation
          Vue.component(payload.data[0].page.template)
        }

        next()
      })
    })
  }
}
