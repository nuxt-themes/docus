<template>
  <iframe :src="src" class="w-full" />
</template>

<script setup lang="ts">
const props = defineProps({
  token: {
    type: String,
    required: true
  }
})
const src = computed(() => `https://volta.net/embed/${props.token}`)
</script>

<style lang="ts">
css({
  iframe: {
    width: '{size.full}',
    minHeight: 'calc(100vh/1.5)',
    borderRadius: '{radii.md}',
    stateColors: 'primary'
  }
})
</style>
