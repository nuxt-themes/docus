<script lang="ts">
import TabsHeader from './TabsHeader.vue'
import { defineComponent, h } from '#imports'

const isTag = (slot: any, tag: string) => {
  return slot.type && slot.type.tag && slot.type.tag === tag
}

export default defineComponent({
  data() {
    return {
      activeTabIndex: 0,
      /**
       * A simple number that increases on every changes
       */
      counter: 0,
    }
  },
  render() {
    const slots = this.$slots.default()
    const tabs = slots
      .filter(
        slot =>
          isTag(slot, 'code-block')
            || isTag(slot, 'code'),
      )
      .map((slot, index) => {
        return {
          label: slot?.props?.filename || slot?.props?.label || `${index}`,
          active: slot?.props?.active || false,
          component: slot,
        }
      })

    return h(
      'div',
      {
        class: {
          'code-group': true,
          'first-tab': this.activeTabIndex === 0,
        },
      },
      [
        h(
          TabsHeader,
          {
            'ref': 'tabs-header',
            'activeTabIndex': this.activeTabIndex,
            tabs,
            'onUpdate:activeTabIndex': $event => (this.activeTabIndex = $event),
          },
        ),
        h(
          'div',
          {
            class: 'code-group-content',
            text: this.activeTabIndex,
          },
          // Map slots to content children
          slots.map(
            (slot, index) => h(
              'div',
              {
                // Current slot is displayed, others are hidden
                style: { display: index === this.activeTabIndex ? 'block' : 'none' },
                class: {
                  '': !isTag(slot, 'code'),
                },
              },
              // Display direct children if not a ```code``` block
              [
                isTag(slot, 'code')
                  ? slot
                  : h(
                    'div',
                    {
                      class: {
                        'preview-canvas': true,
                      },
                    },
                    [slot.children.default()],
                  ),
              ],
            ),
          ),
        ),
      ],
    )
  },
})
</script>

<style lang="postcss">
li {
  .code-group {
      @apply my-4;
  }
}

html.dark {
  .code-group-content {
    .preview-canvas {
      @apply p-4 my-0 overflow-x-auto leading-normal bg-gray-900 rounded-bl-lg rounded-br-lg rounded-tl-none rounded-tr-none z-0;
    }
  }
}
</style>

<style scoped lang="postcss">
.code-group {
  @apply rounded-lg overflow-hidden border-2 surface-border;

  :deep(.prose-code) {
    @apply mt-0 mb-0 rounded-none !important;
  }

  :deep(pre) {
    @apply mt-0 !important;
  }

  :deep(.filename) {
    @apply hidden;
  }
}

.code-group-content {
  .preview-canvas {
    @apply p-4 my-0 overflow-x-auto leading-normal bg-gray-100 dark:bg-gray-800 rounded-bl-lg rounded-br-lg z-0;

    & > * {
      @apply my-0;
    }
  }
}
</style>
