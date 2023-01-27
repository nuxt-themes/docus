<script setup lang="ts">
const { config } = useDocus()

useHead({
  titleTemplate: config.value.titleTemplate,
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

watch(config.value.titleTemplate, () => useHead({ titleTemplate: config.value.titleTemplate }))

useContentHead(config.value as any)
</script>

<template>
  <div>
    <AppLoadingBar />
    <AppHeader v-if="Object.keys(config?.header).length" :fixed="config?.header?.fixed" />
    <slot />
    <AppFooter v-if="Object.keys(config?.footer).length" />
  </div>
</template>
