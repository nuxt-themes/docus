<script lang="ts">
import TabsHeader from './TabsHeader.vue'

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
.bg-grid-slate-100 {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23f1f5f9'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}

.prose {
  li {
    .code-group {
      @apply my-4;
    }
  }
}

html.dark {
  .code-group-content {
    .preview-canvas {
      @apply p-4 my-0 overflow-x-auto leading-normal bg-gray-900 rounded-lg rounded-tl-none rounded-tr-none z-0;
      background-image: linear-gradient(rgba(255, 255, 255, .033) .025em, transparent .03em), linear-gradient(90deg, rgba(255, 255, 255, .033) .03em, transparent .03em);
      background-size: 2em 2em;
    }
  }
}
</style>

<style scoped lang="postcss">
.code-group {
  :deep(.prose-code) {
    @apply mt-0 !important;
  }

  :deep(pre) {
    @apply rounded-tl-none rounded-tr-none mt-0 !important;
  }
}

.code-group-content {
  .preview-canvas {
    @apply p-4 my-0 overflow-x-auto leading-normal bg-gray-100 dark:bg-gray-900 rounded-bl-lg rounded-br-lg z-0;

    background-image: linear-gradient(rgba(0, 0, 0, .033) .025em, transparent .03em), linear-gradient(90deg, rgba(0, 0, 0, .033) .03em, transparent .03em);
    background-size: 2em 2em;

    & > * {
      @apply my-0;
    }
  }
}
</style>
