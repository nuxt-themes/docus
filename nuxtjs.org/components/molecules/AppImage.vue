<template>
  <div
    v-observe-visibility="{
      callback: lazyLoadImage,
      throttle: 250,
      once: true
    }"
    :style="[intristicRatioStyle]"
    class="overflow-hidden relative light:bg-light-surface dark:bg-dark-surface"
  >
    <div />
    <template v-if="isTest || isDev">
      <img
        v-if="show"
        ref="img"
        :src="`${host}/${src}`"
        :alt="alt"
        class="w-full opacity-0 transition-opacity duration-500"
        :class="[ratio && 'absolute top-0 left-0']"
      />
    </template>
    <template v-else>
      <noscript inline-template>
        <img
          :src="`https://res.cloudinary.com/nuxt/image/upload/w_1200,${
            ratio ? `h_${Math.round(1200 * intristicRatio)},` : ''
          }c_fill,f_auto/remote/nuxt-org/${src}`"
          :alt="alt"
        />
      </noscript>
      <img
        v-if="show"
        ref="img"
        :src="`https://res.cloudinary.com/nuxt/image/upload/w_1200,${
          ratio ? `h_${Math.round(1200 * intristicRatio)},` : ''
        }c_fill,f_auto/remote/nuxt-org/${src}`"
        :srcset="`
          https://res.cloudinary.com/nuxt/image/upload/w_160,${
            ratio ? `h_${Math.round(160 * intristicRatio)},` : ''
          }c_fill,f_auto/remote/nuxt-org/${src} 160w,
          https://res.cloudinary.com/nuxt/image/upload/w_240,${
            ratio ? `h_${Math.round(240 * intristicRatio)},` : ''
          }c_fill,f_auto/remote/nuxt-org/${src} 240w,
          https://res.cloudinary.com/nuxt/image/upload/w_320,${
            ratio ? `h_${Math.round(320 * intristicRatio)},` : ''
          }c_fill,f_auto/remote/nuxt-org/${src} 320w,
          https://res.cloudinary.com/nuxt/image/upload/w_560,${
            ratio ? `h_${Math.round(560 * intristicRatio)},` : ''
          }c_fill,f_auto/remote/nuxt-org/${src} 560w,
          https://res.cloudinary.com/nuxt/image/upload/w_800,${
            ratio ? `h_${Math.round(800 * intristicRatio)},` : ''
          }c_fill,f_auto/remote/nuxt-org/${src} 800w,
          https://res.cloudinary.com/nuxt/image/upload/w_920,${
            ratio ? `h_${Math.round(920 * intristicRatio)},` : ''
          }c_fill,f_auto/remote/nuxt-org/${src} 920w,
          https://res.cloudinary.com/nuxt/image/upload/w_1040,${
            ratio ? `h_${Math.round(1040 * intristicRatio)},` : ''
          }c_fill,f_auto/remote/nuxt-org/${src} 1040w,
          https://res.cloudinary.com/nuxt/image/upload/w_1200,${
            ratio ? `h_${Math.round(1200 * intristicRatio)},` : ''
          }c_fill,f_auto/remote/nuxt-org/${src} 1200w
        `"
        :sizes="sizes"
        :alt="alt"
        class="w-full opacity-0 transition-opacity duration-500"
        :class="[ratio && 'absolute top-0 left-0']"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    src: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    ratio: {
      type: String,
      default: null
    },
    sizes: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      show: false,
      loaded: false
    }
  },
  computed: {
    ...mapState({
      host: state => state.host,
      isDev: state => state.isDev,
      isTest: state => state.isTest,
      isProd: state => state.isProd
    }),
    intristicRatio() {
      if (!this.ratio) {
        return 0
      } else {
        const sizes = this.ratio.split(':')
        const ratio = sizes[1] / sizes[0]
        return ratio
      }
    },
    intristicRatioStyle() {
      return {
        'padding-bottom': `${this.intristicRatio * 100}%`
      }
    }
  },
  methods: {
    lazyLoadImage(isVisible, entry) {
      if (isVisible) {
        this.show = true
        this.$nextTick(() => {
          const lazyImage = this.$refs.img

          lazyImage.addEventListener('load', () => {
            lazyImage.classList.add('lazy-loaded')
            this.loaded = true
          })
          lazyImage.addEventListener('error', () => {
            lazyImage.classList.add('lazy-load-error')
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lazy-loaded {
  opacity: 1;
}
</style>
