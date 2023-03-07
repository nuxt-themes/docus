<script setup lang="ts">
const { config } = useDocus()

useHead({
  titleTemplate: config.value.titleTemplate,
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

watch(
  () => config.value.titleTemplate,
  () => useHead({ titleTemplate: config.value.titleTemplate })
)

useContentHead(config.value as any)
</script>

<template>
  <div class="app-layout">
    <AppLoadingBar />
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<style scoped lang="ts">
css({
  '.app-layout': {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
  }
})
</style>
