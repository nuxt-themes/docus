<template>
  <div class="max-w-2xl mx-auto py-24 relative">
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
          </div>

            <NuxtLink class="w-full hover:opacity-75 transition-opacity duration-100" :to="$contentLocalePath(post.to)">
              <div class="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800">
                <NuxtImg :src="post.imgUrl" width="864" height="378" alt="" />
              </div>
            </NuxtLink>
          </article>
        </div>

          <div class="flex flex-col w-full">
            <div class="px-4 sm:px-0">
              <NuxtLink
                class="hover:text-gray-500 hover:dark:text-gray-400 transition-color duration-100"
                :to="$contentLocalePath(post.to)"
              >
                <h1 class="text-2xl font-semibold mb-2">{{ post.title }}</h1>
              </NuxtLink>

      <div class="flex flex-col sm:flex-row w-full">
        <div
          class="
            hidden
            sm:flex sm:flex-col
            items-center
            sm:items-end
            justify-between
            sm:w-1/3
            px-4
            sm:pr-4
            mb-4
            sm:mb-0
          "
        >
          <!-- only show sticky author on desktop layout -->
          <div class="sticky top-header flex items-center py-2 -my-1.5">
            <span
              v-for="(author, index) in post.authors"
              :key="index"
              class="flex items-center justify-end -ml-2 rounded-full border border-gray-300 dark:border-gray-600"
            >
              <NuxtImg class="inline-block h-6 w-6 rounded-full" height="24" width="24" :src="author.avatarUrl" alt />
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
</div></div></div></template>

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
