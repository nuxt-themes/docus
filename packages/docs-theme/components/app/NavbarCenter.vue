<script setup lang="ts">
import { computed, useDocus, useDocusNavigation } from '#imports'

const { findBottomLink } = useDocusNavigation()

const { navigation, theme } = useDocus()

const hasNavigation = computed(() => !!theme.value.aside?.level)

const filtered = computed(() => theme.value?.aside?.filter || [])

const tree = computed(() => {
  return (navigation.value || []).filter((item) => {
    if (filtered.value.includes(item.slug)) return false
    return true
  })
})
</script>

<template>
  <nav v-if="hasNavigation" class="flex max-w-full flex-1 items-center justify-center gap-8 overflow-hidden py-1 truncate font-medium">
    <NuxtLink
      v-for="link in tree"
      :key="link.slug"
      :to="findBottomLink(link)"
      class="transition-base hover:text-secondary-hover transition-colors"
      active-class="text-secondary-active"
    >
      {{ link.title }}
    </NuxtLink>
  </nav>
</template>
