<script setup lang="ts">
import { ref, useClipboard } from '#imports'

const { copy: copyToClipboard } = useClipboard()

const state = ref('init')

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})

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
  <button
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
    @click="copy"
  >
    <Icon v-if="state === 'copied'" name="fa-check" class="w-4 h-4" />
    <Icon v-else name="fa-copy" class="w-4 h-4" />
  </button>
</template>
