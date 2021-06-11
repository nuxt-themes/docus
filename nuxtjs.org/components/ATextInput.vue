<template>
  <input
    :value="value"
    :class="{ 'pointer-events-none opacity-50': disabled }"
    @input="$emit('input', $event.target.value)"
    @focus="handleFocus(true)"
    @blur="handleFocus(false)"
    @mousedown="mousedownHandler"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
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
        value: this.value,
        id: this.id,
        name: this.name,
        type: this.type,
        placeholder: this.placeholder,
        disabled: this.disabled
      }
    }
  }
})
</script>
