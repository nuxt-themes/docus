<script setup lang="ts">
import { useDocSearch, useTheme } from '#imports'

const theme = useTheme()

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
  </div>
</template>
