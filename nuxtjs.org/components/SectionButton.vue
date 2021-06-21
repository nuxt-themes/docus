<template>
  <AButton
    type="button"
    :aria-label="ariaLabel"
    :to="to"
    class="font-medium rounded-md"
    :class="[
      iconLeft || iconRight ? 'inline-flex items-center px-4 py-2.5' : 'px-4 py-2.5',
      { 'text-md 2xl:text-base ': size === 'lg' },
      { 'text-sm 2xl:text-md ': size === 'md' },
      { 'text-xs 2xl:text-sm ': size === 'sm' }
    ]"
  >
    <div v-if="iconLeft" class="h-full flex items-center justify-center">
      <Component :is="iconLeft" class="mr-2" />
    </div>
    <slot />
    <div v-if="iconRight" class="h-full flex items-center justify-center">
      <Component :is="iconRight" class="ml-2" />
    </div>
  </AButton>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    size: {
      type: String,
      default: 'lg',
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value)
      }
    },
    iconLeft: {
      type: String,
      default: null
    },
    iconRight: {
      type: String,
      default: null
    },
    ariaLabel: {
      type: String,
      default: null
    }
  }
})
</script>
