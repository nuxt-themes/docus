<template>
  <div class="relative w-full h-full flex items-center justify-center space-x-12">
    <Link
      v-for="{ title, href, slug } in links"
      :key="slug"
      class="relative capitalize font-medium flex flex-col items-center justify-center space-y-1 text-center"
      :to="href"
      :class="{
        'text-primary': currentSlug === slug,
        'hover:d-primary-text-hover': currentSlug !== slug
      }"
    >
      {{ title }}
    </Link>
  </div>
</template>

<script>
import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    links: {
      type: Array,
      required: false,
      default: () => [
        {
          title: 'Docs',
          slug: 'docs',
          href: '/docs'
        },
        {
          title: 'Examples',
          slug: 'examples',
          href: '/examples'
        },
        {
          title: 'Resources',
          slug: 'resources',
          href: '/resources'
        },
        {
          title: 'Blog',
          slug: 'blog',
          href: '/blog'
        },
        {
          title: 'Video Courses',
          slug: 'video-courses',
          href: 'https://masteringnuxt.com/?utm_source=nuxt&utm_medium=link&utm_campaign=navbar_link'
        }
      ]
    }
  },
  setup() {
    const route = useRoute()

    const currentSlug = computed(() => {
      return route.value.path !== '/' && route?.value?.params?.pathMatch
        ? route.value.params.pathMatch.split('/')[0]
        : null
    })

    return {
      currentSlug
    }
  }
})
</script>

<style scoped lang="postcss">
.nuxt-link-active {
  color: rgba(52, 211, 153);
}

.menu li {
  display: block;
  position: relative;
}
</style>
