export function generatePosition (path) {
  const position = path.split('/').filter(Boolean).map((part) => {
    const match = part.match(/^(\d+)\./)
    return match
      ? paddLeft(match[1], 4)
      : '9999' // Parts wihtout a position are going down to the bottom
  }).join('')
  return paddRight(position, 12)
}

export function generateSlug (path) {
  return path
    .split('/')
    .map(part => part.replace(/(\d+\.)?(.*)(\.draft)?/, '$2').replace(/^index/, ''))
    .join('/')
}

function paddLeft (value, length) {
  return ('0'.repeat(length) + value).substr(value.length)
}

function paddRight (value, length) {
  return (value + '0'.repeat(length)).substr(0, length)
}
