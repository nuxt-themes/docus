<template>
  <div v-if="prev || next" class="flex justify-between space-x-3 font-medium leading-7">
    <NuxtLink
      v-if="prev"
      :to="$contentLocalePath(prev.to)"
      class="flex items-center justify-start truncate text-primary-500 dark:text-primary-400 hover:underline"
    >
      <IconArrowLeft class="flex-shrink-0 w-4 h-4 mr-1" />
      <span class="truncate">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else>&nbsp;</span>

    <NuxtLink
      v-if="next"
      :to="$contentLocalePath(next.to)"
      class="flex items-center justify-end truncate text-primary-500 dark:text-primary-400 hover:underline"
    >
      <span class="truncate">{{ next.title }}</span>
      <IconArrowRight class="flex-shrink-0 w-4 h-4 ml-1" />
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
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
  }
}
</script>
