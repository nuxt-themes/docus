<script setup lang="ts">
defineProps({
  /**
   * @values info, success, warning, danger, primary, neutral
   */
  type: {
    type: String,
    default: 'info',
    validator (value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary', 'neutral'].includes(value)
    }
  }
})
</script>

<template>
  <span :class="[type]" class="badge">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </span>
</template>

<style scoped lang="ts">
css({
  '.badge': {
    display: 'inline-flex',
    alignItems: 'center',
    px: '{elements.badge.paddingX}', 
    py: '{elements.badge.paddingY}', 
    fontSize: '{elements.badge.fontSize}', 
    fontWeight: '{elements.badge.fontWeight}', 
    lineHeight: '{elements.badge.lineHeight}', 
    letterSpacing: '{elements.badge.letterSpacing}', 
    borderRadius: '{elements.badge.borderRadius}', 
    borderWidth: '{elements.badge.borderWidth}', 
    borderStyle: '{elements.badge.borderStyle}', 

    '&.info': {
      stateColors: 'info'
    },
    '&.success': {
      stateColors: 'success'
    },
    '&.warning': {
      stateColors: 'warning'
    },
    '&.danger': {
      stateColors: 'danger'
    },
    '&.primary': {
      stateColors: 'primary'
    },
    '&.neutral': {
      stateColors: 'neutral'
    }
  }
})
</style>
