<template>
  <li>
    <div class="flex flex-col items-center">
      <slot name="image">
        <img class="mb-4" :src="image" :alt="`A ${title} image`" />
      </slot>
      <h3 class="mb-1 text-center text-body-lg lg:text-body-xl font-bold">{{ title }}</h3>
      <p class="text-center text-sm lg:text-base dark:text-cloud-light">{{ description }}</p>
    </div>
  </li>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
})
</script>
