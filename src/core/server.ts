import { createApp, useBody } from 'h3'
import { createStorageServer } from 'unstorage/server'
import { useDB } from './database'
import { logger } from './util'

export const createServerMiddleware = storage => {
  const app = createApp()
  const handle = createStorageServer(storage).handle
  if (process.env.NODE_ENV === 'developement') {
    storage.watch((event, key) => {
      logger.info(`${key} -- ${event}`)
    })
  }
  app.useAsync(async (req, res) => {
    if (req.method === 'POST') {
      const { find } = useDB()
      const url = req.url!
      const body = await useBody(req)
      const result = await find(url, body || {})
      
      return JSON.stringify(result)
    } else {
      return handle(req, res)
    }
  })
  return app
}