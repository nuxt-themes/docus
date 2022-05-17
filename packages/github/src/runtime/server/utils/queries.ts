import { joinURL, withQuery } from 'ufo'
import { graphql } from '@octokit/graphql'
import type {
  GithubContributorsOptions,
  GithubContributorsQuery,
  GithubRawContributors,
  GithubRawRelease,
  GithubReleasesOptions,
  GithubReleasesQuery,
  GithubRepositoryOptions,
} from '../../../module'

export function githubGraphqlQuery<T = any>(query: string, options: Partial<GithubRepositoryOptions>): Promise<T> {
  const gq = graphql.defaults({
    headers: {
      authorization: `token ${options.token}`,
    },
  })

  return gq<T>(query).catch(() => ({} as any))
}

function isBot(user) {
  return user.login.includes('[bot]') || user.login.includes('-bot') || user.login.includes('.bot')
}

function normalizeReleaseName(name: string) {
  // remove "Release " prefix from release name
  name = name.replace('Release ', '')

  // make sure release name starts with an alphabetical character
  if (!name.match(/^[a-zA-Z]/)) {
    name = `v${name}`
  }

  return name
}

export async function fetchRepository({ api, owner, repo, token }: GithubContributorsOptions) {
  const url = `${api}/repos/${owner}/${repo}`

  const repository = await $fetch<Array<GithubRawContributors>>(url, {
    headers: {
      Authorization: token ? `token ${token}` : undefined,
    },
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.warn(`Cannot fetch GitHub Repository on ${url} [${err.response?.status}]`)

    // eslint-disable-next-line no-console
    console.info('If your repository is private, make sure to provide GITHUB_TOKEN environment in `.env`')

    return []
  })

  return repository
}

export async function fetchRepositoryContributors(query: Partial<GithubContributorsQuery>, { api, owner, repo, token }: GithubContributorsOptions) {
  let url = `${api}/repos/${owner}/${repo}/contributors`

  url = withQuery(url, query as any)

  const contributors = await $fetch<Array<GithubRawContributors>>(url, {
    headers: {
      Authorization: token ? `token ${token}` : undefined,
    },
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.warn(`Cannot fetch GitHub contributors on ${url} [${err.response?.status}]`)

    // eslint-disable-next-line no-console
    console.info('If your repository is private, make sure to provide GITHUB_TOKEN environment in `.env`')

    if (err.response.status !== 403) {
      // eslint-disable-next-line no-console
      console.info('To disable fetching contributors, set `github.contributors` to `false` in `nuxt.config.ts`')
    }

    return []
  })

  return contributors.map(({ avatar_url, login }) => ({ avatar_url, login }))
}

export async function fetchFileContributors({ source, max }: Partial<GithubContributorsQuery>, { owner, repo, branch, token, max: optionsMax }: GithubContributorsOptions) {
  max = max || optionsMax

  const data = await githubGraphqlQuery(
    `
  query {
    repository(owner: "${owner}", name: "${repo}") {
      object(expression: "${branch}") {
        ... on Commit {
          history(first: ${max}, path: "${source}") {
            nodes {
              authors(first: ${max}) {
                nodes {
                  user {
                    name
                    avatarUrl
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }`,
    { token },
  )

  if (!data?.repository?.object?.history?.nodes) return []

  let users = data.repository.object.history.nodes
    .map((node) => node.authors.nodes)
    .flat()
    .map((node) => node.user)
    .filter((user) => user && user.name)
    .filter((user) => !isBot(user))

  // Unique
  users = users.reduce((unique, user) => (unique.find((u) => u.login === user.login) ? unique : unique.concat(user)), [])

  return users.map(({ avatarUrl, name, login }) => ({ avatar_url: avatarUrl, name, login }))
}

export async function fetchReleases(query: GithubReleasesQuery, { api, repo, token, owner }: GithubReleasesOptions) {
  const page = query?.page || 1
  const perPage = query?.per_page || 100
  const last = query?.last || false
  const tag = query?.tag || false

  let url = `${api}/repos/${owner}/${repo}/releases`
  if (tag) {
    url = joinURL(url, 'tags', tag)
  } else if (last) {
    url = joinURL(url, 'latest')
  } else {
    url = withQuery(url, { per_page: perPage, page } as any)
  }

  const rawReleases = await $fetch<Array<GithubRawRelease>>(url, {
    headers: {
      Authorization: token ? `token ${token}` : undefined,
    },
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.warn(`Cannot fetch GitHub releases on ${url} [${err.response?.status}]`)

    // eslint-disable-next-line no-console
    console.info('If your repository is private, make sure to provide GITHUB_TOKEN environment in `.env`')

    if (err.response.status !== 403) {
      // eslint-disable-next-line no-console
      console.info('To disable fetching releases, set `github.releases` to `false` in `nuxt.config.ts`')
    }

    return []
  })

  if (!Array.isArray(rawReleases)) {
    return [rawReleases]
  }

  return rawReleases
    .filter((r: any) => !r.draft)
    .map((release) => {
      return {
        name: normalizeReleaseName(release?.name || release?.tag_name),
        date: release?.published_at,
        body: release?.body,
        v: +normalizeReleaseName(release?.tag_name).substring(1, 2),
        url: release?.html_url,
        tarball: release?.tarball_url,
        zipball: release?.zipball_url,
        prerelease: release?.prerelease,
        reactions: release?.reactions,
        author: release?.author
          ? {
              name: release.author?.login,
              url: release.author?.html_url,
              avatar: release.author?.avatar_url,
            }
          : false,
      }
    })
}
