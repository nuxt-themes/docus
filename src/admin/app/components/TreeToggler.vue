<script setup lang="ts">
import { defineProps, computed } from 'vue3'

const props = defineProps({
  file: {
    type: Object,
    required: true
  }
})

const isDir = computed(() => props.file.type === 'directory')
</script>

<template>
  <heroicons-outline:chevron-right
    v-if="isDir"
    class="transform transition opacity-50 w-4 min-w-4"
    :class="file.isOpen ? 'rotate-90' : 'rotate-0'"
  />
  <span v-else class="w-4 min-w-4" />
</template>
