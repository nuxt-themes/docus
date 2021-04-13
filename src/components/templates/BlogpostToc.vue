<template>
  <div
    class="sticky top-header z-10 text-sm bg-white border-dashed border-b border-gray-100 dark:border-gray-800 backdrop bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 px-4"
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
          @click.prevent="scrollToHeading"
          >{{ link.text }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { convertPropToPixels } from '../utils'

export default {
  props: {
    toc: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeLink: '',
      exactActiveLink: '',
      showMobileToc: false
    }
  },
  computed: {
    filteredToc() {
      const toc = [...this.toc]
      toc.shift()
      return toc
    }
  },
  methods: {
    scrollToHeading(e) {
      const hash = e.target.href.split('#').pop()
      // use replaceState to prevent page jusmp when adding hash
      history.replaceState({}, '', '#' + hash)
      setTimeout(() => {
        const offset =
          document.querySelector(`#${hash}`).offsetTop - parseInt(convertPropToPixels('--blogpost-scroll-margin-block'))
        window.scrollTo(0, offset)
      })
    }
  }
}
</script>

<style scoped>
.backdrop {
  backdrop-filter: blur(12px);
}
</style>
