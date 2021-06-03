import consola from 'consola'
import fetch from 'node-fetch'
import nodeRes from 'node-res'

const logger = consola.withScope('releases')

export default function () {
  let releases = []

  // No need to fetch the releases when running `nuxt build`
  if (!this.options.dev && this.options._build) {
    return
  }

  this.nuxt.hook('content:ready', async ({ database }) => {
    releases = await fetchReleases(database.markdown)
  })

  this.addServerMiddleware({
    path: '/_releases',
    handler(req, res) {
      nodeRes.send(req, res, releases)
    }
  })
}

// Fetch releases
async function fetchReleases(markdown) {
  logger.info('Fetching releases...')
  const options = {
    per_page: 20
  }
  if (process.env.GITHUB_TOKEN) {
    options.headers = { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  }
  let releases = []
  try {
    const data = await fetch(
      'https://api.github.com/repos/nuxt/nuxt.js/releases',
      options
    ).then(res => res.json())
    releases = await Promise.all(
      data
        .filter(r => !r.draft)
        .map(async release => {
          // Transform h2 to h3
          const body = release.body
            .replace(/\n## /g, '\n### ')
            .replace(/^## /g, '\n### ')

          return {
            name: release.name || release.tag_name,
            date: release.published_at,
            body: (await markdown.toJSON(body)).body
          }
        })
    )
  } catch (e) {
    logger.error('Could not fetch nuxt.js release notes:', e.message)
    return []
  }
  const getMajorVersion = r => r.name && Number(r.name.substring(1, 2))
  releases.sort((a, b) => {
    const aMajorVersion = getMajorVersion(a)
    const bMajorVersion = getMajorVersion(b)
    if (aMajorVersion !== bMajorVersion) {
      return bMajorVersion - aMajorVersion
    }
    return new Date(b.date) - new Date(a.date)
  })

  return releases
}
