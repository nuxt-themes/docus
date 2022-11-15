<script setup lang="ts">
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
    default: '10'
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
    left: (props) => props.left,
    right: (props) => props.right,
    zIndex: (props) => props.zIndex,
    width: (props) => props.width,
    height: (props) => props.height,
    filter: (props) => `blur(${props.blur})`,
    '.ellipsis-item': {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(97.62deg, rgba(0, 71, 225, 0.22) 2.27%, rgba(26, 214, 255, 0.22) 50.88%, rgba(0, 220, 130, 0.22) 98.48%)',
    }
  }
})
</style>
