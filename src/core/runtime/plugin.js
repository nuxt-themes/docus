import { createDocus } from '~docus'
<% if (options.watch) { %>import { useWebSocket } from '~docus/websocket'<% } %>

export default async function (ctx, inject) {
  const $docus = await createDocus(ctx)
  inject('docus', $docus)

  <% if (options.watch) { %>
  useWebSocket({ base: "<%= options.apiBase %>" }).connect()
  <% } %>
}
