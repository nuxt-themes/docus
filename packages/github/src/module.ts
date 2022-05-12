import { fileURLToPath } from 'url'
import { addAutoImport, defineNuxtModule, resolveModule } from '@nuxt/kit'

export interface ModuleOptions {
  repo: string,
  releases: false | {
    api: string
    repo: string
    token: string
    /**
     * Parse release notes markdown and return AST tree
     *
     * Note: This option is only available when you have `@nuxt/content` installed in your project.
     *
     * @default true
     */
    parse: boolean
  }
}

export interface GithubQuery {
  repo: string
  per_page: string
  page: string
  token: string
  api: string
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

export interface GithubReleasesOptions {
  api: string
  repo: string
  token: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@docus/github',
    configKey: 'github'
  },
  defaults: {
    repo: '',
    releases: {
      api: 'https://api.github.com/repos',
      repo: '',
      token: undefined,
      parse: true
    }
  },
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    nuxt.options.runtimeConfig.github = {
      repo: options.repo,
      releases: {
        api: options.releases === false ? '' : options.releases.api,
        repo: options.releases === false ? '' : options.releases.repo || options.repo || process.env.GITHUB_REPO,
        token: options.releases === false ? '' : options.releases.token || process.env.GITHUB_TOKEN,
        parse: options.releases === false ? false : options.releases.parse
      }
    }

    // @ts-ignore
    // Autolink issue/PR/commit links using `remark-github` plugin
    nuxt.hook('content:context', (context) => {
      context.markdown.remarkPlugins = context.markdown.remarkPlugins || []
      context.markdown.remarkPlugins.push(['remark-github', { repository: (options.releases || {}).repo || options.repo }])
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.externals.traceInclude = nitroConfig.externals.traceInclude || []
      nitroConfig.externals.traceInclude.push('remark-github')
    })

    if (options.releases !== false) {
      nuxt.options.nitro.handlers = nuxt.options.nitro.handlers || []
      nuxt.options.nitro.handlers.push({
        route: '/api/_github/releases',
        handler: resolveModule('./server/api/releases', { paths: runtimeDir })
      })

      addAutoImport({
        name: 'githubReleases',
        from: resolveModule('./composables/githubReleases', { paths: runtimeDir })
      })
    }
  }
})
