<script lang="ts">
import { withBase } from 'ufo'
import type { PropType } from 'vue'

type NuxtThemedImg = {
  light: string
  dark: string
}
type NuxtImg = string & NuxtThemedImg

export default defineComponent({
  props: {
    src: {
      type: [String, Object] as PropType<NuxtImg>,
      default: null
    }
  },
  setup (props) {
    const srcWithBase = (src?: string) => {
      if (src && src.startsWith('/') && !src.startsWith('//')) {
        return withBase(src, useRuntimeConfig().app.baseURL)
      }

      return src
    }

    const imgSrc = computed(() => {
      let src: NuxtImg = props.src

      try {
        src = JSON.parse(src as any)
      } catch (e) {
        src = props.src
      }

      if (typeof src === 'string') { return srcWithBase(props.src) }

      return {
        light: srcWithBase((src as NuxtThemedImg).light),
        dark: srcWithBase((src as NuxtThemedImg).dark)
      }
    })

    return {
      imgSrc
    }
  },
  render ({ imgSrc }) {
    // String as `src`; return a single image
    if (typeof imgSrc === 'string') { return h('img', { src: imgSrc, ...this.$attrs }) }

    // Object as `src`; return a light and dark image if present
    const nodes = []
    if (imgSrc.light) { nodes.push(h('img', { src: imgSrc.light, class: ['dark-img'], ...this.$attrs })) }
    if (imgSrc.dark) { nodes.push(h('img', { src: imgSrc.dark, class: ['light-img'], ...this.$attrs })) }

    return nodes
  }
})
</script>
