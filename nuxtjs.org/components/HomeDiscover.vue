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
            <CategoryLabel label="Discover" />
          </template>

          <template #title>
            <SectionTitle>
              Easier
              <span class="text-primary-green italic">Life</span>, from<span class="text-primary-green italic">
                Code</span
              >
              to<span class="text-primary-green italic"> Cloud</span>
            </SectionTitle>
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
                md:space-x-0 md:space-y-2 md:w-1/3
              "
            >
              <div v-for="(animation, index) in animations" :key="animation.name">
                <div class="flex flex-col-reverse md:flex-row md:flex-row justify-center items-center">
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
            <div class="w-full flex justify-center items-center md:justify-end md:w-2/3">
              <div id="lottieAnim" ref="lottieAnim" class="h-96" />
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
import { defineComponent, ref, onMounted, watch } from '@nuxtjs/composition-api'
import lottie, { AnimationItem } from 'lottie-web'

export default defineComponent({
  setup(_props, context) {
    const animations = ref([
      {
        name: 'Pages',
        path: 'https://assets3.lottiefiles.com/private_files/lf30_bxmm0fcm.json'
      },
      {
        name: 'UI',
        path: 'https://assets3.lottiefiles.com/private_files/lf30_rixgn205.json'
      },
      {
        name: 'Data',
        path: 'https://assets3.lottiefiles.com/private_files/lf30_wtexmd4t.json'
      },
      {
        name: 'Modules',
        path: 'https://assets3.lottiefiles.com/private_files/lf30_lga5cqha.json'
      },
      {
        name: 'Deployment',
        path: 'https://assets3.lottiefiles.com/private_files/lf30_farao0hg.json'
      }
    ])

    const lottieAnim = ref(null)
    let anim: AnimationItem
    const currentIndex = ref(0)
    const breakLoop = ref(false)

    watch(currentIndex, (newVal, oldVal) => {
      if (newVal !== oldVal) loadAnimation()
    })

    function changeAnimation(index: number) {
      breakLoop.value = true
      currentIndex.value = index
    }

    function loadAnimation() {
      anim?.destroy()

      anim = lottie.loadAnimation({
        /**
         * Temporary use `context.ref` this should replace by Vue3 ref
         */
        container: context.refs.lottieAnim as Element,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: animations.value[currentIndex.value].path
      })

      anim.addEventListener('complete', () => {
        if (!breakLoop.value) {
          // Set next animation
          if (currentIndex.value < animations.value.length - 1) {
            currentIndex.value = currentIndex.value + 1
          } else {
            currentIndex.value = 0
          }

          loadAnimation()
        }
      })
    }

    onMounted(() => setTimeout(loadAnimation, 250))

    return {
      lottieAnim,
      anim,
      loadAnimation,
      changeAnimation,
      animations,
      currentIndex
    }
  }
})
</script>
