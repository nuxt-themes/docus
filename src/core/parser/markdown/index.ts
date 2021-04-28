import { resolve } from 'path'
import defu from 'defu'
import matter from 'gray-matter'
import { Toc } from 'src/types'
import { processOptions } from './utils'
import { generateToc } from './toc'
import { generateBody, generateDescription } from './content'
import propsDirective from './directive/props'

const DEFAULTS = {
  toc: {
    depth: 2,
    searchDepth: 2
  },
  directives: {
    props: propsDirective
  },
  dataComponents: ['block-hero', 'block-features'],
  remarkPlugins: [
    [
      resolve(__dirname, './plugin/remark-prose'),
      {
        proseClass: 'prose dark:prose-dark'
      }
    ],
    'remark-emoji',
    'remark-directive',
    'remark-squeeze-paragraphs',
    'remark-slug',
    'remark-autolink-headings',
    'remark-external-links',
    'remark-footnotes',
    'remark-gfm'
  ],
  rehypePlugins: ['rehype-sort-attribute-values', 'rehype-sort-attributes', 'rehype-raw'],
  prism: {
    theme: ''
  },
  remarkAutolinkHeadings: {
    behavior: 'wrap'
  }
}

function parseFrontMatter(file) {
  const { data, content, ...rest } = matter(file, { excerpt: true, excerpt_separator: '<!--more-->' })

  return {
    content,
    data: data || {},
    ...rest
  }
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
    text: content,
    excerpt
  }
}

export function useMarkdownParser(options: any = {}) {
  options = defu(options, DEFAULTS)
  options.remarkPlugins.unshift([
    resolve(__dirname, './plugin/directive'),
    { directives: options.directives, dataComponents: options.dataComponents }
  ])
  processOptions(options)

  return {
    parseFrontMatter: (content: string) => parseFrontMatter(content),
    parse: (content: string) => parse(content, options)
  }
}
