<script setup lang="ts">
import { computed, useContent } from '#imports'

const { navigation } = useContent()

const tree = computed(() => {
  return navigation.value.filter(
    (item) => {
      if (item.slug === '/' || item.slug === '/templates')
        return false
      return true
    },
  )
})
</script>

<template>
  <nav>
    <DocsAsideTree :tree="tree" />
  </nav>
</template>
