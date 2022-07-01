<script setup lang="ts">
import type { Ref } from 'vue'
import type { IconifyIcon } from '@iconify/vue'
import { computed, ref, watch } from 'vue'
import { Icon as Iconify } from '@iconify/vue/dist/offline'
import { loadIcon } from '@iconify/vue'
import { useNuxtApp } from '#imports'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const state = useState('docus-icons-state', () => ({}))

const nuxtApp = useNuxtApp()
const icon = computed<IconifyIcon | null>(() => {
  return state.value?.[props.name]
})
const component = computed(() => nuxtApp.vueApp.component(props.name))

const refreshComponent = async () => {
  if (!state.value?.[props.name]) {
    state.value[props.name] = await loadIcon(props.name).catch(() => {})
  }
}

await refreshComponent()

watch(() => props.name, refreshComponent)
</script>

<template>
  <Iconify v-if="icon" :icon="icon" />
  <Component :is="component" v-else-if="component" />
  <span v-else>{{ name }}</span>
</template>
