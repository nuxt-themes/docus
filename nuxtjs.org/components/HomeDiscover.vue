<template>
  <div>
    <img
      loading="lazy"
      :src="`/img/home/discover/modules/dark/landscape-discover-modules-t.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-24 light:hidden"
      alt="A landscape image"
    />
    <img
      loading="lazy"
      :src="`/img/home/discover/modules/light/landscape-discover-modules-t.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-24 dark:hidden"
      alt="A landscape image"
    />

    <HomeSection class="pt-40 light:bg-gray-50 dark:bg-secondary-darkest">
      <template #section-content>
        <SectionContent class="col-span-12 justify-center">
          <template #category>
            <CategoryLabel :label="category" />
          </template>

          <template #title>
            <h2
              class="
                font-normal
                text-center
                md:text-left
                font-serif
                text-display-6
                md:text-display-5
                2xl:text-display-4
              "
            >
              <Markdown slot="title" unwrap="p" />
            </h2>
          </template>

          <template #paragraph>
            <SectionDescription class="py-4 w-full" size="md">
              Nuxt is an Open Source web framework based on official Vue.js libraries, Node.js and using powerful
              development tools such as Vite, Webpack, Babel and PostCSS. Nuxt's purpose is to make web application
              development intuitive and performant with a great developer experience in mind.
            </SectionDescription>
          </template>
        </SectionContent>
      </template>
      <template #right-illustration>
        <div class="col-span-12">
          <div class="flex flex-col md:flex-row justify-center items-center">
            <div
              class="
                grid grid-cols-3
                gap-8
                md:gap-0 md:flex md:flex-col
                items-center
                md:items-start
                space-x-4
                md:space-x-0 md:space-y-2 md:w-2/5
                xl:w-1/5
              "
            >
              <div v-for="(animation, index) in animations" :key="animation.name">
                <div class="flex flex-col-reverse md:flex-row md:flex-row justify-center items-center space-x-2">
                  <img
                    :src="`/img/home/discover/diamond.svg`"
                    alt="diamond"
                    class="h-4 w-4 opacity-0"
                    :class="{ 'opacity-100': index === currentIndex }"
                  />
                  <button
                    class="font-semibold"
                    :class="
                      index === currentIndex ? 'text-gray-700 dark:text-white' : 'text-gray-400 dark:text-gray-400'
                    "
                    @click="changeAnimation(index)"
                  >
                    {{ animation.name }}
                  </button>
                </div>
              </div>
            </div>
            <div class="anim">
              <div ref="lottieAnim" class="h-96" />
            </div>
          </div>
        </div>
      </template>
    </HomeSection>

    <img
      loading="lazy"
      :src="`/img/home/discover/modules/dark/landscape-discover-modules-b.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-20 z-10 light:hidden"
      alt="A landscape image"
    />
    <img
      loading="lazy"
      :src="`/img/home/discover/modules/light/landscape-discover-modules-b.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-20 z-10 dark:hidden"
      alt="A landscape image"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch, useContext, computed } from '@nuxtjs/composition-api'
import lottie, { AnimationItem, AnimationSegment } from 'lottie-web'
export default defineComponent({
  setup(_props, context) {
    const { $colorMode } = useContext() as any
    const lottieAnimPathLight = 'https://assets10.lottiefiles.com/private_files/lf30_8cv6lgcx.json'
    const lottieAnimPathDark = 'https://assets10.lottiefiles.com/private_files/lf30_obsnpogu.json'
    const animations = ref([
      {
        name: 'Pages',
        segment: [1, 238] as AnimationSegment
      },
      {
        name: 'UI',
        segment: [238, 448] as AnimationSegment
      },
      {
        name: 'Data',
        segment: [447, 688] as AnimationSegment
      },
      {
        name: 'Modules',
        segment: [688, 928] as AnimationSegment
      },
      {
        name: 'Deployment',
        segment: [928, 1167] as AnimationSegment
      }
    ])
    const lottieAnim = ref(null)
    const currentIndex = ref(0)
    const animFrames = ref([0, 238, 448, 688, 928])
    let anim: AnimationItem

    /* computed */
    const colorMode = computed(() => {
      return $colorMode.value
    })

    /* function */
    // if user clicks on section, stop loop and play specified segment
    function changeAnimation(index: number) {
      currentIndex.value = index
      anim.loop = false
      anim.playSegments(animations.value[index].segment, true)
    }

    function loadAnimation() {
      anim?.destroy()
      /**
       * Temporary use `context.ref` this should replace by Vue3 ref
       */
      lottieAnim.value = context.refs.lottieAnim as Element

      anim = lottie.loadAnimation({
        container: lottieAnim.value,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: colorMode.value === 'dark' ? lottieAnimPathDark : lottieAnimPathLight
      })

      anim.addEventListener('DOMLoaded', function () {
        // play animation when lottie container is visible otherwise pause it
        animationObserver()
      })

      anim.addEventListener('enterFrame', function () {
        const currentIndexFrame = animFrames.value.indexOf(Math.round(anim.currentFrame))

        if (currentIndexFrame !== -1 && anim.loop === true) {
          currentIndex.value = currentIndexFrame
        }
      })

      anim.addEventListener('loopComplete', function () {
        currentIndex.value = 0
      })
    }

    function animationObserver() {
      const callback = entries => {
        entries.forEach(({ _, isIntersecting }) => {
          if (!isIntersecting) {
            anim.pause()
          } else {
            anim.play()
          }
        })
      }

      const observer = new IntersectionObserver(callback, {
        root: document.querySelector('anim'),
        threshold: 0.8 // isIntersecting when 80% of container is visible
      })

      observer.observe(lottieAnim.value)
    }

    /* watcher */
    // reload anim with new path according color mode
    watch(colorMode, (_, __) => {
      loadAnimation()
    })

    onMounted(() => setTimeout(loadAnimation, 250))

    return {
      lottieAnim,
      anim,
      loadAnimation,
      changeAnimation,
      animations,
      currentIndex,
      animationObserver
    }
  }
})
</script>
<style lang="postcss" scoped>
.anim {
  @apply w-full flex justify-center items-center md:justify-end w-full;
}
</style>
