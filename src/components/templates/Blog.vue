<template>
  <AppContainer fluid>
    <div>
      <div class="max-w-2xl mx-auto py-24">
        <div>
          <h1 class="px-4 sm:px-0 font-bold text-4xl sm:w-2/3 ml-auto mb-12">Blog</h1>
        </div>

        <article v-for="post in posts" :key="post.slug" class="mb-16 flex flex-col items-end">
          <div class="flex flex-col sm:flex-row mb-4 w-full">
            <div class="flex sm:flex-col items-center sm:items-end justify-between sm:w-1/3 px-4 sm:pr-4 mb-4 sm:mb-0">
              <div class="sm:flex-1">
                <div
                  class="sticky top-header text-right text-sm text-gray-400 dark:text-gray-500 font-medium py-2 -my-2"
                >
                  {{ formatDateByLocale($i18n.locale, post.date) }}
                </div>
              </div>

              <!-- only show author on mobile layout -->
              <div class="flex sm:hidden">
                <span
                  v-for="(author, index) in post.authors"
                  :key="index"
                  class="flex items-center justify-end -ml-2 rounded-full border border-gray-300 dark:border-gray-500"
                >
                  <img class="inline-block h-6 w-6 rounded-full" :src="author.avatarUrl" alt />
                </span>
              </div>
            </div>

            <NuxtLink
              class="sm:w-2/3 hover:opacity-75 transition-opacity duration-100"
              :to="$contentLocalePath(post.to)"
            >
              <div class="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800">
                <img :src="post.imgUrl" alt="" />
              </div>
            </NuxtLink>
          </div>

          <div class="flex flex-col sm:flex-row w-full">
            <div
              class="hidden sm:flex sm:flex-col items-center sm:items-end justify-between sm:w-1/3 px-4 sm:pr-4 mb-4 sm:mb-0"
            >
              <!-- only show sticky author on desktop layout -->
              <div class="sticky top-header flex items-center py-2 -my-1.5">
                <span
                  v-for="(author, index) in post.authors"
                  :key="index"
                  class="flex items-center justify-end -ml-2 rounded-full border border-gray-300 dark:border-gray-600"
                >
                  <img class="inline-block h-6 w-6 rounded-full" :src="author.avatarUrl" alt />
                </span>
              </div>
            </div>
            <div class="sm:w-2/3 px-4 sm:px-0">
              <NuxtLink
                class="hover:text-gray-500 hover:dark:text-gray-400 transition-color duration-100"
                :to="$contentLocalePath(post.to)"
              >
                <h1 class="text-2xl font-semibold mb-2">{{ post.title }}</h1>
              </NuxtLink>

              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ post.description }}</p>
              <NuxtLink
                class="font-medium hover:text-gray-500 hover:dark:text-gray-400 transition-color duration-100"
                :to="$contentLocalePath(post.to)"
              >
                <span>Read More →</span>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </AppContainer>
</template>

<script>
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { $docus } = useContext()
    const posts = ref()

    useFetch(async () => {
      const documents = await $docus.search('/blog', { deep: true })
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
