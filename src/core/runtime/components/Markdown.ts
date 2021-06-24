import { flatUnwrap } from '~docus/utils'

export default {
  name: 'Markdown',
  functional: true,
  props: {
    use: {
      type: [String, Object, Function],
      default: 'default'
    },
    unwrap: {
      type: String,
      default: ''
    }
  },
  render: (_h, ctx) => {
    const slot = ctx.props.use || 'default'
    let node = typeof slot === 'string' ? ctx.parent.$scopedSlots[slot] || ctx.parent.$slots[slot] : slot

    // Execute factory funciton
    if (typeof node === 'function') {
      node = node()
    }

    if (typeof node === 'string') {
      return [node]
    }

    // unwrap tags
    if (node && ctx.props.unwrap) {
      const tags = ctx.props.unwrap.split(/[,\s]/)
      node = flatUnwrap(node, tags)
    }

    return node
  }
}
