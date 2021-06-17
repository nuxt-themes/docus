import { flatUnwrap } from '~docus/utils'

export default {
  name: 'Markdown',
  functional: true,
  render: (_h, ctx) => {
    const slot = ctx.props.slot || 'default'
    let node = ctx.props.node || ctx.parent.$scopedSlots[slot] || ctx.parent.$slots[slot]
    if (typeof node === 'function') {
      node = node()
    }
    if (typeof node === 'string') {
      return [node]
    }
    if (node && ctx.props.unwrap) {
      const tags = ctx.props.unwrap.split(/[,\s]/)
      node = flatUnwrap(node, tags)
    }
    return node
  }
}
