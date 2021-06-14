<template>
  <NuxtLink
    v-if="is === 'NuxtLink'"
    v-bind="props"
    :class="{ 'pointer-events-none opacity-50': disabled }"
    v-on="$listeners"
    @focus.native="handleFocus(true)"
    @blur.native="handleFocus(false)"
    @mousedown.native="mousedownHandler"
  >
    <slot />
  </NuxtLink>
  <Component
    :is="is"
    v-else
    v-bind="props"
    :class="{ 'pointer-events-none opacity-50': disabled }"
    v-on="$listeners"
    @focus="handleFocus(true)"
    @blur="handleFocus(false)"
    @mousedown="mousedownHandler"
  >
    <slot />
  </Component>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    href: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
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
    tag: {
      type: String,
      default: 'a'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: null
    }
  },
  setup() {
    const focusedByMouse = ref(false)
    const focus = ref(false)
    const focusVisible = ref(false)

    function mousedownHandler() {
      focusedByMouse.value = true
    }

    function handleFocus(state) {
      if (state) {
        if (focusedByMouse) {
          focus.value = true
          focusVisible.value = false
        } else {
          focus.value = true
          focusVisible.value = true
        }
      } else {
        focus.value = false
        focusVisible.value = false
        focusedByMouse.value = false
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
          ariaLabel: this.ariaLabel
        },
        NuxtLink: {
          to: this.to,
          tag: this.tag,
          ariaLabel: this.ariaLabel
        },
        button: {
          type: 'button',
          disabled: this.disabled,
          ariaLabel: this.ariaLabel
        }
      }[this.is]
    },
    is() {
      if (this.href) {
        return 'a'
      } else if (this.to) {
        return 'NuxtLink'
      } else {
        return 'button'
      }
    }
  }
})
</script>
