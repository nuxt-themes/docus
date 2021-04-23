import code from './code'
import html from './html'
import heading from './heading'
import link from './link'
import list from './list'
import listItem from './listItem'
import paragraph from './paragraph'


export default async function handlers(highlighter) {
  // create highlighter if its a factory funtions
  if (typeof highlighter === 'function' && highlighter.length === 0) {
    highlighter = await highlighter()
  }

  return {
    code: code(highlighter),
    paragraph: paragraph,
    html: html,
    link,
    list,
    listItem,
    heading
  }
}
