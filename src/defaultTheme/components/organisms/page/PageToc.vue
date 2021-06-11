<template>
  <div
    v-if="toc.length"
    class="
      hidden
      xl:sticky
      z-10
      left-0
      flex-none
      w-full
      pl-4
      mr-8
      text-sm
      bg-white
      border-b border-gray-200 border-opacity-50
      xl:relative xl:border-0
      dark:border-gray-800
      blur-header
      bg-opacity-80
      dark:bg-gray-900 dark:bg-opacity-80
      xl:bg-transparent
      dark:xl:bg-transparent
      lg:left-60
      xl:left-0
      pl-4
      sm:pl-6
      xl:w-64
      top-header
      xl:block xl:top-0
    "
  >
    <div
      class="
        hidden
        xl:flex
        flex-col
        justify-between
        overflow-y-auto
        sticky
        max-h-(screen-header)
        -mt-10
        pt-10
        pb-4
        top-header
      "
    >
      <PageTocTop />

      <h5 class="items-center hidden mb-2 xl:flex">
        <span class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ title || $t('toc.title') }}</span>
      </h5>

      <PageTocList :toc="toc" />

      <PageTocBottom />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    toc: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: null
    }
  }
})
</script>
