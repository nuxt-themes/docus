<script setup lang="ts">
const docus = useDocus()
const { navigation, page } = useContent()
const { navKeyFromPath } = useContentHelpers()

const headerPosition = computed(() => page.value?.header?.fixed || docus?.value?.header?.fixed || true)

const titleTemplate = computed(() => {
  const appTitleTemplate = docus?.value?.titleTemplate || `%s · ${docus?.value?.title}`
  if (page.value) {
    return page.value.head?.titleTemplate || navKeyFromPath(page.value._path, 'titleTemplate', navigation.value || []) || appTitleTemplate
  }
  return appTitleTemplate
})

// TODO: remove?
defineProps({
  padded: {
    type: Boolean,
    default: true
  }
})

useHead({
  titleTemplate: titleTemplate.value,
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

watch(titleTemplate, () => useHead({ titleTemplate: titleTemplate.value }))

useContentHead(docus.value as any)
</script>

<template>
  <div>
    <AppLoadingBar />
    <AppHeader v-if="docus?.header" :fixed="headerPosition" />
    <slot />
    <AppFooter v-if="docus?.footer" />
  </div>
</template>
