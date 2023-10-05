<script setup lang="ts">
import { PropType } from 'vue'
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  content: {
    type: [Array, String] as PropType<string[] | string>,
    required: true
  }
})

const { copy: copyToClipboard } = useClipboard()

const state = ref('init')

const lines = computed(() => {
  if (typeof props.content === 'string') { return [props.content] }
  return props.content
})

const copy = (e: MouseEvent) => {
  copyToClipboard(lines.value.join(' &&\n'))
    .then(() => {
      state.value = 'copied'

      setTimeout(() => {
        state.value = 'init'
      }, 1000)
    })
    .catch(() => {
      console.warn('Couldn\'t copy to clipboard!')
    })
}
</script>

<template>
  <div
    class="terminal relative flex flex-col w-full mx-auto cursor-pointer overflow-hidden max-w-[512px] h-[256px] border-0 border-solid border-primary-static rounded-xs bg-gray-200 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 shadow-terminal backdrop-blur-[3px]"
    @click="copy"
  >
    <div
      class="header relative flex items-center w-full h-12 border-0 border-solid border-primary-static shadow-[inset_0_-1px_0px_0px_rgb(var(--color-gray-500)/0.3)]"
    >
      <div class="controls flex ms-4">
        <div class="w-3 h-3 rounded-full bg-red-500" />
        <div class="w-3 h-3 rounded-full bg-yellow-500 ms-2" />
        <div class="w-3 h-3 rounded-full bg-green-500 ms-2" />
      </div>
      <div class="title absolute top-0 start-0 w-full h-full flex items-center justify-center font-normal text-sm font-mono">
        Bash
      </div>
    </div>
    <div class="window group relative flex flex-col flex-1 p-4 font-mono text-sm mix-blend-normal dark:mix-blend-difference">
      <div
        v-if="state === 'copied'"
        class="copied absolute top-0 start-[1px] w-full h-full flex items-center justify-center"
      >
        <div class="content text-gray-900 dark:text-gray-100 font-normal text-base">
          Copied!
        </div>
      </div>
      <span
        v-for="line in lines"
        :key="line"
        class="line flex mb-1"
        :style="{filter: state === 'copied' ? 'blur(14px)' : 'blur(0px)'}"
      >
        <span class="sign me-2 inline-block select-none text-gray-500 dark:text-gray-600">></span>
        <span class="command inline-block">{{ line }}</span>
      </span>
      <div
        v-if="state !== 'copied'"
        class="prompt absolute bottom-0 start-1/2 py-2 font-normal text-xs text-center font-mono transform -translate-x-1/2 opacity-0 group-hover:opacity-100"
      >
        Click to copy
      </div>
    </div>
  </div>
</template>
