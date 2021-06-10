<template>
  <div class="relative w-full h-full flex items-center justify-center mr-20">
    <ul class="flex space-x-12 h-full">
      <li
        v-for="(link, index) in headerLinks"
        :key="link.slug"
        class="relative capitalize font-medium flex flex-col items-center justify-center space-y-1 text-center"
        @mouseover="hoverLinks(index)"
        @mouseleave="hover = false"
      >
        <NuxtLink
          :to="`/${link.slug}/${link.children[0].slug || ''}`"
          class="pb-2"
          :class="{
            'text-primary-green': currentSlug === link.slug,
            'mt-4': $route.path !== '/'
          }"
        >
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, useRoute, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // @ts-ignore
    const { $docus } = useContext()

    const route = useRoute()
    const hover = ref(false)
    const itemIndex = ref(null)
    const currentNav = computed(() => $docus.get({ depth: 1 }).links)

    // computed
    const headerLinks = computed(() => currentNav.value.filter(link => link.slug !== '' && link.children.length))

    const currentSlug = computed(() => {
      return route.value.path !== '/' && route?.value?.params?.pathMatch
        ? route.value.params.pathMatch.split('/')[0]
        : null
    })

    // methods
    function hoverLinks(index) {
      itemIndex.value = index
      hover.value = true
    }

    return {
      headerLinks,
      currentSlug,
      hoverLinks,
      hover,
      itemIndex
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
