<template>
  <div v-if="prev || next" class="flex justify-between leading-7 font-medium space-x-3">
    <NuxtLink
      v-if="prev"
      :to="$contentLocalePath(prev.to)"
      class="text-primary-500 dark:text-primary-400 hover:underline flex items-center justify-start truncate"
    >
      <IconArrowLeft class="w-4 h-4 mr-1 flex-shrink-0" />
      <span class="truncate">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else>&nbsp;</span>

    <NuxtLink
      v-if="next"
      :to="$contentLocalePath(next.to)"
      class="text-primary-500 dark:text-primary-400 hover:underline flex items-center justify-end truncate"
    >
      <span class="truncate">{{ next.title }}</span>
      <IconArrowRight class="w-4 h-4 ml-1 flex-shrink-0" />
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    ...mapGetters([
      'settings'
    ])
  }
}
</script>
