import { $fetch } from 'ohmyfetch/node'

const releaseCache = {
  releases: [],
  lastCheck: null
}

export async function fetchReleases ({ $content, $docus, githubToken }) {
  if (!$docus.github && !$docus.github.repo) {
    return []
  }
  if (!$docus.github.releases) {
    return []
  }

  const { apiUrl, repo } = $docus.github

  const options = {}
  if (githubToken) {
    options.headers = { Authorization: `token ${githubToken}` }
  }
  const url = `${apiUrl}/${repo}/releases`
  let releases = await $fetch(url, options).catch((err) => {
    // eslint-disable-next-line no-console
    console.warn(`Cannot fetch GitHub releases on ${url} [${err.response.status}]`)
    if (err.response.status === 403) {
      // eslint-disable-next-line no-console
      console.info('Make sure to provide GITHUB_TOKEN environment in `.env`')
    } else {
      // eslint-disable-next-line no-console
      console.info('To disable fetching releases, set `github.releases` to `false` in `content/settings.json`')
    }
    return []
  })
  releases = releases.filter(r => !r.draft).map(async (release) => {
    return {
      name: (release.name || release.tag_name).replace('Release ', ''),
      date: release.published_at,
      body: await $content.database.markdown.toJSON(release.body)
    }
  })

  releases = await Promise.all(releases)

  const getMajorVersion = r => r.name && Number(r.name.substring(1, 2))
  releases.sort((a, b) => {
    const aMajorVersion = getMajorVersion(a)
    const bMajorVersion = getMajorVersion(b)
    if (aMajorVersion !== bMajorVersion) {
      return bMajorVersion - aMajorVersion
    }
    return new Date(b.date) - new Date(a.date)
  })

  releaseCache.releases = releases
  releaseCache.lastCheck = Date.now()
  return releases
}

export function releasesMiddleware (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(releaseCache.releases))
}
