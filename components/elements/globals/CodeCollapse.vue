<script setup lang="ts">
const props = defineProps({
  height: {
    type: String,
    default: '220px'
  },
  open: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['update:open'])
const isOpen = ref(props.open)
const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)
}

</script>

<template>
  <div class="code-collapse" :style="{height: !isOpen ? height : 'auto'}">
    <slot />
    <div class="gradient-backdrop"></div>
    <button @click="toggle">{{ isOpen ? 'Collapse code' : 'Expand code' }}</button>
  </div>
</template>

<style scoped lang="ts">
css({
  '.code-collapse': {
    position: 'relative',
    overflow: 'hidden',
    margin: '{elements.codeCollapse.margin}', 
    borderRadius: '{elements.codeCollapse.borderRadius}', 
    borderWidth: '{elements.codeCollapse.borderWidth}', 
    borderStyle: '{elements.codeCollapse.borderStyle}', 
    borderColor: '{elements.codeCollapse.borderColor}', 
    button: {
      position: 'absolute',
      bottom: '{elements.codeCollapse.button.bottom}',  
      left: '{elements.codeCollapse.button.left}',  
      transform: '{elements.codeCollapse.button.transform}',  
      py: '{elements.codeCollapse.button.paddingY}', 
      px: '{elements.codeCollapse.button.paddingX}',  
      borderRadius: '{elements.codeCollapse.button.borderRadius}', 
      borderWidth: '{elements.codeCollapse.button.borderWidth}', 
      borderStyle: '{elements.codeCollapse.button.borderStyle}', 
      borderColor: '{elements.codeCollapse.button.borderColor}',  
      backgroundColor: '{elements.codeCollapse.button.backgroundColor}', 
      fontSize: '{elements.codeCollapse.button.fontSize}', 
      lineHeight: '{elements.codeCollapse.button.lineHeight}', 
      color: '{elements.codeCollapse.button.color}',  
    },
    '.gradient-backdrop': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0,
      pointerEvents: 'none',
      height: '{elements.codeCollapse.gradientBackdrop.height}', 
      background: '{elements.codeCollapse.gradientBackdrop.background}',  
    },
    ':deep(.prose-code)': {
      margin: '0px',
      border: 'none'
    }
  },
})
</style>