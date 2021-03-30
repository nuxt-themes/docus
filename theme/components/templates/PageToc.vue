<template>
  <div v-if="toc.length" class="sticky left-0 flex-none w-full pl-4 mr-8 text-sm bg-white border-b border-gray-100 xl:relative xl:border-0 dark:border-gray-800 backdrop bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 xl:bg-transparent lg:left-60 xl:left-0 sm:pl-6 xl:pl-8 xl:w-64 top-header xl:block xl:top-0">
    <button class="relative z-10 flex items-center w-full py-3 text-sm font-semibold text-gray-900 focus:outline-none xl:hidden dark:text-gray-100" @click="showMobileToc = !showMobileToc">
      <span class="mr-2">{{ $t('toc.title') }}</span>
      <IconChevronRight class="w-4 h-4 text-gray-400 transition-transform duration-100 transform" :class="[showMobileToc ? 'rotate-90' : 'rotate-0']" />
    </button>

    <div :class="[showMobileToc ? 'flex' : 'hidden xl:flex']" class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-header) -mt-10 pt-10 pb-4 top-header">
      <PageTocTop />

      <h5 class="items-center hidden mb-2 xl:flex">
        <span class="text-sm font-semibold text-gray-900 dark:text-gray-100 ">{{ $t('toc.title') }}</span>
      </h5>

      <ul class="overflow-x-hidden font-medium">
        <li
          v-for="link of toc"
          :key="link.id"
          class=""
          :class="{
            'text-primary-500 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-400': exactActiveLink === link.id || activeLink === link.id,
            'text-gray-700 dark:text-gray-200': !(exactActiveLink === link.id || activeLink === link.id)
          }"
          @click="showMobileToc = false"
        >
          <a
            :href="`#${link.id}`"
            class="block py-1 transition-colors duration-100 transform scrollactive-item "
            :class="{
              'hover:text-primary-500 dark:hover:text-primary-400': link.depth === 2,
              'border-l border-gray-100 dark:border-gray-800 pl-3  hover:text-primary-400 dark:hover:text-primary-400': link.depth === 3,
              'text-gray-500 dark:text-gray-400': link.depth === 3 && !(exactActiveLink === link.id || activeLink === link.id),
              'dark:border-primary-500 border-primary-500 dark:text-primary-400 ': link.depth === 3 && (exactActiveLink === link.id || activeLink === link.id)
            }"
            @click.prevent="scrollToHeading"
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
    }
  },
  data () {
    return {
      activeLink: '',
      exactActiveLink: '',
      sections: [],
      showMobileToc: false
    }
  },
  computed: {
    settings () {
      return this.$docus.settings
    }
  },
  beforeMount () {
    history.scrollRestoration = 'manual'
  },
  mounted () {
    document
      .querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]')
      .forEach((section) => {
        this.sections.push({
          level: section.tagName.replace(/h/i, ''),
          id: section.getAttribute('id'),
          top: section.offsetTop
        })
      })
    const hash = window.location.hash.replace('#', '')
    const hashIndex = this.sections.findIndex(section => section.id === hash)
    if (hash && hashIndex >= 0) {
      const offset = document.querySelector(location.hash).offsetTop - 110 // 110 is the default value for `top-margin-scroll` in windi prose
      this.$nextTick().then(() => {
        scrollTo(0, offset)
        this.setActive(hashIndex)
      })
    } else {
      this.onScroll()
    }
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll, true)
  },
  methods: {
    onScroll () {
      const yOffset = window.pageYOffset
      const windowHeight = window.innerHeight
      if (yOffset === 0) {
        this.setActive(0)
      } else if (yOffset + windowHeight >= document.body.scrollHeight) {
        return this.setActive(this.sections.length - 1)
      } else {
        const targetPoint = yOffset + windowHeight / 2
        let index = 0
        for (let i = 0; i < this.sections.length; i++) {
          if (this.sections[i].top <= targetPoint) {
            index = i
          }
        }
        this.setActive(index)
      }
    },
    setActive (index) {
      if (!this.sections[index]) {
        return
      }
      this.exactActiveLink = this.sections[index].id
      this.activeLink = this.sections[index].id
      if (this.sections[index].level === '3') {
        let parentIndex = -1
        for (let i = 0; i < index; i++) {
          if (this.sections[i].level === '2') {
            parentIndex = i
          }
        }
        if (parentIndex >= 0) {
          this.activeLink = this.sections[parentIndex].id
        }
      }
    },
    scrollToHeading (e) {
      const hash = e.target.href.split('#').pop()
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

<style scoped>
.backdrop {
  backdrop-filter: blur(12px);
}
</style>
