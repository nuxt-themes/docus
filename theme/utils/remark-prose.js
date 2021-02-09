
const PROSE_ELEMENTS = [
  // HTML tags
  'div', 'p', 'ul'

  // Global tags
]

const isJsNode = (node, customProsElements = []) => {
  const match = node.value && node.value.match(/^<([a-z]+)(>|\s)/) // make sure html starts with a tag
  return (
    match &&
    ['html'].includes(node.type) &&
    !PROSE_ELEMENTS.includes(match[1]) && // ensure tag is not a valid prose tag
    !customProsElements.includes(match[1])
  )
}

module.exports = ({ prosElements = [], proseClass = '' }) => {
  return (tree) => {
    let insideProse = false
    tree.children = tree.children.flatMap((node, i) => {
      if (insideProse && isJsNode(node, prosElements)) {
        insideProse = false
        return [{ type: 'html', value: '</div>' }, node]
      }
      if (!insideProse && !isJsNode(node, prosElements)) {
        insideProse = true
        return [
          { type: 'html', value: `<div className="prose ${proseClass}">` },
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
