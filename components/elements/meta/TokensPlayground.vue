<template>
  <div>
    <pre>{{ JSON.stringify(theme, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { usePinceauTheme } from 'pinceau/runtime'

const { theme } = usePinceauTheme()
</script>
