<template>
  <div class="pt-10 pb-24 lg:pb-16 w-full flex">
    <div class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8">
      <div class="mb-10" :class="{ 'border-b border-gray-200 pb-10': document.subtitle }">
        <h1 class="flex items-center justify-between text-3xl font-extrabold text-gray-900 tracking-tight">
          {{ document.title }}
          <Badge v-if="document.badge" class="font-medium">{{ document.badge }}</Badge>
        </h1>
        <p v-if="document.subtitle" class="mt-1 text-lg text-gray-500">{{ document.subtitle }}</p>
      </div>

      <div class="prose prose-primary dark:prose-dark max-w-none">
        <NuxtContent :document="document" />
      </div>

      <AppGithubLink :document="document" />

      <hr class="border-gray-200 mt-10 mb-4">

      <AppPrevNext :prev="prev" :next="next" />
    </div>

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
    const path = `/${app.i18n.locale}/${params.pathMatch || 'index'}`
    const [document] = await $content({ deep: true }).where({ path }).fetch()
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
