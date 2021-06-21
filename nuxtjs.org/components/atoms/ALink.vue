<template>
  <a
    v-if="is === 'a'"
    link
    v-bind="props"
    :class="[focusVisible && 'ring-offset']"
    @focus="handleFocus(true)"
    @blur="handleFocus(false)"
    @mousedown="mousedownHandler"
  >
    <slot>Link</slot>
  </a>

  <NuxtLink
    v-else-if="is === 'NuxtLink'"
    link
    v-bind="props"
    :class="[focusVisible && 'ring-offset']"
    @focus.native="handleFocus(true)"
    @blur.native="handleFocus(false)"
    @mousedown.native="mousedownHandler"
  >
    <slot>Link</slot>
  </NuxtLink>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ALink',
  props: {
    to: {
      type: [String, Object],
      default: '/'
    },
    href: {
      type: String,
      default: null
    },
    rel: {
      type: String,
      default: 'noopener nofollow noreferrer'
    },
    target: {
      type: String,
      default: '_blank'
    },
    ariaLabel: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  setup() {
    let focusedByMouse = false
    let focus = false
    let focusVisible = false

    function mousedownHandler() {
      focusedByMouse = true
    }

    function handleFocus(state) {
      if (state) {
        if (focusedByMouse) {
          focus = true
          focusVisible = false
        } else {
          focus = true
          focusVisible = true
        }
      } else {
        focus = false
        focusVisible = false
        focusedByMouse = false
      }
    }

    return {
      focusedByMouse,
      focus,
      focusVisible,
      mousedownHandler,
      handleFocus
    }
  },
  computed: {
    props() {
      return {
        a: {
          href: this.href,
          target: this.target,
          rel: this.rel,
          ariaLabel: this.ariaLabel || this.title,
          title: this.title || this.ariaLabel
        },
        NuxtLink: {
          to: this.to,
          ariaLabel: this.ariaLabel || this.title,
          title: this.title || this.ariaLabel
        }
      }[this.is]
    },
    is() {
      if (this.href) {
        return 'a'
      } else {
        return 'NuxtLink'
      }
    }
  }
})
</script>
