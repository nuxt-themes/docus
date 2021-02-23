<template>
  <div>
    <AppHeader />

    <div class="w-full mx-auto max-w-8xl">
      <div class="lg:flex">
        <div class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    const i18nSeo = this.$nuxtI18nSeo()

    return {
      titleTemplate: (chunk) => {
        if (chunk) {
          return `${chunk} - ${this.settings.title}`
        }

        return this.settings.title
      },
      bodyAttrs: {
        class: [...this.bodyClass]
      },
      ...i18nSeo,
      style: [
        { hid: 'docus-theme', cssText: this.$docus.themeStyles, type: 'text/css' }
      ],
      meta: (i18nSeo.meta || []).concat([
        // Open Graph
        { hid: 'og:site_name', property: 'og:site_name', content: this.settings.title },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: this.settings.url },
        { hid: 'og:image', property: 'og:image', content: this.$docus.previewUrl },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: this.settings.twitter },
        { hid: 'twitter:title', name: 'twitter:title', content: this.settings.title },
        { hid: 'twitter:image', name: 'twitter:image', content: this.$docus.previewUrl },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.settings.title }
      ])
    }
  },
  computed: {
    settings () {
      return this.$docus.settings
    },
    bodyClass () {
      return this.$menu.open ? ['h-screen lg:h-auto overflow-y-hidden lg:overflow-y-auto'] : []
    }
  }
}
</script>
