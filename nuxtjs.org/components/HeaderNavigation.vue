<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <ul class="flex space-x-12 h-full">
      <li
        v-for="link in headerLinks"
        :key="link.slug"
        class="relative capitalize font-medium flex flex-col items-center justify-center space-y-1 text-center"
      >
        <NuxtLink
          :to="`/${link.slug}/${link.slug.includes('blog') ? '' : link.children[0].slug || ''}`"
          :class="{
            'text-primary': currentSlug === link.slug,
            'hover:d-primary-text-hover': currentSlug !== link.slug
          }"
        >
          {{ link.title }}
        </NuxtLink>
      </li>
      <li class="relative capitalize font-medium flex flex-col items-center justify-center space-y-1 text-center">
        <a
          href="https://masteringnuxt.com/?utm_source=nuxt&utm_medium=link&utm_campaign=navbar_link"
          class="hover:d-primary-text-hover"
          target="_blank"
          rel="noopener"
        >
          Video Courses
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, useRoute, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // @ts-ignore
    const { $docus } = useContext()

    const route = useRoute()
    const currentNav = computed(() => $docus.get({ depth: 1 }).links)

    // computed
    const headerLinks = computed(() => currentNav.value.filter(link => link.slug !== '' && link.children.length))

    const currentSlug = computed(() => {
      return route.value.path !== '/' && route?.value?.params?.pathMatch
        ? route.value.params.pathMatch.split('/')[0]
        : null
    })
    return {
      headerLinks,
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
