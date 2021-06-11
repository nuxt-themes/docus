<template>
  <span class="text-terciary font-bold text-lg">{{ label }}</span>
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
