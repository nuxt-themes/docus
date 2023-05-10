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
      console.warn("Couldn't copy to clipboard!")
    })
}
</script>

<template>
  <div class="terminal" @click="copy">
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
      <div v-if="state === 'copied'" class="copied">
        <div class="content">
          Copied!
        </div>
      </div>
      <span v-for="line in lines" :key="line" class="line" :style="{filter: state === 'copied' ? 'blur(14px)' : 'blur(0px)'}">
        <span class="sign">></span>
        <span class="content">{{ line }}</span>
      </span>

      <div v-if="state !== 'copied'" class="prompt">
        Click to copy
      </div>
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
    maxWidth: '{elements.terminal.maxWidth}', 
    height: '{elements.terminal.height}', 
    mx: 'auto',
    cursor: 'pointer',
    overflow: 'hidden',
    borderWidth: '{elements.terminal.borderWidth}', 
    borderStyle: '{elements.terminal.borderStyle}', 
    borderColor: '{elements.terminal.borderColor}',  
    borderRadius: '{elements.terminal.borderRadius}', 
    backgroundColor: '{elements.terminal.backgroundColor}',
    boxShadow: '{elements.terminal.boxShadow}',
    backdropFilter: '{elements.terminal.backdropFilter}',
    '.copied': {
      position: 'absolute',
      top: '0',
      insetInlineStart: '1px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '.content': {
        color: '{elements.terminal.copied.color}',
        fontWeight: '{fontWeight.normal}',
        fontSize: '{text.base.fontSize}',
      }
    },
    '.header': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderBottomWidth: '{elements.terminal.header.borderBottomWidth}', 
      borderBottomStyle: '{elements.terminal.header.borderBottomStyle}', 
      borderBottomColor: '{elements.terminal.header.borderBottomColor}',  
      width: '100%',
      height: '{elements.terminal.header.height}',
      boxShadow: '{elements.terminal.header.boxShadow}',
      '.controls': {
        display: 'flex',
        marginInlineStart: '{space.4}',
        div: {
          '&:nth-child(1)': {
            width: '{space.3}',
            height: '{space.3}',
            borderRadius: '{radii.full}',
            background: '{color.red.500}'
          },
          '&:nth-child(2)': {
            width: '{space.3}',
            height: '{space.3}',
            borderRadius: '{radii.full}',
            background: '{color.yellow.500}',
            marginInlineStart: '{space.2}'
          },
          '&:nth-child(3)': {
            width: '{space.3}',
            height: '{space.3}',
            borderRadius: '{radii.full}',
            background: '{color.green.500}',
            marginInlineStart: '{space.2}'
          },
        }
      },
      '.title': {
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '{fontWeight.normal}',
        fontSize: '{text.sm.fontSize}',
        fontFamily: '{font.mono}'
      }
    },
    '.window': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 0%',
      padding: '{space.4}',
      fontFamily: '{elements.terminal.window.fontFamily}',  
      fontSize: '{elements.terminal.window.fontSize}',
      mixBlendMode: '{elements.terminal.window.mixBlendMode}',
      '.line': {
        display: 'flex',
        marginBottom: '{space.1}',
      },
      '.sign': {
        marginInlineEnd: '{space.2}',
        display: 'inline-block',
        userSelect: 'none',
        fontWeight: '{fontWeight.bold}',
        color: '{elements.terminal.window.sign.color}',
      },
      '.content': {
        display: 'inline-block',
      }
    },
    '.prompt': {
      position: 'absolute',
      bottom: '0px',
      insetInlineStart: '50%',
      paddingTop: '{space.2}',
      paddingBottom: '{space.2}',
      fontWeight: '{fontWeight.normal}',
      fontSize: '{text.xs.fontSize}',
      textAlign: 'center',
      opacity: 0,
      fontFamily: '{font.mono}',
      transform: 'translateX(-50%)',
    },
    '&:hover .prompt': {
      opacity: 1
    }
  }
})
</style>
