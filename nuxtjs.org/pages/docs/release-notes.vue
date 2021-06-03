<template>
  <div class="shadow-nuxt">
    <div class="container px-4 pb-12 mx-auto lg:flex">
      <TheMobileAsideNavNewDocs :links="links" />
      <TheAsideNavNewDocs :links="links" class="hidden lg:block" />
      <div
        class="
          w-full
          min-h-screen
          lg:static
          lg:max-h-full
          lg:overflow-visible
          lg:w-3/4
        "
      >
        <div class="flex flex-col-reverse -mx-4 lg:mx-0 lg:flex-row">
          <div
            class="
              w-full
              px-4
              py-8
              lg:static
              lg:overflow-visible
              lg:max-h-full
              lg:w-3/4
            "
          >
            <article>
              <h1
                class="
                  transition-colors
                  duration-300
                  ease-linear
                  text-light-onSurfacePrimary
                  dark:text-dark-onSurfacePrimary
                "
              >
                {{ page.title }}
              </h1>
              <div class="nuxt-content">
                <ReleaseNotes />
              </div>
            </article>
          </div>
          <AffixBlock>
            <SponsorsBlock />
            <AdsBlock />
          </AffixBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash.groupby'

export default {
  scrollToTop: true,
  async asyncData({ $content, params, store, error, app }) {
    let pages = []

    try {
      const locale = ['pt', 'es', 'ja', 'id', 'fr'].includes(app.i18n.locale)
        ? app.i18n.locale
        : app.i18n.defaultLocale

      pages = await $content(locale, 'guides', { deep: true })
        .only(['slug', 'title', 'menu', 'category', 'position'])
        .sortBy('position')
        .sortBy('title')
        .sortBy('menu')
        .where({ position: { $gte: 0 } })
        .fetch()
    } catch (e) {}

    return {
      page: {
        title: 'Release Notes',
        description: 'Nuxt.js release notes.'
      },
      links: groupBy(pages, 'category')
    }
  },
  head() {
    return {
      title: this.page.title,
      titleTemplate: '%s - NuxtJS',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.page.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.description
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.page.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.page.description
        }
      ]
    }
  },
  computed: {
    docLink() {
      return `https://github.com/nuxt/nuxtjs.org/blob/main/content${this.path}.md`
    },
    codeSandBox() {
      return 'https://codesandbox.io'
    },
    codeSandBoxLink() {
      if (!this.page.github) {
        return ''
      }
      return `${this.codeSandBox}/embed/github/nuxt/nuxt.js/tree/dev/examples/${this.page.github}?autoresize=1&view=editor`
    },
    liveEditLink() {
      return `${this.codeSandBox}/s/github/nuxt/nuxt.js/tree/dev/examples/${this.page.github}?from-embed`
    },
    downloadLink() {
      return (
        'https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/nuxt/nuxt.js/tree/dev/examples/' +
        this.page.github
      )
    }
  }
}
</script>

<style lang="scss" scoped>
article h1 {
  @apply font-medium relative text-3xl table mb-4;
}
</style>
