const { fetchTweetAst } = require('static-tweets')

function createTweetNode (data, content, layout = 'tweet') {
  return [
    {
      type: 'html',
      value: `<DTweet class="tweet tweet-${layout}" layout="${layout}" id="${data.id}" avatar="${data.avatar.normal}" :created-at="${data.createdAt}" heart-count="${data.heartCount}" name="${data.name}" username="${data.username}">`
    },
    ...mapAST(content),
    { type: 'html', value: '</DTweet>' }
  ]
}

function mapAST (ast) {
  return ast.flatMap((node) => {
    if (typeof node === 'string') {
      return { type: 'text', value: node }
    }
    if (node.tag === 'a') {
      return { type: 'link', data: node.props, url: node.props.href, children: mapAST(node.nodes) }
    }
    if (node.tag === 'br') {
      return { type: 'html', value: '<br />' }
    }
    if (node.tag === 'img') {
      if (node.props.dataType === 'emoji-for-text') {
        return { type: 'html', value: `<img src="${node.props.src}" alt="${node.props.alt}" class="emoji" width="28" height="28" />` }
      }
      if (node.props.dataType === 'media-image') {
        const { props } = node
        return {
          type: 'html',
          value: `<img src="${props.src}" alt="${props.alt}" class="media-image" width="${props.width}" height="${props.height}" />`
        }
      }
    }
    if (node.tag === 'div') {
      return [
        { type: 'html', value: `<div class="${node.props.dataType.replace(/ /, '-')}">` },
        ...mapAST(node.nodes),
        { type: 'html', value: '</div>' }
      ]
    }

    if (node.tag === 'p') {
      return { type: 'paragraph', children: mapAST(node.nodes) }
    }

    // qoute
    if (node.tag === 'blockquote') {
      const { data, nodes } = node.data.ast[0]
      return createTweetNode(data, nodes, 'tweet tweet-quote')
    }

    return { type: 'text', value: '?' }
  })
}

const tweetCache = {}

module.exports = async (node) => {
  const match = node.value.match(/id=['"](\d*)['"]/)
  if (!match) {
    // eslint-disable-next-line no-console
    console.error('Invalid tweet id')
    return { node: { type: 'html', value: '<!-- Invalid tweet id -->' } }
  }
  if (!tweetCache[match[1]]) {
    try {
      const tweet = await fetchTweetAst(match[1])
      const { nodes, data } = tweet[0]
      tweetCache[match[1]] = createTweetNode(data, nodes)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Cannot fetch tweet ${match[1]}. ${e.message}`)
      return { node: { type: 'html', value: `<!-- Cannot fetch tweet ${match[1]} -->` } }
    }
  }
  return { node: tweetCache[match[1]] }
}
