import { fileURLToPath } from 'url'
import defu from 'defu'
import consola from 'consola'
import { addAutoImport, addComponent, createResolver, defineNuxtModule, resolveModule } from '@nuxt/kit'

export interface GithubRepositoryOptions {
  owner: string
  branch: string
  repo: string
  api: string
  token: string
}

export interface GithubReleasesOptions extends Partial<GithubRepositoryOptions> {
  /**
   * Parse release notes markdown and return AST tree
   *
   * Note: This option is only available when you have `@nuxt/content` installed in your project.
   *
   * @default true
   */
  parse?: boolean
}

export interface GithubContributorsOptions extends Partial<GithubRepositoryOptions> {
  max: number
}

export interface GithubContributorsQuery {
  source: string
  max: string | number
}

export interface GithubReleasesQuery extends GithubRepositoryOptions {
  per_page?: string
  page?: string
  last?: boolean
  tag?: string
}

export interface GithubRawRelease {
  draft: boolean
  name: string
  // eslint-disable-next-line camelcase
  tag_name: string
  body: string
  // eslint-disable-next-line camelcase
  published_at: number
}

export interface GithubRawContributors {
  avatar_url: string
  login: string
  name: string
}

export interface ModuleOptions extends GithubRepositoryOptions {
  remarkPlugin: boolean
  contributors: false | GithubContributorsOptions
  releases: false | GithubReleasesOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@docus/github',
    configKey: 'github',
  },
  defaults: {
    owner: '',
    repo: '',
    token: undefined,
    branch: 'main',
    api: 'https://api.github.com',
    remarkPlugin: true,
    contributors: {
      max: 100,
    },
    releases: {
      parse: true,
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    if (!options?.repo) {
      consola.warn('GitHub repository is not defined.')
      consola.warn('If you want to use GitHub module you should probably fill `github.repo` option in `nuxt.config.js`.')
    }

    if (!options?.owner) {
      // Check if we can split repo name into owner/repo
      if (options?.repo && options?.repo.includes('/')) {
        const [owner, repo] = options.repo.split('/')
        options.owner = owner
        options.repo = repo
      } else {
        consola.warn('GitHub repository owner is not defined.')
        consola.warn('If you want to use GitHub module you should fill `github.owner` option in `nuxt.config.js`.')
      }
    }

    const repositoryOptions = (source: 'root' | 'contributors' | 'releases', withToken = true) => {
      const target = (source === 'root' ? options : options[source]) as GithubRepositoryOptions | false

      if (target === false) return target

      const { owner, repo, api, token, branch } = target

      const repositoryOptions: GithubRepositoryOptions = {
        api: api || options?.api || process.env.GITHUB_OWNER,
        owner: owner || options?.owner || process.env.GITHUB_OWNER,
        branch: branch || options?.branch || process.env.GITHUB_BRANCH,
        repo: repo || options?.repo || process.env.GITHUB_REPO,
        token: undefined,
      }

      if (withToken) {
        repositoryOptions.token = token || options?.token || process.env.GITHUB_TOKEN
      }

      return repositoryOptions
    }

    if (!nuxt.options.runtimeConfig.public) nuxt.options.runtimeConfig.public = {}
    nuxt.options.runtimeConfig.public.github = {
      ...repositoryOptions('root', false),
      releases: {
        ...repositoryOptions('releases', false),
        parse: options.releases === false ? false : options.releases.parse,
      },
      contributors: {
        ...repositoryOptions('contributors', false),
        max: options.contributors === false ? false : options.contributors.max,
      },
    }

    nuxt.options.runtimeConfig.github = {
      ...repositoryOptions('root'),
      releases: {
        ...repositoryOptions('releases'),
        parse: options.releases === false ? false : options.releases.parse,
      },
      contributors: {
        ...repositoryOptions('contributors'),
        max: options.contributors === false ? false : options.contributors.max,
      },
    }

    // Autolink issue/PR/commit links using `remark-github` plugin
    if (options.remarkPlugin) {
      // @ts-expect-error - Untyped hook
      nuxt.hook('content:context', (context) => {
        context.markdown.remarkPlugins = context.markdown.remarkPlugins || []
        context.markdown.remarkPlugins.push(['remark-github', { repository: `${options.owner}/${options.repo}` }])
      })
      nuxt.hook('nitro:config', (nitroConfig) => {
        nitroConfig.externals.traceInclude = nitroConfig.externals.traceInclude || []
        nitroConfig.externals.traceInclude.push('remark-github')
      })
    }

    const nitroConfig = nuxt.options.nitro

    // Init Nitro handlers
    nitroConfig.handlers = nitroConfig.handlers || []
    nitroConfig.prerender = nitroConfig.prerender || {}
    nitroConfig.prerender.routes = nitroConfig.prerender.routes || []

    // Setup repository API
    nitroConfig.handlers.push({
      route: '/api/_github/repository',
      handler: resolveModule('./server/api/repository', { paths: runtimeDir }),
    })

    // Repository component components
    addComponent({
      name: 'GithubRepository',
      filePath: resolveModule('./components/GithubRepository', { paths: runtimeDir }),
      global: true,
    })

    // Setup releases API
    if (options.releases !== false) {
      nitroConfig.handlers.push({
        route: '/api/_github/releases',
        handler: resolveModule('./server/api/releases', { paths: runtimeDir }),
      })
      nitroConfig.prerender.routes.push('/api/_github/releases')

      // Releases components
      addComponent({
        name: 'GithubReleases',
        filePath: resolveModule('./components/GithubReleases', { paths: runtimeDir }),
        global: true,
      })
      addComponent({
        name: 'GithubLastRelease',
        filePath: resolveModule('./components/GithubLastRelease', { paths: runtimeDir }),
        global: true,
      })
    }

    // Setup contributors API
    if (options.contributors !== false) {
      nitroConfig.handlers.push({
        route: '/api/_github/contributors',
        handler: resolveModule('./server/api/contributors', { paths: runtimeDir }),
      })
      nitroConfig.prerender.routes.push('/api/_github/contributors')

      // TODO: Add prerender for file arguments (using :source argument)
      nitroConfig.handlers.push({
        route: '/api/_github/contributors/file',
        handler: resolveModule('./server/api/contributors/file', { paths: runtimeDir }),
      })

      // Contributors components
      addComponent({
        name: 'GithubContributors',
        filePath: resolveModule('./components/GithubContributors', { paths: runtimeDir }),
        global: true,
      })
      addComponent({
        name: 'GithubFileContributors',
        filePath: resolveModule('./components/GithubFileContributors', { paths: runtimeDir }),
        global: true,
      })
    }

    addAutoImport({
      name: 'useGithub',
      from: resolveModule('./composables/useGithub', { paths: runtimeDir }),
    })

    nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
      inline: [
        // Inline module runtime in Nitro bundle
        resolve('./runtime'),
      ],
    })
  },
})
