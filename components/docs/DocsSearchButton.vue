<script setup lang="ts">
import appConfig from '#build/app.config'

const { tokens } = appConfig
const { isMac } = useUserAgent()
</script>

<template>
  <button
    class="doc-search flex items-center"
    type="button"
    aria-label="Search"
    v-bind="$attrs"
    :class="[Object.values(tokens.docsSearchButton)]"
  >
    <Icon name="heroicons-outline:search" :class="[Object.values(tokens.docsSearchButton.icon)]"/>
    <span class="placeholder" :class="[Object.values(tokens.docsSearchButton.placeholder)]">Search</span>
    <span class="shortcuts" :class="[Object.values(tokens.docsSearchButton.shortcuts), Object.values(tokens.docsSearchButton.shortcuts.kbd)]">
      <ClientOnly>
        <kbd>{{ isMac ? '⌘' : 'Ctrl' }}</kbd>
        <kbd>K</kbd>
      </ClientOnly>
    </span>
  </button>
</template>
