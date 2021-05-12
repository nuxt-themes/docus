import { kebabCase } from 'scule'

const mark = type => (node, { attrs } = {}) => ({
  type: 'element',
  tag: type,
  props: attrs || {},
  children: [node]
})

const parentWithTag = tag => node => ({
  type: 'element',
  tag,
  props: {},
  children: visit(node.content || [])
})

const marks = {
  bold: mark('prose-strong'),
  italic: mark('em'),
  link: mark('link'),
  code: mark('prose-code-inline')
}
const handlers = {
  doc: node => ({
    type: 'root',
    children: node.content ? node.content.map(node => visit(node)) : [],
    props: {}
  }),
  horizontalRule: () => ({
    type: 'element',
    tag: 'prose-hr',
    props: {},
    children: []
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
  paragraph: node => ({
    type: 'element',
    tag: 'prose-paragraph',
    children: node.content ? node.content.map(node => visit(node)) : [],
    props: {}
  }),
  codeBlock: node => ({
    type: 'code',
    tag: 'code',
    children: node.content ? node.content.map(node => visit(node)) : [],
    props: node.attrs
  }),
  blockquote: node => ({
    type: 'element',
    tag: 'prose-blockquote',
    props: {},
    children: node.content.map(visit)
  }),
  orderedList: node => ({
    type: 'element',
    tag: 'prose-ol',
    props: {},
    children: node.content.map(visit)
  }),
  bulletList: node => ({
    type: 'element',
    tag: 'prose-ul',
    props: {},
    children: node.content.map(visit)
  }),
  listItem: node => ({
    type: 'element',
    tag: 'prose-li',
    props: {},
    children: node.content.map(visit)
  }),
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
