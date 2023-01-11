<script setup lang="ts">
const { page } = useContent()
</script>

<template>
  <div class="page-layout">
    <Container :fluid="page?.fluid" :padded="page?.padded">
      <article>
        <slot />
      </article>
    </Container>
  </div>
</template>

<style lang="ts" scoped>
css({
  '.page-layout': {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  }
})
</style>
