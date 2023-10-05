<script lang="ts">
import appConfig from '#build/app.config'
const { tokens } = appConfig

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
      validator: (value: string) => ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'neutral'].includes(value)
    }
  },
  setup (props) {
    const slots = useSlots()

    const { flatUnwrap, unwrap } = useUnwrap()

    const iconName = computed(() => props.icon || `list:${props.type}`)

    // Usage of render function is mandatory to access default slot
    // Otherwise Vue warns that slot "default" was invoked outside of the render function
    return () => {
      const items = flatUnwrap((slots.default && slots.default()) ?? [], ['ul']).map(li => unwrap(li, ['li']))

      return h(
        'ul',
        items.map(item =>
          h('li',{ class: ['flex items-start last:mb-0 mb-3'] }, [
            h('span', { class: ['list-icon flex shrink-0 me-3 p-1 rounded-full shadow-light-up-sm', tokens.state[props.type].color.primary, tokens.state[props.type].backgroundColor.secondary] }, h(resolveComponent('Icon'), { name: iconName.value, class: ['icon w-4 h-4'] })),
            h('span', h(resolveComponent('ContentSlot'), { use: () => item }))
          ])
        )
      )
    }
  }
})
</script>
