import { fileURLToPath } from 'url';
import { defineNuxtModule, resolveModule, addAutoImport } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "@docus/github",
    configKey: "github"
  },
  defaults: {
    repo: "",
    releases: {
      api: "https://api.github.com/repos",
      repo: "",
      token: void 0,
      parse: true
    }
  },
  setup(options, nuxt) {
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.runtimeConfig.github = {
      repo: options.repo,
      releases: {
        api: options.releases === false ? "" : options.releases.api,
        repo: options.releases === false ? "" : options.releases.repo || options.repo || process.env.GITHUB_REPO,
        token: options.releases === false ? "" : options.releases.token || process.env.GITHUB_TOKEN,
        parse: options.releases === false ? false : options.releases.parse
      }
    };
    nuxt.hook("content:context", (context) => {
      context.markdown.remarkPlugins = context.markdown.remarkPlugins || [];
      context.markdown.remarkPlugins.push(["remark-github", { repository: (options.releases || {}).repo || options.repo }]);
    });
    nuxt.hook("nitro:config", (nitroConfig) => {
      nitroConfig.externals.traceInclude = nitroConfig.externals.traceInclude || [];
      nitroConfig.externals.traceInclude.push("remark-github");
    });
    if (options.releases !== false) {
      nuxt.options.nitro.handlers = nuxt.options.nitro.handlers || [];
      nuxt.options.nitro.handlers.push({
        route: "/api/_github/releases",
        handler: resolveModule("./server/api/releases", { paths: runtimeDir })
      });
      addAutoImport({
        name: "githubReleases",
        from: resolveModule("./composables/githubReleases", { paths: runtimeDir })
      });
    }
  }
});

export { module as default };
