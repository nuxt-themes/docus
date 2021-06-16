<template>
  <h2 class="text-display-4 font-serif">
    <span class="italic capitalize text-primary-green">{{ slug }}</span> {{ name }}
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
    name: {
      type: String,
      required: true
    }
  }
})
</script>
