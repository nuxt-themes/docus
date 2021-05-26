<template>
  <div v-if="prev || next" class="flex mb-4 flex-col justify-between font-medium leading-7 xs:space-x-2 xs:flex-row">
    <div class="flex justify-start w-full xs:w-1/2">
      <NuxtLink
        v-if="prev"
        :to="$contentLocalePath(prev.to)"
        class="
          inline-flex
          items-center
          justify-start
          w-full
          px-4
          py-4
          truncate
          border border-gray-100
          rounded
          group
          xs:w-auto
          dark:text-gray-400
          dark:border-gray-800 dark:border-opacity-50
          dark:hover:text-primary-400
          hover:text-primary
          hover:border-primary-200
          dark:hover:border-gray-700
        "
      >
        <span class="relative flex flex-col items-end truncate">
          <span v-if="prev.category" class="mb-1 text-xs leading-tight text-gray-400 group-hover:text-primary-400">
            {{ prev.category }}
          </span>
          <span class="flex items-center w-full leading-tight">
            <IconArrowLeft class="flex-shrink-0 w-4 h-4 mr-2 text-primary" />
            <span class="truncate text-primary">{{ prev.title }}</span>
          </span>
        </span>
      </NuxtLink>
    </div>

    <div class="flex justify-end order-first w-full xs:order-last xs:w-1/2">
      <NuxtLink
        v-if="next"
        :to="$contentLocalePath(next.to)"
        class="
          inline-flex
          items-center
          justify-end
          w-full
          px-4
          py-4
          mb-2
          truncate
          border border-gray-100
          rounded
          group
          xs:mb-0
          xs:w-auto
          dark:text-gray-400
          dark:border-gray-800
          hover:text-primary
          hover:border-primary-200
          dark:hover:border-gray-700
          dark:border-opacity-50
        "
      >
        <span class="relative flex flex-col items-start truncate">
          <span v-if="next.category" class="mb-1 text-xs leading-tight text-gray-400 group-hover:text-primary-400">
            {{ next.category }}
          </span>
          <span class="flex items-center w-full leading-tight">
            <span class="truncate text-primary">{{ next.title }}</span>
            <IconArrowRight class="flex-shrink-0 w-4 h-4 ml-2 text-primary" />
          </span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    prev: {
      type: Object,
      default: null
    },
    next: {
      type: Object,
      default: null
    }
  }
})
</script>
