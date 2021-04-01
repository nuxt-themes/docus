<template>
  <div>
    <div class="max-w-2xl mx-auto py-24 relative">
      <NuxtLink :to="localePath({name: 'blog'})" class="absolute top-0 left-0 px-4 mt-12 leading-none text-gray-400 dark:text-gray-600 hover:text-gray-500 hover:dark:text-gray-400 font-medium transition-color duration-100">
        <span class="">← Back</span>
      </NuxtLink>
      <div class="mb-6 px-4">
        <h1 class="text-4xl font-bold mb-6">{{ post.title }}</h1>
        <p class="mb-4 text-gray-500 dark:text-gray-400 font-medium">
          {{ post.description }}
        </p>

        <div class="flex sm:flex-row items-center">
          <div class="font-medium mr-2 text-sm text-gray-400 dark:text-gray-600">{{ formatDateByLocale(post.date) }}</div>
          <div class="text-sm text-gray-400 dark:text-gray-700">|</div>
          <div class="flex ml-4">
            <span
              v-for="(author, index) in post.authors"
              :key="index"
              class="flex items-center justify-end -ml-2 rounded-full border border-gray-300 dark:border-gray-500"
            >
              <img
                class="inline-block h-6 w-6 rounded-full"
                :src="author.avatarUrl"
                alt
              />
            </span>
          </div>
        </div>
      </div>

      <div class="sm:-mx-12 md:-mx-18 lg:-mx-24 aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800 mb-8">
        <img :src="post.imgUrl" alt="" class="object-cover" />
      </div>

      <NuxtContent :document="post" class="px-4" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  async asyncData ({ $content, $docus, app, params, error }) {
    const post = await $content('blog', params.post).fetch()
    return {
      post
    }
  },
  methods: {
    formatDateByLocale (d) {
      const currentLocale = this.$i18n.locale || 'en'
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(d).toLocaleDateString(currentLocale, options)
    }
  }
}
</script>
