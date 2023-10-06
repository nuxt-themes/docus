<script lang="ts">
import CodeGroupTabs from './CodeGroupTabs.vue'

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
          'w-full overflow-hidden border rounded border-primary-static': true,
          'code-group': true,
          'first-tab': this.activeTabIndex === 0
        }
      },
      [
        h(CodeGroupTabs, {
          ref: 'code-group-tabs',
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
                  : h(slot)
              ]
            )
          )
        )
      ]
    )
  }
})
</script>
