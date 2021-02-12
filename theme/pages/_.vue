<template>
  <div class="flex w-full pt-10 pb-24 lg:pb-16">
    <article class="flex-auto min-w-0 px-4 sm:px-6 xl:px-8">
      <div class="mb-10" :class="{ 'border-b border-gray-200 dark:border-gray-800 pb-10': document.description }">
        <h1 class="flex items-center justify-between text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          {{ document.title }}
          <Badge v-if="document.badge" class="font-medium">{{ document.badge }}</Badge>
        </h1>
        <p v-if="document.description" class="mt-2 text-lg text-gray-500 dark:text-gray-300">{{ document.description }}</p>
      </div>

      <div class="max-w-none">
        <NuxtContent :document="document" />
      </div>

      <AppPageBottom :document="document" />

      <hr class="mt-10 mb-4 border-gray-200 dark:border-gray-800">

      <AppPrevNext :prev="prev" :next="next" />
    </article>

    <AppToc v-if="!document.fullscreen" :toc="document.toc" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import CopyButton from '~/components/molecules/CopyButton'

export default {
  name: 'PageSlug',
  layout ({ store }) {
    return store.state.settings.layout || 'default'
  },
  middleware ({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    }
  },
  async asyncData ({ $content, store, app, params, error }) {
    const dir = `/${app.i18n.locale}`
    const slug = params.pathMatch || 'index'
    const [document] = await $content({ deep: true }).where({ dir, slug }).fetch()
    if (!document) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    const [prev, next] = await $content(app.i18n.locale, { deep: true })
      .only(['title', 'slug', 'to'])
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
    return {
      title: this.document.title,
      meta: [
        { hid: 'description', name: 'description', content: this.document.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.document.title },
        { hid: 'og:description', property: 'og:description', content: this.document.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.document.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.document.description }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'settings'
    ])
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
    }, 100)
  }
}
</script>
