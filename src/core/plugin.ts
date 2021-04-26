import { Plugin } from '@nuxt/types'
import { createDocus } from './runtime/docus'

export default <Plugin>async function (ctx, inject) {
  const $docus = await createDocus(ctx)

  inject('docus', $docus)
}
