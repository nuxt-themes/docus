import unified from 'unified'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'

import { DocusRootNode } from '../../../types'
import handlers from './handler'
import compiler from './compiler'
import { flattenNodeText } from './utils'
import { toMarkdown } from './stringify'

const usePlugins = (plugins, stream) =>
  plugins.reduce((stream, plugin) => stream.use(plugin.instance, plugin.options), stream)

/**
 * Generate text excerpt summary
 * @param {string} excerptContent - JSON AST generated from excerpt markdown.
 * @returns {string} concatinated excerpt
 */
export function generateDescription(excerptContent) {
  return flattenNodeText(excerptContent)
}

/**
 * Generate json body
 * @param {string} content - JSON AST generated from markdown.
 * @param {object} data - document data
 * @returns {object} JSON AST body
 */
export async function generateBody(content, options): Promise<DocusRootNode> {
  const { highlighter, data } = options
  const rehypeOptions: any = {
    handlers: await handlers(highlighter),
    allowDangerousHtml: true
  }

  return new Promise((resolve, reject) => {
    let stream = unified().use(parse)

    stream = usePlugins(options.remarkPlugins, stream)
    stream = stream.use(remark2rehype, rehypeOptions)
    stream = usePlugins(options.rehypePlugins, stream)

    stream.use(compiler).process({ data, contents: content }, (error, file) => {
      /* istanbul ignore if */
      if (error) {
        return reject(error)
      }
      resolve(file.result as DocusRootNode)
    })
  })
}

export function generateMarkdown(content, options): Promise<string> {
  const { data } = options
  function unwrapChildren(node, tags: string[]) {
    if (!node.children) return []

    return (node.children || [])
      .flatMap(n => {
        if (tags.includes(n.tag)) {
          return n.children || []
        }
        return [n]
      })
      .filter(n => n.type !== 'text' || n.value !== '\n')
  }

  return new Promise((resolve, reject) => {
    unified()
      .use(function parser() {
        this.Parser = parse
        function parse() {
          function visit(tree: any) {
            if (Array.isArray(tree)) {
              return tree.map(visit)
            }
            tree.tagName = tree.tag
            if (tree.tag === 'prose-paragraph') {
              tree.type = 'paragraph'
            }
            if (tree.tag === 'prose-ul') {
              tree.children = unwrapChildren(tree, [])

              tree.type = 'list'
            }
            if (tree.tag === 'prose-strong') {
              tree.type = 'strong'
            }
            if (tree.tag === 'prose-code-inline') {
              tree.value = tree.children[0].value
              tree.type = 'inlineCode'
            }
            if (tree.tag === 'prose-blockquote') {
              tree.children = unwrapChildren(tree, ['prose-paragraph'])

              tree.type = 'blockquote'
            }
            if (tree.tag === 'prose-li') {
              tree.children = unwrapChildren(tree, ['prose-paragraph'])

              tree.type = 'listItem'
            }
            if (tree.tag === 'prose-a' || tree.tag === 'link') {
              tree.type = 'link'
              tree.url = tree.props.href
              tree.title = tree.props.title
            }
            if (tree.tag && tree.tag.startsWith('prose-h')) {
              tree.children = unwrapChildren(tree, ['prose-a'])

              tree.type = 'heading'
              tree.depth = Number(tree.tag.replace('prose-h', ''))
            }
            if (tree.children) tree.children = visit(tree.children)
            return tree
          }
          return visit(content)
        }
      })
      .use(
        function (options) {
          this.Compiler = function (tree) {
            return toMarkdown(tree, options)
          }
        },
        {
          bullet: '-',
          handlers: {
            element: function f(a) {
              console.log(a);
              return JSON.stringify(a)
            }
          }
        }
      )
      .process(
        {
          data,
          contents: content
        },
        (error, file) => {
          /* istanbul ignore if */
          if (error) {
            return reject(error)
          }

          resolve((file.result || file.contents) as string)
        }
      )
  })
}
