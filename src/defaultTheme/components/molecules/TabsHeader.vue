<template>
  <div class="relative text-white rounded-t-lg d-code-group-header-bg">
    <div class="relative z-0 px-2">
      <button
        v-for="({ label }, i) in tabs"
        ref="tabs"
        :key="`${i}${label}`"
        class="
          relative
          px-3
          py-1.5
          xs:py-3
          my-1.5
          xs:my-0
          text-sm
          font-mono font-medium
          tracking-tight
          focus:outline-none
        "
        :class="[activeTabIndex === i ? 'active text-gray-800 dark:text-white' : 'd-prose-code-filename-text']"
        @click="updateTabs(i)"
      >
        {{ label }}
      </button>
      <span ref="highlight-underline" class="absolute -z-1 highlight-underline h-full xs:py-1.5">
        <span class="flex w-full h-full d-code-group-tab rounded-md"></span>
      </span>
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTabIndex: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.updateHighlightUnderlinePosition()
  },
  methods: {
    updateTabs(i) {
      this.$emit('update', i)
      this.$nextTick(() => this.updateHighlightUnderlinePosition())
    },
    updateHighlightUnderlinePosition() {
      const activeTab = this.$refs.tabs[this.activeTabIndex]
      if (!activeTab) {
        return
      }
      const highlightUnderline = this.$refs['highlight-underline']
      highlightUnderline.style.left = `${activeTab.offsetLeft}px`
      highlightUnderline.style.top = `${activeTab.offsetTop}px`
      highlightUnderline.style.width = `${activeTab.clientWidth}px`
      highlightUnderline.style.height = `${activeTab.clientHeight}px`
    }
  }
})
</script>

<style scoped>
.highlight-underline {
  /* bottom: -2px; */
  /* height: 2px; */
  transition: left 150ms, top 150ms, width 150ms, height 150ms;
}
</style>
