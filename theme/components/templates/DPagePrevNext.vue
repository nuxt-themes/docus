<template>
  <div v-if="prev || next" class="flex flex-col justify-between xs:space-x-2 py-4 font-medium leading-7 xs:flex-row">
    <div class="w-full xs:w-1/2 flex justify-start">
      <NuxtLink
        v-if="prev"
        :to="$contentLocalePath(prev.to)"
        class="group inline-flex items-center justify-end w-full xs:w-auto px-4 py-4 truncate border border-gray-100 rounded xs:justify-end  dark:text-gray-400 dark:border-gray-800 dark:hover:text-primary-400 hover:text-primary-500 hover:border-primary-400"
      >
        <span class="relative flex flex-col items-end truncate">
          <span class="text-xs leading-tight  text-gray-400 group-hover:text-primary-400">{{ prev.category }}</span>
          <span class="w-full leading-tight flex items-center"> 
            <IconArrowLeft class="text-primary-500 flex-shrink-0 w-4 h-4 mr-2" />
            <span class="truncate text-primary-500">{{ prev.title }}</span>
          </span>
        </span>
      </NuxtLink>
    </div>

    <div class="order-first xs:order-last w-full xs:w-1/2 flex justify-end">
      <NuxtLink
        v-if="next"
        :to="$contentLocalePath(next.to)"
        class="group inline-flex mb-2 xs:mb-0 items-center justify-start w-full xs:w-auto min-w-1/2 px-4 py-4 truncate border border-gray-100 rounded xs:justify-start dark:text-gray-400 dark:border-gray-800 dark:hover:text-primary-400 hover:text-primary-500 hover:border-primary-400"
      >
        <span class="relative flex flex-col items-start truncate">
          <span class="text-xs leading-tight  text-gray-400 group-hover:text-primary-400">{{ prev.category }}</span>
          <span class="w-full leading-tight flex items-center">
            <span class="truncate text-primary-500">{{ next.title }}</span>
            <IconArrowRight class="text-primary-500 flex-shrink-0 w-4 h-4 ml-2" />
          </span>
        </span>
      </NuxtLink>
    </div>
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
