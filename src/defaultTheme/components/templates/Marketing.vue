<template>
  <AppContainer fluid :footer="page.footer">
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
