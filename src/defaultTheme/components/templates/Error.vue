<template>
  <AppPage class="min-h-screen-sm">
    <div class="mt-48 flex items-center justify-center flex-col px-4 md:px-0">
      <h1 class="font-serif text-display-6 md:text-display-5 2xl:text-display-4 text-center">{{ error.message }}</h1>
      <p class="text-center mt-4 mb-4">We couldn't find the page you are looking for.</p>
      <SectionButton to="/" size="md" class="bg-primary text-gray-800 hover:bg-green-300 focus:bg-green-300">
        Go back home
      </SectionButton>
    </div>
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
  },
  templateOptions: {
    aside: false,
    fluid: false
  }
})
</script>
