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
  open: {
    type: Boolean,
    default: false
  },
  /**
   * @values info, success, warning, danger, primary, neutral
   */
   type: {
    type: String,
    default: 'primary',
    validator (value: string) {
      return ['info', 'success', 'warning', 'danger', 'neutral', 'primary'].includes(value)
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

const emit = defineEmits(['update:open'])
const isOpen = ref(props.open)
const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)
}

const iconName = computed(() => {
  if (props.icon === false) return ''
  if (props.icon === true) {
    return (iconTypeMap as any)[props.type]
  }
  return props.icon
})
</script>

<template>
  <div class="disclosure" :class="[type]">
    <button @click="toggle" :aria-expanded="isOpen" type="button" class="summary">
      <Icon v-if="icon" :name="iconName" class="disclosure-icon" />
      <span class="summary-content">
        <ContentSlot :use="$slots.summary" unwrap="p" />
      </span>
      <span class="chevron-wrapper">
        <Icon name="tabler:chevron-down" />
      </span>
    </button>

    <div v-show="isOpen" class="content">
      <ContentSlot :use="$slots.content" />
    </div>
  </div>
</template>


<style lang="ts" scoped>
css({
  '.disclosure': {
    display: 'block',
    width: '{elements.disclosure.width}',
    borderWidth: '{elements.disclosure.borderWidth}', 
    borderStyle: '{elements.disclosure.borderStyle}', 
    borderRadius: '{elements.disclosure.borderRadius}', 
    '.summary': {
      position: 'relative',
      display: 'flex',
      textAlign: 'start',
      width: '{elements.disclosure.width}',
      padding: '{elements.disclosure.summary.padding}',  
      borderRadius: '{elements.disclosure.summary.borderRadius}', 
      '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
      '&:focus': {
        outline: '{elements.disclosure.summary.outline.focus}', 
        // Weird bug if use boxShadow with different border radiuses
        // boxShadow: '0 0 0 2px',
      },
      '.disclosure-icon': {
        width: '{elements.disclosure.summary.icon.width}', 
        height: '{elements.disclosure.summary.icon.height}',  
        marginInlineEnd: '{elements.disclosure.summary.icon.marginInlineEnd}', 
        flexShrink: 0,
      },
      // Support emoji as an icon
      'span.disclosure-icon': {
        lineHeight: 'inherit !important',
        width: '{elements.disclosure.summary.icon.width} !important',  
        height: '{elements.disclosure.summary.icon.height} !important', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '.chevron-wrapper': {
        display: 'inline-flex',
        marginInlineStart: 'auto',
        borderRadius: '{elements.disclosure.summary.chevron.borderRadius}', 
        padding: '{elements.disclosure.summary.chevron.padding}', 
      },
      '&[aria-expanded="true"]': {
        borderBottomLeftRadius: '{elements.disclosure.opened.summary.borderBottomLeftRadius}',  
        borderBottomRightRadius: '{elements.disclosure.opened.summary.borderBottomRightRadius}', 
        borderTopLeftRadius: '{elements.disclosure.opened.summary.borderTopLeftRadius}',  
        borderTopRightRadius: '{elements.disclosure.opened.summary.borderTopRightRadius}', 
        '.chevron-wrapper svg': {
          transform: '{elements.disclosure.opened.summary.chevron.transform}' 
        }
      },
      '.chevron-wrapper svg': {
        width: '{elements.disclosure.summary.chevron.width}', 
        height: '{elements.disclosure.summary.chevron.height}',  
        transition: '{elements.disclosure.summary.chevron.transition}',  
        transform: '{elements.disclosure.summary.chevron.transform}',  
      }
    },
    '.content': {
      padding: '{elements.disclosure.content.padding}',  
      '& :first-child': {
        marginTop: '{elements.disclosure.content.firstChild.marginTop}'  
      },
      '& :last-child': {
        marginBottom: '{elements.disclosure.content.lastChild.marginBottom}' 
      },
      '& > :deep(*)': {
        my: '{elements.disclosure.content.verticalMargin}', 
      }
    },
    '&.info, &.success, &.warning, &.danger, &.primary, &.neutral': {
      borderColor: () => `{elements.state.${props.type}.borderColor.primary}`,
      button: {
        backgroundColor: () => `{elements.state.${props.type}.backgroundColor.secondary}`,
        color: () => `{elements.state.${props.type}.color.primary}`,
        '.summary-content': {
          color: () => `{elements.state.${props.type}.color.tertiary}`,
        },
        '.chevron-wrapper': {
          backgroundColor: () => `{elements.state.${props.type}.backgroundColor.tertiary}`,
        },
        '&:hover': {
          backgroundColor: () => `{elements.state.${props.type}.backgroundColor.tertiary}`,
        },
      },
      '.content': {
        backgroundColor: () => `{elements.state.${props.type}.backgroundColor.primary}`,
        color: () => `{elements.state.${props.type}.color.tertiary}`,
      }
    },
  },
})
</style>