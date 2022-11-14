<script lang="ts">
const iconTypeMap = {
  primary: 'heroicons-outline:check',
  info: 'heroicons-outline:information-circle',
  success: 'heroicons-outline:check-circle',
  warning: 'heroicons-outline:exclamation',
  danger: 'heroicons-outline:exclamation-circle'
}

export default defineComponent({
  props: {
    /**
     * Used to override the default <code>type</code> icon, check out the
     *  <a href="https://github.com/nuxt/content/tree/dev/packages/theme-docs/src/components/global/icons">icons available</a>
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * Type of list
     */
    type: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'info', 'success', 'warning', 'danger'].includes(value)
    }
  },
  setup (props) {
    const slots = useSlots()

    const { flatUnwrap, unwrap } = useUnwrap()

    const iconName = computed(() => props.icon || (iconTypeMap as any)[props.type])

    // Usage of render function is mandatory to access default slot
    // Otherwise Vue warns that slot "default" was invoked outside of the render function
    return () => {
      const items = flatUnwrap((slots.default && slots.default()) ?? [], ['ul']).map(li => unwrap(li, ['li']))

      return h(
        'ul',
        items.map(item =>
          h('li', [
            h('span', { class: `list-icon ${props.type}-icon` }, h(resolveComponent('icon'), { name: iconName.value, class: 'icon' })),
            h('span', h(resolveComponent('ContentSlot'), { use: () => item }))
          ])
        )
      )
    }
  }
})
</script>

<style scoped lang="ts">
css({
  li: {
    marginBottom: '{space.3}',
    display: 'flex',
    alignItems: 'center',
    '.list-icon': {
      marginRight: '{space.3}',
      flexShrink: 0,
      '&.primary-icon': {
        color: '{docus.state.primary.color}'
      },
      '&.info-icon': {
        color: '{docus.state.info.color}'
      },
      '&.success-icon': {
        color: '{docus.state.success.color}'
      },
      '&.warning-icon': {
        color: '{docus.state.warning.color}'
      },
      '&.danger-icon': {
        color: '{docus.state.danger.color}'
      },
      '.icon': {
        width: '{space.6}',
        height: '{space.6}',
      }
    }
  }
})
</style>
