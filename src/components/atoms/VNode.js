export default {
  functional: true,
  render: (h, ctx) => typeof ctx.props.node === "string" ? [ctx.props.node] : ctx.props.node
}