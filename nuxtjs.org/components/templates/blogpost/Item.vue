<template>
  <article>
    <header class="flex items-left justify-between flex-col mt-12">
      <div class="flex flex-1 flex-col mb-8">
        <h1 class="text-4xl font-semibold mb-4 leading-tight">
          {{ post.title }}
        </h1>
        <div class="text-sm flex justify-between flex-col sm:flex-row">
          <div>
            <BlogpostAuthor
              v-for="(author, index) in post.authors"
              :key="index"
              :author="author"
            />
          </div>
          <div
            class="mt-1 dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary"
          >
            {{ formatDateByLocale(post.date) }}
            <span class="text-xs mx-1">&bullet;</span>
            {{ post.readingTime.text }}
          </div>
        </div>
      </div>
      <AppImage :src="post.imgUrl" ratio="16:9" sizes="80vh" class="rounded" />
    </header>
    <div class="mt-12">
      <NuxtContent :document="post" />
    </div>
    <div
      v-if="hasTags"
      class="border-t border-light-border dark:border-dark-border my-10"
    >
      <div
        class="flex flex-row flex-wrap justify-start my-10 light:text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary"
      >
        <span
          v-for="(tag, id) in post.tags"
          :key="id"
          class="truncate uppercase tracking-wider font-medium text-ss px-2 py-1 rounded-full mr-2 mb-2 border border-light-border dark:border-dark-border transition-colors duration-300 ease-linear"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BlogpostItem',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasTags() {
      return this.post.tags
    }
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

<style></style>
