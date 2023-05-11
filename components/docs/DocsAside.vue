<script setup lang="ts">
const { tree } = useDocus()
</script>

<template>
  <nav>
    <DocsNavigation v-if="tree?.length > 0" :links="tree" />
    <NuxtLink v-else to="/" class="go-back-link">
      <Icon name="heroicons-outline:arrow-left" class="icon" />
      <span class="text">Go back</span>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="ts">
css({
  '.go-back-link': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '{text.sm.fontSize}',
    lineHeight: '{text.sm.lineHeight}',
    cursor: 'pointer',
    color: '{elements.text.secondary.color.static}',
    '&:hover': {
      color: '{elements.text.secondary.color.hover}'
    },
    '.icon': {
      width: '{space.4}',
      height: '{space.4}'
    },
    '.text': {
      marginInlineStart: '{space.2}'
    }
  }
})
</style>
