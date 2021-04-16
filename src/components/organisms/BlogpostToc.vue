<template>
  <div
    class="sticky top-header z-10 text-sm bg-white border-dashed border-b border-gray-100 dark:border-gray-800 blur-header bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 px-4"
  >
    <button
      class="relative z-10 flex items-center w-full py-3 text-sm font-semibold text-gray-900 focus:outline-none dark:text-gray-100"
      @click="showMobileToc = !showMobileToc"
    >
      <span class="mr-2">{{ $t('toc.title') }}</span>
      <IconChevronRight
        class="w-4 h-4 text-gray-400 transition-transform duration-100 transform"
        :class="[showMobileToc ? 'rotate-90' : 'rotate-0']"
      />
    </button>

    <ul :class="[showMobileToc ? 'flex flex-col' : 'hidden']" class="overflow-x-hidden font-medium pb-4">
      <li
        v-for="link of filteredToc"
        :key="link.id"
        class=""
        :class="{
          'text-primary-500 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-400':
            exactActiveLink === link.id || activeLink === link.id,
          'text-gray-700 dark:text-gray-200': !(exactActiveLink === link.id || activeLink === link.id)
        }"
        @click="showMobileToc = false"
      >
        <a
          :href="`#${link.id}`"
          class="block py-1 transition-colors duration-100 transform scrollactive-item"
          :class="{
            'hover:text-primary-500 dark:hover:text-primary-400': link.depth === 2,
            'border-l border-gray-100 dark:border-gray-800 pl-3  hover:text-primary-400 dark:hover:text-primary-400':
              link.depth === 3,
            'text-gray-500 dark:text-gray-400':
              link.depth === 3 && !(exactActiveLink === link.id || activeLink === link.id),
            'dark:border-primary-500 border-primary-500 dark:text-primary-400 ':
              link.depth === 3 && (exactActiveLink === link.id || activeLink === link.id)
          }"
          @click.prevent="scrollToHeading(link.id, '--blogpost-scroll-margin-block')"
          >{{ link.text }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from '@nuxtjs/composition-api'
import { scrollToHeading } from '../utils'

export default defineComponent({
  props: {
    toc: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const state = reactive({
      activeLink: '',
      exactActiveLink: '',
      showMobileToc: false
    })

    const filteredToc = computed(() => {
      const toc = [...props.toc]
      toc.shift()
      return toc
    })

    return {
      ...toRefs(state),
      scrollToHeading,
      filteredToc
    }
  }
})
</script>
