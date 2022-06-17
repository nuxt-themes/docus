<script setup lang="ts">
import { useDocus } from '#imports'

const config = useRuntimeConfig()

const { theme } = useDocus()

const { hasDocSearch } = useDocSearch()
</script>

<template>
  <div>
    <template v-if="theme?.debug">
      <component is="debug" :config="theme?.debug" />
    </template>

    <Navbar />

    <slot />

    <Footer />

    <div v-if="hasDocSearch" id="docsearch-container" style="width: 0; height: 0; display: none" />
  </div>
</template>
