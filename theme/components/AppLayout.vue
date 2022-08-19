<script setup lang="ts">
const docus = useDocus()

defineProps({
  padded: {
    type: Boolean,
    default: true
  }
})

useHead({
  titleTemplate: `%s | ${docus.value.title}`,
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

useContentHead(docus.value)
</script>

<template>
  <div>
    <AppLoadingBar />
    <Navbar v-if="docus.header" />
    <slot />
    <AppFooter v-if="docus.footer" />
  </div>
</template>
