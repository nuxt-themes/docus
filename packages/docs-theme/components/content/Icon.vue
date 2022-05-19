<script setup>
import { Icon as Iconify } from '@iconify/vue/dist/offline'
import { loadIcon } from '@iconify/vue'
import { useNuxtApp, ref, watch, computed } from '#imports'

const nuxtApp = useNuxtApp()
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
const component = computed(() => nuxtApp.vueApp.component(props.name))

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
  <Component v-if="component" :is="component" />
  <Iconify v-else-if="icon" :icon="icon" />
  <span v-else>{{ props.name }}</span>
</template>
