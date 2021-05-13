import zwitch from 'zwitch'
import configure from 'mdast-util-to-markdown/lib/configure'
import defaultJoin from 'mdast-util-to-markdown/lib/join'
import defaultUnsafe from 'mdast-util-to-markdown/lib/unsafe'
import listItem from './handle/list-item'
import doc from './handle/doc'
import text from './handle/text'
import bold from './handle/bold'
import blockquote from './handle/blockquote'
import paragraph from './handle/paragraph'
import list from './handle/list'
import link from './handle/link'
import root from './handle/root'
import element from './handle/element'
import code from './handle/code'
import table from './handle/table'
import tableRow from './handle/table-row'
import tableHeader from './handle/table-header'
import tableCell from './handle/table-cell'
import tableHead from './handle/table-head'
import tableBody from './handle/table-body'
import heading from './handle/heading'
import inlineCode from './handle/inlineCode'

export function toMarkdown(tree, options = {}) {
  const settings = {
    bullet: '-',
    ...options
  }
  const context = {
    enter,
    stack: [],
    unsafe: [],
    join: [],
    handlers: {},
    options: {} as any,
    handle: undefined as any
  }

  configure(context, {
    unsafe: defaultUnsafe,
    join: defaultJoin,
    handlers: {
      doc,
      text,
      bold,
      blockquote,
      paragraph,
      heading,
      bulletList: list,
      codeBlock: code,
      code: inlineCode,
      listItem,
      link,
      root,
      element,
      table,
      tableRow,
      tableCell,
      tableHeader,
      tableBody,
      tableHead
    }
  })
  configure(context, settings)

  if (context.options.tightDefinitions) {
    context.join = [joinDefinition].concat(context.join)
  }

  context.handle = zwitch('type', {
    invalid,
    unknown,
    handlers: context.handlers
  })

  const result = context.handle(tree, null, context)

  return result

  function enter(name) {
    context.stack.push(name)
    return exit

    function exit() {
      context.stack.pop()
    }
  }
}

function invalid(value) {
  throw new Error('Cannot handle value `' + value + '`, expected node')
}

function unknown(node) {
  throw new Error('Cannot handle unknown node `' + node.type + '`')
}

function joinDefinition(left, right) {
  // No blank line between adjacent definitions.
  if (left.type === 'definition' && left.type === right.type) {
    return 0
  }
}
