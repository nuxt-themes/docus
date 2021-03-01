import { $fetch } from 'ohmyfetch/node'

let releaseCache = []

export async function fetchReleases ({ $content, $docus, config }) {
  let releases = []

  if ($docus.github && $docus.github.releases && $docus.github.repo) {
    const { apiUrl, repo } = $docus.github
    releases = await fetchGithubReleases({ apiUrl, repo, token: config.githubToken })
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

  releaseCache = releases
  return releases
}

export async function fetchGithubReleases ({ apiUrl, repo, token }) {
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

export function releasesMiddleware (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(releaseCache))
}
