<script setup lang="ts">
const { navigation } = useContent()

const tree = computed(() => navigation.value)
</script>

<template>
  <nav>
    <DocsAsideTree :tree="tree" />
  </nav>
</template>
