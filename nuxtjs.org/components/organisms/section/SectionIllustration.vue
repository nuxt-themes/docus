<template>
  <div>
    <img
      v-for="(resolution, index) in resolutions"
      :id="index"
      :key="index"
      loading="lazy"
      :src="`${path}_${resolution}.svg`"
      class="w-full pointer-events-none select-none"
      :class="{
        'absolute right-0': background,
        'bottom-safe0': background && bgPosition === 'bottom',
        'top-safe0': background && bgPosition === 'top',
        'object-cover max-h-128': cover,
        'md:hidden': resolution === 'sm',
        'xs:hidden md:block lg:hidden': resolution === 'md',
        'xs:hidden lg:block xl:hidden': resolution === 'lg',
        'xs:hidden xl:block 2xl:hidden': resolution === 'xl',
        'xs:hidden 2xl:block': resolution === '2xl'
      }"
    />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    path: {
      type: String,
      required: true
    },
    background: {
      type: Boolean,
      default: false
    },
    bgPosition: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['bottom', 'top'].includes(value)
      }
    },
    cover: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const resolutions = ['sm', 'md', 'lg', 'xl', '2xl']
    return { resolutions }
  }
})
</script>
