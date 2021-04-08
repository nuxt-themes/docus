<template>
  <component :is="page.template" :page="page" />
</template>

<script>
import Vue from 'vue'
import { withoutTrailingSlash } from 'ufo'
import CopyButton from '../components/atoms/DCopyButton'

export default {
  name: 'PageSlug',
  middleware ({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    }
  },
  async asyncData ({ $content, $docus, app, params, error }) {
    const language = app.i18n.locale
    const to = withoutTrailingSlash(`/${params.pathMatch || ''}`) || '/'
    const draft = $docus.ui?.draft ? undefined : false
    const [page] = await $content({ deep: true }).where({ language, to, draft }).fetch()
    if (!page) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
    page.template = $docus.getPageTemplate(page)

    // Preload the component on client-side navigation
    await Vue.component(page.template)()

    return { page }
  },
  data () {
    return {
      page: {}
    }
  },
  head () {
    return {
      title: this.page.title,
      meta: [
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.page.title },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.page.title },
        ...this.descriptionMeta()
      ]
    }
  },
  computed: {
    settings () {
      return this.$docus.settings
    }
  },
  mounted () {
    if (this.page.version) {
      localStorage.setItem(`page-${this.page.slug}-version`, this.page.version)
    }

    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const Button = Vue.extend(CopyButton)
        const component = new Button().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  },
  methods: {
    descriptionMeta () {
      if (!this.page.description) {
        return []
      }
      return [
        { hid: 'description', name: 'description', content: this.page.description },
        // Open Graph
        { hid: 'og:description', property: 'og:description', content: this.page.description },
        // Twitter Card
        { hid: 'twitter:description', name: 'twitter:description', content: this.page.description }
      ]
    }
  }
}
</script>
