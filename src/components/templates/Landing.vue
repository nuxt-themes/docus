<template>
  <AppContainer fluid aside>
    <template #aside>
      <AppAside class="block lg:hidden" />
    </template>

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
