import { Middleware } from 'h3'
import { useWebSocket } from '../utils/websocket'

export default <Middleware>function ws(req) {
  const { serve } = useWebSocket({ base: '_docus' })
  return serve(req)
}
