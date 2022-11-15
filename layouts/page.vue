<script setup lang="ts">
const { page } = useContent()
</script>

<template>
  <div class="page-layout">
    <AppContainer :fluid="page.fluid" :constrained-class="page.constrainedClass" :padded="page.padded">
      <article>
        <slot />
      </article>
    </AppContainer>
  </div>
</template>

<style lang="ts" scoped>
css({
  '.page-layout': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '{docus.page.height}',
    position: 'relative'
  }
})
</style>
