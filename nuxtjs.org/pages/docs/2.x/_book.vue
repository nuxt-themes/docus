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
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash.groupby'

export default {
  async asyncData({ $content, app, params, redirect }) {
    let pages = []
    if (!params.book) {
      return redirect('/docs/2.x/get-started/installation')
    }
    try {
      const locale = ['pt', 'es', 'ja', 'id', 'fr'].includes(app.i18n.locale)
        ? app.i18n.locale
        : app.i18n.defaultLocale

      pages = await $content(locale, 'guides', { deep: true })
        .only([
          'slug',
          'menuTitle',
          'title',
          'menu',
          'category',
          'position',
          'target'
        ])
        .sortBy('position')
        .sortBy('title')
        .sortBy('menu')
        .where({ position: { $gte: 0 } })
        .fetch()
      // if (app.i18n.locale !== app.i18n.defaultLocale) {
      //   const newPages = await $content(app.i18n.locale, 'guides', { deep: true })
      //     .only(['slug', 'title', 'menu', 'category', 'position'])
      //     .sortBy('position')
      //     .sortBy('title')
      //     .sortBy('menu')
      //     .fetch()

      //   pages = pages.map((page) => {
      //     const newPage = newPages.find(newPage => newPage.slug === page.slug)

      //     return newPage || page
      //   })
      // }
    } catch (e) {}

    return {
      links: groupBy(pages, 'category')
    }
  }
}
</script>
