import { createApp } from 'h3'
import websocketHandler from './functions/ws'
import searchHandler from './functions/search'

export function useServer(nuxt: any) {
  const app = createApp()
  app.useAsync('/ws', websocketHandler)
  app.useAsync('/search', searchHandler)

  nuxt.moduleContainer.addServerMiddleware({
    path: '/_docus',
    handler: app._handle
  })
}
