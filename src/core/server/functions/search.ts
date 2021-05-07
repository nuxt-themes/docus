import { createError, Middleware, useBody } from 'h3'
import { useDB } from '../../database'

export default <Middleware>async function search(req) {
  if (req.method !== 'POST') {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }
  const { find } = useDB()
  const url = req.url!
  const body = await useBody(req)
  const result = await find(url, body || {})

  return result
}
