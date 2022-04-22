<script setup lang="ts">
import Clipboard from 'clipboard'

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
    }, 2000)
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
      right-0
      bottom-0
      px-2
      py-2
      m-1
      text-warmgray-600 dark:text-warmgray-400
      bg-warmgray-200 dark:bg-warmgray-700
      text-xs
      leading-none
      rounded-lg
      font-mono font-semibold
    "
  >
    <!-- <UIcon v-if="state === 'copied'" name="fa-check" class="w-4 h-4" /> -->
    <!-- <UIcon v-else name="fa-copy" class="w-4 h-4" /> -->
  </button>
</template>
