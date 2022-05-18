<script setup lang="ts">
import { computed, useDocus, useDocusNavigation, useRoute } from '#imports'

const { fileFromPath, navFromPath } = useDocusNavigation()

const { navigation, theme, page } = useDocus()

const route = useRoute()

const level = computed(() => theme.value?.aside?.level || 0)

const filtered = computed(() => theme.value?.aside?.filter || [])

const tree = computed(() => {
  let nav = navigation.value || []

  // Filter if `aside.level` is enabled in theme configuration
  if (level.value) {
    const path = route.path.split('/')

    // Get level
    if (level.value) {
      const leveledPath = path.splice(0, 1 + level.value).join('/')

      nav = navFromPath(leveledPath, navigation.value) || fileFromPath(leveledPath, navigation.value) || []

      if (!Array.isArray(nav)) nav = [nav]
    }

    // No navigation found; try to resolve page url
    if (nav.length === 0) {
      nav = fileFromPath(page.value?._path || '/', navigation.value) || []

      if (!Array.isArray(nav)) nav = [nav]
    }
  }

  // Filtered using `aside.filter` in theme configuration
  return nav.filter((item) => {
    if (filtered.value.includes(item._path)) return false

    return true
  })
})
</script>

<template>
  <nav>
    <DocsAsideTree v-if="tree && tree.length > 0" :tree="tree" />

    <NuxtLink v-else to="/" class="flex items-center text-lg cursor-pointer text-secondary hover:text-secondary-hover">
      <Icon name="heroicons-outline:arrow-left" class="w-6 h-6" />
      <span class="ml-2">Go back</span>
    </NuxtLink>
  </nav>
</template>
