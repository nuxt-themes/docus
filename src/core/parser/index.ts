import { extname } from 'path'
import { ParserOptions } from 'src/types'
import { logger } from '../utils'
import { useJSONParser } from './json'
import { useMarkdownParser } from './markdown'

export * from './json'
export * from './markdown'

let parsers
export function initParser(options: Partial<ParserOptions> = {}) {
  parsers = {
    '.md': useMarkdownParser(options.markdown),
    '.json': useJSONParser()
  }
}

export function useParser() {
  return {
    parse: async (file, content) => {
      const extension = extname(file)
      const path = '/' + file.replace(new RegExp(`${extension}$`), '')
      const paths = path.split(/[/:]/)
      const dir = paths.slice(0, paths.length - 1).join('/') || '/'
      const slug = paths[paths.length - 1]
      const parser = parsers[extension]
      if (!parser) {
        logger.error(`Parser not found for file ${file}`)
      }

      const result = await parser.parse(content)
      return {
        path: paths.join('/'),
        dir,
        slug,
        extension,
        ...result
      }
    }
  }
}
