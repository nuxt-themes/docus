<template>
  <AppContainer fluid :footer="false">
    <NuxtContent :document="page" />
  </AppContainer>
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
