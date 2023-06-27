<script setup lang="ts">
const { isMac } = useUserAgent()
</script>

<template>
  <button
    class="doc-search"
    type="button"
    aria-label="Search"
    v-bind="$attrs"
  >
    <Icon name="heroicons-outline:search" />
    <span class="placeholder">Search</span>
    <span class="shortcuts">
      <ClientOnly>
        <kbd>{{ isMac ? '⌘' : 'Ctrl' }}</kbd>
        <kbd>K</kbd>
      </ClientOnly>
    </span>
  </button>
</template>

<style scoped lang="ts">
css({
  '.doc-search': {
    borderRadius: '{docus.docs.search.input.borderRadius}',
    display: 'flex',
    alignItems: 'center',
    color: '{elements.text.secondary.color.static}',
    boxShadow: '{elements.buttonLink.boxShadow}',
    fontSize: '{docus.docs.search.input.fontSize}',
    gap: '{docus.docs.search.input.gap}',
    padding: '{docus.docs.search.input.padding}',
    backgroundColor: '{docus.docs.search.input.backgroundColor}',
    borderWidth: '{docus.docs.search.input.borderWidth}',
    borderStyle: '{docus.docs.search.input.borderStyle}',
    borderColor: '{docus.docs.search.input.borderColor}',
    '&:hover': {
      color: '{elements.text.secondary.color.hover}',
    },
    '@lg': {
      width: '100%',
    },
    '.placeholder': {
      display: 'none',
      '@lg': {
        display: 'block',
      }
    },
    '.shortcuts': {
      display: 'none',
      marginLeft: 'auto',
      kbd: {
        fontFamily: '{docus.body.fontFamily}',
      },
      '@xs': {
        display: 'block',
      }
    },
  }
})
</style>
