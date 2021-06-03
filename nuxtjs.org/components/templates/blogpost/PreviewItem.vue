<template>
  <NuxtLink
    :to="localePath({ name: 'blog-slug', params: { slug: post.slug } })"
    class="light:bg-light-surface dark:bg-dark-surface flex flex-col-reverse lg:flex-row mb-8 rounded p-4 sm:p-8 lg:p-4 light:hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-300 ease-linear"
  >
    <div class="w-full lg:w-2/3 flex flex-col justify-between pr-4">
      <div class="mb-2">
        <h2
          class="mb-4 inline-block leading-tight light:hover:text-nuxt-lightgreen dark:hover:text-nuxt-lightgreen light:text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary font-semibold text-2xl md:text-3xl transition-colors duration-300 ease-linear"
        >
          {{ post.title }}
        </h2>
        <div class="mb-4">
          <p
            class="truncate-multiline-3 light:text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary transition-colors duration-300 ease-linear"
          >
            {{ post.description }}
          </p>
        </div>
        <div
          class="flex flex-row flex-wrap justify-start mb-2 light:text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary"
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
      <div class="flex flex-col lg:flex-row text-sm">
        <div class="mb-4 lg:mb-0 flex items-center">
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
        <div
          class="flex w-full lg:w-auto items-center justify-between leading-none"
        >
          <span
            class="hidden lg:inline-block text-xs mx-2 light:text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary transition-colors duration-300 ease-linear"
          >
            &bullet;
          </span>
          <span
            class="light:text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary transition-colors duration-300 ease-linear"
          >
            {{ formatDateByLocale(post.date) }}
          </span>
          <span
            class="hidden lg:inline-block text-xs mx-2 light:text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary transition-colors duration-300 ease-linear"
          >
            &bullet;
          </span>
          <span
            class="light:text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary transition-colors duration-300 ease-linear"
          >
            &nbsp;{{ post.readingTime.text }}
          </span>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/3 mb-6 lg:mb-0 rounded overflow-hidden">
      <AppImage :src="post.imgUrl" ratio="16:9" />
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
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
