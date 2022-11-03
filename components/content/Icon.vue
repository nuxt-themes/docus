<script setup lang="ts">
import { computedStyle } from 'pinceau/runtime'
import type { IconifyIcon } from '@iconify/vue'
import { computed, ref, watch } from 'vue'
import { Icon as Iconify } from '@iconify/vue/dist/offline'
import { loadIcon } from '@iconify/vue'

const props = defineProps({
  size: computedStyle('gap', '5', false),
  name: {
    type: String,
    required: true
  }
})

const nuxtApp = useNuxtApp()
const state = useState('docus-icons', () => ({}))
const isFetching = ref(false)
const icon = computed<IconifyIcon | null>(() => state.value?.[props.name])
const component = computed(() => nuxtApp.vueApp.component(props.name))

const loadIconComponent = async () => {
  if (component.value) { return }

  if (!state.value?.[props.name]) {
    isFetching.value = true
    state.value[props.name] = await loadIcon(props.name).catch(() => null)
    isFetching.value = false
  }
}

watch(() => props.name, loadIconComponent)

!component.value && (await loadIconComponent())
</script>

<template>
  <span v-if="isFetching" :class="$pinceau" />
  <Iconify v-else-if="icon" :class="$pinceau" :icon="icon" />
  <Component :is="component" :class="$pinceau" v-else-if="component" />
  <span :class="$pinceau" v-else>{{ name }}</span>
</template>

<style scoped lang="ts">
css({
  svg: {
    width: (props, utils) => utils.isToken(props.size) ? props.size : `{space.${props.size}}`,
    height: (props, utils) => utils.isToken(props.size) ? props.size : `{space.${props.size}}`,
  }
})
</style>
