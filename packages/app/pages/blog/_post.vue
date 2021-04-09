<template>
  <div>
    <div class="max-w-2xl mx-auto py-24 relative">
      <NuxtLink
        :to="localePath({ name: 'blog' })"
        class="absolute top-0 left-0 px-4 mt-12 leading-none text-gray-400 dark:text-gray-600 hover:text-gray-500 hover:dark:text-gray-400 font-medium transition-color duration-100"
      >
        <span class="">← Back</span>
      </NuxtLink>
      <div class="mb-6 px-4">
        <h1 class="text-4xl font-bold mb-6">{{ post.title }}</h1>
        <p class="mb-4 text-gray-500 dark:text-gray-400 font-medium">
          {{ post.description }}
        </p>

        <div class="flex sm:flex-row items-center">
          <div class="font-medium mr-2 text-sm text-gray-400 dark:text-gray-600">
            {{ formatDateByLocale(post.date) }}
          </div>
          <div class="text-sm text-gray-400 dark:text-gray-700">|</div>
          <div class="flex ml-4">
            <span
              v-for="(author, index) in post.authors"
              :key="index"
              class="flex items-center justify-end -ml-2 rounded-full border border-gray-300 dark:border-gray-500"
            >
              <img class="inline-block h-6 w-6 rounded-full" :src="author.avatarUrl" alt />
            </span>
          </div>
        </div>
      </div>

      <div class="md:-mx-18 lg:-mx-24 aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800 mb-8">
        <img :src="post.imgUrl" alt="" class="object-cover" />
      </div>

      <BlogpostToc :toc="post.toc" class="mb-8" />

      <NuxtContent :document="post" class="px-4" />
    </div>
  </div>
</template>

<script>
import { convertPropToPixels } from '../../../engine/utils/dom'

export default {
  layout: 'blog',
  async asyncData({ $content, params }) {
    const post = await $content('blog', params.post).fetch()
    return {
      post
    }
  },
  mounted() {
    const headings = [
      ...document.querySelectorAll('.nuxt-content h2'),
      ...document.querySelectorAll('.nuxt-content h3')
    ]
    headings.forEach(heading => {
      heading.addEventListener('click', function (e) {
        e.preventDefault()
        const hash = e.target.href.split('#').pop()
        const offset = heading.offsetTop - parseInt(convertPropToPixels('--blogpost-scroll-margin-block'))
        // use replaceState to prevent page jusmp when adding hash
        history.replaceState({}, '', '#' + hash)
        scrollTo(0, offset)
      })
    })
  },
  methods: {
    formatDateByLocale(d) {
      const currentLocale = this.$i18n.locale || 'en'
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(d).toLocaleDateString(currentLocale, options)
    }
  }
}
</script>

<style scoped>
/* .nuxt-content h2, .nuxt-content h3 {
  scroll-margin-block: var(--blogpost-scroll-margin-block);
} */
</style>
