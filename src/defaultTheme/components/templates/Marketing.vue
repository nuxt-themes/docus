<template>
  <AppContainer fluid :footer="page.footer">
    <DocusContent :document="page" />
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
