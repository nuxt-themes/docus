<template>
  <div v-if="toc.length" class="flex-none hidden w-64 pl-8 mr-8 xl:text-sm xl:block">
    <div class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) -mt-10 pt-10 pb-4 top-18">
      <div class="mb-8">
        <h5 class="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100 lg:text-xs">{{ $t('toc.title') }}</h5>

        <ul class="overflow-x-hidden font-medium">
          <li
            v-for="link of toc"
            :key="link.id"
            class="hover:text-gray-900 dark:hover:text-gray-100"
            :class="{ 'text-primary-500 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-400': exactActiveLink === link.id || activeLink === link.id }"
          >
            <a
              :href="`#${link.id}`"
              class="block py-2 transition-colors duration-100 transform scrollactive-item"
              :class="{
                'ml-2': link.depth === 3,
                'ml-3': link.depth === 4,
                'ml-4': link.depth === 5,
                'ml-5': link.depth === 6
              }"
            >{{ link.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters([
      'settings'
    ])
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
      scrollTo(0, document.querySelector(location.hash).offsetTop - 110) // 110 is the deafult value for `top-margin-scroll` in tailwind prose
      this.setActive(hashIndex)
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
