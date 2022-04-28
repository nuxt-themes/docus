<script setup lang="ts">
import Clipboard from 'clipboard'
import { onMounted, ref } from '#imports'

const copy = ref()
const state = ref('init')

onMounted(() => {
  const copyCode = new Clipboard(copy.value, {
    target(trigger) {
      return trigger.previousElementSibling
    },
  })

  copyCode.on('success', (event) => {
    event.clearSelection()
    state.value = 'copied'
    window.setTimeout(() => {
      state.value = 'init'
    }, 1000)
  })
})
</script>

<template>
  <button
    ref="copy"
    class="
      copy
      focus:outline-none
      absolute
      right-1
      bottom-1
      px-2
      py-2
      m-1
      text-gray-400
      bg-gray-900
      text-xs
      leading-none
      rounded-lg
      font-mono
      font-semibold
    "
  >
    <Icon v-if="state === 'copied'" name="fa-check" class="w-4 h-4" />
    <Icon v-else name="fa-copy" class="w-4 h-4" />
  </button>
</template>
