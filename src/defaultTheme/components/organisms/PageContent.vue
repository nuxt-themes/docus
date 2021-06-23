<template>
  <div>
    <slot name="mobile-toc" />
    <div class="px-4 sm:px-6 mt-4">
      <DocusContent :document="page" class="docus-content" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  }
})
</script>
