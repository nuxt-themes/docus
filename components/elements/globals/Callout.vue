<script setup lang="ts">
const iconTypeMap = {
  primary: 'tabler:info-square-rounded-filled',
  info: 'tabler:info-square-rounded-filled',
  success: 'tabler:square-rounded-check-filled',
  warning: 'tabler:alert-triangle-filled',
  danger: 'tabler:alert-circle-filled',
  neutral: 'tabler:info-square-rounded-filled'
}

const props = defineProps({
  /**
   * @values info, success, warning, danger, primary, neutral
   */
  type: {
    type: String,
    default: 'neutral',
    validator (value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary', 'neutral'].includes(value)
    }
  },
  /**
   * if false, no icon will be shown
   * if true, the default icons will be shown
   * if string, the custom icon will be shown
   */
  icon: {
    type: [String, Boolean],
    default: false
  }
})

const iconName = computed(() => {
  if (props.icon === false) return ''
  if (props.icon === true) {
    return (iconTypeMap as any)[props.type]
  }
  return props.icon
})

</script>

<template>
  <div class="callout" :class="[type]">
    <Icon v-if="icon" :name="iconName" class="callout-icon" />
    <div class="callout-content-wrapper content">
      <div v-if="$slots.title" class="callout-title">
        <h5>
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h5>
      </div>
      <div>
        <ContentSlot :use="$slots.content" unwrap="p">
          <ContentSlot :use="$slots.default" unwrap="p" />
        </ContentSlot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="ts">
css({
  '.callout': {
    px: '{elements.callout.paddingX}', 
    py: '{elements.callout.paddingY}', 
    borderWidth: '{elements.callout.borderWidth}', 
    borderStyle: '{elements.callout.borderStyle}', 
    borderRadius: '{elements.callout.borderRadius}', 
    display: 'flex',
    width: '{elements.callout.width}',
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
    },
    '.callout-icon': {
      width: '{elements.callout.icon.width}', 
      height: '{elements.callout.icon.height}', 
      marginInlineEnd: '{elements.callout.icon.marginInlineEnd}', 
      flexShrink: 0,
    },
    // Support emoji as an icon
    'span.callout-icon': {
      fontSize: '{elements.callout.icon.fontSize} !important', 
      lineHeight: '{elements.callout.icon.lineHeight} !important', 
      width: '{elements.callout.icon.width} !important', 
      height: '{elements.callout.icon.height} !important', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '.callout-content-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '.callout-title': {
      fontSize: '{elements.callout.title.fontSize}', 
      lineHeight: '{elements.callout.title.lineHeight}', 
      fontWeight: '{elements.callout.title.fontWeight}', 
      marginBottom: '{elements.callout.title.marginBottom}', 
    },
  }
})
</style>
