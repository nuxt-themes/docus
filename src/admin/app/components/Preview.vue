<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue3'
import { fetchPreviewOrigin, previewOrigin, previewUrl, previewPath } from '../composables/preview'

const iframe = ref<HTMLIFrameElement>()

onBeforeMount(() => fetchPreviewOrigin())

watch(
  [previewUrl, iframe],
  () => {
    if (!iframe.value) return
    try {
      iframe.value.contentWindow.$nuxt.$router.push(previewPath.value)
    } catch (e) {
      // fallback to hard refresh when working with cross-origin
      iframe.value.src = previewUrl.value
    }
  },
  { flush: 'post' }
)

function refresh() {
  iframe.value.src += ''
}
</script>

<template>
  <div class="h-full flex-1 grid grid-rows-[min-content,1fr]">
    <div class="p-2 flex d-border-primary border-b">
      <div class="flex-auto my-auto px-2">{{ previewUrl }}</div>
      <button class="border d-border-primary rounded px-2 py-1" @click="refresh">Refresh</button>
    </div>
    <iframe ref="iframe" :src="previewOrigin" class="w-full h-full" />
  </div>
</template>
