import { createDocus } from '~docus'

export default async function (ctx, inject) {
  const $docus = await createDocus(ctx)
  inject('docus', $docus)
}
