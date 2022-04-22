<script setup lang="ts">
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
