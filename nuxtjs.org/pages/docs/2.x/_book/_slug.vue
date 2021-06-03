<template>
  <div class="flex flex-col-reverse -mx-4 lg:mx-0 lg:flex-row">
    <div
      class="
        w-full
        px-4
        py-8
        lg:min-h-screen
        lg:w-3/4
        lg:static
        lg:overflow-visible
        lg:max-h-full
      "
    >
      <LangFallback :doc-link="docLink" :lang-fallback="langFallback" />

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

        <nuxt-content :document="page" />

        <AppPrevNextNew
          :prev="prev"
          :next="next"
          section="guides"
          class="mt-4"
        />
        <AppContribute :doc-link="docLink" :contributors="contributors" />
      </article>
    </div>
    <AffixBlock v-if="$route.params.book !== 'examples'">
      <AppToc
        v-if="page.toc && page.toc.length"
        :toc="page.toc"
        class="block mb-8"
      />
      <SponsorsBlock />
      <AdsBlock />
    </AffixBlock>
  </div>
</template>

<script>
import copyCodeBlock from '~/mixins/copyCodeBlock'

export default {
  mixins: [copyCodeBlock],
  scrollToTop: true,
  async asyncData({ $content, $contributors, params, store, error, app }) {
    let path = `/${app.i18n.defaultLocale}/guides/${params.book}`
    let page, prev, next, langFallback

    try {
      page = await $content(path, params.slug).fetch()
    } catch (err) {
      if (!err.response || err.response.status !== 404) {
        return error({
          statusCode: 500,
          message: app.i18n.t('common.an_error_occurred')
        })
      }

      return error({
        statusCode: 404,
        message: app.i18n.t('common.page_not_found')
      })
    }

    if (
      app.i18n.locale !== app.i18n.defaultLocale &&
      (['pt', 'es', 'ja', 'id', 'fr'].includes(app.i18n.locale) ||
        process.env.NODE_ENV !== 'production')
    ) {
      try {
        path = `/${app.i18n.locale}/guides/${params.book}`
        page = await $content(path, params.slug).fetch()
      } catch (err) {
        langFallback = true
        path = `/${app.i18n.defaultLocale}/guides/${params.book}`
      }
    }

    const contributors = await $contributors(`/content${path}/${params.slug}`)

    try {
      ;[prev, next] = await $content(
        ['pt', 'es', 'ja', 'id', 'fr'].includes(app.i18n.locale)
          ? path
          : `/${app.i18n.defaultLocale}/guides/${params.book}`
      )
        .only(['title', 'menuTitle', 'slug', 'dir', 'menu', 'target'])
        .sortBy('position')
        .sortBy('title')
        .sortBy('menu')
        .surround(params.slug, { before: 1, after: 1 })
        .fetch()
    } catch (e) {}

    // if (page && page.questions) {
    //   page.questions = shuffle(page.questions.map(question => ({ ...question, answers: shuffle(question.answers) })))
    // }

    return {
      path,
      showModal: false,
      langFallback,
      section: params.section,
      book: params.book,
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
      return `https://github.com/nuxt/nuxtjs.org/blob/main/content${this.path}/${this.$route.params.slug}.md`
    }
  }
}
</script>
<style lang="scss" scoped>
article h1 {
  @apply font-medium relative text-4xl table mb-6;
}
</style>
