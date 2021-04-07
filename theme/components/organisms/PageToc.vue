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
          v-for="link of mockedToc"
          :key="link.id"
          @click="showMobileToc = false"
        >
          <a
            :href="`#${link.id}`"
            class="block py-1 transition-colors duration-100 transform "
            :class="{
              'text-primary-500 dark:text-primary-400 hover:text-primary-400 dark:hover:text-primary-300': activeHeadings.includes(link.id) || isActiveParent(link),
              'text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400': !(activeHeadings.includes(link.id)) && !isActiveParent(link)
            }"
            @click.prevent="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </a>

          <ul v-if="link.children" class="overflow-x-hidden font-medium">
            <li
              v-for="childLink in link.children"
              :key="childLink.id"
            >
              <a
                :href="`#${childLink.id}`"
                :class="{
                  'dark:border-primary-500 border-primary-500 dark:text-primary-400 text-primary-500 hover:text-primary-400 dark:text-primary-400 dark:hover:text-primary-400': activeHeadings.includes(childLink.id),
                  'text-gray-500 dark:text-gray-400 hover:text-primary-500': !(activeHeadings.includes(childLink.id))
                }"
                class="border-l border-gray-100 dark:border-gray-800 pl-3 block py-1 transition-colors duration-100 transform"
                @click.prevent="scrollToHeading(childLink.id)"
              >
                {{ childLink.text }}
              </a>
            </li>
          </ul>
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
      visibleHeadings: [],
      activeHeadings: [],
      showMobileToc: false,
      mockedToc: []
    }
  },
  watch: {
    visibleHeadings (val, oldVal) {
      if (val.length === 0) {
        this.activeHeadings = oldVal
      } else {
        this.activeHeadings = val
      }
    }
  },
  mounted () {
    // temporary mock structured toc
    this.toc.map((item, i) => {
      if (item.depth === 2) {
        this.mockedToc.push(item)
      } else if (item.depth === 3) {
        const parent = this.mockedToc[this.mockedToc.length - 1]
        if (!parent.children) { parent.children = [] }
        parent.children.push(item)
      }
    })

    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '')
      this.scrollToHeading(hash)
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        if (entry.isIntersecting) {
          this.visibleHeadings.push(id)
        } else {
          this.visibleHeadings = this.visibleHeadings.filter(t => t !== id)
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
      const offset = document.querySelector(`#${hash}`).offsetTop - parseInt(convertPropToPixels('--scroll-margin-block'))
      window.scrollTo(0, offset)
    },
    isActiveParent (link) {
      return link.children && link.children.some(child => this.activeHeadings.includes(child.id))
    }
  }
}
</script>
