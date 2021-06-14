<template>
  <div class="overflow-hidden">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup() {
    console.log('yoyoyo')
  }
})
</script>
