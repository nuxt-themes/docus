import path from 'path'

import consola from 'consola'
import Crawler from 'crawler'
import fs from 'fs-extra'

const core = require('@actions/core')

const logger = consola.withTag('redirect-tester')

let baseURL = process.env.BASE_URL || 'https://nuxtjs.org'
if (baseURL.endsWith('/')) baseURL = baseURL.slice(0, -1)

const redirects = fs
  .readFileSync(path.resolve(__dirname, '../_redirects'))
  .toString()
  .split('\n')
  .filter(redirect => redirect && !redirect.startsWith('#'))
  .filter(redirect => redirect.startsWith('/'))
  .map(redirect => redirect.split(' ')[1])
  .filter(redirect => redirect.startsWith('/') && !redirect.includes('/:'))
  .map(redirect => baseURL + redirect)

const crawler = new Crawler({
  maxConnections: 100,
  callback(error, res, done) {
    const { uri } = res.options
    const { statusCode } = res.request.response

    if (error || ![200, 301, 302].includes(statusCode)) {
      const message = `Error crawling ${uri} (status ${statusCode})`
      logger.error(message)
      core.setFailed(message)
      return done()
    }

    logger.success(uri)
    done()
  }
})

logger.log('')
logger.info(`Checking \`internal redirects\`.`)

redirects.forEach(redirect => crawler.queue(redirect))
