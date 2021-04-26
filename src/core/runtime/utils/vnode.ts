export const TAGS_MAP = {
  h1: ['h1', 'prose-h1'],
  h2: ['h2', 'prose-h2'],
  h3: ['h3', 'prose-h3'],
  h4: ['h4', 'prose-h4'],
  h5: ['h5', 'prose-h5'],
  h6: ['h6', 'prose-h6'],
  p: ['p', 'prose-paragraph'],
  ul: ['ul', 'prose-ul'],
  ol: ['ol', 'prose-ol'],
  blockquote: ['blockquote', 'prose-blockquote']
}

export const expandTags = (_tags: string[]) => _tags.flatMap(t => TAGS_MAP[t])

// @vue/component
export const Markdown = {
  functional: true,
  render: (_h, ctx) => {
    let node = ctx.props.node
    if (typeof node === 'string') {
      return [node]
    }
    if (ctx.props.unwrap) {
      const tags = ctx.props.unwrap.split(/[,\s]/)
      node = flatUnwrap(node, tags)
    }
    return node
  }
}

export function isTag(vnode: any, tag: string): boolean {
  return vnode?.tag === tag || vnode?.componentOptions?.tag === tag || vnode?.asyncMeta?.tag === tag
}

export function unwrap(vnode: any, tags = ['p']) {
  tags = expandTags(tags)
  const needUnwrap = tags.some(tag => isTag(vnode, tag))
  return needUnwrap
    ? vnode.children || vnode?.componentOptions?.children || vnode?.asyncMeta?.children || [vnode]
    : [vnode]
}

export function flatUnwrap(vnodes: any[], tags = ['p']) {
  return (
    vnodes
      .flatMap(vnode => unwrap(vnode, tags))
      // second step unwrap for inner tags like li
      .flatMap(vnode => unwrap(vnode, tags))
      // trim new lines
      .filter(vnode => !vnode.text || !!vnode.text.trim())
  )
}
