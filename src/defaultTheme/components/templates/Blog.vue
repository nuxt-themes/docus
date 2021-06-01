<template>
  <AppContainer fluid>
    <div>
      <div class="max-w-2xl mx-auto py-16 sm:py-24 sm:px-4">
        <div>
          <h1
            class="
              px-4
              sm:px-0
              ml-auto
              mb-12
              text-4xl
              sm:text-6xl
              font-semibold
              tracking-tight
              text-gray-900
              dark:text-gray-100
            "
          >
            Blog
          </h1>
        </div>

        <article v-for="post in posts" :key="post.slug" class="mb-16 flex flex-col items-end">
          <div class="flex flex-col mb-4 w-full">
            <!-- date & author -->
            <div class="px-4 sm:px-0 flex items-center sm:items-end justify-between mb-4">
              <time :datetime="post.date" class="font-medium mr-2 text-sm text-gray-400 dark:text-gray-500">
                {{ formatDateByLocale($i18n.locale, post.date) }}
              </time>

              <div class="flex">
                <a
                  v-for="(author, index) in post.authors"
                  :key="index"
                  :href="author.link"
                  target="_blank"
                  rel="noopener noindex nofollow"
                  class="flex items-center justify-end -ml-2 rounded-full border border-gray-300 dark:border-gray-700"
                >
                  <NuxtImg
                    class="inline-block h-8 w-8 rounded-full"
                    height="32"
                    width="32"
                    :src="author.avatarUrl"
                    alt
                  />
                </a>
              </div>
            </div>

            <NuxtLink class="w-full hover:opacity-75 transition-opacity duration-100" :to="$contentLocalePath(post.to)">
              <div class="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800">
                <NuxtImg :src="post.imgUrl" width="864" height="378" alt="" />
              </div>
            </NuxtLink>
          </div>

          <div class="flex flex-col w-full">
            <div class="px-4 sm:px-0">
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
