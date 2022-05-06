<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { navigation, theme } = useDocus()

const hasNavigation = computed(() => !!theme.value.aside?.level)

const filtered = computed(() => theme.value?.aside?.filter || [])

const tree = computed(() => {
  return (navigation.value || []).filter((item) => {
    if (filtered.value.includes(item.slug)) return false
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
  <nav v-if="hasNavigation" class="flex max-w-full flex-1 items-center justify-center gap-8 overflow-hidden truncate font-medium">
    <NuxtLink v-for="link in tree" :key="link.slug" :to="getPath(link)" class="transition-base hover:text-secondary-hover transition-colors" active-class="text-secondary-active">
      {{ link.title }}
    </NuxtLink>
  </nav>
</template>
