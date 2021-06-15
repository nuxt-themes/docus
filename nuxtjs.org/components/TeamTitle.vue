<template>
  <h2>
    <span class="italic capitalize text-primary-green text-display-4">{{ slug }}</span> {{ title }}
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
