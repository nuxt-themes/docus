<template>
  <div v-if="prev || next" class="flex mb-8 flex-col justify-between font-medium leading-7 xs:space-x-2 xs:flex-row">
    <div class="flex justify-start items-center w-full xs:w-1/2">
      <NuxtLink
        v-if="prev"
        :to="$contentLocalePath(prev.to)"
        class="
          inline-flex
          items-center
          justify-start
          w-full
          px-4
          py-3
          truncate
          border
          d-border
          hover:d-border-hover
          rounded-xl
          group
          xs:w-auto
          hover:d-text-primary
        "
      >
        <span class="relative flex flex-col items-end truncate">
          <span v-if="prev.category" class="mb-1 text-xs leading-tight d-secondary-text">
            {{ prev.category }}
          </span>
          <span class="flex items-center w-full leading-tight">
            <IconArrowLeft class="flex-shrink-0 w-4 h-4 mr-2" />
            <span class="truncate">{{ prev.title }}</span>
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
          py-3
          mb-2
          truncate
          border
          d-border
          hover:d-border-hover
          rounded-xl
          group
          xs:mb-0 xs:w-auto
          hover:d-text-primary
        "
      >
        <span class="relative flex flex-col items-start truncate">
          <span v-if="next.category" class="mb-1 text-xs leading-tight d-secondary-text">
            {{ next.category }}
          </span>
          <span class="flex items-center w-full leading-tight">
            <span class="truncate">{{ next.title }}</span>
            <IconArrowRight class="flex-shrink-0 w-4 h-4 ml-2" />
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
