<template>
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
        <AppResponsiveVideo v-if="page.youtube" :src="page.youtube" />
        <nuxt-content :document="page" />
        <AppContribute :doc-link="docLink" :contributors="contributors" />
      </article>
    </div>
    <AffixBlock>
      <AdsBlock />
    </AffixBlock>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  async asyncData({ $content, $contributors, params, store, error, app }) {
    const slug = params.slug || 'auth-routes'

    let path = `/${app.i18n.defaultLocale}/faq`
    let page, prev, next, langFallback

    try {
      page = await $content(path, slug).fetch()
    } catch (err) {
      return error({
        statusCode: 404,
        message: app.i18n.t('common.page_not_found')
      })
    }

    if (app.i18n.defaultLocale !== app.i18n.locale) {
      try {
        path = `/${app.i18n.locale}/faq`
        page = await $content(path, slug).fetch()
      } catch (err) {
        langFallback = true
        path = `/${app.i18n.defaultLocale}/faq`
      }
    }

    const contributors = await $contributors(`/content${path}/${slug}`)

    try {
      ;[prev, next] = await $content(path)
        .only(['title', 'slug', 'dir'])
        .sortBy('position')
        .surround(slug, { before: 1, after: 1 })
        .fetch()
    } catch (e) {}

    return {
      langFallback,
      path,
      section: params.section,
      page,
      prev,
      next,
      contributors
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
    }
  }
}
</script>

<style lang="scss" scoped>
article h1 {
  @apply font-medium relative text-3xl font-semibold table mb-8;
}
</style>
