<template>
  <AppPage prose class="min-h-screen-sm">
    <h1>{{ error.message }}</h1>
    <p v-if="error.statusCode === 404">Go back <NuxtLink to="/">home</NuxtLink>.</p>
  </AppPage>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  head() {
    return {
      title: this.error.message
    }
  }
})
</script>
