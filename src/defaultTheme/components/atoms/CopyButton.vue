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
      text-gray-600
      bg-gray-100
      text-xs
      leading-none
      rounded-lg
      font-mono font-semibold
      dark:text-gray-400 dark:bg-gray-800
      hover:bg-gray-200 hover:dark:bg-gray-700
    "
    :class="{
      'bg-gray-200 dark:bg-gray-700 opacity-100': state === 'copied'
    }"
  >
    <IconCheck v-if="state === 'copied'" class="w-4 h-4" />
    <IconCopy v-else class="w-4 h-4" />
  </button>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import Clipboard from 'clipboard'

export default defineComponent({
  setup() {
    const copy = ref()
    const state = ref('init')

    onMounted(() => {
      const copyCode = new Clipboard(copy.value, {
        target(trigger) {
          return trigger.previousElementSibling
        }
      })

      copyCode.on('success', event => {
        event.clearSelection()

        state.value = 'copied'

        window.setTimeout(() => {
          state.value = 'init'
        }, 2000)
      })
    })

    return {
      state,
      copy
    }
  }
})
</script>
