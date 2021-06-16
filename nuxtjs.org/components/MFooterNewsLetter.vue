<template>
  <div>
    <div>
      <h3 class="font-semibold light:text-gray-400 dark:text-cloud-light text-lg">Subscribe to our newsletter</h3>
      <p class="mt-2 text-base text-gray-500 dark:text-secondary-surface">
        The latest news, articles, and resources, sent to your inbox weekly.
      </p>
    </div>
    <MInputGroupButton v-model="email" placeholder="Enter your email">Subscribe</MInputGroupButton>
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
