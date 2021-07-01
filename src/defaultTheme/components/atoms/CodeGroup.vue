<template>
  <div class="code-group" :class="[activeTabIndex == 0 && 'first-tab']">
    <TabsHeader ref="tabs-header" :active-tab-index="activeTabIndex" :tabs="tabs" @update="activeTabIndex = $event" />
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { isTag } from '~docus/utils'

export default defineComponent({
  data() {
    return {
      activeTabIndex: 0,
      /**
       * A simple number that increases on every changes
       */
      counter: 0
    }
  },
  computed: {
    tabs() {
      // eslint-disable-next-line no-unused-expressions
      // this.counter
      return this.calculateTabs()
    }
  },
  watch: {
    activeTabIndex(newValue, oldValue) {
      const tabs = this.$el.querySelectorAll(
        '.code-group > .code-block, .code-group > .prose .docus-highlight, .code-group > .docus-highlight'
      )
      if (oldValue < tabs.length) {
        tabs[oldValue].classList.remove('active')
      }
      tabs[newValue].classList.add('active')
    }
  },
  updated() {
    const newTabs = this.calculateTabs()
    if (JSON.stringify(newTabs) !== JSON.stringify(this.tabs)) {
      // this.counter += 1
      this.$nextTick(() => {
        this.updateActiveTab()
        // TODO: refactor tabs completely
        this.$refs['tabs-header'].updateHighlightUnderlinePosition()
      })
    }
  },
  created() {
    this.updateActiveTab()
  },
  methods: {
    updateActiveTab() {
      const index = this.tabs.findIndex(tab => tab.active)
      this.activeTabIndex = index < 0 ? 0 : index
    },
    calculateTabs() {
      const components = this.$slots.default
        .flatMap(slot => (slot.data?.attrs?.class?.includes('prose') ? slot.children : slot))
        .filter(
          slot =>
            slot.data?.attrs?.class?.includes('docus-highligh') ||
            isTag(slot, 'code-block') ||
            isTag(slot, 'prose-code')
        )
        .map(slot => {
          const attrs = slot.asyncMeta?.data?.attrs || slot.componentOptions?.propsData || {}
          const [firstChild] = slot.children || slot.componentOptions?.children || slot.asyncMeta?.children || []
          return {
            label: attrs.label || firstChild?.children?.[0]?.text || 'untitled',
            active: typeof attrs.active !== 'undefined'
          }
        })
      return components
    }
  }
})
</script>

<style scoped lang="postcss">
.code-group {
  >>> pre {
    @apply rounded-tl-none rounded-tr-none !important;
  }
}

.code-group {
  @apply my-4;

  ::v-deep {
    > .docus-highlight:not(.active) {
      display: none;
    }

    > .code-block:not(.active) {
      display: none;
    }

    .docus-highlight {
      @apply mt-0;
    }

    // hide filename
    pre[class*='language-'] {
      @apply rounded-t-none mt-0;
    }
  }
}

.first-tab {
  ::v-deep {
    .code-block:nth-child(2),
    .docus-highlight:nth-child(2) {
      display: block;
    }
  }
}
</style>
