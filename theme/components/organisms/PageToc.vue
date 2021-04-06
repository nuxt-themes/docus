<template>
  <div v-if="toc.length" class="sticky left-0 flex-none w-full pl-4 mr-8 text-sm bg-white border-b border-gray-100 xl:relative xl:border-0 dark:border-gray-800 backdrop bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 xl:bg-transparent lg:left-60 xl:left-0 sm:pl-6 xl:pl-8 xl:w-64 top-header xl:block xl:top-0">
    <button class="relative z-10 flex items-center w-full py-3 text-sm font-semibold text-gray-900 focus:outline-none xl:hidden dark:text-gray-100" @click="showMobileToc = !showMobileToc">
      <span class="mr-2">{{ title || $t('toc.title') }}</span>
      <IconChevronRight class="w-4 h-4 text-gray-400 transition-transform duration-100 transform" :class="[showMobileToc ? 'rotate-90' : 'rotate-0']" />
    </button>

    <div :class="[showMobileToc ? 'flex' : 'hidden xl:flex']" class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-header) -mt-10 pt-10 pb-4 top-header">
      <PageTocTop />

      <h5 class="items-center hidden mb-2 xl:flex">
        <span class="text-sm font-semibold text-gray-900 dark:text-gray-100 ">{{ title || $t('toc.title') }}</span>
      </h5>

      <ul class="font-medium">
        <li
          v-for="link of toc"
          :key="link.id"
          class=""
          :class="{
            'text-primary-500 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-400': activeTitles.includes(link.id),
            'text-gray-700 dark:text-gray-200': !(activeTitles.includes(link.id))
          }"
          @click="showMobileToc = false"
        >
          <a
            :href="`#${link.id}`"
            class="block py-1 transition-colors duration-100 transform scrollactive-item "
            :class="{
              'hover:text-primary': link.depth === 2,
              'border-l border-gray-100 dark:border-gray-800 pl-3  hover:text-primary-400 dark:hover:text-primary-400': link.depth === 3,
              'text-gray-500 dark:text-gray-400': link.depth === 3 && !(activeTitles.includes(link.id)),
              'dark:border-primary-500 border-primary-500 dark:text-primary-400 ': link.depth === 3 && (activeTitles.includes(link.id))
            }"
            @click.prevent="scrollToHeading(link.id)"
          >{{ link.text }}</a>
        </li>
      </ul>
      <PageTocBottom />
    </div>
  </div>
</template>

<script>
import { convertPropToPixels } from '../../utils/dom'

export default {
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
  data () {
    return {
      visibleTitles: [],
      activeTitles: [],
      showMobileToc: false
    }
  },
  watch: {
    visibleTitles (val, oldVal) {
      if (val.length === 0) {
        this.activeTitles = oldVal
      } else {
        this.activeTitles = val
      }
    }
  },
  mounted () {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      this.scrollToHeading(hash)
    }
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const hash = entry.target.id
        if (entry.isIntersecting) {
          this.visibleTitles.push(hash)
        } else {
          this.visibleTitles = this.visibleTitles.filter(t => t !== hash)
        }
      })
    }
    this.observer = new IntersectionObserver(observerCallback)

    const headings = [...document.querySelectorAll('.nuxt-content h2'), ...document.querySelectorAll('.nuxt-content h3')]
    headings.forEach((heading) => {
      this.observer.observe(heading)
    })
  },
  beforeDestroy () {
    this.observer.disconnect()
  },
  methods: {
    scrollToHeading (id) {
      const hash = id
      // use replaceState to prevent page jusmp when adding hash
      history.replaceState({}, '', '#' + hash)
      setTimeout(() => {
        const offset = document.querySelector(`#${hash}`).offsetTop - parseInt(convertPropToPixels('--scroll-margin-block'))
        window.scrollTo(0, offset)
      })
    }
  }
}
</script>
