<script setup lang="ts">
const route = useRoute()
const { navBottomLink } = useContentHelpers()
const { navigation } = useContent()
const docus = useDocus()

const hasNavigation = computed(() => !!docus.value.aside?.level)

const filtered = computed(() => docus.value.aside?.filter || [])

const tree = computed(() => {
  return (navigation.value || []).filter((item) => {
    if (filtered.value.includes(item._path)) { return false }
    return true
  })
})

const isActive = (link: any) => (link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path))
</script>

<template>
  <nav v-if="hasNavigation" class="flex items-center justify-center flex-1 max-w-full space-x-2 overflow-hidden font-medium truncate">
    <NuxtLink
      v-for="link in tree"
      :key="link._path"
      :to="navBottomLink(link)"
      class="link"
      :class="{ active: isActive(link) }"
    >
      {{ link?.navigation?.title || link.title }}
    </NuxtLink>
  </nav>
</template>

<style scoped lang="postcss">
.link {
  @apply text-sm px-4 py-2 rounded transition;
  &:hover,
  &:focus {
    @apply bg-gray-100 dark:bg-gray-900 outline-none;
  }
  &.active {
    @apply bg-gray-100 dark:bg-gray-900 shadow-inner font-semibold;
  }
}
</style>
