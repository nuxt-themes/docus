<template>
  <Component :is="page.template" :page="page" />
</template>

<script>
import Vue from 'vue'
import { withoutTrailingSlash } from 'ufo'
import CopyButton from '../../components/atoms/CopyButton.vue'
import { scrollToHeading } from '../../components/utils'

export default {
  name: 'PageSlug',
  middleware({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    }
  },
  async asyncData({ $content, $docus, app, params, error }) {
    const language = app.i18n.locale
    const to = withoutTrailingSlash(`/${params.pathMatch || ''}`) || '/'
    const draft = $docus.ui?.draft ? undefined : false
    const [page] = await $content({ deep: true }).where({ language, to, draft }).fetch()
    if (!page) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    page.data = page.data || {}
    if (page.fetch) {
      await Object.entries(page.fetch).reduce(async (prev, [key, fetch]) => {
        const data = await prev
        const { query, deep, where, sortBy, only, without, limit } = fetch

        const queryBuilder = $content(query, { deep })
        if (where) queryBuilder.where(where)
        if (sortBy) queryBuilder.sortBy(sortBy)
        if (only) queryBuilder.only(only)
        if (without) queryBuilder.without(without)
        if (limit) queryBuilder.limit(limit)
        
        data[key] = await queryBuilder.fetch()
        return data
      }, Promise.resolve(page.data))
    }

    page.template = $docus.getPageTemplate(page)
    // Preload the component on client-side navigation
    await Vue.component(page.template)()

    return { page };
  },
  data() {
    return {
      scrollToHeading,
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

    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '')

      // do not remove setTimeout (wrong scroll pos)
      setTimeout(() => {
        this.scrollToHeading(hash, '--docs-scroll-margin-block')
      }, 300)
    }

    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const Button = Vue.extend(CopyButton)
        const component = new Button().$mount()
        block.appendChild(component.$el)
      }

      const headings = [
        ...document.querySelectorAll('.nuxt-content h2'),
        ...document.querySelectorAll('.nuxt-content h3')
      ]
      headings.forEach(heading => {
        heading.addEventListener('click', e => {
          e.preventDefault()
          const hash = e.target.href.split('#').pop()
          this.scrollToHeading(hash, '--docs-scroll-margin-block')
        })
      })
    }, 100)
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
