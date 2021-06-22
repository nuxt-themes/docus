import { promises as fs } from 'fs'
import { join, extname } from 'path'
import matter from 'gray-matter'
import { createError, Middleware, useBody } from 'h3'
import dirTree from 'directory-tree'
import { normalizeFiles, r } from '../utils'

interface Body {
  data: any
  content: string
}

export default <Middleware>async function contentHandler(req) {
  const url = req.url

  if (req.method === 'GET') {
    // List all files in content/
    if (url === '/') {
      const tree = dirTree(r('content'))
      return normalizeFiles(tree.children, r('content'))
    }
    // Read a single content file
    try {
      const path = join(r('content'), url)
      const file = await fs.readFile(path, 'utf-8')
      const { content, data } = matter(file)

      return {
        path: path.replace(r('content'), ''),
        extension: extname(path),
        data,
        content
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
    const { data, content } = await useBody<Body>(req)

    if (!data || !content) {
      return createError({
        statusCode: 400,
        statusMessage: 'data and content keys are required'
      })
    }

    const path = join(r('content'), url)

    try {
      // @ts-ignore
      await fs.stat(path, 'utf-8')

      const file = matter.stringify(content, data)

      await fs.writeFile(path, file)

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
