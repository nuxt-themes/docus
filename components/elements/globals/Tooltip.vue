<script setup lang="ts">
import { useFloating, flip, shift, offset, autoUpdate } from "@floating-ui/vue"
import { useDebounceFn, useFocusWithin } from "@vueuse/core"

const props = defineProps({
  /**
   * Content of the tooltip
   */
  content: {
    type: String,
    required: true,
  },
  /**
   * Sets if tooltip will be shown on tab
   */
  tabbable: {
    type: Boolean,
    default: false,
  },
  /**
   * Max width of the tooltip
   */
  maxWidth: {
    type: String,
    default: "240px",
  },
  /**
   * Offset from the trigger element in pixels
   */
  offset: {
    type: Number,
    default: 4,
  },
  /**
   * Delay in milliseconds before showing the tooltip
   */
  delay: {
    type: Number,
    default: 200,
  },
  /**
   * Strategy to use for positioning the tooltip
   * Uses @floating-ui/dom strategy values
   */
  strategy: {
    type: String,
    default: "absolute",
  },
  /**
   * Placement of the tooltip
   * Uses @floating-ui/dom placement values
   */
  placement: {
    type: String,
    default: "top",
  },
})

const open = ref(false)

const debouncedOpen = useDebounceFn((v) => {
  if (!focused.value) {
    open.value = v
  }
}, props.delay)

const trigger = ref(null) as Ref<HTMLElement | null>
const floating = ref(null) as Ref<HTMLElement | null>

const { x, y, strategy, placement } = useFloating(trigger, floating, {
  strategy: props.strategy,
  middleware: [offset(props.offset), flip(), shift({ padding: 4 })],
  placement: props.placement,
  whileElementsMounted: autoUpdate,
})

const { focused } = useFocusWithin(trigger)

watch(focused, (focused) => {
  if (focused) {
    open.value = true
  } else {
    open.value = false
  }
})

// TODO: issue with different id's on server and client
const tooltipId = Math.random().toString(36).slice(2, 7)
</script>

<template>
  <span
    class="tooltip"
    @mouseenter="debouncedOpen(true)"
    @mouseleave="debouncedOpen(false)"
  >
    <span
      :tabindex="tabbable ? 0 : -1"
      @focus="open = true"
      @blur="open = false"
      @keydown.esc="open = false"
      ref="trigger"
      class="trigger"
      :aria-describedby="tooltipId"
    >
      <ContentSlot :use="$slots.default" unwrap="p" />
    </span>
    <Transition name="tooltip">
      <span
        :id="tooltipId"
        ref="floating"
        role="tooltip"
        v-if="open"
        class="tooltip-content"
        :class="placement"
        :style="{
          position: strategy,
          top: `${y ?? 0}px`,
          left: `${x ?? 0}px`,
          width: 'max-content',
          maxWidth,
        }"
      >
        {{ content }}</span
      >
    </Transition>
  </span>
</template>

<style lang="ts" scoped>
css({
  '.tooltip': {
    display: 'inline-flex',
    '.trigger': {
      display: 'inline-flex',
      borderRadius: '{radii.xs}',
      '&:focus': {
        outline: 'none',
      },
      '&:focus-visible': {
        outline: '{elements.tooltip.trigger.outline.focusVisible}',
      },
    },
    '.tooltip-content': {
      backgroundColor: '{elements.tooltip.content.backgroundColor}',
      color: '{elements.tooltip.content.color}',
      fontSize: '{elements.tooltip.content.fontSize}',
      lineHeight: '{elements.tooltip.content.lineHeight}',
      fontWeight: '{elements.tooltip.content.fontWeight}',
      borderWidth: '{elements.tooltip.content.borderWidth}',
      borderStyle: '{elements.tooltip.content.borderStyle}',
      borderColor: '{elements.tooltip.content.borderColor}',
      borderRadius: '{elements.tooltip.content.borderRadius}',
      pointerEvents: 'none',
      padding: '{elements.tooltip.content.padding}',
    }
  }
})
</style>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .tooltip-content {
    transition: all 0ms !important;
  }
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
