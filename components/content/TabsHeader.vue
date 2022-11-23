<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  tabs: {
    type: Array as PropType<{ label: string }[]>,
    required: true
  },
  activeTabIndex: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:activeTabIndex'])

const tabsRef = ref()

const highlightUnderline = ref()

const updateHighlightUnderlinePosition = (activeTab) => {
  if (!activeTab) {
    return
  }

  highlightUnderline.value.style.left = `${activeTab.offsetLeft}px`
  highlightUnderline.value.style.width = `${activeTab.clientWidth}px`
}

const updateTabs = ($event, i) => {
  emit('update:activeTabIndex', i)
  nextTick(() => updateHighlightUnderlinePosition($event.target))
}

watch(
  tabsRef,
  (newVal) => {
    if (!newVal) {
      return
    }

    setTimeout(() => {
      updateHighlightUnderlinePosition(tabsRef.value.children[props.activeTabIndex])
    }, 50)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="tabs-header">
    <div v-if="tabs" ref="tabsRef" class="tabs">
      <button
        v-for="({ label }, i) in tabs"
        :key="`${i}${label}`"
        :class="[activeTabIndex === i ? 'active' : 'not-active']"
        @click="updateTabs($event, i)"
      >
        {{ label }}
      </button>
      <span
        ref="highlightUnderline"
        class="highlight-underline"
      >
        <span class="tab" />
      </span>
    </div>

    <slot name="footer" />
  </div>
</template>

<style scoped lang="ts">
css({
  ".tabs-header": {
    position: 'relative',
    background: '{colors.gray.200}',
    color: '{colors.red.700}',
    '@dark': {
      color: '{colors.red.500}',
      background: '{colors.gray.800}',
    },
    '.tabs': {
      position: 'relative',
      zIndex: 0,
      display: 'flex',
      px: '{space.2}',
      button: {
        py: '{space.2-5}',
        px: '{space.4}',
        position: 'relative',
        fontFamily: '{fonts.mono}',
        fontSize: '{text.sm.fontSize}',
        lineHeight: '{text.sm.lineHeight}',
        letterSpacing: '{letterSpacings.tight}',
        userSelect: 'none',
        transition: 'color 100ms, background 100ms',
        '&.not-active': {
          color: '{colors.gray.700}',
          '&:hover': {
            color: '{colors.gray.800}',
            background: '{colors.gray.300}'
          },
          '@dark': {
            color: '{colors.gray.200}',
            '&:hover': {
              color: '{colors.gray.200}',
              background: '{colors.gray.700}'
            },
          }
        },
        '&.active': {
          color: '{colors.gray.500}',
          '@dark': {
            color: '{colors.gray.300}',
          }
        }
      },
      '.highlight-underline': {
        position: 'absolute',
        zIndex: -1,
        top: 0,
        height: '100%',
        transition: 'left 150ms, width 150ms',
        '.tab': {
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '{colors.gray.100}',
          '@dark': {
            backgroundColor: '{colors.gray.900}',
          }
        }
      }
    }
  }
})
</style>
