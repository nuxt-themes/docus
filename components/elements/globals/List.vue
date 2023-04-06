<script lang="ts">
const iconTypeMap = {
  primary: 'heroicons-outline:check',
  info: 'ion:information',
  success: 'fe:star',
  warning: 'raphael:smile',
  danger: 'octicon:x-16'
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
            h('span', { class: `list-icon ${props.type}` }, h(resolveComponent('icon'), { name: iconName.value, class: 'icon' })),
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
    marginBottom: '{elements.list.item.marginBottom}', 
    display: 'flex',
    alignItems: 'flex-start',
    '&:last-child': {
      marginBottom: '{elements.list.item.lastChild.marginBottom}' 
    },
    '.list-icon': {
      display: 'flex',
      marginInlineEnd: '{elements.list.item.icon.marginInlineEnd}', 
      flexShrink: 0,
      padding: '{elements.list.item.icon.padding}', 
      borderRadius: '{elements.list.item.icon.borderRadius}', 
      '&.primary': {
        color: '{elements.state.primary.color.primary}',
        backgroundColor: '{elements.state.primary.backgroundColor.secondary}'
      },
      '&.info': {
        color: '{elements.state.info.color.primary}',
        backgroundColor: '{elements.state.info.backgroundColor.secondary}'
      },
      '&.success': {
        color: '{elements.state.success.color.primary}',
        backgroundColor: '{elements.state.success.backgroundColor.secondary}'
      },
      '&.warning': {
        color: '{elements.state.warning.color.primary}',
        backgroundColor: '{elements.state.warning.backgroundColor.secondary}'
      },
      '&.danger': {
        color: '{elements.state.danger.color.primary}',
        backgroundColor: '{elements.state.danger.backgroundColor.secondary}'
      },
      '.icon': {
        width: '{elements.list.item.icon.width}', 
        height: '{elements.list.item.icon.height}',  
      }
    }
  }
})
</style>
