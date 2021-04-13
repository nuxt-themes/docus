
const TAG_REGEX = /^\s*<\/?([A-Za-z0-9-_]+) ?[^>]*>/
const PROSE_ELEMENTS = [
  // HTML tags
  'div',
  'p',
  'ul',

  // Global tags
  'd-props',
  'DProps'
]

const isJsNode = (node, customProsElements = []) => {
  let match
  if (node.type === 'html') {
    match = node.value.match(TAG_REGEX)
  }
  if (!match && node.children && node.children[0] && node.children[0].type === 'html') {
    match = node.children[0].value.match(TAG_REGEX)
  }
  return (
    match &&
    !PROSE_ELEMENTS.includes(match[1]) && // ensure tag is not a valid prose tag
    !customProsElements.includes(match[1])
  )
}

module.exports = ({ prosElements = [], proseClass = 'prose' }) => {
  return tree => {
    let insideProse = false
    tree.children = tree.children.flatMap((node, i) => {
      if (insideProse && isJsNode(node, prosElements)) {
        insideProse = false
        return [{ type: 'html', value: '</div>' }, node]
      }
      if (!insideProse && !isJsNode(node, prosElements)) {
        insideProse = true
        return [
          { type: 'html', value: `<div class="${proseClass}">` },
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
