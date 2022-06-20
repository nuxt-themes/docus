<script setup lang="ts">
import { useDocSearch, useDocus } from '#imports'

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
  </div>
</template>
