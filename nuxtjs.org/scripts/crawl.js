import Crawler from 'crawler'
import consola from 'consola'

const core = require('@actions/core')

const logger = consola.withTag('crawler')

const excludedExtensions = process.env.EXCLUDE
  ? process.env.EXCLUDE.split(',')
  : ['svg', 'png', 'jpg', 'sketch', 'ico', 'gif']
const urlsToOmit = process.env.OMIT
  ? process.env.OMIT.split(',')
  : ['http://localhost:3000']
const crawlExternal = !!process.env.CRAWL_EXTERNAL || false

let baseURL = process.env.BASE_URL || 'https://nuxtjs.org'
if (baseURL.endsWith('/')) baseURL = baseURL.slice(0, -1)
const startingURL = baseURL + '/'

// GLOBALS
const urls = new Set([startingURL])
const referrers = {}
const erroredUrls = []
const externalUrls = new Set()

/**
 * @type {Crawler} crawler
 */
// eslint-disable-next-line
let crawler

/**
 * @param {string} path
 * @param {string | undefined} referrer
 */
function queue(path, referrer) {
  if (urlsToOmit.some(url => path.startsWith(url))) return

  const { pathname, origin } = new URL(path, referrer)

  const url = `${origin}${pathname}`
  if (!url || urls.has(url) || !crawler) return

  const extension = url.split('.').pop()
  if (excludedExtensions.includes(extension)) return

  let external = false
  if (origin !== baseURL) {
    external = true
    externalUrls.add(url)
    if (!crawlExternal) return
  }

  urls.add(url)

  if (referrer) referrers[url] = [...(referrers[url] || []), referrer]

  if (external)
    return crawler.queue({
      uri: url,
      method: 'GET',
      rateLimit: 2000
    })
  crawler.queue(url)
}

crawler = new Crawler({
  maxConnections: 100,
  callback(error, res, done) {
    const { $ } = res
    const { uri } = res.options
    const { statusCode } = res.request.response

    if (error || ![200, 301, 302].includes(statusCode)) {
      const message = `Error crawling ${uri} (status ${statusCode})`
      core.setFailed(message)
      logger.error(message)
      if (referrers[uri]) {
        logger.info(`${uri} referred by`, referrers[uri])
      }
      erroredUrls.push(uri)
      return done()
    }

    if (!$) {
      logger.error('Could not parse', uri)
      return done()
    }

    if (uri.includes(baseURL)) {
      $(`a:not([href*=mailto])`).each((_, el) => queue(el.attribs.href, uri))
    }

    logger.success(uri)
    logger.debug(uri, `[${crawler.queueSize} / ${urls.size}]`)
    if (crawler.queueSize === 1) {
      logger.log('')
      logger.info(`Checked \`${urls.size}\` pages.`)
      // Tasks to run at the end.
      if (erroredUrls.length) {
        const message = `Errors found when crawling ${erroredUrls.join(', ')}.`

        throw new Error(`\n\n${message}`)
      }
    }
    done()
  }
})

logger.log('')
logger.info(
  `Checking \`${baseURL}\`${crawlExternal ? ' and external links' : ''}.`
)
logger.info(`Ignoring file extensions: \`${excludedExtensions.join(', ')}.\`\n`)

crawler.queue(startingURL)
