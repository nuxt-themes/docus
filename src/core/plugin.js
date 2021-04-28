import { createDocus } from '~docus'
import settings from '~docus-cache/docus-settings.json'
/* <% if (options.watch) { %> */ import { useWebSocket } from '~docus/websocket' /* <% } %> */

export default async function (ctx, inject) {
  const $docus = await createDocus(ctx, settings, '<%= options.apiBase %>')

  inject('docus', $docus)

  /* <% if (options.watch) { %> */
  useWebSocket({ base: '<%= options.apiBase %>' }).connect()
  /* <% } %> */
}
