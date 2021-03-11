<template>
  <DContainer aside>
    <Nuxt />
  </DContainer>
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
      ...i18nSeo,
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
    menu () {
      return this.$menu.open
    }
  },
  watch: {
    menu (val) {
      if (val) {
        this.blockBodyScroll()
      } else {
        this.unblockBodyScroll()
      }
    }
  },
  methods: {
    blockBodyScroll () {
      const scrollBarGap =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarGap}px`
    },
    unblockBodyScroll () {
      setTimeout(() => {
        document.body.style.overflow = null
        document.body.style.paddingRight = null
      }, 16)
    }
  }
}
</script>
