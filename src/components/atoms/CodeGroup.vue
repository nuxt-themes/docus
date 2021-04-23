<template>
  <div class="code-group" :class="[activeTabIndex == 0 && 'first-tab']">
    <div
      class="relative px-2 text-sm text-white bg-gray-100 border-b-2 border-gray-300 rounded-t-md h-12 dark:bg-gray-800 dark:border-gray-700"
    >
      <button
        v-for="({ label }, i) in tabs"
        ref="tabs"
        :key="`${counter}${label}`"
        class="px-4 py-3 font-mono font-bold h-12"
        :class="[activeTabIndex === i ? 'active text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300']"
        @click="updateTabs(i)"
      >
        {{ label }}
      </button>
      <span ref="highlight-underline" class="absolute highlight-underline bg-primary-500 dark:bg-primary-400" />
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
        '.code-group > .code-block, .code-group > .prose .nuxt-content-highlight, .code-group > .nuxt-content-highlight'
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
      highlightUnderline.style.width = `${activeTab.clientWidth}px`
    },
    calculateTabs() {
      const components = this.$slots.default
        .flatMap(slot => (slot.data?.attrs?.class?.includes('prose') ? slot.children : slot))
        .filter(
          slot =>
            slot.data?.attrs?.class?.includes('nuxt-content-highligh') ||
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
  & > .nuxt-content-highlight {
    @apply mt-0;
    &:not(.active) {
      display: none;
    }
  }
  .prose > .nuxt-content-highlight:not(.active) {
    display: none;
  }
}
.first-tab {
  & > .code-block:nth-child(2),
  & > .prose:nth-child(2) > .nuxt-content-highlight:nth-child(1) {
    display: block;
  }
}
.highlight-underline {
  bottom: -2px;
  height: 2px;
  transition: left 150ms, width 150ms;
}
.code-group ::v-deep {
  & pre[class*='language-'] {
    @apply rounded-t-none mt-0;
  }
  & > .prose > .nuxt-content-highlight .filename {
    display: none;
    & + pre[class*='language-'] {
      @apply pt-3;
    }
  }
}
.nuxt-content-highlight {
  margin: 0;
}
</style>
