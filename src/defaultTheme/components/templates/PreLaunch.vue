<template>
  <AppTemplate fluid :footer="false">
    <NuxtContent :document="page" />
  </AppTemplate>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  }
})
</script>
