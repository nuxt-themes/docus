<script setup lang="ts">
import { computed, useDocus } from '#imports'
const { navigation } = useDocus()

const tree = computed(() => {
  return navigation.value.filter((item) => {
    if (item.slug === '/') return false
    return true
  })
})
const getPath = (link) => {
  if (link.children && link.children[0].slug !== '/') {
    return link.children[0].slug
  }
  return link.slug
}
</script>

<template>
  <nav v-if="true" class="flex items-center justify-center flex-1 gap-8 font-medium">
    <NuxtLink v-for="link in tree" :key="link.slug" :to="getPath(link)">
      {{ link.title }}
    </NuxtLink>
  </nav>
</template>
