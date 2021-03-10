<template>
  <div class="code-group" :class="[activeTabIndex == 0 && 'first-tab']">
    <div
      class="sticky top-0 z-10 px-2 text-sm text-white bg-gray-800 border-b-2 border-gray-700 rounded-t-md h-12"
    >
      <button
        v-for="({ label }, i) in tabs"
        ref="tabs"
        :key="`${counter}${label}`"
        class="px-4 py-3 font-mono font-bold h-12"
        :class="[activeTabIndex === i ? 'active text-white' : 'text-gray-300']"
        @click="updateTabs(i)"
      >{{ label }}</button>
      <span ref="highlight-underline" class="absolute highlight-underline bg-primary-500 dark:bg-primary-400" />
    </div>
    <slot />
  </div>
</template>

<script>
import { hasClassAttr, isTag } from '../../utils/vnode'
export default {
  data () {
    return {
      activeTabIndex: 0,
      counter: 0
    }
  },
  computed: {
    tabs () {
      // eslint-disable-next-line no-unused-expressions
      this.counter
      return this.calculateTabs()
    }
  },
  watch: {
    activeTabIndex (newValue, oldValue) {
      const tabs = this.$el.querySelectorAll('.nuxt-content-highlight,.code-block')
      if (oldValue < tabs.length) {
        tabs[oldValue].classList.remove('active')
      }
      tabs[newValue].classList.add('active')
    }
  },
  updated () {
    const newTabs = this.calculateTabs()
    if (JSON.stringify(newTabs) !== JSON.stringify(this.tabs)) {
      this.counter += 1
      this.$nextTick(() => {
        this.updateActiveTab()
        this.updateHighlighteUnderlinePosition()
      })
    }
  },
  created () {
    this.updateActiveTab()
  },
  mounted () {
    this.updateHighlighteUnderlinePosition()
  },
  methods: {
    updateActiveTab () {
      const index = this.tabs.findIndex(tab => tab.active)
      this.activeTabIndex = index < 0 ? 0 : index
    },
    updateTabs (i) {
      this.activeTabIndex = i
      this.updateHighlighteUnderlinePosition()
    },
    updateHighlighteUnderlinePosition () {
      const activeTab = this.$refs.tabs[this.activeTabIndex]
      if (!activeTab) {
        return
      }
      const highlightUnderline = this.$refs['highlight-underline']
      highlightUnderline.style.left = `${activeTab.offsetLeft}px`
      highlightUnderline.style.width = `${activeTab.clientWidth}px`
    },
    calculateTabs () {
      const components = this.$slots.default
        .flatMap(child => hasClassAttr(child, 'prose') ? child.children : child)
        .filter(slot => hasClassAttr(slot, 'nuxt-content-highligh') || isTag(slot, 'code-block'))
        .map((slot) => {
          const attrs = slot.asyncMeta?.data?.attrs || slot.componentOptions?.propsData || {}
          const label = (attrs.label || slot.children[0]?.children[0].text || 'untitled').split('/').pop()
          return {
            label,
            active: typeof attrs.active !== 'undefined'
          }
        })
      return components
    }
  }
}
</script>

<style scoped>
button {
  outline: none;
}

.prose > .nuxt-content-highlight:not(.active) {
  display: none;
}

.first-tab .code-block:nth-child(2),
.first-tab .prose > .nuxt-content-highlight:nth-child(1) /** code inside group **/{
  display: block;
}

.highlight-underline {
  bottom: -2px;
  height: 2px;
  transition: left 150ms, width 150ms;
}

.code-group ::v-deep {
  & pre[class*="language-"] {
    @apply rounded-t-none mt-0;
  }
}
</style>
