<template>
  <ul class="flex space-x-8 justify-center w-full text-gray-700 dark:text-gray-200">
    <li v-for="link of links" :key="link.slug">
      <NuxtLink
        :to="$contentLocalePath(link.to || '/')"
        class="py-1 font-semibold"
        :class="{ 'text-primary border-b border-primary': $docus.isLinkActive(link.to || '/') }"
      >
        {{ link.title || link.slug }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()

    const links = computed(() => $docus.currentNav.links?.filter(link => link.slot === 'header'))

    return {
      links
    }
  }
})
</script>
