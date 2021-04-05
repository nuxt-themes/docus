import { $fetch } from 'ohmyfetch/node'
import parseHtml from './html-parser'

const SYNDICATION_URL = 'https://syndication.twitter.com'
export async function fetchTweetHtml (id) {
  try {
    const result = await $fetch(`${SYNDICATION_URL}/tweets.json?ids=${id}`)
    return result[id] || {}
  } catch (e) {
    console.error('Cannot fetch tweet data,' + e)
    return {}
  }
}

const get = (obj, key, defu = '') => key.split('.').reduce((o, k) => (o && o[k]) || defu, obj)
const matchScribe = scribe => node => node && node.props && node.props.dataScribe === scribe
const matchClass = cls => node => node && node.props && node.props.className && node.props.className.includes(cls)
function findNode (root, predicate) {
  if (!root) { return }
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

async function fetchTweetAst (id, layout = 'tweet') {
  const html = await fetchTweetHtml(id)
  if (!html) {
    return {}
  }
  const ast = await parseHtml(html)
  return await processTweetAst(ast, layout)
}

async function processTweetAst (ast, layout) {
  const blockquote = findNode(ast, node => node.tag === 'blockquote')
  const root = findNode(blockquote, matchScribe('component:tweet'))
  const theTweetHeader = findNode(blockquote, matchClass('Tweet-header'))
  const theTweet = root.nodes.find(matchClass('e-entry-title'))
  const theTweetInfo = root.nodes.find(matchClass('TweetInfo'))
  const theTweetCards = root.nodes.filter(matchClass('Tweet-card'))

  const medias = theTweetCards
    .filter(card => card.nodes.find(node => matchClass('MediaCard')(node)))
    .map(node => findNode(node, matchClass('MediaCard-mediaAsset')))

  const quoteTweets = theTweetCards
    .filter(card => card.nodes.find(node => matchClass('QuoteTweet')(node)))
    .map(node => findNode(node, matchClass('QuoteTweet-link')))
    .map(node => node.props.dataTweetId)
    .map(id => fetchTweetAst(id, 'quote'))

  const quotes = await Promise.all(quoteTweets)

  // tweet data
  const id = blockquote.props.dataTweetId
  const avatar = get(findNode(theTweetHeader, matchScribe('element:avatar')), 'props.dataSrc-1x')
  const name = get(findNode(theTweetHeader, matchScribe('element:name')), 'props.title')
  const username = get(findNode(theTweetHeader, matchScribe('element:screen_name')), 'props.title').replace('@', '')
  const heartCount = get(findNode(theTweetInfo, matchScribe('element:heart_count')), 'nodes.0', 0)
  const dateTime = get(findNode(theTweetInfo, matchScribe('element:full_timestamp')), 'props.dataDatetime', undefined)
  const createdAt = new Date(dateTime).getTime()

  return [
    {
      type: 'html',
      value: `<DTweet class="tweet tweet-${layout}" layout="${layout}" id="${id}" avatar="${avatar}" name="${name}" heart-count="${heartCount}" username="${username}" :created-at="${createdAt}">`
    },
    { type: 'html', value: `<div class="content prose dark:prose-dark" dir="${theTweet.props.dir}" lang="${theTweet.props.lang}">` },
    ...mapAST(theTweet.nodes),
    ...medias.flatMap(media => mapAST([media])),
    { type: 'html', value: '</div>' },
    ...quotes.flatMap(node => node),
    { type: 'html', value: '</DTweet>' }
  ]
}

function mapAST (ast) {
  if (!ast) {
    return [{ type: 'html', value: '' }]
  }
  return ast.flatMap((node) => {
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
        return { type: 'html', value: `<img src="${node.props.src}" alt="${node.props.alt}" class="emoji" width="28" height="28" />` }
      }
      const { props } = node
      return {
        type: 'html',
        value: `<img src="${props.dataImage}.${props.dataImageFormat || 'jpg'}" alt="${props.alt}" class="media-image" width="${props.width}" height="${props.height}" />`
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

module.exports = async (node) => {
  const match = node.value.match(/id=['"](\d*)['"]/)
  if (!match) {
    // eslint-disable-next-line no-console
    console.error('Invalid tweet id')
    return { node: { type: 'html', value: '<!-- Invalid tweet id -->' } }
  }
  if (!tweetCache[match[1]]) {
    try {
      tweetCache[match[1]] = await fetchTweetAst(match[1])
    } catch (e) {
      console.log(e)
      // eslint-disable-next-line no-console
      console.error(`Cannot fetch tweet ${match[1]}. ${e.message}`)
      return { node: { type: 'html', value: `<!-- Cannot fetch tweet ${match[1]} -->` } }
    }
  }
  return { node: tweetCache[match[1]] }
}
