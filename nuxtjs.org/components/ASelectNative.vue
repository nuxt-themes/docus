<template>
  <div class="relative">
    <select
      v-bind="props"
      class="select-none"
      :class="[{ 'pointer-events-none opacity-50': disabled }, selectClass]"
      @input="$emit('input', $event.target.value)"
      @focus="handleFocus(true)"
      @blur="handleFocus(false)"
      @mousedown="mousedownHandler"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>

      <template v-for="(option, i) in normalizedOptions">
        <optgroup v-if="option.options" :key="`${option.value}-${i}`" :label="option.label" :disabled="option.disabled">
          <option
            v-for="(optGroupOption, i2) in option.options"
            :key="`${optGroupOption.value}-${i}-${i2}`"
            :value="optGroupOption.value"
          >
            {{ optGroupOption.text }}
          </option>
        </optgroup>

        <option v-else :key="`${option.value}-${i}`" :value="option.value" :disabled="option.disabled">
          {{ option.text }}
        </option>
      </template>
    </select>

    <div class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
      <svg
        class="h-4 w-4 dark:text-secondary light:text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
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
    placeholder: {
      type: String,
      default: null
    },
    selectClass: {
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

    function normalizeOption(option) {
      if (['string', 'number', 'boolean'].includes(typeof option)) {
        return {
          value: option,
          text: option,
          disabled: false
        }
      }

      return {
        value: option.value,
        text: option.text,
        disabled: option.disabled
      }
    }

    function normalizeOptionGroup(optgroup) {
      return {
        label: optgroup.label,
        disabled: optgroup.disabled,
        options: optgroup.options.map(option => this.normalizeOption(option)).filter(Boolean)
      }
    }

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
      normalizeOption,
      normalizeOptionGroup,
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
        disabled: this.disabled,
        required: this.required
      }
    },
    normalizedOptions() {
      if (Array.isArray(this.options)) {
        return this.options
          .map(option => (option.options ? this.normalizeOptionGroup(option) : this.normalizeOption(option)))
          .filter(Boolean)
      }

      return []
    }
  }
})
</script>
