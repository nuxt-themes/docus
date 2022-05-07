<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, h } from '#imports'

type NuxtImg = string & {
  light: string
  dark: string
}

export default defineComponent({
  props: {
    src: {
      type: [String, Object] as PropType<NuxtImg>,
      default: null,
    },
    imageClasses: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: undefined,
    },
    height: {
      type: [String, Number],
      default: undefined,
    },
  },
  setup() {
    const imgSrc = computed(() => {
      let src = props.src

      try {
        src = JSON.parse(src as any)
      } catch (e) {
        src = props.src
      }

      if (typeof src === 'string') return props.src

      return src
    })

    return {
      imgSrc,
    }
  },
  render({ imgSrc }) {
    if (!imgSrc.value) return null

    return typeof imgSrc.value === 'string'
      ? h('img', { src: imgSrc.value })
      : [imgSrc?.value?.light ? h('img', { src: imgSrc.value?.light }) : null, imgSrc?.value?.dark ? h('img', { src: imgSrc.value?.dark }) : null]
  },
})
</script>

<template>
  <img v-if="typeof src === 'string'" :src="src" :alt="alt" :width="width" :height="height" />
  <img v-if="src?.light" class="dark-img" :src="src.light" :alt="alt" :width="width" :height="height" />
  <img v-if="src?.dark" class="light-img" :src="src.dark" :alt="alt" :width="width" :height="height" />
</template>
