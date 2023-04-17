<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  width: {
    type: String,
    default: '10rem'
  },
  height: {
    type: String,
    default: '10rem'
  },
  zIndex: {
    type: String,
    default: '0'
  },
  top: {
    type: String,
    default: '0'
  },
  left: {
    type: String,
    default: 'auto'
  },
  right: {
    type: String,
    default: 'auto'
  },
  blur: {
    type: String,
    default: '50px'
  },
  colors: {
    type: Array as PropType<string[]>,
    default: () => ['rgba(0, 71, 225, 0.22)', 'rgba(26, 214, 255, 0.22)', 'rgba(0, 220, 130, 0.22)']
  }
})
</script>

<template>
  <div class="ellipsis">
    <div class="ellipsis-item" />
  </div>
</template>

<style scoped lang="ts">
css({
  '.ellipsis': {
    pointerEvents: 'none',
    position: 'absolute',
    top: (props) => props.top,
    insetInlineStart: (props) => props.left,
    insetInlineEnd: (props) => props.right,
    zIndex: (props) => props.zIndex,
    width: '-webkit-fill-available',
    maxWidth: (props) => props.width,
    height: (props) => props.height,
    filter: (props) => `blur(${props.blur})`,
    '.ellipsis-item': {
      width: '100%',
      height: '100%',
      background: (props) => `linear-gradient(97.62deg, ${props?.colors?.[0]} 2.27%, ${props?.colors?.[1]} 50.88%, ${props?.colors?.[2]} 98.48%)`,
    }
  }
})
</style>
