import { $fetch } from 'ohmyfetch/node'

let cachedReleases = []

export function get () {
  return cachedReleases
}

export async function fetch ({ $content, settings }) {
  let releases = []

  if (settings.github && settings.github.releases && settings.github.repo) {
    const { apiUrl, repo } = settings.github
    releases = await fetchGitHubReleases({ apiUrl, repo, token: process.env.GITHUB_TOKEN })
  }

  const compile = markdown => $content.database.markdown.toJSON(markdown)
  releases = await Promise.all(releases.map(async (r) => {
    r.body = await compile(r.body)
    return r
  }))

  const getMajorVersion = r => r.name && Number(r.name.substring(1, 2))
  releases.sort((a, b) => {
    const aMajorVersion = getMajorVersion(a)
    const bMajorVersion = getMajorVersion(b)
    if (aMajorVersion !== bMajorVersion) {
      return bMajorVersion - aMajorVersion
    }
    return new Date(b.date) - new Date(a.date)
  })

  cachedReleases = releases
  return releases
}

export async function fetchGitHubReleases ({ apiUrl, repo, token }) {
  const options = {}
  if (token) {
    options.headers = { Authorization: `token ${token}` }
  }
  const url = `${apiUrl}/${repo}/releases`
  let releases = await $fetch(url, options).catch((err) => {
    // eslint-disable-next-line no-console
    console.warn(`Cannot fetch GitHub releases on ${url} [${err.response.status}]`)
    // eslint-disable-next-line no-console
    console.info('Make sure to provide GITHUB_TOKEN environment in `.env`')
    if (err.response.status !== 403) {
      // eslint-disable-next-line no-console
      console.info('To disable fetching releases, set `github.releases` to `false` in `content/settings.json`')
    }
    return []
  })
  releases = releases.filter(r => !r.draft).map((release) => {
    return {
      name: (release.name || release.tag_name).replace('Release ', ''),
      date: release.published_at,
      body: release.body
    }
  })

  return releases
}

export function handler (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(cachedReleases))
}
