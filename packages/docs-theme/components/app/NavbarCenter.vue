<script setup lang="ts">
import { computed, useDocus, useDocusNavigation, useRoute } from '#imports'

const route = useRoute()

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

const isActive = (link: any) => (link.exact ? route.fullPath === link.slug : route.fullPath.startsWith(link.slug))
</script>

<template>
  <nav v-if="hasNavigation" class="flex max-w-full flex-1 items-center justify-center gap-8 overflow-hidden py-1 truncate font-medium">
    <NuxtLink
      v-for="link in tree"
      :key="link.slug"
      :to="findBottomLink(link)"
      class="transition-base hover:text-secondary-hover transition-colors"
      :class="[isActive(link) && 'text-secondary-active']"
    >
      {{ link.title }}
    </NuxtLink>
  </nav>
</template>
