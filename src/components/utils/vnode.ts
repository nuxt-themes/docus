export function isTag(vnode: any, tag: string): boolean {
  return vnode?.tag === tag || vnode?.componentOptions?.tag === tag || vnode?.asyncMeta?.tag === tag
}

export function unwrap(vnode: any, tags = ['p']) {
  if (!vnode.children) {
    return [vnode]
  }
  const needUnwrap = tags.some(tag => isTag(vnode, tag))
  return needUnwrap ? vnode.children : [vnode]
}

export function flatUnwrap(vnodes: [], tags = ['p']) {
  return vnodes
    .flatMap(vnode => unwrap(vnode, tags))
    // second step unwrap for inner tags like li
    .flatMap(vnode => unwrap(vnode, tags))
    // trim new lines
    .filter(vnode => !vnode.text || !!vnode.text.trim())
}