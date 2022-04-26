<script setup>
import { Icon } from '@iconify/vue/dist/offline'
import { loadIcon } from '@iconify/vue'
import { ref, watch } from '#imports'

const props = defineProps({
  name: {
    type: [String, Object],
    required: true,
  },
})

const icon = ref(null)

icon.value = await loadIcon(props.name)

watch(() => props.name, async() => {
  icon.value = await loadIcon(props.name)
})
</script>

<template>
  <Icon :icon="icon" />
</template>
