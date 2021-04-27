import WS from 'ws'
import { createApp, useBody } from 'h3'
import { createStorageServer } from 'unstorage/server'
import { useDB } from './database'
import useHooks from './hooks'

export const createServerMiddleware = ({ base, storage }) => {
  const unstorageHandle = createStorageServer(storage).handle
  const app = createApp()
  const ws = useWebSocket({ base })

  app.useAsync(async (req, res) => {
    if (req.url === '/ws') {
      return ws.serve(req)
    }

    if (req.method === 'POST') {
      const { find } = useDB()
      const url = req.url!
      const body = await useBody(req)
      const result = await find(url, body || {})

      return JSON.stringify(result)
    }

    return unstorageHandle(req, res)
  })

  return {
    path: `/${base}`,
    handler: app
  }
}

function useWebSocket({ base }) {
  const wss = new WS.Server({ noServer: true })
  const { hook } = useHooks()

  hook('docus:storage:updated', ({ event, key }) => {
    broadcast({ event, key })
  })

  hook('upgrade', (req, socket, head) => {
    if (req.url === `/${base}/ws`) {
      serve(req, socket, head)
    }
  })

  const serve = (req, socket = req.socket, head = '') =>
    wss.handleUpgrade(req, socket, head, client => wss.emit('connection', client, req))

  const broadcast = data => {
    data = JSON.stringify(data)

    for (const client of wss.clients) {
      try {
        client.send(data)
      } catch (err) {
        /* Ignore error (if client not ready to receive event) */
      }
    }
  }
  return {
    serve,
    broadcast
  }
}
