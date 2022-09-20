<script setup lang="ts">
const { page } = useContent()
</script>

<template>
<Container as="main" :fluid="page.fluid" :padded="page.padded">
  <slot />
</Container>
</template>

<style scoped lang="ts">
css({
  main: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }
})
</style>
