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
      xl:hidden
      d-blur-header d-page-mobile-toc-bg
      lg:left-60
      px-4
      sm:px-6
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
        class="w-4 h-4 d-secondary-text transition-transform duration-100 transform"
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

      <div class="overflow-y-auto overflow-hidden max-h-[50vh]">
        <PageTocList :toc="toc" @click.native="showMobileToc = false" />
      </div>
    </div>
    <hr class="border-dashed d-border" />
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
