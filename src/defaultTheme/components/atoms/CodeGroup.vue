<template>
  <div class="code-group" :class="[activeTabIndex == 0 && 'first-tab']">
    <div class="relative px-2 text-white bg-gray-100 rounded-t-lg dark:bg-gray-800">
      <button
        v-for="({ label }, i) in tabs"
        ref="tabs"
        :key="`${counter}${label}`"
        class="relative z-10 px-3 py-1.5 xs:py-3 my-1.5 xs:my-0 text-sm font-mono font-semibold tracking-tight"
        :class="[activeTabIndex === i ? 'active text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300']"
        @click="updateTabs(i)"
      >
        {{ label }}
      </button>
      <span ref="highlight-underline" class="absolute z-0 highlight-underline h-full xs:py-1.5">
        <span class="flex w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md"></span>
      </span>
    </div>
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
      this.counter
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
      this.counter += 1
      this.$nextTick(() => {
        this.updateActiveTab()
        this.updateHighlighteUnderlinePosition()
      })
    }
  },
  created() {
    this.updateActiveTab()
  },
  mounted() {
    this.updateHighlighteUnderlinePosition()
  },
  methods: {
    updateActiveTab() {
      const index = this.tabs.findIndex(tab => tab.active)
      this.activeTabIndex = index < 0 ? 0 : index
    },
    updateTabs(i) {
      this.activeTabIndex = i
      this.updateHighlighteUnderlinePosition()
    },
    updateHighlighteUnderlinePosition() {
      const activeTab = this.$refs.tabs[this.activeTabIndex]
      if (!activeTab) {
        return
      }
      const highlightUnderline = this.$refs['highlight-underline']
      highlightUnderline.style.left = `${activeTab.offsetLeft}px`
      highlightUnderline.style.top = `${activeTab.offsetTop}px`
      highlightUnderline.style.width = `${activeTab.clientWidth}px`
      highlightUnderline.style.height = `${activeTab.clientHeight}px`
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
            label: attrs.label || firstChild?.children[0].text || 'untitled',
            active: typeof attrs.active !== 'undefined'
          }
        })
      return components
    }
  }
})
</script>

<style scoped lang="postcss">
button {
  outline: none;
}

.code-group {
  @apply my-4;

  & .docus-highlight:not(.active) {
    display: none;
  }

  & .code-block:not(.active) {
    display: none;
  }

  >>> .docus-highlight {
    @apply my-0;
  }
}

.first-tab {
  & > .code-block:nth-child(2),
  & > .docus-highlight:nth-child(2) {
    display: block;
  }
}

.highlight-underline {
  /* bottom: -2px; */
  /* height: 2px; */
  transition: left 150ms, top 150ms, width 150ms, height 150ms;
}

.code-group ::v-deep {
  & pre[class*='language-'] {
    @apply rounded-t-none mt-0;
  }
  & > .prose > .docus-highlight .filename {
    display: none;
    & + pre[class*='language-'] {
      @apply pt-3;
    }
  }
}

.docus-highlight {
  margin: 0;
}
</style>
