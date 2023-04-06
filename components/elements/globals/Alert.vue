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
    default: 'info',
    validator (value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary', 'neutral'].includes(value)
    }
  },
  closable: {
    type: Boolean,
    default: false
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

const emit = defineEmits(['close'])

const iconName = computed(() => {
  if (props.icon === false) return ''
  if (props.icon === true) {
    return (iconTypeMap as any)[props.type]
  }
  return props.icon
})
</script>

<template>
  <div class="alert" :class="[type]">
    <div class="alert-content-wrapper">
      <Icon v-if="icon" :name="iconName" class="alert-icon" />
      <span class="content">
        <ContentSlot :use="$slots.default" unwrap="p" />
      </span>
    </div>
    <button v-if="closable" @click="emit('close')">
      <Icon name="tabler:x" />
    </button>
  </div>
</template>

<style scoped lang="ts">
css({
  '.alert': {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '{elements.alert.width}',
    px: '{elements.alert.paddingX}', 
    py: '{elements.alert.paddingY}', 
    borderWidth: '{elements.alert.borderWidth}', 
    borderStyle: '{elements.alert.borderStyle}', 
    borderRadius: '{elements.alert.borderRadius}',
    '.alert-content-wrapper': {
      display: 'flex',
      '.alert-icon': {
        width: '{elements.alert.icon.width}', 
        height: '{elements.alert.icon.height}', 
        marginInlineEnd: '{elements.alert.icon.marginInlineEnd}', 
        flexShrink: 0,
      },
      // Support emoji as an icon
      'span.alert-icon': {
        lineHeight: 'inherit !important',
        width: '{elements.alert.icon.width} !important', 
        height: '{elements.alert.icon.height} !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    },
    button: {
      display: 'flex',
      padding: '{elements.alert.closeButton.padding}', 
      marginInlineStart: '{elements.alert.closeButton.marginInlineStart}', 
      flexShrink: 0,
      borderRadius: '{elements.alert.closeButton.border.radius}', 
      // TODO: issue with providing user customisation
      backgroundColor: (props) => `{elements.state.${props.type}.backgroundColor.secondary}`,
      svg: {
        width: '{elements.alert.closeButton.icon.width}', 
        height: '{elements.alert.closeButton.icon.height}' 
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '{elements.alert.closeButton.boxShadow.focus}' 
      },
    },
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
    },
    '&.neutral': {
      stateColors: 'neutral'
    }
  }
})
</style>
