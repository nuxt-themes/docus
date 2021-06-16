<template>
  <div
    v-if="toc.length"
    class="
      sticky
      z-10
      left-0
      flex-none
      w-full
      text-sm
      bg-white
      border-b border-gray-200 border-opacity-50 border-dashed
      xl:hidden
      dark:border-gray-800
      d-blur-header
      bg-opacity-80
      dark:bg-gray-900 dark:bg-opacity-80
      lg:left-60
      pl-4
      sm:pl-6
      top-header
    "
  >
    <!-- mobile ToC title + button -->
    <button
      class="
        relative
        z-10
        flex
        items-center
        w-full
        py-3
        text-sm
        font-semibold
        text-gray-900
        focus:outline-none
        xl:hidden
        dark:text-gray-100
      "
      @click="showMobileToc = !showMobileToc"
    >
      <span class="mr-2">{{ title || $t('toc.title') }}</span>
      <IconChevronRight
        class="w-4 h-4 text-gray-500 transition-transform duration-100 transform"
        :class="[showMobileToc ? 'rotate-90' : 'rotate-0']"
      />
    </button>

    <div
      :class="[showMobileToc ? 'flex' : 'hidden xl:flex']"
      class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-header) -mt-10 pt-10 pb-4 top-header"
    >
      <PageTocTop />

      <h5 class="items-center hidden mb-2 xl:flex">
        <span class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ title || $t('toc.title') }}</span>
      </h5>

      <PageTocList :toc="toc" @click.native="showMobileToc = false" />

      <PageTocBottom />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

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
  },
  setup() {
    const showMobileToc = ref(false)

    return {
      showMobileToc
    }
  }
})
</script>
