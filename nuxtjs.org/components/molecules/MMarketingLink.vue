<template>
  <NuxtLink
    :key="name"
    class="relative inline-flex items-center text-body-base lg:text-base-xl font-bold group flex-nowrap max-w-max"
    :class="'text-' + color"
    :to="`${to}`"
  >
    {{ name }}

    <Component :is="icon" class="ml-2 h-5 w-5" />

    <span class="absolute -bottom-2 h-0.5 w-8 group-hover:w-full transition-all" :class="'bg-' + color" />
  </NuxtLink>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'chevronRight'
    }
  }
})
</script>
