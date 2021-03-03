<template>
  <div v-if="toc.length" class="flex-none hidden w-64 pl-8 mr-8 xl:text-sm xl:block">
    <TocTop />
    <div class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) -mt-10 pt-10 pb-4 top-18">
      <h5 class="flex items-center mb-1">
        <svg class="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path fill="currentColor" d="M2,4 L2,3 L4,3 L4,4 L2,4 Z M6,4 L6,3 L14,3 L14,4 L6,4 Z M6,7 L6,6 L14,6 L14,7 L6,7 Z M6,10 L6,9 L14,9 L14,10 L6,10 Z M2,7 L2,6 L4,6 L4,7 L2,7 Z M2,10 L2,9 L4,9 L4,10 L2,10 Z M6,13 L6,12 L14,12 L14,13 L6,13 Z M2,13 L2,12 L4,12 L4,13 L2,13 Z"/>
        </svg>
        <!-- <svg class="w-5 h-5 mr-2 text-gray-400" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"><g><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></g></svg> -->
        <span class="text-sm font-semibold text-gray-600 uppercase dark:text-gray-100 lg:text-xs">{{ $t('toc.title') }}</span>
      </h5>

      <ul class="overflow-x-hidden font-medium">
        <li
          v-for="link of toc"
          :key="link.id"
          class="hover:text-gray-900 dark:hover:text-gray-100"
          :class="{ 'text-primary-500 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-400': exactActiveLink === link.id || activeLink === link.id }"
        >
          <a
            :href="`#${link.id}`"
            class="block py-1 transition-colors duration-100 transform scrollactive-item"
            :class="{
              'mt-2 mb-1': link.depth === 2,
              'border-l border-gray-100 dark:border-gray-800 pl-3': link.depth === 3,
              'dark:border-primary-500 border-primary-500': link.depth === 3 && (exactActiveLink === link.id || activeLink === link.id)
            }"
          >{{ link.text }}</a>
        </li>
      </ul>
      <TocBottom />
    </div>
  </div>
</template>

<script>
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
      sections: []
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
      const offset = document.querySelector(location.hash).offsetTop - 110 // 110 is the deafult value for `top-margin-scroll` in tailwind prose
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
    }
  }
}
</script>
