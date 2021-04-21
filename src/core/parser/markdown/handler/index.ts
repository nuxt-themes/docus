import codeHandler from './code'
import htmlHandler from './html'
import paragraphHandler from './paragraph'
import all from 'mdast-util-to-hast/lib/all'

export default async function handlers(highlighter) {
  // create highlighter if its a factory funtions
  if (typeof highlighter === 'function' && highlighter.length === 0) {
    highlighter = await highlighter()
  }

  return {
    code: codeHandler(highlighter),
    paragraph: paragraphHandler,
    html: htmlHandler,
    heading: (h, node) => h(node, 'prose-h' + node.depth, all(h, node))
  }
}
