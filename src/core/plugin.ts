import { Plugin } from '@nuxt/types'
import { createDocus } from './runtime/docus'
// @ts-ignore - Import settings from Docus cache at runtime
import settings from '~docus-cache/docus-settings.json'

export default <Plugin>async function (ctx, inject) {
  const $docus = await createDocus(ctx, settings)

  inject('docus', $docus)
}
