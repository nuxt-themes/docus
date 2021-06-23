<template>
  <textarea v-model="raw" class="w-full h-full font-mono px-4 py-2 outline-none text-sm" />
</template>

<script setup lang="ts">
import type { PropType } from 'vue3'
import { ref, watch, defineProps } from 'vue3'
import type { File } from '../../type'
import { useApi } from '../plugins/api'

const props = defineProps({
  file: {
    type: Object as PropType<File>,
    required: true
  }
})

const api = useApi()

// Local data
const raw = ref(props.file.raw)

// Sync local data when file changes
watch(
  () => props.file,
  newVal => {
    raw.value = newVal.raw
  }
)

// API update on change on data or content
watch([raw], () => {
  api.put(`/content${props.file.path}`, {
    raw: raw.value
  })
})
</script>

<style lang="postcss" scoped>
textarea {
  @apply whitespace-nowrap overflow-scroll;
}
</style>
