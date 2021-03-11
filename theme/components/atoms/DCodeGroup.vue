<template>
  <div class="code-group" :class="[activeTabIndex == 0 && 'first-tab']">
    <div
      class="relative px-2 text-sm text-white bg-gray-800 border-b-2 border-gray-700 rounded-t-md h-12"
    >
      <button
        v-for="({ label }, i) in tabs"
        ref="tabs"
        :key="label"
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
export default {
  data () {
    return {
      activeTabIndex: 0
    }
  },
  computed: {
    tabs () {
      return this.$slots.default.map((slot) => {
        const attrs = slot.asyncMeta?.data?.attrs || slot.componentOptions?.propsData || {}
        return {
          label: attrs.label,
          active: typeof attrs.active !== 'undefined',
          attrs,
          slot
        }
      }).filter(slot => Boolean(slot.label))
    }
  },
  watch: {
    activeTabIndex (newValue, oldValue) {
      this.tabs[oldValue].slot.elm.classList.remove('active')
      this.tabs[newValue].slot.elm.classList.add('active')
    }
  },
  created () {
    const index = this.tabs.findIndex(tab => tab.active)
    if (index < 0) {
      /**
       * SSR: Mark first tab as active if active tab not found
       */
      this.tabs[0].active = true
      this.tabs[0].attrs.active = true
    } else {
      this.activeTabIndex = index
    }
  },
  mounted () {
    this.updateHighlighteUnderlinePosition()
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
button {
  outline: none;
}

.first-tab .code-block:nth-child(2) {
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
