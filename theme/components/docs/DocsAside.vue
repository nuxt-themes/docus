<script setup lang="ts">
import { navFromPath } from '../../utils/navigation'
import { computed, useDocus } from '#imports'
const { navigation, theme } = useDocus()
const route = useRoute()

const level = theme.value.aside?.level || 0

const tree = computed(() => {
  let nav = navigation.value
  for (let i = 0; i < level; i++) {
    nav = navFromPath(`/${route.params.slug[i]}`, nav)
  }
  return nav.filter((item) => {
    if (item.slug === '/') return false

    return true
  })
})
</script>

<template>
  <nav>
    <DocsAsideTree :tree="tree" />
  </nav>
</template>
