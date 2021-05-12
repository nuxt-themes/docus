import { kebabCase } from 'scule'

const mark = type => (node, { attrs = {} } = {}) => ({
  type: 'element',
  tag: type,
  props: attrs,
  children: [node]
})

const marks = {
  bold: mark('prose-strong'),
  italic: mark('em'),
  link: mark('link'),
  code: mark('prose-code-inline')
}
const parentWithTag = tag => node => ({
  type: 'element',
  tag,
  props: node.attrs || {},
  children: node.content ? node.content.map(visit) : []
})

const handlers = {
  doc: node => ({
    type: 'root',
    children: node.content ? node.content.map(visit) : [],
    props: {}
  }),
  text: node => {
    let _node = {
      type: 'text',
      value: node.text
    }
    if (node.marks) {
      _node = node.marks.reduce((_node, { type, attrs }) => {
        return marks[type](_node, { attrs })
      }, _node)
    }
    return _node
  },
  table: parentWithTag('prose-table'),
  tableRow: parentWithTag('prose-tr'),
  tableCell: parentWithTag('prose-td'),
  tableHeader: parentWithTag('prose-th'),
  horizontalRule: parentWithTag('prose-hr'),
  paragraph: parentWithTag('prose-paragraph'),
  codeBlock: parentWithTag('code'),
  blockquote: parentWithTag('prose-blockquote'),
  orderedList: parentWithTag('prose-ol'),
  bulletList: parentWithTag('prose-ul'),
  listItem: parentWithTag('prose-li'),
  heading: node => {
    node.content = node.content || []
    const id = kebabCase(node.content.map(n => n.text))
    let children = node.content.map(visit)
    if (node.attrs.level < 5) {
      children = [
        {
          type: 'element',
          tag: 'prose-a',
          props: {
            href: '#' + id
          },
          children
        }
      ]
    }
    return {
      type: 'element',
      tag: 'prose-h' + node.attrs.level,
      props: {
        id
      },
      children
    }
  }
}

function visit(node) {
  if (Array.isArray(node)) {
    return node.map(visit)
  }

  if (handlers[node.type]) {
    node = handlers[node.type](node)
  } else {
    node.children = visit(node.content || [])
    node.props = node.attrs || {}
    node.tag = node.attrs._tag
    delete node.content
    delete node.attrs
  }
  return node
}

export const docusFromTiptap = visit
