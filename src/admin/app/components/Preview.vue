<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue3'
import { fetchPreviewOrigin, previewUrl, previewPath, previewOrigin } from '../composables/preview'

const iframe = ref<HTMLIFrameElement>()
const url = ref(previewUrl.value)

onBeforeMount(() => fetchPreviewOrigin())

watch(
  [previewUrl, iframe],
  () => {
    url.value = previewUrl.value
    updateIframe(previewUrl.value)
  },
  { flush: 'post' }
)

function updateIframe(url: string) {
  if (!iframe.value) return
  if (!url.startsWith(previewOrigin.value)) return updateIframeHard(url)

  try {
    iframe.value.contentWindow.$nuxt.$router.push(previewPath.value)
  } catch (e) {
    // fallback to hard refresh when working with cross-origin
    updateIframeHard(url)
  }
}

function updateIframeHard(url: string) {
  if (iframe.value) iframe.value.src = url
}

function refresh() {
  iframe.value.src += ''
}

function onUrlInput() {
  if (url.value === previewUrl.value) return

  updateIframe(url.value)
}
</script>

<template>
  <div class="h-full flex-1 grid grid-rows-[min-content,1fr]">
    <div class="p-2 flex d-border-primary border-b gap-2">
      <button class="px-1 opacity-50 hover:opacity-100" @click="refresh">
        <heroicons-outline:refresh />
      </button>
      <input
        v-model="url"
        class="flex-auto my-auto px-2 bg-gray-400 bg-opacity-10 rounded px-2 py-1"
        @keydown.enter="onUrlInput"
      />
      <a :href="url" target="_blank" class="px-1 opacity-50 hover:opacity-100 block flex">
        <heroicons-outline:external-link class="m-auto" />
      </a>
    </div>
    <iframe ref="iframe" :src="previewOrigin" class="w-full h-full" />
  </div>
</template>
