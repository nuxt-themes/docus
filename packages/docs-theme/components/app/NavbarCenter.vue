<script setup lang="ts">
import { computed, useDocus, useDocusHelpers, useRoute } from '#imports'

const route = useRoute()
const { findBottomLink } = useDocusHelpers()
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
  <nav v-if="hasNavigation" class="flex max-w-full flex-1 items-center justify-center gap-8 overflow-hidden truncate py-1 font-medium">
    <NuxtLink
      v-for="link in tree"
      :key="link._path"
      :to="findBottomLink(link)"
      class="text-sm"
      :class="[isActive(link) ? 'text-primary-500 hover:text-primary-500' : 'text-gray-700 hover:text-gray-400 dark:text-gray-200 hover:dark:text-gray-300']"
    >
      {{ link.title }}
    </NuxtLink>
  </nav>
</template>
