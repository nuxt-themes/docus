<template>
  <div>
    <AppHeader />

    <div class="w-full max-w-8xl mx-auto">
      <div class="lg:flex">
        <AppAside />

        <div class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head () {
    const i18nSeo = this.$nuxtI18nSeo()
    const previewUrl = this.settings.url.replace(/\/$/, '') + '/preview.png'

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
      meta: (i18nSeo.meta || []).concat([
        // Open Graph
        { hid: 'og:site_name', property: 'og:site_name', content: this.settings.title },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: this.settings.url },
        { hid: 'og:image', property: 'og:image', content: previewUrl },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: this.settings.twitter },
        { hid: 'twitter:title', name: 'twitter:title', content: this.settings.title },
        { hid: 'twitter:image', name: 'twitter:image', content: previewUrl },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.settings.title }
      ])
    }
  },
  computed: {
    ...mapGetters([
      'settings'
    ]),
    bodyClass () {
      return this.$store.state.menu.open ? ['h-screen lg:h-auto overflow-y-hidden lg:overflow-y-auto'] : []
    }
  }
}
</script>
