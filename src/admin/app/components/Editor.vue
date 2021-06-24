<template>
  <Monaco :value="raw" language="markdown" @change="update" />
</template>

<script setup lang="ts">
import type { PropType } from 'vue3'
import { ref, watch, defineProps } from 'vue3'
import type { File } from '../../type'
import { useApi } from '../plugins/api'
import Monaco from './Monaco.vue'

const props = defineProps({
  file: {
    type: Object as PropType<File>,
    required: true
  }
})

const api = useApi()
const raw = ref(props.file.raw)

// Sync local data when file changes
watch(
  () => props.file,
  newVal => {
    raw.value = newVal.raw
  }
)

function update(content) {
  api.put(`/content${props.file.path}`, {
    raw: content
  })
}
</script>
