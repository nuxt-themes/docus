<template>
  <h2 class="text-display-4 font-serif">
    <span class="italic capitalize text-primary-green">{{ slug }}</span> {{ title }}
  </h2>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    slug: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
})
</script>
