<template>
  <Component :is="page.template" :page="page" />
</template>

<script>
import Vue from 'vue'
import { withoutTrailingSlash } from 'ufo'

export default {
  name: 'PageSlug',
  middleware({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    }
  },
  async asyncData({ $docus, app, params, error }) {
    const language = app.i18n.locale
    const to = withoutTrailingSlash(`/${params.pathMatch || ''}`) || '/'
    const draft = $docus.ui?.draft ? undefined : false
    const [page] = await $docus.search({ deep: true }).where({ language, to, draft }).fetch()
    if (!page) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    page.template = $docus.getPageTemplate(page)
    // Preload the component on client-side navigation
    await Vue.component(page.template)()

    return { page }
  },
  data() {
    return {
      page: {}
    }
  },
  head() {
    const head = {
      title: this.page.title,
      meta: [],
      ...(this.page.head || {})
    }
    this.mergeMeta(head.meta, this.pageMeta)
    return head
  },
  computed: {
    pageMeta() {
      return [
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.page.title },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.page.title },
        ...(this.page.description
          ? [
              {
                hid: 'description',
                name: 'description',
                content: this.page.description
              },
              // Open Graph
              {
                hid: 'og:description',
                property: 'og:description',
                content: this.page.description
              },
              // Twitter Card
              {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: this.page.description
              }
            ]
          : [])
      ]
    },
    settings() {
      return this.$docus.settings
    }
  },
  mounted() {
    if (this.page.version) {
      localStorage.setItem(`page-${this.page.slug}-version`, this.page.version)
    }
  },
  methods: {
    mergeMeta(to, from) {
      from.forEach(newMeta => {
        const key = newMeta.hid || newMeta.name || newMeta.property
        const index = to.findIndex(meta => meta.hid === key || meta.name === key || meta.property === key)
        if (index < 0) {
          to.push(newMeta)
        }
      })
    }
  }
}
</script>
