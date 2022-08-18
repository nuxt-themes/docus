<script setup lang="ts">
const theme = useTheme()

defineProps({
  padded: {
    type: Boolean,
    default: true
  }
})

useHead({
  titleTemplate: `%s | ${theme.value.title}`,
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

useContentHead(theme.value)
</script>

<template>
  <div>
    <AppLoadingBar />
    <Navbar v-if="theme.header" />
    <slot />
    <AppFooter v-if="theme.footer" />
  </div>
</template>
