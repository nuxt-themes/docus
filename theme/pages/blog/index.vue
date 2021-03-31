<template>
  <div>
    <div class="max-w-2xl mx-auto">
      <article v-for="post in posts" :key="post.slug" class="mb-8">
        <div class="flex">
          <div class="w-1/3 flex flex-col">
            <div class="flex-1">
              <div class="sticky top-header">{{ formatDateByLocale(post.date) }}</div>
            </div>
            <div>
              <span
                v-for="(author, index) in post.authors"
                :key="index"
                class="flex items-center mr-4"
              >
                <img
                  class="inline-block h-6 w-6 rounded-full mr-2"
                  :src="author.avatarUrl"
                  alt
                />
                <span
                  class="leading-none last:mr-0 light:text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary hover:text-nuxt-lightgreen transition-colors duration-300 ease-linear"
                >
                  {{ author.name }}
                </span>
              </span>
            </div>
            <!-- <div>{{ post.tags }}</div> -->
          </div>
          <div class="w-2/3">
            <NuxtLink :to="localePath({name: 'blog-post', params: {post: post.slug}})">
              <div class="aspect-w-16 aspect-h-9">
                <img :src="post.imgUrl" alt="" />
              </div>
              <h1>{{ post.title }}</h1>
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  async asyncData ({ $content, $docus, app, params, error }) {
    const posts = await $content('blog').fetch()
    console.log(posts)
    return {
      posts
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
