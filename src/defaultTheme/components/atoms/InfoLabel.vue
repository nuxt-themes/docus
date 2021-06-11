<template>
  <span
    class="
      text-xs text-primary-500
      px-2.5
      py-1.5
      leading-none
      rounded
      font-semibold
      uppercase
      tracking-wide
      bg-primary-100
      dark:bg-primary-900 dark:text-primary-400
    "
  >
    {{ label }}
  </span>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    }
  }
})
</script>
