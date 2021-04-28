import defu from 'defu'
import { $fetch } from 'ohmyfetch/node'
import { setNodeData } from '../../core/parser/markdown/utils'
import parseHtml from './html-parser'

const SYNDICATION_URL = 'https://syndication.twitter.com'

export async function fetchTweetHtml(id: string) {
  try {
    const result = await $fetch(`${SYNDICATION_URL}/tweets.json?ids=${id}`)
    return result[id] || {}
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Cannot fetch tweet data,' + e)
    return {}
  }
}

const get = (obj, key, defu = '') => key.split('.').reduce((o, k) => (o && o[k]) || defu, obj)
const matchScribe = scribe => node => node && node.props && node.props.dataScribe === scribe
const matchClass = cls => node => node && node.props && node.props.className && node.props.className.includes(cls)
function findNode(root, predicate) {
  if (!root) {
    return
  }
  const nodes = [...root.nodes]
  let theNode
  while (nodes.length && !theNode) {
    const node = nodes.shift()
    if (predicate(node)) {
      theNode = node
      break
    }
    nodes.push(...(node.nodes || []))
  }
  return theNode
}

async function fetchTweetAst(id: string, layout = 'tweet', processQuote = true) {
  const html = await fetchTweetHtml(id)
  if (!html) {
    return {}
  }
  const ast = await parseHtml(html)
  return await processTweetAst(ast, layout, processQuote)
}

async function processTweetAst(ast, layout, processQuote = true) {
  const blockquote = findNode(ast, node => node.tag === 'blockquote')
  const root = findNode(blockquote, matchScribe('component:tweet'))
  const theTweetHeader = findNode(blockquote, matchClass('Tweet-header'))
  const theTweet = root.nodes.find(matchClass('e-entry-title'))
  const theTweetInfo = root.nodes.find(matchClass('TweetInfo'))
  const theTweetCards = root.nodes.filter(matchClass('Tweet-card'))

  const medias = theTweetCards
    .filter(card => card.nodes.find(node => matchClass('MediaCard')(node)))
    .map(node => findNode(node, matchClass('MediaCard-mediaAsset')))

  let quotes = []
  if (processQuote) {
    const quoteTweets = theTweetCards
      .filter(card => card.nodes.find(node => matchClass('QuoteTweet')(node)))
      .map(node => findNode(node, matchClass('QuoteTweet-link')))
      .map(node => node.props.dataTweetId)
      .map(id => fetchTweetAst(id, 'quote', false))

    quotes = await Promise.all(quoteTweets)
  }

  // tweet data
  const id = blockquote.props.dataTweetId
  const avatar = get(findNode(theTweetHeader, matchScribe('element:avatar')), 'props.dataSrc-1x')
  const name = get(findNode(theTweetHeader, matchScribe('element:name')), 'props.title')
  const username = get(findNode(theTweetHeader, matchScribe('element:screen_name')), 'props.title').replace('@', '')
  const heartCount = get(findNode(theTweetInfo, matchScribe('element:heart_count')), 'nodes.0', '0')
  const dateTime = get(findNode(theTweetInfo, matchScribe('element:full_timestamp')), 'props.dataDatetime', undefined)
  const createdAt = new Date(dateTime).getTime()

  return {
    id,
    quotes,
    data: {
      layout,
      id,
      avatar,
      name,
      'heart-count': heartCount,
      username,
      ':created-at': createdAt
    },
    children: [
      {
        type: 'html',
        value: `<div class="content prose dark:prose-dark" dir="${theTweet.props.dir}" lang="${theTweet.props.lang}">`
      },
      ...mapAST(theTweet.nodes),
      ...medias.flatMap(media => mapAST([media])),
      { type: 'html', value: '</div>' }
    ]
  }
}

function mapAST(ast) {
  if (!ast) {
    return [{ type: 'html', value: '' }]
  }
  return ast.flatMap(node => {
    if (typeof node === 'string') {
      return { type: 'text', value: node }
    }
    if (node.tag === 'a') {
      // do not render anchor link of media grid
      if (matchClass('ImageGrid-image')(node)) {
        return mapAST(node.nodes)
      }
      if (matchClass('NaturalImage')(node)) {
        return [
          { type: 'html', value: '<div class="NaturalImage">' },
          ...mapAST(node.nodes),
          { type: 'html', value: '</div>' }
        ]
      }
      return [
        { type: 'html', value: `<span class="${node.props.className.join(' ')}">` },
        { type: 'link', target: '_blank', url: node.props.href, children: mapAST(node.nodes) },
        { type: 'html', value: '</span>' }
      ]
    }
    if (node.tag === 'br') {
      return { type: 'html', value: '<br />' }
    }
    if (node.tag === 'img') {
      if (matchClass('Emoji--forText')(node)) {
        return {
          type: 'html',
          value: `<nuxt-img src="${node.props.src}" alt="${node.props.alt}" class="emoji" width="28" height="28" />`
        }
      }
      const { props } = node
      return {
        type: 'html',
        value: `<nuxt-img src="${props.dataImage}.${props.dataImageFormat || 'jpg'}" alt="${
          props.alt
        }" class="media-image" width="${props.width || 500}" height="${props.height || 280}" />`
      }
    }
    if (node.tag === 'div') {
      return [
        { type: 'html', value: `<div class="${node.props.className.join(' ')}">` },
        ...mapAST(node.nodes),
        { type: 'html', value: '</div>' }
      ]
    }

    if (node.tag === 'span') {
      if (node.props.className.includes('u-hiddenVisually')) {
        return { type: 'html', value: '' }
      }
      return mapAST(node.nodes)
    }

    if (node.tag === 'p') {
      return { type: 'paragraph', children: mapAST(node.nodes) }
    }

    return { type: 'text', value: '?' }
  })
}

const tweetCache = {}

export default async (node, pageData) => {
  const id = node.attributes.id
  if (!tweetCache[id]) {
    try {
      tweetCache[id] = await fetchTweetAst(id)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Cannot fetch tweet ${id}. ${e.message}`)
      return { node: { type: 'html', value: `<!-- Cannot fetch tweet ${id} -->` } }
    }
  }
  const { quotes, data, children } = tweetCache[id]
  if (quotes.length) {
    children.push(
      ...quotes.map(q => {
        const qNode = defu(node, {})

        qNode.children = q.children
        Object.entries(q.data).forEach(([key, value]) => {
          setNodeData(qNode, key, value, pageData)
        })
        return qNode
      })
    )
  }

  node.children = children
  Object.entries(data).forEach(([key, value]) => {
    setNodeData(node, key, value, pageData)
  })
}
