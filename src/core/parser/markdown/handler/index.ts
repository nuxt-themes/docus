import code from './code'
import html from './html'
import heading from './heading'
import link from './link'
import list from './list'
import listItem from './listItem'
import table from './table'
import paragraph from './paragraph'
import hardBreak from './break'
import image from './image'
import blockquote from './blockquote'
import strong from './strong'
import codeInline from './codeInline'

export default async function handlers(highlighter) {
  // create highlighter if its a factory funtions
  if (typeof highlighter === 'function' && highlighter.length === 0) {
    highlighter = await highlighter()
  }

  return {
    break: hardBreak,
    code: code(highlighter),
    paragraph,
    html,
    link,
    list,
    listItem,
    heading,
    table,
    image,
    blockquote,
    strong,
    codeInline
  }
}
