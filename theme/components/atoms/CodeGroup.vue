<template>
  <div class="code-group">
    <div
      class="relative px-2 text-sm text-white bg-gray-800 border-b-2 border-gray-700 rounded-t-md"
    >
      <button
        v-for="({ label }, i) in tabs"
        ref="tabs"
        :key="label"
        class="px-4 py-3 font-mono font-bold"
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
      tabs: [],
      activeTabIndex: 0
    }
  },
  watch: {
    activeTabIndex (newValue, oldValue) {
      this.switchTab(newValue)
    }
  },
  mounted () {
    this.tabs = this.$slots.default.filter(slot => Boolean(slot.componentOptions)).map((slot) => {
      return {
        label: slot.componentOptions.propsData.label,
        elm: slot.elm
      }
    })
    this.$nextTick(this.updateHighlighteUnderlinePosition)
  },
  methods: {
    switchTab (i) {
      this.tabs.forEach((tab) => {
        tab.elm.classList.remove('active')
      })
      this.tabs[i].elm.classList.add('active')
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
    }
  }
}
</script>

<style scoped>
button {
  outline: none;
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
