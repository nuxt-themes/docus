import { resolve } from 'path'
import defu from 'defu'
import { MarkdownParserOptions, Toc } from '../../../types'
import { processOptions } from './utils'
import { generateToc } from './toc'
import { generateBody } from './content'
import propsDirective from './directive/props'
import { parse as parseFrontMatter } from './fontmatter'
import { processHeading } from './meta'

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
  if (rest.excerpt) {
    excerpt = await generateBody(rest.excerpt, { ...options, data })
  }

  /**
   * Process content headeings
   */
  const heading = processHeading(body)

  return {
    ...data,
    title: data.title || heading.title,
    description: data.description || heading.description,
    toc,
    body,
    text: file,
    excerpt,
    empty: content.trim().length === 0
  }
}

let options: MarkdownParserOptions = DEFAULTS
export function useMarkdownParser(parserOptions?: Partial<MarkdownParserOptions>) {
  if (parserOptions) {
    options = defu(parserOptions, DEFAULTS)

    options.remarkPlugins.unshift([resolve(__dirname, './directive/remark-plugin'), { directives: options.directives }])
    processOptions(options)
  }

  return {
    parseFrontMatter: (content: string) => parseFrontMatter(content),
    parse: (content: string) => parse(content, options)
  }
}
