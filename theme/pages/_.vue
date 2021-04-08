<template>
  <AppPage>
    <div class="mb-6" :class="{ 'border-b border-gray-100 dark:border-gray-800 pb-6': document.description }">
      <h1 class="flex items-center justify-between text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        <span class="flex-1">{{ document.title }}</span>
        <span v-if="document.draft" class="inline-block px-3 py-1 mr-2 text-base font-medium leading-5 tracking-tight text-yellow-500 bg-yellow-100 rounded-full items-flex dark:bg-yellow-800 dark:text-yellow-400">Draft</span>
        <DBadge v-if="document.badge" class="font-medium">{{ document.badge }}</DBadge>
      </h1>
      <p v-if="document.description" class="mt-2 text-lg text-gray-600 dark:text-gray-300 tracking-semitight">{{ document.description }}</p>
    </div>
    <div class="max-w-none">
      <NuxtContent :document="document" />
    </div>
    <PageBottom :document="document" />
    <hr class="mt-10 mb-4 border-gray-100 dark:border-gray-800">
    <PagePrevNext :prev="prev" :next="next" />
    <template #toc>
      <PageToc v-if="!document.fullscreen" :toc="document.toc.links" :title="document.toc.title" />
    </template>
  </AppPage>
</template>

<script>
import { withoutTrailingSlash } from 'ufo'
import Vue from 'vue'
import CopyButton from '../components/molecules/DCopyButton'
import { convertPropToPixels } from '../utils/dom'

export default {
  name: 'PageSlug',
  layout ({ $docus }) {
    return $docus.settings.layout
  },
  middleware ({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    }
  },
  async asyncData ({ $content, $docus, app, params, error }) {
    const language = app.i18n.locale
    const to = withoutTrailingSlash(`/${params.pathMatch || ''}`)
    const draft = $docus.ui?.draft ? undefined : false
    const [document] = await $content({ deep: true }).where({ language, to, draft }).fetch()
    if (!document) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    const [prev, next] = await $content({ deep: true })
      .where({ language, draft, menu: { $ne: false } })
      .only(['title', 'slug', 'to', 'category'])
      .sortBy('position', 'asc')
      .surround(document.slug, { before: 1, after: 1 })
      .fetch()

    return {
      document,
      prev,
      next
    }
  },
  head () {
    const head = {
      title: this.document.title,
      meta: [],
      ...(this.document.head || {})
    }
    this.mergeMeta(head.meta, this.pageMeta)
    return head
  },
  computed: {
    pageMeta () {
      return [
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.document.title },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.document.title },
        ...(
          this.document.description
            ? [
                { hid: 'description', name: 'description', content: this.document.description },
                // Open Graph
                { hid: 'og:description', property: 'og:description', content: this.document.description },
                // Twitter Card
                { hid: 'twitter:description', name: 'twitter:description', content: this.document.description }
              ]
            : []
        )
      ]
    },
    settings () {
      return this.$docus.settings
    }
  },
  mounted () {
    if (this.document.version) {
      localStorage.setItem(`document-${this.document.slug}-version`, this.document.version)
    }

    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const Button = Vue.extend(CopyButton)
        const component = new Button().$mount()
        block.appendChild(component.$el)
      }

      const headings = [...document.querySelectorAll('.nuxt-content h2'), ...document.querySelectorAll('.nuxt-content h3')]
      headings.map((heading) => {
        heading.addEventListener('click', function (e) {
          e.preventDefault()
          const hash = e.target.href.split('#').pop()
          const offset = heading.offsetTop - parseInt(convertPropToPixels('--scroll-margin-block'))
          // use replaceState to prevent page jusmp when adding hash
          history.replaceState({}, '', '#' + hash)
          scrollTo(0, offset)
        })
      })
    }, 100)
  },
  methods: {
    mergeMeta (to, from) {
      from.forEach((newMeta) => {
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
