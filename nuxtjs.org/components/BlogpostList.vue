<template>
  <div class="px-6 my-8">
    <div class="flex flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ContentCardTemplate
        v-for="post in posts"
        :key="post.id"
        class=""
        :title="post.title"
        :description="post.description"
        :image="post.imgUrl"
        :href="`/blog/${post.slug}`"
        :category="post.category"
      >
        <div slot="footer" class="px-4 mb-4 mt-auto">
          <div class="flex items-center">
            <div class="flex mr-4">
              <a
                v-for="(author, index) in post.authors"
                :key="index"
                :href="author.link"
                target="_blank"
                rel="noopener noindex nofollow"
                :class="{ '-ml-4': index !== 0 }"
                class="flex items-center justify-end rounded-full border-3 border-white dark:border-secondary-darker"
              >
                <NuxtImg
                  class="inline-block h-10 w-10 rounded-full"
                  height="32"
                  width="32"
                  :src="author.avatarUrl"
                  alt
                />
              </a>
            </div>
            <div class="text-sm flex flex-col">
              <span class="font-bold">{{ post.authors.length > 1 ? 'Multiple Authors' : post.authors[0].name }}</span>
              <time :datetime="post.date" class="font-medium mr-2 text-sm text-gray-400 dark:text-cloud">
                {{ formatDateByLocale($i18n.locale, post.date) }}
              </time>
            </div>
          </div>
        </div>
      </ContentCardTemplate>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const posts = ref()
    useFetch(async () => {
      const documents = await $docus
        .search('/blog', { deep: true })
        .where({ slug: { $ne: '' } })
        .sortBy('date', 'desc')
        .fetch()

      posts.value = documents
    })

    const formatDateByLocale = (locale, d) => {
      const currentLocale = locale || 'en'
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(d).toLocaleDateString(currentLocale, options)
    }

    return {
      posts,
      formatDateByLocale
    }
  }
})
</script>
