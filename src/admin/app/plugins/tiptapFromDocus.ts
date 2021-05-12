const markNode = type => node => {
  const _node = visit(node.children[0])
  _node.marks = _node.marks || []
  _node.marks.push({ type, attrs: node.props })
  return _node
}
const heading = level => node => ({
  type: 'heading',
  attrs: { level },
  content: visit(node.children[0].tag === 'prose-a' ? node.children[0].children : node.children)
})

const parentWithType = type => node => ({ type, content: visit(node.children || []) })

function textContent(node) {
  if (node.type === 'text') {
    return node.value
  }
  return node.children.map(textContent).join('')
}

function proseCode(node) {
  const pre = node.children.find(n => n.tag === 'pre')
  const span = node.children.find(n => n.tag === 'span')

  const className = pre.props?.className || []
  const languageClass = className.find(cls => cls.startsWith('language-')) || ''

  const language = languageClass.split('-').pop()
  return {
    type: 'codeBlock',
    attrs: {
      language,
      title: span ? textContent(span) : ''
    },
    content: [
      {
        type: 'text',
        text: textContent(pre)
      }
    ]
  }
}

const handlers = {
  root: parentWithType('doc'),
  'prose-h1': heading(1),
  'prose-h2': heading(2),
  'prose-h3': heading(3),
  'prose-h4': heading(4),
  'prose-h5': heading(5),
  'prose-h6': heading(6),
  'prose-paragraph': parentWithType('paragraph'),
  'prose-hr': parentWithType('horizontalRule'),
  'prose-ul': parentWithType('bulletList'),
  'prose-ol': parentWithType('orderedList'),
  'prose-table': parentWithType('table'),
  'prose-tr': parentWithType('tableRow'),
  'prose-td': parentWithType('tableCell'),
  'prose-th': parentWithType('tableHeader'),
  'prose-li': parentWithType('listItem'),
  'prose-a': markNode('link'),
  'prose-code-inline': markNode('code'),
  'prose-code': proseCode,
  'prose-strong': markNode('bold'),
  'prose-blockquote': parentWithType('blockquote'),
  em: markNode('italic'),
  text: node => ({ type: 'text', text: node.value })
}

function visit(node) {
  if (Array.isArray(node)) {
    return node.map(visit)
  }
  const type = !node.type || node.type === 'element' ? node.tag : node.type

  if (handlers[type]) {
    node = handlers[type](node)
  } else {
    node.attrs = {
      ...node.props,
      _tag: node.tag
    }
    node.content = visit(node.children || [])
  }
  return node
}

export const tiptapFromDocus = visit
