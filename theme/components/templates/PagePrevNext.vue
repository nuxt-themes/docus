<template>
  <div v-if="prev || next" class="flex flex-col justify-between py-4 space-y-2 font-medium leading-7 xs:space-y-0 xs:space-x-3 xs:flex-row">
    <NuxtLink
      v-if="prev"
      :to="$contentLocalePath(prev.to)"
      class="flex items-center justify-start w-full px-4 py-4 truncate border border-gray-100 rounded xs:justify-end xs:w-1/2 dark:text-gray-400 dark:border-gray-800 dark:hover:text-primary-400 hover:text-primary-500"
    >
      <IconArrowLeft class="flex-shrink-0 order-first w-4 h-4 mr-2 xs:order-last xs:mr-0 xs:ml-2" />
      <span class="truncate">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else>&nbsp;</span>

    <NuxtLink
      v-if="next"
      :to="$contentLocalePath(next.to)"
      class="flex items-center justify-end w-full px-4 py-4 truncate border border-gray-100 rounded xs:justify-start xs:w-1/2 dark:text-gray-400 dark:border-gray-800 dark:hover:text-primary-400 hover:text-primary-500"
    >
      <IconArrowRight class="flex-shrink-0 order-last w-4 h-4 ml-2 xs:ml-0 xs:mr-2 xs:order-first" />
      <span class="truncate">{{ next.title }}</span>
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
