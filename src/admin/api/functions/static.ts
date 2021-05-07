import { join, extname } from 'path'
import { promises as fs } from 'fs'
import directoryTree from 'directory-tree'
import { createError, Middleware } from 'h3'
import { normalizeFiles } from '../utils'

export default <Middleware>async function staticHandler(req) {
  const url = req.url

  if (url === '/') {
    const tree = directoryTree(process.options.dir.static)

    return normalizeFiles(tree.children, process.options.dir.static)
  }

  try {
    const path = join(process.options.dir.static, url)
    const data = await fs.readFile(path, 'utf-8')

    return {
      path: path.replace(process.options.dir.static, ''),
      extension: extname(path),
      data
    }
  } catch (err) {
    return createError({
      statusCode: 400,
      statusMessage: 'File not found'
    })
  }
}
