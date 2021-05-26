<template>
  <Component :is="page.template" :page="page" />
</template>

<script>
import Vue from 'vue'
import { withoutTrailingSlash } from 'ufo'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PageSlug',

  middleware({ app, params, redirect }) {
    if (params.pathMatch === 'index') redirect(app.localePath('/'))
  },

  async asyncData({ $docus, app: { i18n }, params, error }) {
    const language = i18n.locale

    // Get the proper current path
    const to = withoutTrailingSlash(`/${params.pathMatch || ''}`) || '/'

    // TODO: Fix the draft system
    const draft = false

    // Page query
    const [page] = await $docus.search({ deep: true }).where({ language, to, draft }).fetch()

    // Break on missing page query
    if (!page) return error({ statusCode: 404, message: 'Page not found' })

    // Get page template
    page.template = $docus.getPageTemplate(page)

    // Set Docus runtime current page
    $docus.currentPage.value = page

    // Preload the component on client-side navigation
    await Vue.component(page.template)()

    return { page }
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
        // OpenGraph
        { hid: 'og:title', property: 'og:title', content: this.page.title },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.page.title },
        /// Page description
        ...(this.page.description
          ? [
              // Meta description
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
    }
  },

  mounted() {
    if (this.page.version) localStorage.setItem(`page-${this.page.slug}-version`, this.page.version)
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
})
</script>
