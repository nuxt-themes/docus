<template>
  <div>
    <div class="max-w-2xl mx-auto py-16 sm:py-24 sm:px-4">
      <div>
        <h1
          class="
            px-4
            sm:px-0
            ml-auto
            mb-12
            text-4xl
            sm:text-6xl
            font-semibold
            tracking-tight
            text-gray-900
            dark:text-gray-100
          "
        >
          {{ page.title }}
        </h1>
      </div>

      <BlogpostList />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  templateOptions: {
    aside: false,
    fluid: true
  }
})
</script>
