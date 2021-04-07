import { flattenNode, flattenNodeText } from './utils'

const getHeaderDepth = node => ({
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6
})[node.tag]

function nestHeaders (headers) {
  if (headers.length <= 1) {
    return headers
  }
  const toc = []
  let parent
  headers.forEach((header) => {
    if (!parent || header.depth <= parent.depth) {
      header.children = []
      parent = header
      toc.push(header)
    } else {
      parent.children.push(header)
    }
  })
  toc.forEach((header) => {
    if (header.children.length) {
      toc.children = nestHeaders(header.children)
    } else {
      delete header.children
    }
  })
  return toc
}

export function generateFlatToc (body, options) {
  const { toc: { tags, searchDepth } } = options

  const headers = flattenNode(body, searchDepth)
    .filter(node => tags.includes(node.tag))

  return headers.map(node => ({
    id: node.props.id,
    depth: getHeaderDepth(node),
    text: flattenNodeText(node)
  }))
}

export function generateToc (body, options) {
  const flatToc = generateFlatToc(body, options)
  const toc = nestHeaders(flatToc)
  return toc
}
