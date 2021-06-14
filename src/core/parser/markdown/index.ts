import { resolve } from 'path'
import defu from 'defu'
import { MarkdownParserOptions, Toc } from '../../../types'
import { processOptions } from './utils'
import { generateToc } from './toc'
import { generateBody, generateDescription } from './content'
import propsDirective from './directive/props'
import { parse as parseFrontMatter } from './fontmatter'

const DEFAULTS: MarkdownParserOptions = {
  toc: {
    depth: 2,
    searchDepth: 2
  },
  directives: {
    props: propsDirective
  },
  remarkPlugins: [
    resolve(__dirname, './directive'),
    'remark-emoji',
    'remark-squeeze-paragraphs',
    'remark-slug',
    ['remark-autolink-headings', { behavior: 'wrap' }],
    'remark-external-links',
    'remark-footnotes',
    'remark-gfm'
  ],
  rehypePlugins: ['rehype-sort-attribute-values', 'rehype-sort-attributes', 'rehype-raw']
}

async function parse(file, options) {
  const { content, data, ...rest } = await parseFrontMatter(file)

  // Compile markdown from file content to JSON
  const body = await generateBody(content, { ...options, data })

  /**
   * generate toc if it is not disabled in front-matter
   */
  let toc: Toc
  if (data.toc !== false) {
    const tocOption = defu(data.toc || {}, options.toc)
    toc = generateToc(body, tocOption)
  }

  let excerpt
  let description
  if (rest.excerpt) {
    excerpt = await generateBody(rest.excerpt, { ...options, data })
    description = generateDescription(excerpt)
  }
  return {
    description,
    ...data,
    toc,
    body,
    text: file,
    excerpt
  }
}

export function useMarkdownParser(options: Partial<MarkdownParserOptions> = {}) {
  options = defu(options, DEFAULTS)
  options.remarkPlugins.unshift([resolve(__dirname, './directive/remark-plugin'), { directives: options.directives }])
  processOptions(options)

  return {
    parseFrontMatter: (content: string) => parseFrontMatter(content),
    parse: (content: string) => parse(content, options)
  }
}
