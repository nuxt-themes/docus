<template>
  <div class="shadow-nuxt">
    <div class="container mx-auto px-4 lg:flex pb-12">
      <TheMobileAsideNav :links="links" section="faq" />
      <TheAsideNav :links="links" section="faq" class="hidden lg:block" />
      <div class="w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash.groupby'

export default {
  async asyncData({ $content, app }) {
    let pages = []

    try {
      pages = await $content(app.i18n.defaultLocale, 'faq')
        .only(['slug', 'title', 'position', 'menu', 'category'])
        .sortBy('position')
        .fetch()

      if (app.i18n.locale !== app.i18n.defaultLocale) {
        const newPages = await $content(app.i18n.locale, 'faq')
          .only(['slug', 'title', 'position', 'menu', 'category'])
          .sortBy('position')
          .fetch()

        pages = pages.map(page => {
          const newPage = newPages.find(newPage => newPage.slug === page.slug)

          return newPage || page
        })
      }
    } catch (e) {}

    return {
      links: groupBy(pages, 'category')
    }
  }
}
</script>
