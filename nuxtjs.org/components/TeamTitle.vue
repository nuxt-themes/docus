<template>
  <h2 class="text-display-4 font-serif">
    <span class="italic capitalize text-primary-green">{{ names[0] }}</span> {{ names[1] }}
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
  },
  computed: {
    names() {
      return (this.name || '').split(' ')
    }
  }
})
</script>
