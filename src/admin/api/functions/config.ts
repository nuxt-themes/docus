import { parse } from 'path'
import fs from 'fs-extra'
import { createError, Middleware, useBody } from 'h3'
import { FileData } from '../../type'
import { r } from '../utils'

export default <Middleware>async function configHandler(req) {
  const root = r()
  let path = [r('nuxt.config.ts'), r('nuxt.config.js')].find(i => fs.existsSync(i))
  const exist = Boolean(path)
  path = path || r('nuxt.config.ts')

  if (req.method === 'GET') {
    // List all files in content/
    return {
      path: path.replace(root, ''),
      exist,
      extension: parse(path).ext,
      raw: exist ? await fs.readFile(path, 'utf-8') : ''
    }
  }

  // Update changes
  if (req.method === 'PUT') {
    const { raw } = await useBody<FileData>(req)
    if (raw == null) {
      return createError({
        statusCode: 400,
        statusMessage: '"raw" key is required'
      })
    }

    try {
      await fs.writeFile(path, raw)

      return { ok: true }
    } catch (err) {
      return createError({
        statusCode: 404,
        statusMessage: 'File not found'
      })
    }
  }

  return createError({
    statusCode: 400,
    statusMessage: 'Bad Request'
  })
}
