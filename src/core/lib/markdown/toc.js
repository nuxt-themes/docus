import { flattenNode, flattenNodeText, logger } from './utils'

const TOC_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6']
const TOC_TAGS_DEPTH = { h2: 2, h3: 3, h4: 4 }

const getHeaderDepth = node => TOC_TAGS_DEPTH[node.tag]

const getTocTags = depth => {
  if (depth < 1 || depth > 5) {
    logger.warn(`toc.depth is set to ${depth}. It should be a muber between 1 and 5. `)
    depth = 1
  }

  return TOC_TAGS.slice(0, depth)
}

function nestHeaders(headers) {
  if (headers.length <= 1) {
    return headers
  }
  const toc = []
  let parent
  headers.forEach(header => {
    if (!parent || header.depth <= parent.depth) {
      header.children = []
      parent = header
      toc.push(header)
    } else {
      parent.children.push(header)
    }
  })
  toc.forEach(header => {
    if (header.children.length) {
      toc.children = nestHeaders(header.children)
    } else {
      delete header.children
    }
  })
  return toc
}

export function generateFlatToc(body, options) {
  const { searchDepth, depth, title = '' } = options
  const tags = getTocTags(depth)
  const headers = flattenNode(body, searchDepth).filter(node => tags.includes(node.tag))

  const links = headers.map(node => ({
    id: node.props.id,
    depth: getHeaderDepth(node),
    text: flattenNodeText(node)
  }))
  return {
    title,
    links
  }
}

export function generateToc(body, options) {
  const toc = generateFlatToc(body, options)
  toc.links = nestHeaders(toc.links)
  return toc
}
