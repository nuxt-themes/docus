<script setup>
import { Icon as Iconify } from '@iconify/vue/dist/offline'
import { loadIcon } from '@iconify/vue'
import { ref, watch } from '#imports'

const props = defineProps({
  name: {
    type: [String, Object],
    required: false,
  },
  icon: {
    type: Object,
    required: false,
  },
})

const icon = ref(props.icon || null)

if (!props.icon) {
  icon.value = await loadIcon(props.name).catch(e => null)

  watch(
    () => props.name,
    async () => {
      icon.value = await loadIcon(props.name).catch(e => null)
    },
  )
}
</script>

<template>
  <Iconify v-if="icon" :icon="icon" />
  <span v-else>{{ props.name }}</span>
</template>
