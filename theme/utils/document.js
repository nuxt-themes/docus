import { withoutTrailingSlash } from 'ufo'

export function generatePosition (path, doc) {
  const position = path.split('/').filter(Boolean).map((part) => {
    const match = part.match(/^(\d+)\./)
    if (match) {
      return paddLeft(match[1], 4)
    }
    return doc.position ? paddLeft(doc.position, 4) : '9999' // Parts without a position are going down to the bottom
  }).join('')
  return paddRight(position, 12)
}

export function generateSlug (name) {
  return name.replace(/(\d+\.)?(.*)/, '$2').replace(/^index/, '').replace(/\.draft/, '')
}
export function generateTo (path) {
  return withoutTrailingSlash(path.split('/').map(generateSlug).join('/'))
}

export function isDraft (path) {
  return !!path.match(/(\.draft)$/, '$2')
}

export function processDocumentInfo (document) {
  if (document.title && document.description) {
    return document
  }
  const [first, second] = document.body.children
    .flatMap(node => node.children ? node.children : node)
    // top level `text` can be ignored
    .filter(node => node.type !== 'text')

  if (first && first.tag === 'h1') {
    if (!document.title) {
      document.title = getTextContent(first)
      Object.assign(first, {
        type: 'text', value: ''
      })
    }
    // look for second element to find description
    if (second && second.tag === 'blockquote') {
      if (!document.description) {
        document.description = getTextContent(second)
        Object.assign(second, {
          type: 'text', value: ''
        })
      }
    }
  } else if (first && first.type === 'blockquote') {
    if (!document.description) {
      document.description = getTextContent(first)
      Object.assign(first, {
        type: 'text', value: ''
      })
    }
  }
  return document
}

function getTextContent (node) {
  let text = node.value || ''
  if (node.children) {
    text = text + node.children.map(child => getTextContent(child)).join('')
  }
  return text
}

function paddLeft (value, length) {
  return ('0'.repeat(length) + value).substr(String(value).length)
}

function paddRight (value, length) {
  return (value + '0'.repeat(length)).substr(0, length)
}
