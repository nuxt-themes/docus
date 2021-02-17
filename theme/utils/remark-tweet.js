const { fetchTweetAst } = require('static-tweets')

function mapAST (ast) {
  return ast.flatMap((node) => {
    if (typeof node === 'string') {
      return { type: 'text', value: node }
    }
    if (node.tag === 'a') {
      return {
        type: 'link',
        data: node.props,
        url: node.props.href,
        children: mapAST(node.nodes)
      }
    }
    if (node.tag === 'br') {
      return { type: 'html', value: '<br />' }
    }
    if (node.tag === 'img') {
      if (node.props.dataType === 'emoji-for-text') {
        return {
          type: 'html',
          value: `<img src="${node.props.src}" alt="${node.props.alt}" class="emoji" width="28" height="28" />`
        }
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
      return [{
        type: 'html',
        value: `<div class="${node.props.dataType.replace(/ /, '-')}">`
      },
      ...mapAST(node.nodes),
      {
        type: 'html',
        value: '</div>'
      }]
    }

    if (node.tag === 'p') {
      return {
        type: 'paragraph', children: mapAST(node.nodes)
      }
    }
    return { type: 'text', value: '?' }
  })
}

module.exports = () => {
  return async (tree) => {
    const modified = tree.children.map(async (node, i) => {
      if (node.value && node.value.startsWith('<Tweet')) {
        const match = node.value.match(/id=['"](\d*)['"]/)
        const tweet = await fetchTweetAst(match[1])
        const { nodes, data } = tweet[0]
        return [
          {
            type: 'html',
            value: `<Tweet class="tweet" id="${data.id}" avatar="${data.avatar.normal}" :created-at="${data.createdAt}" heart-count="${data.heartCount}" name="${data.name}" username="${data.username}">`
          },
          ...mapAST(nodes),
          { type: 'html', value: '</Tweet>' }
        ]
      }
      return Promise.resolve(node)
    })
    tree.children = (await Promise.all(modified)).flat()
    return null
  }
}
