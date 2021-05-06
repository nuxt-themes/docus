import { promises as fs } from 'fs'
import { join, extname } from 'path'
import { createError, Middleware, useBody } from 'h3'
import dirTree from 'directory-tree'
import { normalizeFiles, r } from '../utils'

interface Body {
  data: any
}

export default <Middleware>async function pagesHandler(req) {
  const url = req.url

  if (req.method === 'GET') {
    // List all pages
    if (url === '/') {
      const tree = dirTree(r('pages'))
      return normalizeFiles(tree.children, r('pages'))
    }
    // Read a single page
    try {
      const path = join(r('pages'), url)
      const data = await fs.readFile(path, 'utf-8')

      return {
        path: path.replace(r('pages'), ''),
        extension: extname(path),
        data
      }
    } catch (err) {
      return createError({
        statusCode: 404,
        statusMessage: 'File not found'
      })
    }
  }

  // Update changes
  if (req.method === 'PUT') {
    const body = await useBody<Body>(req)

    if (!body.data) {
      return createError({
        statusCode: 400,
        statusMessage: 'data key missing'
      })
    }

    const path = join(r('pages'), url)

    try {
      // @ts-ignore
      await fs.stat(path, 'utf-8')
      await fs.writeFile(path, body.data)

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
