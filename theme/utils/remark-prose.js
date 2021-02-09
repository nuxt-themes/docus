const isJsNode = (node) => {
  return (
    ['html'].includes(node.type) &&
    /^<[a-z]+(>|\s)/.test(node.value)
  )
}

module.exports = () => {
  return (tree) => {
    let insideProse = false
    tree.children = tree.children.flatMap((node, i) => {
      if (insideProse && isJsNode(node)) {
        insideProse = false
        return [{ type: 'html', value: '</div>' }, node]
      }
      if (!insideProse && !isJsNode(node)) {
        insideProse = true
        return [
          { type: 'html', value: '<div className="prose">' },
          node,
          ...(i === tree.children.length - 1 ? [{ type: 'html', value: '</div>' }] : [])
        ]
      }
      if (i === tree.children.length - 1 && insideProse) {
        return [node, { type: 'html', value: '</div>' }]
      }
      return [node]
    })
  }
}
