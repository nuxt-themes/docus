<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const { copy: copyToClipboard } = useClipboard()

const state = ref('init')

const copy = (e: MouseEvent) => {
  copyToClipboard(props.content)
    .then(() => {
      state.value = 'copied'

      setTimeout(() => {
        state.value = 'init'
      }, 1000)
    })
    .catch(() => {
      console.warn("Couldn't copy to clipboard!")
    })
}
</script>

<template>
  <div class="terminal" @click="copy">
    <div v-if="state === 'copied'" class="copied">
      <div class="scrim" />
      <div class="content">
        Copied!
      </div>
    </div>
    <div class="header">
      <div class="controls">
        <div />
        <div />
        <div />
      </div>
      <div class="title">
        Bash
      </div>
    </div>
    <div class="window">
      <span class="sign">$</span>
      <span class="content">{{ content }}</span>
    </div>
    <div v-if="state !== 'copied'" class="prompt">
      Click to copy
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.terminal': {
    // group relative flex h-64 w-full cursor-pointer flex-col overflow-hidden rounded-lg bg-gray-900
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '{space.64}',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '{radii.lg}',
    background: '{colors.gray.900}',
    '.copied': {
      // absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '.scrim': {
        // absolute top-0 left-0 h-full w-full bg-black opacity-75
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '{colors.black}',
        opacity: '0.75'
      },
      '.content': {
        // z-10 text-lg font-semibold text-gray-100
        zIndex: 10,
        fontWeight: '{fontWeights.semibold}',
        color: '{colors.gray.100}',
        fontSize: '{fontSizes.lg}'
      }
    },
    '.header': {
      // relative flex h-12 w-full items-center border-b-2 border-gray-800
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid {colors.gray.800}',
      width: '100%',
      height: '{space.12}',
      '.controls': {
        // ml-4 flex
        display: 'flex',
        marginLeft: '{space.4}',
        '&:nth-child(1)': {
          width: '{space.3}',
          height: '{space.3}',
          borderRadius: '{radii.full}',
          background: '{colors.red.400}'
        },
        '&:nth-child(2)': {
          // ml-2 h-3 w-3 rounded-full bg-yellow-400
          width: '{space.3}',
          height: '{space.3}',
          borderRadius: '{radii.full}',
          background: '{colors.yellow.400}'
        },
        '&:nth-child(3)': {
          // ml-2 h-3 w-3 rounded-full bg-green-400
          width: '{space.3}',
          height: '{space.3}',
          borderRadius: '{radii.full}',
          background: '{colors.green.400}'
        },
      },
      '.title': {
        // absolute top-0 left-0 flex h-full w-full items-center justify-center font-semibold
      }
    },
    '.window': {
      // flex flex-1 p-4 font-mono
      '.sign': {
        // mr-2 inline-block select-none font-bold
      },
      '.content': {
        // inline-block text-gray-200
      }
    },
    '.prompt': {
      // py-2 text-center font-semibold opacity-0 transition-opacity group-hover:opacity-100
    }
  }
})
</style>