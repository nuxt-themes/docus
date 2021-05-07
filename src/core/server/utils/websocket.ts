import WS from 'ws'
import { useHooks } from '../../hooks'

let _ws
export function useWebSocket({ base }) {
  if (!_ws) {
    _ws = new WS.Server({ noServer: true })
    const { hook } = useHooks()

    hook('docus:storage:updated', ({ event, key }) => {
      broadcast({ event, key })
    })

    hook('upgrade', (req, socket, head) => {
      if (req.url === `/${base}/ws`) {
        serve(req, socket, head)
      }
    })
  }

  const serve = (req, socket = req.socket, head = '') =>
    _ws.handleUpgrade(req, socket, head, client => _ws.emit('connection', client, req))

  const broadcast = data => {
    data = JSON.stringify(data)

    for (const client of _ws.clients) {
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
