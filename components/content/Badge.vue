<script setup lang="ts">
defineProps({
  /**
   * @values info, success, warning, danger
   */
  type: {
    type: String,
    default: 'info',
    validator (value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary'].includes(value)
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
    px: '{space.3}',
    py: '{space.1}',
    fontSize: '{text.base.fontSize}',
    lineHeight: '{text.base.lineHeight}',
    letterSpacing: '{letterSpacings.tight}',
    borderRadius: '{radii.full}',
    border: '1px solid',

    '&.primary': {
      stateColors: 'primary'
    },
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
    }
  }
})
</style>
