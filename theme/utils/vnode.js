export function hasClassAttr (vnode, name) {
  return vnode.data && vnode.data.attrs && vnode.data.attrs.class && vnode.data.attrs.class.includes(name)
}

export function isTag (vnode, tag) {
  return (vnode.componentOptions && vnode.componentOptions.tag === tag) || (vnode.asyncMeta && vnode.asyncMeta.tag === tag)
}
