<template>
  <div>
    <MFooterSocialLinks />
    <p class="mt-8 text-base light:text-gray-400 dark:text-cloud-light md:mt-0 md:order-1">
      &copy; {{ year }} Nuxt, Inc. All rights reserved.
    </p>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
})
</script>
