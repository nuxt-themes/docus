<script setup lang="ts">
import { ref } from '#imports'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const { copy: copyToClipboard } = useClipboard()

const state = ref('init')

const copy = (e: MouseEvent) => {
  copyToClipboard(props.content)
    .then(
      () => {
        state.value = 'copied'

        setTimeout(() => {
          state.value = 'init'
        }, 1000)
      },
    ).catch(
      () => {
        console.warn('Couldn\'t copy to clipboard!')
      },
    )
}
</script>

<template>
  <div
    class="relative flex flex-col w-full h-64 overflow-hidden text-gray-600 bg-gray-800 rounded-lg cursor-pointer group"
    @click="copy"
  >
    <div v-if="state === 'copied'" class="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full">
      <div class="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-75" />
      <div class="z-10 text-lg text-gray-100 font-semibold">
        Copied!
      </div>
    </div>
    <div class="relative flex items-center w-full h-12 border-b-2 border-gray-700">
      <div class="flex ml-4">
        <div class="w-3 h-3 bg-red-400 rounded-full" />
        <div class="w-3 h-3 ml-2 bg-yellow-400 rounded-full" />
        <div class="w-3 h-3 ml-2 bg-green-400 rounded-full" />
      </div>
      <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full font-semibold">
        Bash
      </div>
    </div>
    <div class="flex flex-1 p-4 font-mono">
      <span class="inline-block mr-2 font-bold select-none">$</span>
      <span class="inline-block text-gray-200">{{ content }}</span>
    </div>
    <div v-if="state !== 'copied'" class="py-2 text-center transition-opacity opacity-0 group-hover:opacity-100 font-semibold">
      Click to copy
    </div>
  </div>
</template>
