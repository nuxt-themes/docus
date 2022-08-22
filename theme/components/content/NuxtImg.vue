<script lang="ts">
import type { PropType } from 'vue'

type NuxtImg = string & {
  light: string
  dark: string
}

export default defineComponent({
  props: {
    src: {
      type: [String, Object] as PropType<NuxtImg>,
      default: null
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    height: {
      type: [String, Number],
      default: undefined
    }
  },
  setup (props) {
    const imgSrc = computed(() => {
      let src = props.src

      try {
        src = JSON.parse(src as any)
      } catch (e) {
        src = props.src
      }

      if (typeof src === 'string') { return props.src }

      return src
    })

    return {
      imgSrc
    }
  },
  render ({ imgSrc }) {
    // String as `src`; return a single image
    if (typeof imgSrc === 'string') {
      return h('img', { src: imgSrc })
    }

    // Object as `src`; return a light and dark image if present
    const nodes = []
    if (imgSrc.light) {
      nodes.push(h('img', { src: imgSrc.light, class: ['dark-img'] }))
    }
    if (imgSrc.dark) {
      nodes.push(h('img', { src: imgSrc.dark, class: ['light-img'] }))
    }

    return nodes
  }
})
</script>
