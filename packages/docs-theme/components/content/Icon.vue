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

const nuxtApp = useNuxtApp()
const icon: Ref<IconifyIcon | null> = ref(null)
const component = computed(() => nuxtApp.vueApp.component(props.name))

icon.value = await loadIcon(props.name).catch((_) => null)

watch(
  () => props.name,
  async () => {
    icon.value = await loadIcon(props.name).catch((_) => null)
  },
)
</script>

<template>
  <Iconify v-if="icon" :icon="icon" />
  <Component :is="component" v-else-if="component" />
  <span v-else>{{ name }}</span>
</template>
