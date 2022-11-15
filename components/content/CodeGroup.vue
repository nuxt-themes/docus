<script lang="ts">
import TabsHeader from './TabsHeader.vue'

const isTag = (slot: any, tag: string) => {
  return slot.type && slot.type.tag && slot.type.tag === tag
}

export default defineComponent({
  data () {
    return {
      activeTabIndex: 0,
      /**
       * A simple number that increases on every changes
       */
      counter: 0
    }
  },
  render () {
    const slots = this.$slots?.default?.() || []
    const tabs = slots
      .filter(slot => isTag(slot, 'code-block') || isTag(slot, 'code'))
      .map((slot, index) => {
        return {
          label: slot?.props?.filename || slot?.props?.label || `${index}`,
          active: slot?.props?.active || false,
          component: slot
        }
      })

    return h(
      'div',
      {
        class: {
          'code-group': true,
          'first-tab': this.activeTabIndex === 0
        }
      },
      [
        h(TabsHeader, {
          ref: 'tabs-header',
          activeTabIndex: this.activeTabIndex,
          tabs,
          'onUpdate:activeTabIndex': $event => (this.activeTabIndex = $event)
        }),
        h(
          'div',
          {
            class: 'code-group-content',
            text: this.activeTabIndex
          },
          // Map slots to content children
          slots.map((slot, index) =>
            h(
              'div',
              {
                // Current slot is displayed, others are hidden
                style: {
                  display: index === this.activeTabIndex ? 'block' : 'none'
                },
                class: {
                  '': !isTag(slot, 'code')
                }
              },
              // Display direct children if not a ```code``` block
              [
                isTag(slot, 'code')
                  ? slot
                  : h(
                    'div',
                    {
                      class: {
                        'preview-canvas': true
                      }
                    },
                    [(slot.children as any)?.default?.() || h('div')]
                  )
              ]
            )
          )
        )
      ]
    )
  }
})
</script>

<style scoped lang="ts">
css({
  '.code-group': {
    border: '1px solid {docus.border.secondary.default}',
    borderRadius: '{radii.md}',
    overflow: 'hidden',
    ':deep(.prose-code)': {
      margin: 0,
      border: 'none',
      borderRadius: 0,
      // TODO: update token in typography
      '--prose-code-block-background-color-dark': '{colors.gray.900}'
    },
    ':deep(.filename)': {
      display: 'none'
    },
    '.preview-canvas': {
      padding: '{space.4}'
    }
  }
})
</style>
