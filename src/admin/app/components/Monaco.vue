<script setup lang="ts">
import { defineProps, defineEmit, ref, watch } from 'vue3'
import { useMonaco } from '../composables/monaco'

const emit = defineEmit<(e: 'change', content: string) => void>()
const props = defineProps<{ language: string; value: string }>()
const target = ref()

const { setContent } = useMonaco(target, {
  language: props.language,
  code: props.value,
  onChanged(content: string) {
    emit('change', content)
  }
})
watch(
  () => props.value,
  () => setContent(props.value)
)
emit('change', props.value)
</script>

<template>
  <div ref="target" class="h-full w-full"></div>
</template>
