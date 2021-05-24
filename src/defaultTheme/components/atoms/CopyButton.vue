<template>
  <button
    ref="copy"
    class="
      copy
      focus:outline-none
      absolute
      right-0
      bottom-0
      px-3
      py-1.5
      text-gray-600
      bg-gray-200
      text-xs
      leading-none
      rounded-tl rounded-br-md
      font-mono font-semibold
      dark:text-white
      dark:bg-gray-700
      dark:border-gray-600
      hover:bg-gray-300
      hover:border-gray-300
      hover:dark:bg-gray-600
      hover:dark:border-gray-500
    "
    :class="state"
  >
    <span v-if="state === 'copied'">Copied</span>
    <span v-else>Copy</span>
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
