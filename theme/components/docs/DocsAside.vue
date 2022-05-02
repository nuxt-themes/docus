<script setup lang="ts">
import { computed, useDocus } from '#imports'

const { navigation } = useDocus()

const tree = computed(() => {
  return navigation.value.filter(
    (item) => {
      if (item.slug === '/')
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
