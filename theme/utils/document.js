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

export function generateSlug (path) {
  return path
    .split('/')
    .map(part => part.replace(/(\d+\.)?(.*)/, '$2').replace(/^index/, '').replace(/\.draft/, ''))
    .join('/')
}

export function isDraft (path) {
  return !!path.match(/(\.draft)$/, '$2')
}

function paddLeft (value, length) {
  return ('0'.repeat(length) + value).substr(String(value).length)
}

function paddRight (value, length) {
  return (value + '0'.repeat(length)).substr(0, length)
}
