<template>
  <div class="btn-link">Button Link</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue3'

export default defineComponent({
  props: {
    href: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style>
.btn-link {
  background: #fc0;
  padding: 10px;
}
</style>
