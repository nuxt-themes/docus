import { joinURL, withLeadingSlash } from 'ufo'
import settings from '~docus-cache/docus-settings.json'
import { createDocus, <%= options.isSSG ? "QueryBuilder" : "RemoteQueryBuilder" %> } from '~docus'
/* <% if (options.watch) { %> */ import { useWebSocket } from '~docus/api/websocket' /* <% } %> */


/* <% if (options.isSSG) { %> */
import Loki from '@lokidb/loki'
let db, items
function createQuery(path, { deep = false, text = false } = {}) {
  const query = {
    $or: [{ path }, { path: deep ? { $regex: new RegExp(`^${path}`) } : path }]
  }
  const postprocess = [data => (!deep && data[0]?.path === path ? data[0] : data)]

  return new QueryBuilder({ query: items.chain().find(query, !deep), path, postprocess, text }, {})
}
/* <% } else { %> */
function createQuery(path, options) {
  path = withLeadingSlash(path)
  return new RemoteQueryBuilder(joinURL('/', '<%= options.apiBase %>', path), options)
}
/* <% } %> */


export default async function (ctx, inject) {
  /* <% if (options.isSSG) { %> */
  if (process.client && !db) {
    const { docusDbHash } = ctx.$config ? ctx.$config : ctx.nuxtState
    const database = await fetch(`<%= options.dbPath %>/db-${docusDbHash}.json`).then(res => res.json())
    db = new Loki('content.db')
    db.loadJSONObject(database)
    items = db.getCollection('items')
  }
  /* <% } %> */

  const $docus = await createDocus(
    ctx,
    settings,
    process.server ? ctx.ssrContext.docus.createQuery : createQuery
  )

  inject('docus', $docus)

  /* <% if (options.watch) { %> */
  if (process.client) {
    useWebSocket({ base: '<%= options.apiBase %>' }).connect()
  }
  /* <% } %> */
}
