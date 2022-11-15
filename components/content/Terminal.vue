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
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '{space.64}',
    cursor: 'pointer',
    overflow: 'hidden',
    border: '1px solid {docus.border.primary.default}',
    borderRadius: '{radii.lg}',
    background: '{colors.gray.900}',
    '.copied': {
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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '{colors.black}',
        opacity: '0.75'
      },
      '.content': {
        zIndex: 10,
        fontWeight: '{fontWeights.semibold}',
        color: '{colors.gray.100}',
        fontSize: '{fontSizes.lg}'
      }
    },
    '.header': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid {colors.gray.800}',
      width: '100%',
      height: '{space.12}',
      '.controls': {
        display: 'flex',
        marginLeft: '{space.4}',
        div: {
          '&:nth-child(1)': {
            width: '{space.3}',
            height: '{space.3}',
            borderRadius: '{radii.full}',
            background: '{colors.red.400}'
          },
          '&:nth-child(2)': {
            width: '{space.3}',
            height: '{space.3}',
            borderRadius: '{radii.full}',
            background: '{colors.yellow.400}',
            marginLeft: '{space.2}'
          },
          '&:nth-child(3)': {
            width: '{space.3}',
            height: '{space.3}',
            borderRadius: '{radii.full}',
            background: '{colors.green.400}',
            marginLeft: '{space.2}'
          },
        }
      },
      '.title': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '{fontWeights.semibold}',
        fontFamily: '{font.mono}'
      }
    },
    '.window': {
      display: 'flex',
      flex: '1 1 0%',
      padding: '{space.4}',
      fontFamily: '{font.mono}',
      '.sign': {
        marginRight: '{space.2}',
        display: 'inline-block',
        userSelect: 'none',
        fontWeight: '{fontWeights.bold}'
      },
      '.content': {
        display: 'inline-block',
        color: '{colors.gray.200}'
      }
    },
    '.prompt': {
      paddingTop: '{space.2}',
      paddingBottom: '{space.2}',
      fontWeight: '{fontWeights.semibold}',
      textAlign: 'center',
      opacity: 0,
    },
    '&:hover .prompt': {
      opacity: 1
    }
  }
})
</style>
