<script setup lang="ts">
import { computed, useDocus, useDocusNavigation, useRoute } from '#imports'

const route = useRoute()
const { findBottomLink } = useDocusNavigation()
const { navigation, theme } = useDocus()

const hasNavigation = computed(() => !!theme.value.aside?.level)
const filtered = computed(() => theme.value?.aside?.filter || [])
const tree = computed(() => {
  return (navigation.value || []).filter((item) => {
    if (filtered.value.includes(item._path)) return false
    return true
  })
})

const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <nav v-if="hasNavigation" class="flex items-center justify-center flex-1 max-w-full gap-8 py-1 overflow-hidden font-medium truncate">
    <NuxtLink
      v-for="link in tree"
      :key="link._path"
      :to="findBottomLink(link)"
      class="text-sm transition-colors transition-base"
      :class="[ isActive(link) ? 'text-primary hover:text-primary' : 'text-gray-700 hover:text-gray-400 dark:text-gray-200 hover:dark:text-gray-300' ]"
    >
      {{ link.title }}
    </NuxtLink>
  </nav>
</template>
