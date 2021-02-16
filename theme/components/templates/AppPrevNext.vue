<template>
  <div v-if="prev || next" class="flex justify-between font-medium leading-7">
    <NuxtLink
      v-if="prev"
      :to="localePath(prev.to)"
      class="flex items-center justify-start text-primary-500 dark:text-primary-400 hover:underline"
    >
      <IconArrowLeft class="flex-shrink-0 w-4 h-4 mr-1" />
      <span class="truncate">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else>&nbsp;</span>

    <NuxtLink
      v-if="next"
      :to="localePath(next.to)"
      class="flex items-center justify-end text-primary-500 dark:text-primary-400 hover:underline"
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
