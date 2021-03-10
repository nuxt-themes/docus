<script>
import { isTag } from '../../utils/vnode'
import CodePreview from './CodePreview'
import StickyCode from './StickyCode'

export default {
  components: {
    CodePreview,
    StickyCode
  },
  props: {
    /**
     * Treshold to switch to the step
     * ex: 0.3, switch to new step only if new step become visible in top 30% of page
     */
    scrollTreshold: {
      type: Number,
      default: 0.3
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeGroupIndex: 0
    }
  },
  mounted () {
    window.removeEventListener('scroll', this.onScroll, true)
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll, true)
  },
  computed: {
    groups () {
      return this.getGroups()
    },
    activeGroup () {
      return this.getActiveCodeBlock(this.activeGroupIndex)
    }
  },
  methods: {
    onScroll () {
      const yOffset = window.pageYOffset
      const windowHeight = window.innerHeight
      if (yOffset === 0) {
        this.setActive(0)
      } else if (yOffset + windowHeight >= document.body.scrollHeight) {
        return this.setActive(this.groups.length - 1)
      } else {
        const targetPoint = yOffset + (windowHeight * this.scrollTreshold)
        let index = 0
        for (let i = 0; i < this._groups.length; i++) {
          if (this.$refs[`title_${i}`]?.$el.offsetTop <= targetPoint) {
            index = i
          }
        }
        this.setActive(index)
      }
    },
    setActive (index) {
      this.activeGroupIndex = index
    },
    getGroups () {
      let index = -1
      const groups = {}
      for (const child of this.$slots.default) {
        if (isTag(child, 'code-group')) {
          index += 1
          groups[index] = {
            codeBlock: child,
            contentChildren: []
          }
          continue
        }
        if (child.text && child.text === "\n") {
          continue
        }
        if (index !== -1) {
          if (isTag(child, 'sticky-code-step')) {
            groups[index].contentChildren.push(groups[index].codeBlock)
          } else {
            groups[index].contentChildren.push(child)
          }
        }
      }
      return Object.values(groups)
    },
    getActiveCodeBlock (activeIndex) {
      const group = this._groups[activeIndex] || (this._groups.length ? this._groups[this._groups.length -1] : null)
      return group?.codeBlock
    }
  },
  render (h) {
    const groups = process.dev ? this.getGroups() : this.groups
    this._groups = groups
    const activeGroup = process.dev ? this.getActiveCodeBlock(this.activeGroupIndex) : this.activeGroup

    const content = groups.map(({ contentChildren, codeBlock }, index) => h('sticky-code-step', {
      ref: `title_${index}`,
      key: `title_${index}`,
      class: { 'opacity-75': index < this.activeGroupIndex }
    }, [
      h('div', { staticClass: 'hidden'}, [codeBlock]),
      ...contentChildren
    ]))

    const stickySidebar = h('CodePreview', { style: { top: '100px' }, staticClass: 'sticky', props: { layout: 'vertical', preview: this.preview } }, [ activeGroup ])

    return h('div', { staticClass: 'sticky-code flex' }, [
      h('div', { staticClass: 'flex-1' }, [content]),
      h('div', { staticClass: 'ml-4 hidden lg:block' }, [stickySidebar])
    ])
  }
}
</script>
