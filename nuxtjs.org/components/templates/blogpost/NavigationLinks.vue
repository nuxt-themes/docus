<template>
  <div class="flex justify-between items-center">
    <NuxtLink
      v-if="prev"
      :to="toLink(prev.slug)"
      class="
        inline-flex
        items-center
        dark:hover:text-nuxt-lightgreen
        light:hover:text-nuxt-lightgreen
        dark:text-dark-onSurfaceSecondary
        light:text-light-onSurfaceSecondary
        transition-colors
        duration-300
        ease-linear
      "
    >
      <SvgIcon name="arrow-left" class="h-5 mr-2" />
      {{ prev.title || 'back to blog list' }}
    </NuxtLink>
    <NuxtLink
      v-if="next"
      :to="toLink(next.slug)"
      class="
        inline-flex
        items-center
        text-right
        dark:hover:text-nuxt-lightgreen
        light:hover:text-nuxt-lightgreen
        dark:text-dark-onSurfaceSecondary
        light:text-light-onSurfaceSecondary
        transition-colors
        duration-300
        ease-linear
      "
    >
      {{ next.title }}
      <SvgIcon name="arrow-rigth" class="h-5 ml-2" />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'BlogpostNavigationLinks',
  props: {
    prev: {
      type: Object,
      default: null
    },
    next: {
      type: Object,
      default: null
    }
  },
  methods: {
    toLink(slug) {
      if (slug === 'index') {
        return this.localePath('blog')
      }
      return this.localePath({ name: 'blog-slug', params: { slug } })
    }
  }
}
</script>
