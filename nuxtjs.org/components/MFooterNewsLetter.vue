<template>
  <div>
    <div>
      <ALabel
        tag="h3"
        class="font-semibold light:text-gray-400 dark:text-gray-100 text-lg"
        >Subscribe to our newsletter</ALabel
      >
      <ALabel tag="p" class="mt-2 text-base text-gray-500 dark:text-white">
        The latest news, articles, and resources, sent to your inbox weekly.
      </ALabel>
    </div>
    <MInputGroupButton v-model="email" placeholder="Enter your email"
      >Subscribe</MInputGroupButton
    >
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useNewsletter } from '../plugins/composables'

export default defineComponent({
  setup() {
    const { email, error, subscribe, pending, subscribed } = useNewsletter()

    return {
      email,
      pending,
      subscribe,
      subscribed,
      error
    }
  }
})
</script>
