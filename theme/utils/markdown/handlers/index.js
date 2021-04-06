import codeHandler from './code'
import htmlHandler from './html'
import paragraphHandler from './paragraph'

export default async function handlers (highlighter) {
  // create highlighter if its a factory funtions
  if (typeof highlighter === 'function' && highlighter.length === 0) {
    highlighter = await highlighter()
  }

  return {
    code: codeHandler(highlighter),
    paragraph: paragraphHandler,
    html: htmlHandler
  }
}
