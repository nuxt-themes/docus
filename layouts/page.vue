<script setup lang="ts">
const { page } = useContent()
const { layoutConfig } = useCurrentNavigation()
</script>

<template>
  <div class="page-layout">
    <Container
      :fluid="page?.fluid || layoutConfig?.fluid"
      :padded="page?.padded || layoutConfig?.padded || true"
    >
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
